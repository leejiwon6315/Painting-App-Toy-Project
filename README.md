# 🖍 Painting-App-Toy-Project 🖍
> Vanilla JS 로 제작한 반응형 그림판 웹입니다. <br/>
> 출처: 노마드코더 강의 활용

### 캔버스 크기 입력 전(웹 실행 시)<br/>
<img width="306" alt="app_size1" src="https://user-images.githubusercontent.com/60544994/90227861-366bb600-de50-11ea-9e2b-b12faa5fdc77.png"></img>
<img src="https://user-images.githubusercontent.com/60544994/90227695-f4427480-de4f-11ea-9da5-6443896892bd.png" width="504px" height="315px" title="painting_web_img" alt="painting_web_screenshot"></img>
<br/><br/>
### 캔버스 크기 입력 후<br/>
<img width="306" alt="app_size2" src="https://user-images.githubusercontent.com/60544994/90228078-92ced580-de50-11ea-9011-adc7527d9224.png"></img>
<img width="504" alt="websize_2" src="https://user-images.githubusercontent.com/60544994/90228081-94989900-de50-11ea-83ef-88c11aa93031.png">
<br/><br/>

javascript 만을 이용하여 제작한 그림판을 구현해 보았습니다.
<br/>
### 구현한 javascript code
```
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
```
변수 선언과 기본 값들 정의.<br/>
기본 캔버스의 사이즈를 0으로 설정하여 사용자가 값을 입력하기 전에는 캔버스가 보이지 않도록 하였습니다. <br/>
<br/><br/>
```
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
```
캔버스 세팅과 기본 값들을 초기화하는 함수.
<br/><br/>
```
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
```
마우스가 캔버스 위에서 이벤트를 발생시켰을 때, 상황에 따라 그림을 그리거나 그림 그리는 것을 멈추게 하는 함수들 입니다.<br/>
마우스가 움직일 때 포인터의 위치를 offsetX , offsetY 로 가져와 path(보이지 않는) 를 생성합니다<br/>
클릭이 발생한 시점에 paiting 을 true 로 변경하여 라인을 그리도록 구현하였습니다.
<br/><br/>

```
function handleColorClick() {
  const color = event.target.style.backgroundColor;

  context.strokeStyle = color;
  context.fillStyle = color;
}
```
팔레트에 해당하는 색을 클릭했을 때, 페인트(fillStyle)와 브러쉬(strokeStyle)의 색상을 변경하는 함수입니다.<br/>
버튼이 클릭됐을 때, 클릭된 버튼의 배경색을 색상 변수에 넣어 사용합니다.
<br/><br/>
```
function handleRangeChange() {
  const colorRange = event.target.value;

  context.lineWidth = colorRange;
}
```
input의 value로 브러쉬의 크기를 조절하는 함수입니다.
<br/><br/>
```
function handleClickFillMode() {
  if (filling === true) {
    filling = false;
    fill.innerText = `Paint`;
  } else {
    filling = true;
    fill.innerText = `Brush`;
  }
}
```
Paint 버튼 클릭 시 브러쉬에서 페인트통으로 전환하는 함수입니다. 
<br/><br/>
```
function handleCanvasClick() {
  if (filling) {
    context.fillRect(0, 0, widthValue, heightValue);
  }
}
```
페인트통으로 설정 되었을 때 배경을 클릭하면, 색이 칠해지도록 하는 함수 입니다.<br/>
fillRect에 사용자가 입력한 배경 사이즈 값을 적용하여 색상이 입혀집니다.
<br/><br/>
```
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
```
저장을 하는 Save 버튼의 saveClick 함수와, 마우스 오른쪽으로 저장하는 것을 방지하기 위한 blockRightClick 함수 입니다.<br/>
기본적으로 png 파일로 저장이 가능하고, Paint JS by JIREH's Canvas 라는 파일명으로 저장됩니다.<br/>
*JIREH : 작성자 본인의 아티스트, 디자이너 시절 활동명
<br/><br/>
```
function cleanCanvas() {
  canvasSetting();
  const modifiedRangeValue = document.getElementById(`jsRange`);
  context.lineWidth = modifiedRangeValue.value;
}	
```
Clean 버튼 클릭시 기존 사용자 세팅값으로 재설정 하고 브러쉬 크기를 초기화 시킵니다.
<br/><br/>
```
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
```
버튼 클릭 시 발생하는 이벤트들의 정의입니다.
<br/><br/>
### 제작한 웹으로 그린 그림<br/>
<img width="800" alt="스크린샷 2020-08-14 오후 5 42 45" src="https://user-images.githubusercontent.com/60544994/90231108-9c0e7100-de55-11ea-96f2-1d8d1c75d3b1.png"></img>


