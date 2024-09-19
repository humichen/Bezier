//以下程式為建立「點」部分

//建立一個物件儲存滑鼠目前的x,y座標
let mouse = {
  x: 0,
  y: 0,
};
//建立一變數儲存建立的點的次數
var count = 0;
//建立一矩陣紀錄點的id
let dotIDArray = [];

//加入監聽器
window.addEventListener("mousedown", (event) => {
  //在這裡把滑鼠座標寫到物件mouse中
  mouse.x = event.pageX;
  mouse.y = event.pageY;

  // 將點設定成可移動
  for (let i = 0; i < dotIDArray.length; i++) {
    let startX = 0;
    let startY = 0;
   
    //決定邊界範圍
    let dropArea = document.querySelector("article");
    let area = {
      left: dropArea.offsetLeft,
      right:
        dropArea.offsetLeft + dropArea.offsetWidth - dotIDArray[i].offsetWidth,
      top: dropArea.offsetTop,
      bottom:
        dropArea.offsetTop + dropArea.offsetHeight - dotIDArray[i].offsetHeight,
    };

    dotIDArray[i].addEventListener("mousedown", dragStart);
    function dragStart(e) {
      e.preventDefault();
      //記錄點擊相對被點擊物件的座標
      startX = e.clientX - dotIDArray[i].offsetLeft;
      startY = e.clientY - dotIDArray[i].offsetTop;
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", stop);
    }
    function move(e) {
      //計算出拖曳物件最左上角座標
      x = e.clientX - startX;
      y = e.clientY - startY;
      //讓座標不超出視窗範圍
      x = Math.max(Math.min(x, area.right), area.left);
      y = Math.max(Math.min(y, area.bottom), area.top);
      dotIDArray[i].style = `margin: ${y}px 0 0 ${x}px`;
    }
    function stop() {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    }
  }
});

//一個繪製的function
const draw = () => {
  var dot = document.createElement("div"); //建立一個點
  dot.setAttribute("id", `dot${count}`); //設定點的id編號
  dot.setAttribute("class", "dot"); //設定點的css style類別
  dot.setAttribute("style", `margin: ${mouse.y - 8}px 0 0 ${mouse.x - 8}px`); //設定點的座標

  document.querySelector("article").appendChild(dot); //將點加入到article標籤之下，使點可以成功顯示在畫面中

  dotIDArray.push(document.querySelector(`#dot${count}`));//將id新增到矩陣

  count++; //紀錄新增了一個點
};

//當滑鼠方放開時呼叫draw函式
window.addEventListener("mouseup", (event) => {
  if (count < 4) {
    draw();
  }
});
