//

//畫布初始化
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let h = (canvas.height = window.innerHeight - 100);
let w = (canvas.width = window.innerWidth);

//取得頁面上的元件
var add = document.querySelector("#add");
var reduce = document.querySelector("#reduce");
var levelNum = document.querySelector("#levelNum");
var version = document.querySelector("#version");

var maxLevel = 1; //紀錄level層級的變數
var multi = false; //紀錄現在是哪種version的變數

// 設定初始參數並繪製樹
const initialstartX = w / 2;
const initialstartY = h - 100;
const initialLength = 200;
const initialAngle = 90;
const w1 = 3;

//紀錄level5隻座標
var prePos = {
  x: 0,
  y: 0,
};

// 繪製初始樹枝
drawTree();

// 繪製樹枝函式
function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //畫之前先清空畫布
  drawBranch(ctx, initialstartX, initialstartY, initialLength, initialAngle, 1);
}

//樹枝公式
function drawBranch(ctx, startX, startY, length, angle, lev, e) {
  if (lev > maxLevel) return; //停止點

  // 計算終點座標
  const endX = startX + length * Math.cos((angle * Math.PI) / 180);
  const endY = startY - length * Math.sin((angle * Math.PI) / 180);

  // 設定顏色
  const r = 55 + 40 * (lev - 1);
  const g = 155 + 20 * (lev - 1);
  const b = 255;
  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

  // 繪製分支（樹枝只繪制到level 5）
  if (lev < 6){
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  if (lev === 5) {
    //記錄第五層級的座標
    prePos.x = endX;
    prePos.y = endY;
  } else if (lev === 6) {
    //繪製大圓
    ctx.beginPath();
    ctx.arc(prePos.x, prePos.y, 7, 0, 2 * Math.PI); // 直徑14px，半徑7px
    ctx.lineWidth = w1; //設定線寬
    ctx.strokeStyle = `rgb(255, 166, 190)`; //設定線顏色
    ctx.stroke();
  } else if (lev === 7) {
    for (let i = 0; i < 6; i++) {
      //利用大圓計算各個小圓的中心點座標
      const petalAngle = angle + i * 60 + 30;
      const petalX = prePos.x + 7 * Math.cos((petalAngle * Math.PI) / 180); // 大圓半徑7px
      const petalY = prePos.y - 7 * Math.sin((petalAngle * Math.PI) / 180);
      //繪製小圓
      ctx.beginPath();
      ctx.arc(petalX, petalY, 3.5, 0, 2 * Math.PI); // 直徑7px，半徑3.5px
      ctx.lineWidth = w1 - 2; // 設定線寬
      ctx.strokeStyle = `rgb(255, 186, 230)`;//設定線顏色
      ctx.stroke();
    }
  } else if (lev === 8){
    //繪製大星星
    drawStar(ctx, initialstartX, initialstartY, 5, 50, 25);
    //繪製小星星
    for (let i = 0; i < 5; i++) {
      const angle = i * 72 - 90;
      const smallStarX = initialstartX + 40 * Math.cos(angle * Math.PI / 180);
      const smallStarY = initialstartY - 40 * Math.sin(angle * Math.PI / 180);
      drawStar(ctx, smallStarX, smallStarY, 5, 5, 2.5);
    }
  }
  //繪製下一層級
  const newLength = length * 0.5;
  drawBranch(ctx, endX, endY, newLength, angle - 60, lev + 1, e);
  drawBranch(ctx, endX, endY, newLength, angle + 60, lev + 1, e);
}

//星星公式
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.strokeStyle = 'yellow';
  ctx.stroke();
  ctx.fillStyle = 'yellow';
  ctx.fill();
}

//點擊增加level按鈕
add.addEventListener("mousedown", (event) => {
  add.style = "transform: scale(90%)"; //UI:滑鼠點下時按鈕縮小
});
add.addEventListener("mouseup", (event) => {
  add.style = "transform: scale(100%)"; //UI:滑鼠放開時按鈕回覆原始大小
  if (maxLevel < 8) {
    maxLevel++;
    drawTree(); //呼叫畫樹枝函數
    levelNum.innerHTML = maxLevel; //UI:更改畫面上的level數值
  }
});

//點擊減少level按鈕
reduce.addEventListener("mousedown", (event) => {
  reduce.style = "transform: scale(90%)"; //UI:滑鼠點下時按鈕縮小
});
reduce.addEventListener("mouseup", (event) => {
  reduce.style = "transform: scale(100%)"; //UI:滑鼠放開時按鈕回覆原始大小
  if (maxLevel > 1) {
    maxLevel--;
    drawTree(); //呼叫畫樹枝函數
    levelNum.innerHTML = maxLevel; //UI:更改畫面上的level數值
  }
});

//點擊version按鈕
version.addEventListener("mousedown", (event) => {
  version.style = "transform: scale(90%)"; //UI:滑鼠點下時按鈕縮小
});
version.addEventListener("mouseup", (event) => {
  version.style = "transform: scale(100%)"; //UI:滑鼠放開時按鈕回覆原始大小
  if (multi) {
    multi = !multi;
    version.innerHTML = "Single"; //UI:更改畫面上的version文字
  } else {
    multi = !multi;
    version.innerHTML = "Multi"; //UI:更改畫面上的version文字
  }
});
