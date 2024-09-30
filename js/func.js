//以下程式碼為繪製貝茲曲線部分

//畫布初始化
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
let h = canvas.height = window.innerHeight;
let w = canvas.width = window.innerWidth;

var prePosition = [];//紀錄前一座標

window.addEventListener("mouseup", (event) => {
  var dots = document.querySelectorAll(".dot");
  var position = getPosition(dots);

  //取得點中心座標
  function getPosition(e) {
    let posArray = [];
    for (let index = 0; index < e.length; index++) {
      var x = 0;
      var y = 0;
      x += e[index].offsetLeft - e[index].scrollLeft + e[index].clientLeft + 8;
      y += e[index].offsetTop - e[index].scrollLeft + e[index].clientTop + 8;
      id = e[index].id;
      e[index] = e[index].offsetParent;
      posArray.push({ id: id, x: x, y: y });
    }
    
    return posArray;
  }

  if(JSON.stringify(prePosition) !== JSON.stringify(position)){//判斷畫面上的點是否有改動
    prePosition = position;

    ctx.clearRect(0, 0, w, h);//清空畫布

    drawBezierCurve(position);//繪製貝茲曲線
  }
  
});

//貝茲曲線數學公式
function recursiveBezier(t, points) {
    if (points.length === 1) {
        return points[0];
    }

    const newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const x = (1 - t) * points[i].x + t * points[i + 1].x;
        const y = (1 - t) * points[i].y + t * points[i + 1].y;
        newPoints.push({ x, y });
    }

    return recursiveBezier(t, newPoints);
}

//將貝茲曲線繪製出來
function drawBezierCurve(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let t = 0; t <= 1; t += 0.001) {
        const point = recursiveBezier(t, points);
        ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
}