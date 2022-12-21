var Canvas = document.getElementById("myCanvas");
var Context = Canvas.getContext("2d");
var MapCopy = document.getElementById("mapcopy")

// Set canvas size
Canvas.width = window.innerWidth
Canvas.height = window.innerHeight

// Music
var Song = "Shinsekai"
var Music = new Audio(`./Sounds/${Song}.mp3`)
Music.playbackRate = 1
Music.volume = .5
Music.currentTime = 0

// Settings
var Keybinds = ["Z", "X", "2", "3"]
var Menu = "Song"
var Offset = -45

// Stats
var Score = 0
var Combo = 0
var MaxCombo = 0
var Accuracy = 0
var RawScore = 0
var ExpectedRawScore = 0

// Animation
var ScoreAnim = 0
var ComboAnim = 50
var AccuracyAnim = 100
var JudgeAnim = 150
var JudgeListAnim = -300

// Judgements
var CurrentJudgement = ""
var CurJudgementColor = "#000000"
var Judgements = {
    Miss: [0, 0, 200, 0, "Miss", "#ff0000"],
    Far: [0, 25, 150, 1, "Far", "#ff3300"],
    Off: [0, 50, 110, 5, "Off", "#ff6200"],
    Fine: [0, 100, 70, 10, "Fine", "#00ff00"],
    Exact: [0, 150, 40, 20, "Exact", "#005eff"],
    RExact: [0, 250, 20, 20, "Precise", "#ffff00"],
}

// Charting
var Time = 0
var Time2 = 0
var TimeGap = 0

var NotesPassed = -50
var Maps = {
    "Shinsekai": [
        [9948,1],
        [10025,2],
        [10103,4],
        [10181,3],
        [10259,2],
        [10336,1],
        [10414,4],
        [10492,2],
        [10569,3],
        [10647,3],
        [10647,4],
        [10725,1],
        [10803,2],
        [10880,4],
        [10958,3],
        [11036,1],
        [11036,2],
        [11113,4],
        [11191,3],
        [11269,2],
        [11347,1],
        [11424,2],
        [11502,4],
        [11502,3],
        [11580,1],
        [11658,2],
        [11735,4],
        [11813,3],
        [11891,1],
        [11891,2],
        [11968,3],
        [12046,4],
        [12124,2],
        [12202,1],
        [12279,4],
        [12279,3],
        [12357,1],
        [12435,2],
        [12512,3],
        [12590,1],
        [12590,2],
        [12668,2],
        [12746,4],
        [12823,3],
        [12901,1],
        [12979,2],
        [13056,4],
        [13056,3],
        [13134,1],
        [13212,2],
        [13290,3],
        [13367,4],
        [13445,3],
        [13523,1],
        [13601,2],
        [13678,4],
        [13678,3],
        [13756,1],
        [13834,3],
        [13911,2],
        [13989,4],
        [14067,1],
        [14145,3],
        [14222,1],
        [14222,2],
        [14300,4],
        [14378,2],
        [14455,4],
        [14533,2],
        [14611,3],
        [14689,1],
        [14766,3],
        [14844,1],
        [14922,3],
        [14922,4],
        [15077,1],
        [15155,2],
        [15233,3],
        [15310,4],
        [15388,3],
        [15466,2],
        [15544,3],
        [15621,2],
        [15699,4],
        [15699,1],
        [15777,2],
        [15854,3],
        [15932,4],
        [16010,1],
        [16088,3],
        [16165,4],
        [16243,2],
        [16321,4],
        [16321,3],
        [16398,1],
        [16476,2],
        [16554,4],
        [16632,3],
        [16709,1],
        [16787,2],
        [16865,4],
        [16943,3],
        [17020,1],
        [17020,2],
        [17098,4],
        [17176,3],
        [17253,1],
        [17331,3],
        [17409,4],
        [17487,2],
        [17564,1],
        [17642,4],
        [17642,3],
        [17720,1],
        [17797,2],
        [17875,4],
        [17953,3],
        [18031,1],
        [18031,4],
        [18186,4],
        [18264,3],
        [18341,2],
        [18419,1],
        [18497,1],
        [18497,4],
        [18575,2],
        [18652,3],
        [18730,4],
        [18808,1],
        [18886,2],
        [18963,4],
        [19041,3],
        [19119,4],
        [19119,1],
        [19274,2],
        [19352,3],
        [19430,1],
        [19507,2],
        [19585,4],
        [19663,3],
        [19740,1],
        [19740,4],
        [19818,1],
        [19896,3],
        [19974,1],
        [20051,3],
        [20129,1],
        [20207,3],
        [20284,4],
        [20362,2],
        [20440,4],
        [20518,2],
        [20595,4],
        [20673,2],
        [20751,1],
        [20751,4],
        [20829,3],
        [20906,2],
        [20984,4],
        [21062,1],
        [21139,2],
        [21217,3],
        [21295,4],
        [21373,4],
        [21373,1],
        [21450,2],
        [21528,3],
        [21606,3],
        [21683,4],
        [21683,1],
        [21761,2],
        [21839,3],
        [21917,4],
        [21994,3],
        [22072,4],
        [22072,1],
        [22150,2],
        [22227,3],
        [22305,1],
        [22383,4],
        [22461,2],
        [22461,3],
        [22538,1],
        [22616,4],
        [22694,3],
        [22772,2],
        [22849,4],
        [22927,1],
        [23005,3],
        [23005,4],
        [23082,2],
        [23160,3],
        [23238,4],
        [23316,1],
        [23393,2],
        [23471,4],
        [23549,3],
        [23626,1],
        [23704,4],
        [23704,3],
        [23782,2],
        [23860,3],
        [23937,2],
        [24015,3],
        [24093,1],
        [24170,4],
        [24248,1],
        [24248,4],
        [24404,2],
        [24481,3],
        [24559,1],
        [24637,4],
        [24715,2],
        [24792,4],
        [24792,3],
        [24870,1],
        [24948,2],
        [25025,3],
        [25103,4],
        [25181,1],
        [25259,4],
        [25336,3],
        [25414,2],
        [25492,4],
        [25492,1],
        [25647,3],
        [25725,2],
        [25803,4],
        [25803,3],
        [25880,1],
        [25958,3],
        [26036,2],
        [26113,4],
        [26113,1],
        [26269,2],
        [26347,4],
        [26347,3],
        [26424,1],
        [26502,2],
        [26580,4],
        [26658,3],
        [26735,1],
        [26813,2],
        [26891,1],
        [26968,4],
        [27046,2],
        [27124,4],
        [27124,3],
        [27202,1],
        [27279,2],
        [27357,1],
        [27435,4],
        [27512,3],
        [27590,4],
        [27668,2],
        [27746,3],
        [27823,1],
        [27901,2],
        [27979,4],
        [28056,1],
        [28056,3],
        [28134,2],
        [28212,4],
        [28290,3],
        [28367,1],
        [28445,4],
        [28523,2],
        [28601,4],
        [28678,3],
        [28756,4],
        [28834,1],
        [28911,2],
        [28989,1],
        [29067,3],
        [29145,2],
        [29222,3],
        [29300,1],
        [29378,4],
        [29455,1],
        [29533,2],
        [29533,3],
        [29611,1],
        [29689,4],
        [29766,2],
        [29844,3],
        [29922,4],
        [30000,3],
        [30077,2],
        [30155,1],
        [30233,2],
        [30310,4],
        [30388,3],
        [30466,1],
        [30544,2],
        [30621,4],
        [30699,3],
        [30777,1],
        [30854,2],
        [30932,3],
        [30932,4],
        [31010,2],
        [31088,1],
        [31165,2],
        [31243,4],
        [31321,1],
        [31398,2],
        [31476,4],
        [31554,3],
        [31632,2],
        [31709,1],
        [31787,4],
        [31865,3],
        [31865,2],
        [31943,4],
        [32020,3],
        [32098,2],
        [32176,1],
        [32253,4],
        [32331,3],
        [32409,1],
        [32487,2],
        [32564,4],
        [32642,1],
        [32720,2],
        [32797,3],
        [32797,4],
        [32875,1],
        [32953,2],
        [33031,3],
        [33108,4],
        [33186,3],
        [33264,2],
        [33341,1],
        [33419,4],
        [33497,2],
        [33497,3],
        [33575,1],
        [33652,4],
        [33730,2],
        [33808,3],
        [33886,1],
        [33963,4],
        [34041,3],
        [34119,2],
        [34196,1],
        [34274,4],
        [34352,2],
        [34430,4],
        [34507,2],
        [34507,3],
        [34585,4],
        [34663,2],
        [34740,4],
        [34818,2],
        [34896,3],
        [34974,1],
        [35051,3],
        [35129,1],
        [35207,4],
        [35284,2],
        [35362,4],
        [35440,2],
        [35518,4],
        [35595,2],
        [35673,3],
        [35751,1],
        [35829,3],
        [35906,1],
        [35984,3],
        [36062,1],
        [36139,4],
        [36139,2],
        [36217,3],
        [36295,2],
        [36373,3],
        [36450,2],
        [36528,4],
        [36606,1],
        [36683,3],
        [36761,2],
        [36839,4],
        [36917,3],
        [36994,1],
        [37072,2],
        [37150,4],
        [37227,3],
        [37305,1],
        [37383,2],
        [37461,4],
        [37538,2],
        [37538,3],
        [37616,1],
        [37694,4],
        [37772,2],
        [37849,3],
        [37927,1],
        [38005,4],
        [38082,2],
        [38160,3],
        [38238,1],
        [38316,2],
        [38393,4],
        [38471,4],
        [38471,3],
        [38549,1],
        [38626,2],
        [38704,3],
        [38782,4],
        [38860,1],
        [38937,3],
        [39015,2],
        [39093,4],
        [39170,1],
        [39248,2],
        [39326,3],
        [39404,4],
        [39404,3],
        [39481,1],
        [39559,2],
        [39637,4],
        [39715,3],
        [39792,4],
        [39792,1],
        [39792,3],
        [41036,2],
        [41036,1],
        [41036,3],
        [42279,1],
        [42279,4],
        [42279,3],
        [42901,1],
        [42901,3],
        [43523,4],
        [43523,2],
        [44145,1],
        [44145,4],
        [44145,3],
        [43523,1],
        [42901,2],
        [44766,2],
        [44766,4],
        [44766,3],
        [45077,2],
        [45077,4],
        [45077,3],
        [45388,3],
        [45388,1],
        [45388,2],
        [45699,3],
        [45699,2],
        [45699,1],
        [46010,4],
        [46010,3],
        [46165,2],
        [46165,3],
        [46321,2],
        [46321,1],
        [46476,2],
        [46476,3],
        [46632,3],
        [46632,4],
        [46787,2],
        [46787,3],
        [46943,2],
        [46943,1],
        [47098,3],
        [47098,2],
        [47253,4],
        [47331,2],
        [47409,4],
        [47487,2],
        [47564,3],
        [47642,1],
        [47720,4],
        [47797,2],
        [47875,3],
        [47953,1],
        [48031,4],
        [48108,1],
        [48108,2],
        [48186,3],
        [48264,4],
        [48341,1],
        [48341,2],
        [48497,3],
        [48575,4],
        [48652,1],
        [48730,3],
        [48808,2],
        [48886,1],
        [48886,4],
        [48963,4],
        [48963,3],
        [49041,1],
        [49119,2],
        [49196,4],
        [49274,3],
        [49352,1],
        [49430,2],
        [49507,4],
        [49585,3],
        [49663,1],
        [49740,4],
        [49740,3],
        [49818,2],
        [49896,4],
        [49974,1],
        [50051,2],
        [50129,3],
        [50207,4],
        [50284,1],
        [50362,2],
        [50440,3],
        [50518,4],
        [50518,1],
        [50595,2],
        [50673,4],
        [50673,3],
        [50751,1],
        [50829,2],
        [50906,3],
        [50984,4],
        [51062,1],
        [51139,4],
        [51139,2],
        [51139,3],
        [51217,2],
        [51295,3],
        [51373,4],
        [51450,1],
        [51528,2],
        [51606,3],
        [51683,4],
        [51761,3],
        [51761,2],
        [51761,1],
        [51839,4],
        [51917,3],
        [51994,2],
        [52072,4],
        [52150,1],
        [52227,2],
        [52305,3],
        [52305,4],
        [52305,1],
        [52383,3],
        [52461,2],
        [52538,4],
        [52616,1],
        [52694,3],
        [52772,2],
        [52849,4],
        [52927,1],
        [53005,3],
        [53082,1],
        [53082,3],
        [53160,2],
        [53238,3],
        [53316,1],
        [53393,4],
        [53393,3],
        [53471,2],
        [53549,4],
        [53626,3],
        [53704,1],
        [53782,2],
        [53860,4],
        [53937,3],
        [54015,2],
        [54093,1],
        [54170,4],
        [54248,2],
        [54326,3],
        [54404,1],
        [54481,4],
        [54559,2],
        [54559,3],
        [54637,1],
        [54715,2],
        [54792,3],
        [54870,4],
        [54948,1],
        [55025,2],
        [55103,4],
        [55181,3],
        [55259,1],
        [55336,2],
        [55414,4],
        [55492,4],
        [55492,1],
        [55569,3],
        [55647,2],
        [55725,3],
        [55803,1],
        [55880,4],
        [55958,2],
        [56036,3],
        [56113,4],
        [56191,1],
        [56269,2],
        [56347,4],
        [56424,3],
        [56502,1],
        [56580,2],
        [56580,3],
        [56658,1],
        [56735,2],
        [56813,4],
        [56891,3],
        [56968,1],
        [57046,2],
        [57124,4],
        [57202,4],
        [57279,3],
        [57357,4],
        [57435,3],
        [57512,1],
        [57590,2],
        [57668,1],
        [57746,2],
        [57823,4],
        [57901,3],
        [57979,4],
        [58056,3],
        [58134,1],
        [58212,2],
        [58290,1],
        [58367,2],
        [58445,4],
        [58523,3],
        [58601,4],
        [58678,3],
        [58756,1],
        [58834,2],
        [58911,1],
        [58989,2],
        [59067,4],
        [59145,3],
        [59222,4],
        [59300,3],
        [59378,1],
        [59455,2],
        [59533,1],
        [59611,2],
        [59689,4],
        [59766,3],
        [59844,2],
        [59922,1],
        [60000,4],
        [60077,3],
        [60155,2],
        [60233,1],
        [60310,4],
        [60388,3],
        [60466,2],
        [60544,1],
        [60621,4],
        [60699,3],
        [60777,2],
        [60854,1],
        [60932,4],
        [61010,3],
        [61088,2],
        [61165,1],
        [61243,4],
        [61321,3],
        [61398,2],
        [61476,1],
        [61554,4],
        [61632,3],
        [61709,2],
        [61787,1],
        [61865,4],
        [61943,3],
        [62020,2],
        [62098,1],
        [62176,4],
        [62253,3],
        [62331,2],
        [62409,3],
        [62487,2],
        [62564,1],
        [62642,4],
        [62720,3],
        [62797,2],
        [62875,3],
        [62953,2],
        [63031,1],
        [63108,4],
        [63186,3],
        [63264,2],
        [63341,3],
        [63419,2],
        [63497,1],
        [63575,4],
        [63652,3],
        [63730,2],
        [63808,3],
        [63886,2],
        [63963,1],
        [64041,4],
        [64119,3],
        [64196,2],
        [64274,3],
        [64352,2],
        [64430,1],
        [64507,4],
        [64585,3],
        [64663,1],
        [64740,3],
        [64818,2],
        [64896,4],
        [64974,1],
        [65051,3],
        [65129,2],
        [65207,4],
        [65284,1],
        [65362,3],
        [65440,2],
        [65518,4],
        [65595,1],
        [65673,3],
        [65751,2],
        [65829,4],
        [65906,1],
        [65984,3],
        [66062,2],
        [66139,4],
        [66217,1],
        [66295,3],
        [66373,2],
        [66450,4],
        [66528,1],
        [66606,3],
        [66683,2],
        [66761,1],
        [66839,4],
        [66917,2],
        [66994,3],
        [67072,4],
        [67072,1],
        [67150,4],
        [67227,3],
        [67305,2],
        [67383,1],
        [67461,4],
        [67538,3],
        [67616,2],
        [67694,1],
        [67772,4],
        [67849,3],
        [67927,2],
        [68005,1],
        [68082,4],
        [68160,3],
        [68238,2],
        [68316,1],
        [68393,1],
        [68471,2],
        [68549,3],
        [68626,4],
        [68704,1],
        [68782,2],
        [68860,3],
        [68937,4],
        [69015,1],
        [69093,2],
        [69170,3],
        [69248,4],
        [69326,1],
        [69404,2],
        [69481,3],
        [69559,4],
        [69637,1],
        [69637,4],
        [69715,3],
        [69792,2],
        [69870,3],
        [69948,2],
        [70025,4],
        [70025,1],
        [70103,3],
        [70181,2],
        [70259,3],
        [70336,2],
        [70414,4],
        [70414,1],
        [70492,2],
        [70569,3],
        [70647,2],
        [70725,3],
        [70803,1],
        [70803,4],
        [70880,2],
        [70958,3],
        [71036,2],
        [71113,3],
        [71191,4],
        [71191,1],
        [71269,3],
        [71347,2],
        [71424,3],
        [71502,2],
        [71580,4],
        [71580,1],
        [71658,3],
        [71735,2],
        [71813,3],
        [71891,2],
        [71968,4],
        [71968,1],
        [72046,2],
        [72046,3],
        [72124,1],
        [72124,4],
        [72124,2],
        [72746,1],
        [72746,4],
        [72746,3],
        [73367,3],
        [73367,3],
        [73367,1],
        [73367,2],
        [73989,2],
        [73989,3],
        [73989,4],
        [74611,4],
        [74611,2],
        [74922,1],
        [74922,3],
        [75233,3],
        [75233,1],
        [75544,4],
        [75544,2],
        [75854,4],
        [75854,1],
        [75932,2],
        [76010,3],
        [76088,1],
        [76165,4],
        [76243,2],
        [76321,3],
        [76398,1],
        [76476,4],
        [76554,2],
        [76632,3],
        [76709,4],
        [76709,1],
        [76787,2],
        [76865,3],
        [76943,4],
        [77020,1],
        [77020,2],
        [77020,3],
        [77098,4],
        [77176,3],
        [77253,2],
        [77331,1],
        [77409,4],
        [77487,3],
        [77564,2],
        [77642,1],
        [77720,4],
        [77797,3],
        [77875,2],
        [77953,1],
        [78031,2],
        [78108,3],
        [78186,4],
        [78264,1],
        [78341,2],
        [78419,3],
        [78497,4],
        [78575,3],
        [78652,2],
        [78730,1],
        [78808,4],
        [78886,3],
        [78963,2],
        [79041,1],
        [79119,2],
        [79196,3],
        [79274,4],
        [79352,1],
        [79430,2],
        [79507,3],
        [79585,4],
        [79663,3],
        [79740,1],
        [79818,2],
        [79896,3],
        [79974,4],
        [80051,1],
        [80129,2],
        [80207,3],
        [80207,4],
        [80284,1],
        [80362,2],
        [80440,4],
        [80518,3],
        [80595,4],
        [80673,3],
        [80751,2],
        [80829,1],
        [80906,2],
        [80984,3],
        [81062,4],
        [81139,1],
        [81217,2],
        [81295,3],
        [81373,4],
        [81450,1],
        [81528,2],
        [81606,3],
        [81606,4],
        [81683,2],
        [81761,1],
        [81839,4],
        [81917,3],
        [81994,2],
        [82072,3],
        [82150,2],
        [82227,4],
        [82305,1],
        [82383,4],
        [82461,1],
        [82538,3],
        [82616,2],
        [82694,3],
        [82772,2],
        [82849,4],
        [82927,1],
        [83005,4],
        [83082,1],
        [83160,2],
        [83238,4],
        [83316,3],
        [83393,1],
        [83471,2],
        [83549,4],
        [83626,4],
        [83626,3],
        [83704,1],
        [83782,2],
        [83860,3],
        [83937,1],
        [84015,2],
        [84093,4],
        [84170,3],
        [84248,1],
        [84326,2],
        [84404,4],
        [84481,3],
        [84559,1],
        [84559,2],
        [84637,4],
        [84715,3],
        [84792,2],
        [84870,1],
        [84948,4],
        [85025,3],
        [85103,2],
        [85181,1],
        [85259,3],
        [85336,2],
        [85414,4],
        [85492,1],
        [85569,4],
        [85647,2],
        [85725,3],
        [85803,1],
        [85880,4],
        [85958,2],
        [86036,3],
        [86036,4],
        [86191,1],
        [86269,1],
        [86347,4],
        [86424,4],
        [86502,2],
        [86580,3],
        [86658,1],
        [86735,2],
        [86813,4],
        [86813,3],
        [86968,1],
        [87046,4],
        [87124,2],
        [87202,3],
        [87279,1],
        [87357,4],
        [87435,2],
        [87512,3],
        [87590,4],
        [87668,1],
        [87746,3],
        [87823,1],
        [87823,4],
        [87901,2],
        [87979,3],
        [88056,4],
        [88134,3],
        [88212,1],
        [88290,2],
        [88367,4],
        [88445,4],
        [88445,3],
        [88523,1],
        [88601,2],
        [88678,4],
        [88756,3],
        [88834,1],
        [88911,2],
        [88911,1],
        [88989,4],
        [89067,3],
        [89145,2],
        [89222,3],
        [89300,1],
        [89378,4],
        [89455,2],
        [89533,1,4042],
        [89533,4,4042],
        [89533,3,4042],
    ]
}

var Charting = {
    BPM: 193,
    Offset: 1257,
    BeatDivisor: 4,
    Map: [

    ],
    Marks: [
        
    ]
}

var Chart = Maps[Song]
var CurrentDelete = "Map"
var BarTime = 0
var SnappedTime = 0
var CanMove = 0

// Functions - Notes
function clearNote(Note) {
    Note[0] = undefined
    Note[1] = undefined
    Note[2] = undefined
    Note[3] = undefined
}

var ComboTicks = 0      
function handleHold(Note) {
    if (Note[2] != undefined) {
        if (Note[3] != undefined) {
            var Distance = Math.abs(Time - Note[0])
            Note[2] -= Distance
            Note[0] = Time
            Score += (Combo + 1) * Music.playbackRate
            Combo += Music.playbackRate / 10
            ComboTicks += Music.playbackRate / 10

            if (ComboTicks >= 1) {
                spawnJudgement("RExact", false)
                ComboAnim = 150
                ComboTicks = 0
            }

            if (Note[2] < 0) {
                spawnJudgement("RExact")
                clearNote(Note)

                NotesPassed += 1
            }
        }
    }
}

// Functions - Drawing
function createText(text, align, color, x, y, size, shadow, baseline) {
    Context.font = `${size}px "Lucida Sans Unicode"`
    Context.textBaseline = "middle";
    if (baseline) {
        Context.textBaseline = baseline;
    }
    Context.fillStyle = color;
    Context.textAlign = align

    if (shadow) {
        for (var i = 0; i < 2; i++) {
            Context.shadowBlur = 10
            Context.shadowColor = shadow
            Context.fillText(text, x, y)
        }
    } else {
        Context.shadowBlur = 0
        Context.fillText(text, x, y)
    }}

function drawShape(x, y, sizex, sizey, radius, shape, color, color2) {
    Context.shadowBlur = 0;
    Context.shadowColor = "black";
    function drawTriangle(x, y, sizex, sizey, color, color2) {
        Context.beginPath();
        Context.moveTo(x, y)
        Context.lineTo(x + sizex, y) 
        Context.lineTo(x, y + sizey)
        Context.closePath();
    
        var grd = Context.createLinearGradient(0, 0, 0, sizey);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color2);
    
        Context.fillStyle = grd;
        Context.fill();
    }

    function drawRectangle(x, y, sizex, sizey, radius, color, color2) {
        var grd = Context.createLinearGradient(0, 0, 0, sizey);
        grd.addColorStop(0, color);
        grd.addColorStop(1, color2);

        Context.fillStyle = grd;
        Context.beginPath();
        Context.roundRect(x, y, sizex, sizey, radius);
        Context.fill();
    }

    function drawCircle(x, y, size, color, color2) {
        Context.beginPath();
        Context.arc(x, y, size, 0, 2 * Math.PI);

        Context.fillStyle = color;
        Context.fill();
    }

    var Color = color
    var Color2 = color2 || color

    if (shape == "Triangle") { 
        drawTriangle(x, y, sizex, sizey, Color, Color2)
    } else if (shape == "Rectangle") {
        drawRectangle(x, y, sizex, sizey, radius, Color, Color2)
    } else if (shape == "Circle") {
        drawCircle(x, y, sizex, Color, Color2)
    }
}

// Functions - Timing
function spawnJudgement(Name, Stats) {
    CurrentJudgement = Judgements[Name][4]
    CurJudgementColor = Judgements[Name][5]   
    JudgeAnim = 75  

    if (Stats == true || Stats == undefined) {
        Score += Judgements[Name][1] * (1 + (Combo / 22.75)) * Music.playbackRate

        Judgements[Name][0] += 1
        if (Judgements[Name][4] == "Miss") {
            Combo = 0
            ComboAnim = 50
        } else {    
            Combo += 1
            ComboAnim = 150
    
            var HitAudio = new Audio("./Sounds/hit.wav")
            HitAudio.play()
        }
    }
}

var DownKeys = []
document.onkeydown = function(evt) {
    event = evt || window.event;
    var Key = (event.key).toUpperCase();
    var KeyCode = event.code;
    
    if (Key == "P" && (Menu == "Song" || Menu == "Map")) {
        if (Music.paused == true) {
            Music.play()
        } else if (Menu == "Map") {
            Music.pause()
        }
    }

    if (Key == "F4" && Menu == "Map") {
        Charting.BeatDivisor += 2
        if (Charting.BeatDivisor >= 18) {
            Charting.BeatDivisor = 2
        } 
    }
 
    if (DownKeys[Key] == false || DownKeys[Key] == undefined) {
        if (Menu == "Song") {
            DownKeys[Key] = true

            var ANotesPassed = Math.max(0, NotesPassed)
            var TargTime = 1e300
            var Target = null
            var JudI = "None"
        
            for (let notei = ANotesPassed; notei < ANotesPassed + 100; notei++) {
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
        
            if (Target != null && TargTime < Judgements["Miss"][2]) {    
                for (let jud in Judgements) {
                    if (TargTime <= Judgements[jud][2]) {
                        JudI = jud
                    }
                }
        
                if (JudI != null) {
                    if (Chart[Target][2] == undefined) {
                        clearNote(Chart[Target])
                        NotesPassed += 1
                    } else {
                        Chart[Target][3] = "I exist!"
                    }
    
                    spawnJudgement(JudI)
                }
            }
        } else if (Menu == "Map") {
            if (Keybinds.indexOf(Key) >= 0) {
                var Array = [Math.floor(SnappedTime * 1000), Keybinds.indexOf(Key) + 1]
                Charting.Map.push(Array)

                console.log(Charting.Map)
                var HitAudio = new Audio("./Sounds/hit.wav")
                HitAudio.play()
                if (Music.paused == true) {
                    CanMove += 1
                }
            }

            console.log(Key, KeyCode)
            if (Key == "ARROWLEFT") {BarTime -= 1 / (Charting.BeatDivisor / 4)} 
            else if (Key == "ARROWRIGHT") {BarTime += 1 / (Charting.BeatDivisor / 4)}
            else if (KeyCode == "Space") {Charting.Marks.push(Math.floor(SnappedTime * 1000))}
            else if (Key == "BACKSPACE") {Charting[CurrentDelete].splice(Charting[CurrentDelete].length - 1, 1)}
            else if (Key == "Q") {if (CurrentDelete == "Map") {CurrentDelete = "Marks"} else {CurrentDelete = "Map"}}
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

    for (let notei = ANotesPassed; notei < ANotesPassed + 100; notei++) {
        if (notei < Chart.length) {
            var Note = Chart[notei]
            if (Keybinds.indexOf(Key) + 1 == Note[1]) {
                Target = notei
                TargTime = Math.abs(Time - Note[0])
            }
        }
    }

    if (Target != null && TargTime < Judgements["Miss"][2]) {
        if (Chart[Target][3] != undefined) {
            Chart[Target][3] = undefined

            spawnJudgement("Miss")
            clearNote(Note)
        }
    }
}

// Functions - Main
function clearCanvas() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
}
 
function drawCanvas() {
    clearCanvas()
    drawShape(0, 0, Canvas.width, Canvas.height, 0, "Rectangle", "#000000")

    function drawText() {
        createText(ScoreAnim.toLocaleString(undefined, {maximumFractionDigits: 0}), "right", "#ffffff", Canvas.width - 40, 60, 50)
        createText(AccuracyAnim.toFixed(3) + "%", "right", "#ffffff", Canvas.width - 30, 120, 30)
        createText("(" + RawScore.toLocaleString() + " / " + ExpectedRawScore.toLocaleString() + ")", "right", "#ffffff", Canvas.width - 30, 150, 30)

        createText(Combo.toLocaleString(undefined, {maximumFractionDigits: 0}), "center", "#ffffff", Canvas.width / 2, 150, 100 + ComboAnim / 4, "#000000", "top")
        createText("Combo", "center", "#ffffff", Canvas.width / 2, 120, 50, "#000000")
        createText(CurrentJudgement, "center", CurJudgementColor, Canvas.width / 2, 50, JudgeAnim)
    }

    RawScore = 0
    ExpectedRawScore  = 0

    var judIndex = 0
    for (let jud in Judgements) {
        var Judge = Judgements[jud]
        RawScore += Judge[0] * Judge[3]
        ExpectedRawScore += Judge[0] * 20
        judIndex += 1

        createText(Judge[4] + ": " + (Judge[0]).toLocaleString(), "right", Judge[5], Canvas.width - 15, Canvas.height - (JudgeListAnim + (judIndex * 35)), 35)
    }

    Accuracy = (RawScore / ExpectedRawScore) * 100 || 100
    ScoreAnim += (Score - ScoreAnim) / 7.5
    AccuracyAnim += (Accuracy - AccuracyAnim) / 7.5
    JudgeAnim += (50 - JudgeAnim) / 10
    ComboAnim += (0 - ComboAnim) / 10

    MaxCombo = Math.max(Combo, MaxCombo)

    if (Menu == "Song") {
        // Draw UI (Side Stats & ScrollBG)
        drawShape(Canvas.width - 515, 55, 500, 125, [0, 0, 20, 20], "Rectangle", "#888888", "#222222") // More stats
        drawShape(Canvas.width - 515, 20, 500, 75, 60, "Rectangle", "#aaaaaa", "#555555") // Score
        drawShape(Canvas.width / 2 - 325, 0, 650, Canvas.height, 0, "Rectangle", "#555555", "#111111") // Scroll BG

        // Give functions to Notes & Render Circles
        for (var i = 1; i < 5; i++) {
            drawShape(Canvas.width / 2 + (i * 140 - 350), Canvas.height - 150, 60, 0, 0, "Circle", "#ffffff")
        }
    
        var ANotesPassed = Math.max(0, NotesPassed)
        for (let notei = ANotesPassed; notei <= ANotesPassed + 100; notei++) {
            if (notei < Chart.length) {
                // Run functions
                var Note = Chart[notei]
                handleHold(Note)
    
                // Draw Shapes
                drawShape(Canvas.width / 2 + (Note[1] * 140 - 350), ((Time - Note[0]) * 1.75) + (Canvas.height - 150), 60, 0, 0, "Circle", "#aaaaaa")

                if (Note[2] != undefined) {
                    drawShape(Canvas.width / 2 + (Note[1] * 140 - 350), ((Time - Note[0]) * 1.75) - (Note[2] * 1.75) + (Canvas.height - 150), 60, 0, 0, "Circle", "#888888")
                    drawShape(Canvas.width / 2 + (Note[1] * 140 - 410),((Time - Note[0]) * 1.75) - (Note[2] * 1.75) + (Canvas.height - 150) , 120, (Note[2] * 1.75), 0, "Rectangle", "#888888")
                }
    
                // Miss function
                if (Note[0] - Time < (Judgements["Miss"][2] * -1)) {
                    spawnJudgement("Miss")
                    clearNote(Note)
                    NotesPassed += 1
                }
            }
        }
    
        JudgeListAnim += (500 - JudgeListAnim) / 10
        drawText()

        // Update song time
        Time = (Music.currentTime * 1000) - Offset

        if (Music.currentTime >= Music.duration) {
            Menu = "End"

            ScoreAnim = 0
            AccuracyAnim = 0
        }
    } else if (Menu == "End") {
        createText(ScoreAnim.toLocaleString(undefined, {maximumFractionDigits: 0}), "center", "#ffffff", Canvas.width / 2, 165, 125)
        createText(AccuracyAnim.toFixed(3) + "%", "center", "#ffffff", Canvas.width / 2, 55, 30)

        JudgeListAnim += (0 - JudgeListAnim) / 10
    } else if (Menu == "Map") {
        if (Music.paused == false) {
            BarTime = Math.floor(Music.currentTime * (Charting.BPM / 60) * (Charting.BeatDivisor / 4)) / (Charting.BeatDivisor / 4)
        } else {
            Music.currentTime = SnappedTime
        }
        SnappedTime = BarTime / (Charting.BPM / 60)
        createText("Time: " + Music.currentTime.toFixed(3), "right", "#ffffff", Canvas.width - 40, 60, 50)
        createText("Bar: " + BarTime.toFixed(3), "right", "#ffffff", Canvas.width - 40, 110, 50)
        createText("Snapped:" + SnappedTime.toFixed(3), "right", "#ffffff", Canvas.width - 40, 160, 50)
        createText("1 / " +     Charting.BeatDivisor, "right", "#ffffff", Canvas.width - 40, 260, 50)

        drawShape(Canvas.width / 2 - 325, 0, 650, Canvas.height, 0, "Rectangle", "#555555", "#111111")
        drawShape(Canvas.width / 2 - 325, 150, 650, 15, 0, "Rectangle", "#ffffff")

        for (let notebi in Charting.Marks) {
            var MapMark = Charting.Marks[notebi]
            drawShape(Canvas.width / 2 - 325, ((Music.currentTime * 1000 - MapMark) * 1) + 150, 650, 15, 0, "Rectangle", "#00ff00")
        }

        for (let noteai in Charting.Map) {
            var MapNote = Charting.Map[noteai]
            drawShape(Canvas.width / 2 + (MapNote[1] * 162.5 - 487.5), ((Music.currentTime * 1000 - MapNote[0]) * 1) + 150, 163, 15, 0, "Rectangle", "#ff0000")  
        }

        createText("Current Deletion: " + CurrentDelete, "center", "#ffffff", Canvas.width / 2, 50, 50)
        MapCopy.innerHTML = "Charting: " + JSON.stringify(Charting)
    }
}


setInterval(drawCanvas, 16)

setInterval(function() {
    if (CanMove > 0 && Menu == "Map") {
        BarTime += 4 / Charting.BeatDivisor
        CanMove = 0
    }
}, 100)