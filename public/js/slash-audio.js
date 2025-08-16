document.addEventListener("DOMContentLoaded", () => {
  const slashSound = document.getElementById("sword-sound");
  const slashOverlay = document.querySelector(".page-load-slash");

  if (!slashSound || !slashOverlay) return;

  // Enable audio on first user interaction
  let audioEnabled = false;
  const enableAudio = () => {
    if (!audioEnabled) {
      slashSound.play().then(() => {
        slashSound.pause();
        slashSound.currentTime = 0;
        audioEnabled = true;
      }).catch(() => {});
    }
  };

  // Listen for any user interaction to enable audio
  ['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, enableAudio, { once: true });
  });

  // Play the sword sound when slash animation starts
  slashOverlay.addEventListener("animationstart", (e) => {
    if (e.animationName === "sword-slash" && audioEnabled) {
      slashSound.currentTime = 0;
      slashSound.play().catch(err => console.log("Audio playback failed:", err));
    }
  });

  // Auto-trigger slash sound after a delay (for users who don't interact)
  setTimeout(() => {
    if (audioEnabled) {
      slashSound.currentTime = 0;
      slashSound.play().catch(() => {});
    }
  }, 500);

  // Remove overlay after animation ends
  slashOverlay.addEventListener("animationend", (e) => {
    if (e.animationName === "fade-out") {
      slashOverlay.remove();
    }
  });
});
