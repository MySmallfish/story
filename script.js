let current = 0;
let autoPlayTimer;
let totalScenes = 9;
let audio = document.getElementById('backgroundAudio');
let firstSceneShown = false;

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
  
  // Set a special timeout for the first scene (10 seconds)
  setTimeout(() => {
    firstSceneShown = true;
    nextScene();
    startAutoPlay();
  }, 10000); // 10 seconds for the first scene
}

// Function to automatically transition to the next scene every 10 seconds
function startAutoPlay() {
  autoPlayTimer = setInterval(() => {
    // If we've reached the last scene, stop the timer
    if (current >= totalScenes) {
      clearInterval(autoPlayTimer);
      return;
    }
    
    nextScene();
  }, 10000); // 10 seconds interval
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
  
  // If this is the first scene and we haven't shown it for 10 seconds yet, don't proceed
  if (current === 1 && !firstSceneShown) {
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
