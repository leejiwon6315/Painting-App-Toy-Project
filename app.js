const colors = document.getElementsByClassName(`jsColor`);
const canvas = document.getElementById(`jsCanvas`);
const range = document.getElementById(`jsRange`);
const clear = document.getElementById(`jsClear`);
const fill = document.getElementById(`jsFill`);
const saveBtn = document.getElementById(`jsSave`);

const context = canvas.getContext(`2d`);
let painting = false;
let filling = false;

const INITIAL_COLOR = `rgb(20, 20, 20)`;
const CANVAS_WIDTH = canvas.offsetWidth;
const CANVAS_HEIGHT = canvas.offsetHeight;

context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

function setting() {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  context.fillStyle = `white`;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseLeave() {
  stopPainting();
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function handleColorClick() {
  const color = event.target.style.backgroundColor;

  context.strokeStyle = color;
  context.fillStyle = color;
}

function handleRangeChange() {
  const colorRange = event.target.value;

  context.lineWidth = colorRange;
}

function handleClickFillMode() {
  if (filling === true) {
    filling = false;
    fill.innerText = `Paint`;
  } else {
    filling = true;
    fill.innerText = `Brush`;
  }
}

function handleCanvasClick() {
  if (filling) {
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function saveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement(`a`);

  link.href = image;
  link.download = `Paint JS by JIREH's Canvas`;
  link.click();
}

function blockRightClick() {
  event.preventDefault();

  alert(`저장을 원하시면 SAVE 버튼을 눌러주세요`);
}

if (colors) {
  Array.from(colors).forEach((eachColor) =>
    eachColor.addEventListener(`click`, handleColorClick)
  );
}

if (canvas) {
  canvas.addEventListener(`mousemove`, onMouseMove);
  canvas.addEventListener(`mousedown`, startPainting);
  canvas.addEventListener(`mouseup`, stopPainting);
  canvas.addEventListener(`click`, handleCanvasClick);
  canvas.addEventListener(`contextmenu`, blockRightClick);
}

if (range) {
  range.addEventListener(`input`, handleRangeChange);
}

if (fill) {
  fill.addEventListener(`click`, handleClickFillMode);
}

if (clear) {
  clear.addEventListener(`click`, setting);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveClick);
}

setting();
window.addEventListener(`resize`, setting);
