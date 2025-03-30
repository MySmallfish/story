let current = 0;
let autoPlayTimer;
let totalScenes = 9;
let audio = document.getElementById('backgroundAudio');

// Start the story when the start button is clicked
function startStory() {
  // Hide the intro screen
  document.getElementById('intro').style.display = 'none';
  
  // Play background audio
  audio.play()
    .catch(error => {
      console.error("Audio playback failed:", error);
    });
  
  // Start the automatic scene transitions
  nextScene();
  startAutoPlay();
}

// Function to automatically transition to the next scene every 5 seconds
function startAutoPlay() {
  autoPlayTimer = setInterval(() => {
    // If we've reached the last scene, stop the timer
    if (current >= totalScenes) {
      clearInterval(autoPlayTimer);
      return;
    }
    
    nextScene();
  }, 5000); // 5 seconds interval
}

// Function to transition to the next scene with animation
function nextScene() {
  const curr = document.getElementById(`scene${current}`);
  const next = document.getElementById(`scene${current + 1}`);
  
  // If we're at the intro or no current scene, just show the first scene
  if (current === 0) {
    current++;
    const firstScene = document.getElementById(`scene${current}`);
    firstScene.classList.add('active');
    return;
  }
  
  // If we've reached the end, do nothing
  if (!next) {
    return;
  }
  
  // Start transition animation
  if (curr) {
    curr.classList.add('transition-out');
    
    // After the current scene starts fading out, start fading in the next scene
    setTimeout(() => {
      curr.classList.remove('active', 'transition-out');
      next.classList.add('active', 'transition-in');
      
      // After the transition is complete, remove the transition class
      setTimeout(() => {
        next.classList.remove('transition-in');
      }, 1000);
      
      current++;
    }, 900); // Slightly less than the animation duration to create a smooth overlap
  }
}
