const container = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let score = 0;
let stars = [];

// Player movement
document.addEventListener("keydown", (event) => {
  const playerLeft = player.offsetLeft;
  const containerWidth = container.offsetWidth;

  if (event.key === "ArrowLeft" && playerLeft > 0) {
    player.style.left = playerLeft - 20 + "px";
  } else if (
    event.key === "ArrowRight" &&
    playerLeft + player.offsetWidth < containerWidth
  ) {
    player.style.left = playerLeft + 20 + "px";
  }
});

// Generate stars
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = Math.random() * (container.offsetWidth - 20) + "px";
  star.style.top = "0px";
  container.appendChild(star);
  stars.push(star);
}

// Update stars
function updateStars() {
  stars.forEach((star, index) => {
    const starTop = parseInt(star.style.top);
    star.style.top = starTop + 5 + "px";

    // Check collision
    const playerRect = player.getBoundingClientRect();
    const starRect = star.getBoundingClientRect();

    if (
      starRect.bottom > playerRect.top &&
      starRect.top < playerRect.bottom &&
      starRect.left < playerRect.right &&
      starRect.right > playerRect.left
    ) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      star.remove();
      stars.splice(index, 1);
    }

    // Remove stars that fall out of bounds
    if (starTop > container.offsetHeight) {
      star.remove();
      stars.splice(index, 1);
    }
  });
}

// Game loop
function gameLoop() {
  updateStars();
  requestAnimationFrame(gameLoop);
}

// Start game
setInterval(createStar, 1000); // Add a new star every second
gameLoop();
