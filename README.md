# 🖍 Painting-App-Toy-Project 🖍
> Vanilla JS 로 제작한 반응형 그림판 웹입니다 

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
변수 선언과 기본 값들 정의.
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
