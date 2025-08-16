document.addEventListener("DOMContentLoaded", () => {
  const slashSound = document.getElementById("sword-sound");
  const slashOverlay = document.querySelector(".page-load-slash");

  if (!slashSound || !slashOverlay) return;

  // Play the sword sound when animation starts
  slashOverlay.addEventListener("animationstart", (e) => {
    if (e.animationName === "sword-slash") {
      slashSound.currentTime = 0;
      slashSound.play().catch(err => console.log("Autoplay blocked:", err));
    }
  });

  // Remove overlay after animation ends (to free up performance)
  slashOverlay.addEventListener("animationend", (e) => {
    if (e.animationName === "fade-out") {
      slashOverlay.remove();
    }
  });
});
