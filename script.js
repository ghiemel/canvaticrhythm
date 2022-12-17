var Canvas = document.getElementById("myCanvas");
var Context = Canvas.getContext("2d");

// Music
var Music = new Audio("./Sounds/Shinsekai.mp3")
Music.playbackRate = 1
Music.volume = .5

// Gameplay & Settings
var Keybinds = ["Z", "X", "2", "3"]
var HoldTicks = 10

var Score = 0
var Combo = 0

var RawScore = 0
var ExpectedRawScore = 0

var ScoreAnim = 0
var ComboAnim = 50
var AccuracyAnim = 100
var JudgeAnim = 150

// Judgements
var CurrentJudgement = ""
var CurJudgementColor = "#000000"
var Judgements = {
    Far: [0, 25, 100, 1, "Far", "#ff3300"],
    Off: [0, 50, 135, 5, "Off", "#ff6200"],
    Fine: [0, 100, 90, 10, "Fine", "#00ff00"],
    Exact: [0, 150, 55, 20, "Exact", "#005eff"],
    RExact: [0, 250, 35, 20, "Precise", "#ffff00"],
    Miss: [0, 0, 0, 0, "Miss", "#ff0000"],
}

// Charting
import Map from "./Maps/shinsekai";
var Time = 0
var Time2 = 0
var TimeGap = 0

var NotesPassed = -35
var Chart = Map


// Functions
function createText(text, align, color, x, y, size) {
    Context.font = `${size}px "Lucida Sans Unicode"`
    Context.textBaseline = 'center';
    Context.fillStyle = color;
    Context.textAlign = align
    Context.fillText(text, x, y)
}

function drawShape(x, y, sizex, sizey, shape, color, color2) {
    function drawTriangle(x, y, sizex, sizey, color, color2) {
        Context.beginPath();
        Context.moveTo(x, y)
        Context.lineTo(x + sizex, y) 
        Context.lineTo(x, y + sizey)
        Context.closePath();
    
        var grd = Context.createLinearGradient(0, 0, 0, 150);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color2);
    
        Context.fillStyle = grd;
        Context.fill();
    }

    function drawRectangle(x, y, sizex, sizey, color, color2) {
        var grd = Context.createLinearGradient(0, 0, 0, 150);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color2);

        Context.fillStyle = grd;
        Context.fillRect(x, y, sizex, sizey);
    }

    function drawCircle(x, y, size, color, color2) {
        Context.beginPath();
        Context.arc(x, y, size, 0, 2 * Math.PI);
 
        var grd = Context.createLinearGradient(0, 0, 0, 150);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color2);

        Context.fillStyle = grd;
        Context.fill();
    }

    var Color = color
    var Color2 = color2 || color

    if (shape == "Triangle") { 
        drawTriangle(x, y, sizex, sizey, Color, Color2)
    } else if (shape == "Rectangle") {
        drawRectangle(x, y, sizex, sizey, Color, Color2)
    } else if (shape == "Circle") {
        drawCircle(x, y, sizex, Color, Color2)
    }
}

function spawnJudgement(Name, Stats) {
    CurrentJudgement = Judgements[Name][4]
    CurJudgementColor = Judgements[Name][5]   
    JudgeAnim = 145    

    if (Stats == true || Stats == undefined) {
        Score += Judgements[Name][1] * (1 + (Combo / 22.75)) * Music.playbackRate

        Judgements[Name][0] += 1
        if (Judgements[Name][4] == "Miss") {
            Combo = 0
            ComboAnim = 25
        } else {    
            Combo += 1
            ComboAnim = 75
    
            var HitAudio = new Audio("./Sounds/hit.wav")
            HitAudio.play()
        }
    }
}

var DownKeys = []
document.onkeydown = function(evt) {
    event = evt || window.event;
    var Key = (event.key).toUpperCase()
    
    if (Key == "P") {
        Music.play()
    }

    if (DownKeys[Key] == false || DownKeys[Key] == undefined) {
        DownKeys[Key] = true

        var ANotesPassed = Math.max(0, NotesPassed)
        var TargTime = 1e300
        var Target = null
        var JudI = "None"
    
        for (let notei = ANotesPassed; notei < ANotesPassed + 75; notei++) {
            if (notei < Chart.length) {
                var Note = Chart[notei]
                if (Keybinds.indexOf(Key) + 1 == Note[1]) {
                    if (Math.abs(Time - Note[0]) < TargTime) {
                        Target = notei
                        TargTime = Math.abs(Time - Note[0])
                    }
                }
            }
        }
    
        if (Target != null && TargTime < 150) {    
            for (let jud in Judgements) {
                if (TargTime < Judgements[jud][2]) {
                    JudI = jud
                }
            }
    
            if (JudI != null) {
                if (Chart[Target][2] == undefined) {
                    Chart[Target][0] = undefined
                    Chart[Target][1] = undefined

                    NotesPassed += 1
                } else {
                    Chart[Target][3] = "I exist!"
                }

                spawnJudgement(JudI)
            }
        }
    }
};

document.onkeyup = function(evt) {
    event = evt || window.event;
    var Key = (event.key).toUpperCase()

    DownKeys[Key] = false

    var ANotesPassed = Math.max(0, NotesPassed)
    var TargTime = 1e300
    var Target = null

    for (let notei = ANotesPassed; notei < ANotesPassed + 75; notei++) {
        if (notei < Chart.length) {
            var Note = Chart[notei]
            if (Keybinds.indexOf(Key) + 1 == Note[1]) {
                Target = notei
                TargTime = Math.abs(Time - Note[0])
            }
        }
    }

    if (Target != null && TargTime < 150) {
        if (Chart[Target][3] != undefined) {
            Chart[Target][3] = undefined
            spawnJudgement("Miss")

            Note[0] = undefined
            Note[1] = undefined
            Note[2] = undefined
            Note[3] = undefined

            NotesPassed += 1
        }
    }
}

setInterval(function() {
    var ANotesPassed = Math.max(0, NotesPassed)

    Canvas.width = window.innerWidth
    Canvas.height = window.innerHeight

    drawShape(0, 0, Canvas.width, Canvas.height, "Rectangle", "#000000")
    drawShape(Canvas.width, 0, -300, 125, "Triangle", "#888888", "#333333")
    drawShape(Canvas.width / 2 - 325, 0, 650, Canvas.height, "Rectangle", "#222222")

    for (var i = 1; i < 5; i++) {
        drawShape(Canvas.width / 2 + (i * 140 - 350), Canvas.height - 150, 60, 0, "Circle", "#ffffff")
    }

    for (let notei = ANotesPassed; notei < ANotesPassed + 150; notei++) {
        if (notei < Chart.length) {
            // Run functions
            var Note = Chart[notei]
            if (Note[2] != undefined) {
                if (Note[3] != undefined) {
                    var Distance = Math.abs(Time - Note[0])
                    Note[2] -= Distance
                    Note[0] = Time
                    Score += (Combo + 1) * Music.playbackRate

                    HoldTicks -= Music.playbackRate
                    if (HoldTicks <= 0) {
                        spawnJudgement("RExact", false)
                        Combo += 1
                        ComboAnim = 65

                        HoldTicks += 10
                    }

                    if (Note[2] < 0) {
                        spawnJudgement("RExact")
                        Note[0] = undefined
                        Note[1] = undefined
                        Note[2] = undefined
                        Note[3] = undefined

                        NotesPassed += 1
                    }
                }
            }
            drawShape(Canvas.width / 2 + (Note[1] * 140 - 350), ((Time - Note[0]) * 1.75) + (Canvas.height - 150), 60, 0, "Circle", "#888888")

            // Draw Shapes
            if (Note[2] != undefined) {
                drawShape(Canvas.width / 2 + (Note[1] * 140 - 350), ((Time - Note[0]) * 1.75) - (Note[2] * 1.75) + (Canvas.height - 150), 60, 0, "Circle", "#888888")
                drawShape(Canvas.width / 2 + (Note[1] * 140 - 410),((Time - Note[0]) * 1.75) - (Note[2] * 1.75) + (Canvas.height - 150) , 120, (Note[2] * 1.75), "Rectangle", "#888888")
            }

            // Miss function
            if (Note[0] - Time < -175) {
                spawnJudgement("Miss")

                Note[0] = undefined
                Note[1] = undefined
                Note[2] = undefined
                Note[3] = undefined

                NotesPassed += 1
            }
        }
    }

    var Accuracy = 0

    RawScore = 0
    ExpectedRawScore  = 0
    for (let jud in Judgements) {
        var Judge = Judgements[jud]

        RawScore += Judge[0] * Judge[3]
        ExpectedRawScore += Judge[0] * 20
    }

    Accuracy = (RawScore / ExpectedRawScore) * 100 || 100

    ScoreAnim += (Score - ScoreAnim) / 5
    AccuracyAnim += (Accuracy - AccuracyAnim) / 5
    JudgeAnim += (175 - JudgeAnim) / 10
    ComboAnim += (50 - ComboAnim) / 10

    drawShape(Canvas.width / 2 - 225, 0, 450, 100, "Rectangle", "#111111")
    createText(ScoreAnim.toLocaleString(undefined, {maximumFractionDigits: 0}), "right", "#ffffff", Canvas.width - 25, 55, 50)
    createText(AccuracyAnim.toLocaleString(undefined, {maximumFractionDigits: 3}) + "%", "right", "#ffffff", Canvas.width - 25, 85, 30)
    createText("(" + RawScore.toLocaleString() + " / " + ExpectedRawScore.toLocaleString() + ")", "right", "#ffffff", Canvas.width - 25, 115, 30)

    createText(CurrentJudgement, "center", CurJudgementColor, Canvas.width / 2, JudgeAnim, 50)
    createText("x" + Combo.toLocaleString(undefined, {maximumFractionDigits: 0}), "center", "#ffffff", Canvas.width / 2, 65 + (ComboAnim - 50) / 4, ComboAnim)
    Time = Music.currentTime * 1000
    TimeGap = Time - Time2
    Time2 = Time
}, 16)
