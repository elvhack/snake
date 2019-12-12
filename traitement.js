window.onload = function() {
    canv = document.querySelector("#gc");
    ctx = canv.getContext("2d");

    wall = canv.getContext("2d");

    document.addEventListener("keydown", keyPush);

    setInterval(game, 1000 / 15);
};

px = py = 10;
gs = tc = 20;
ax = ay = 15;
xv = yv = 0;
trail = [];
tail = 5;

score = 0;
bestScore = 0;
lose = 0;
start = false;
currentDirection = 0;
startTime = Date.now();

//Essai de faire un mur 
var setWall = function(wall_value) {
    wall = wall_value;
    if (wall == 0) { canv.style.borderColor = "#606060"; }
    if (wall == 1) { canv.style.borderColor = "#FFFFFF"; }
}

function game() {
    info = document.getElementById("info");
    best = document.getElementById("best");
    pertes = document.getElementById("pertes");
    duree = document.getElementById("duree-partie");

    temps = Date.now() - startTime;

    px += xv;
    py += yv;

    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc) {
        py = 0;
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    duree.innerHTML =
        "Temps : " +
        Math.floor(Math.floor(temps / 1000) / 60) +
        " : " +
        (Math.floor(temps / 1000) % 60);
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);

        if (trail[i].x === px && trail[i].y === py) {
            tail = 5;
            score = 0;
            if (start) {
                lose++;
                startTime = Date.now();
                pertes.innerHTML = "Pertes : " + lose;
            }

            info.innerHTML = "Score : " + score;

            best.innerHTML = "Best score : " + bestScore;
        }
    }

    trail.push({ x: px, y: py });

    while (trail.length > tail) {
        trail.shift();
    }

    if (ax === px && ay === py) {
        tail++;
        score++;
        start = true;
        // duree.innerHTML("Temps : ", temps);
        console.log(
            Math.floor(Math.floor(temps / 1000) / 60) +
            " minutes " +
            (Math.floor(temps / 1000) % 60) +
            " secondes"
        );
        info.innerHTML = "Score : " + score;
        if (score > bestScore) {
            bestScore = score;
            best.innerHTML = "Best score : " + bestScore;
        }

        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPush(e) {
    switch (e.keyCode) {
        case 37:
            if (xv === 1 && yv === 0) {
                // si j'allais à droite alors je reste en direction de la droite
                xv = 1;
                yv = 0;
            } else {
                xv = -1;
                yv = 0;
            }

            break;
        case 38:
            if (xv === 0 && yv === 1) {
                // si j'allais en bas alors je reste à aller en bas
                xv = 0;
                yv = 1;
            } else {
                xv = 0;
                yv = -1;
            }

            break;
        case 39:
            if (xv === -1 && yv === 0) {
                // si j'étais en direction de la gauche, alors je continue d'aller à gauche
                xv = -1;
                yv = 0;
            } else {
                xv = 1;
                yv = 0;
            }

            break;
        case 40:
            if (xv === 0 && yv === -1) {
                xv = 0;
                yv = -1;
            } else {
                xv = 0;
                yv = 1;
            }

            break;
    }
}
//Essai de faire une fonction useWall où le serpent contourne le mur quand il le voit
//Je réfléchirai dans la semaine pour faire cette fonction
function useWall() {
    if (wall == 1) {
        // On
        if (snake[0].x < 0 || snake[0].x == canv.width / 10 || snake[0].y < 0 || snake[0].y == canv.height / 10) {
            showScreen(3);
            return;
        }
    } else {
        // Off
        for (var i = 0, x = snake.length; i < x; i++) {
            if (snake[i].x < 0) {
                snake[i].x = snake[i].x + (canv.width / 10);
            }
            if (snake[i].x == canv.width / 10) {
                snake[i].x = snake[i].x - (canv.width / 10);
            }
            if (snake[i].y < 0) {
                snake[i].y = snake[i].y + (canv.height / 10);
            }
            if (snake[i].y == canv.height / 10) {
                snake[i].y = snake[i].y - (canv.height / 10);
            }
        }
    }
}