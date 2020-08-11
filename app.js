const colors = document.getElementsByClassName(`jsColor`);
const canvas = document.getElementById(`jsCanvas`);
const range = document.getElementById(`jsRange`);
const clear = document.getElementById(`jsClear`);
const fill = document.getElementById(`jsFill`);
const saveBtn = document.getElementById(`jsSave`);

const canvasSizeForm = document.querySelector(`.defineCanvasSize`);
const inputWidth = canvasSizeForm.querySelector(`#jsWidth`);
const inputHeight = canvasSizeForm.querySelector(`#jsHeight`);
const sizeBtn = document.getElementById(`jsCanvasSizeBtn`);

const INITIAL_COLOR = `#1a1a1a`;
const context = canvas.getContext(`2d`);
let painting = false;
let filling = false;

context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

let widthValue = 0;
let heightValue = 0;

canvas.style.width = widthValue;
canvas.style.height = heightValue;

function canvasSetting() {
  canvas.style.width = "";
  canvas.style.height = "";

  widthValue = inputWidth.value;
  heightValue = inputHeight.value;

  context.fillStyle = `white`;
  context.fillRect(0, 0, widthValue, heightValue);

  canvas.style.width = widthValue;
  canvas.style.height = heightValue;

  canvas.width = widthValue;
  canvas.height = heightValue;
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
    context.fillRect(0, 0, widthValue, heightValue);
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

function cleanCanvas() {
  canvasSetting();
  const modifiedRangeValue = document.getElementById(`jsRange`);
  context.lineWidth = modifiedRangeValue.value;
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

if (saveBtn) {
  saveBtn.addEventListener("click", saveClick);
}
if (clear) {
  clear.addEventListener(`click`, cleanCanvas);
}

sizeBtn.addEventListener("click", canvasSetting);
