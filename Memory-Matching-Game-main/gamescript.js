var em = ["💐", "🌹", "🌻", "🏵️", "🌺", "🌴", "🌈", "🍓", "🍒", "🍎", "🍉", "🍊", "🥭", "🍍", "🍋", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🌶️", "🍄", "🧅", "🥦", "🥑", "🍔", "🍕", "🧁", "🎂", "🍬", "🍩", "🍫", "🎈"];
var tmp, c, p = em.length;
if (p) while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = em[c];
    em[c] = em[p];
    em[p] = tmp;
}

var pre = "", pID, ppID = 0, turn = 0, t = "transform", flip = "rotateY(180deg)", flipBack = "rotateY(0deg)", time, mode;

window.onresize = init;
function init() {
    W = innerWidth;
    H = innerHeight;
    $('body').height(H + "px");
    $('#overlay').height(H + "px");
}

window.onload = function () {
    console.log("Window loaded");
    $("#overlay").html(`
        <div class="instructions">
            <h3>Welcome!</h3>
            <p>Instructions For Game</p>
            <ul>
                <li>Make pairs of similar blocks by flipping them.</li>
                <li>Click a block to flip it.</li>
                <li>If two blocks are not similar, they will be flipped back.</li>
            </ul>
            <p>Choose a mode to start the game.</p>
            <button onclick="start(3, 4)">3 x 4</button> 
            <button onclick="start(4, 4)">4 x 4</button>
            <button onclick="start(4, 5)">4 x 5</button>
            <button onclick="start(5, 6)">5 x 6</button>
            <button onclick="start(6, 6)">6 x 6</button>
        </div>`);
    $("#overlay").show();
}

function start(r, l) {
    min = 0, sec = 0, moves = 0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function () {
        sec++;
        if (sec == 60) {
            min++; sec = 0;
        }
        if (sec < 10)
            $("#time").html("Time: 0" + min + ":0" + sec);
        else
            $("#time").html("Time: 0" + min + ":" + sec);
    }, 1000);
    rem = r * l / 2, noItems = rem;
    mode = r + "x" + l;
    var items = [];
    for (var i = 0; i < noItems; i++)
        items.push(em[i]);
    for (var i = 0; i < noItems; i++)
        items.push(em[i]);
    var tmp, c, p = items.length;
    if (p) while (--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }

    $("table").html("");
    var n = 1;
    for (var i = 1; i <= r; i++) {
        $("table").append("<tr>");
        for (var j = 1; j <= l; j++) {
            $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n - 1]}</p></div></div></td>`);
            n++;
        }
        $("table").append("</tr>");
    }

    $("#overlay").fadeOut(500);
}

function change(x) {
    let i = "#" + x + " .inner";
    let f = "#" + x + " .inner .front";
    let b = "#" + x + " .inner .back";

    if (turn == 2 || $(i).attr("flip") == "block" || ppID == x) { }
    else {
        $(i).css(t, flip);
        if (turn == 1) {
            turn = 2;
            if (pre != $(b).text()) {
                setTimeout(function () {
                    $(pID).css(t, flipBack);
                    $(i).css(t, flipBack);
                    ppID = 0;
                }, 1000);
            }
            else {
                rem--;
                $(i).attr("flip", "block");
                $(pID).attr("flip", "block");
            }
            setTimeout(function () {
                turn = 0;
                moves++;
                $("#moves").html("Moves: " + moves);
            }, 1150);

        }
        else {
            pre = $(b).text();
            ppID = x;
            pID = "#" + x + " .inner";
            turn = 1;
        }

        if (rem == 0) {
            clearInterval(time);
            if (min == 0) {
                time = `${sec} seconds`;
            }
            else {
                time = `${min} minute(s) and ${sec} second(s)`;
            }
            setTimeout(function () {
                $("#overlay").html(`
                    <div>
                        <h2>Congrats!</h2>
                        <p>You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p>
                        <p>Comment Your Score!<br/>Play Again or Exit?</p>
                        <button onclick="start(3, 4)">3 x 4</button> 
                        <button onclick="start(4, 4)">4 x 4</button>
                        <button onclick="start(4, 5)">4 x 5</button>
                        <button onclick="start(5, 6)">5 x 6</button>
                        <button onclick="start(6, 6)">6 x 6</button>
                        <button id="exitButton" onclick="exitGame()">Exit</button>
                    </div>`);
                $("#overlay").fadeIn(750);
            }, 1500);
        }
    }
}

function exitGame() {
    $("#overlay").html(`
        <div style="
            font-size: 56px; 
            font-family: 'Trebuchet MS', sans-serif; 
            color: #ffcc00;
        ">
            THANK YOU FOR PLAYING!
        </div>
    `);
    $("#overlay").fadeIn(750);  // Ensure the overlay is visible
}
