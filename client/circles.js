let totalWords = wordCountData.reduce((a, b) => a + b, 0);
let percentages = wordCountData.map(value => {
  return value / totalWords;
});
const container = document.getElementById("circles");
let viewWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);

let index = 0;
let randomNumber = Math.floor(Math.random() * wordCountData.length + 0);

// A messy way to demo updating data
function updateData() {
  index++;
  if (index > 10) {
    index = 0;
    randomNumber = Math.floor(Math.random() * wordCountData.length + 0);
  }
  wordCountData[randomNumber] = wordCountData[randomNumber] + 1;
  totalWords = wordCountData.reduce((a, b) => a + b, 0);
  percentages = wordCountData.map(value => {
    return value / totalWords;
  });
  updateCircles();
}

const init = () => {
  // Create circles
  percentages.forEach((item, index) => {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    styleCircle(circle, item, index);
    container.appendChild(circle);
  });

  // For the mock demo thingy
  window.setInterval(function() {
    updateData();
  }, 500);
};

function getColor(percentage) {
  if (percentage >= 0.3) {
    return "hotpink";
  } else if (percentage >= 0.2) {
    return "gold";
  } else {
    return "skyblue";
  }
}

function updateCircles() {
  percentages.forEach((item, index) => {
    const circle = document.getElementsByClassName("circle")[index];
    styleCircle(circle, item, index);
  });
}

function handleResize() {
  viewWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  updateCircles();
}

// Update circle styles and content
function styleCircle(circle, percentage, index) {
  circle.innerHTML = Math.round(wordCountData[index]);
  const radius = percentage * (viewWidth - 200);
  circle.style.backgroundColor = getColor(percentage);
  circle.style.width = radius + "px";
  circle.style.height = radius + "px";
}

window.onresize = handleResize;
