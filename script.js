
let current = 1;
function nextScene() {
  const curr = document.getElementById(`scene${current}`);
  if (curr) curr.classList.remove('active');
  current++;
  const next = document.getElementById(`scene${current}`);
  if (next) next.classList.add('active');
}
