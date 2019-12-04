window.onload = function() {
  canv = document.querySelector("#gc");
  ctx = canv.getContext("2d");

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

function game() {
  info = document.getElementById("info");
  best = document.getElementById("best");
  pertes = document.getElementById("pertes");
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

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.fillStyle = "lime";
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);

    if (trail[i].x === px && trail[i].y === py) {
      tail = 5;
      score = 0;
      if (start) {
        lose++;
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
