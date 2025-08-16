document.addEventListener("DOMContentLoaded", () => {
  const slashSound = document.getElementById("sword-sound");
  const slashOverlay = document.querySelector(".page-load-slash");

  if (!slashSound || !slashOverlay) return;

  // Enable audio immediately and play with slash
  let audioPlayed = false;
  
  const playSlashSound = () => {
    if (!audioPlayed) {
      slashSound.currentTime = 0;
      slashSound.play().catch(err => {
        // If autoplay fails, try again on first user interaction
        ['click', 'touchstart', 'keydown'].forEach(event => {
          document.addEventListener(event, () => {
            slashSound.currentTime = 0;
            slashSound.play().catch(() => {});
          }, { once: true });
        });
      });
      audioPlayed = true;
    }
  };

  // Play sound immediately when page loads (with the CSS animation)
  setTimeout(playSlashSound, 100);

  // Also try when animation starts as backup
  slashOverlay.addEventListener("animationstart", (e) => {
    if (e.animationName === "sword-slash") {
      playSlashSound();
    }
  });

  // Remove overlay after animation ends
  slashOverlay.addEventListener("animationend", (e) => {
    if (e.animationName === "fade-out") {
      slashOverlay.remove();
    }
  });
});
