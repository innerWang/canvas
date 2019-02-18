var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas);
listenToMouse(canvas);

context.fillStyle = '#fff';
context.fillRect(0, 0, canvas.width, canvas.height);
/*actions */
var eraserEnable = false;
var eraser = $('.actions .eraser');
var brush = $('.actions .brush');

eraser.addEventListener('click',function(){
	eraserEnable = true;
	eraser.classList.add('active')
	brush.classList.remove('active')
})

brush.addEventListener('click',function(){
	eraserEnable = false;
	brush.classList.add('active')
	eraser.classList.remove('active')
})

$('#clear').onclick = function(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

$('#save').onclick = function(){
	var url = canvas.toDataURL("image/png")
	var a= document.createElement('a')
	a.href = url
	a.download = '图片'
	a.target = '_blank'
	a.click()
}


/*颜色选择*/

var colors= $('.colors')
colors.addEventListener('click',function(e){
	//e.stopPropagation();
	var target = e.target 
	if(target.nodeName.toLowerCase() ==='li'){
		context.strokeStyle = target.dataset.color
	}

	[].forEach.call(target.parentElement.children,function(ele){
    ele.classList.remove('active')
  })
	target.classList.add('active');
})



/*监听动作*/
function listenToMouse(canvas){
	var lastPoint = {'x':0,'y':0};
	var using = false;

	//特性检测
	if(document.documentElement.ontouchstart !== undefined){
		//触屏设备
		canvas.ontouchstart = function(event){
			var x= event.touches[0].clientX
			var y= event.touches[0].clientY
			using = true
			if(eraserEnable){
				context.clearRect(x-10, y-10, 20, 20);
			}else{
				lastPoint = {'x':x,'y':y};
			}
		}


		canvas.ontouchmove = function(event){
			var x = event.touches[0].clientX
			var y = event.touches[0].clientY
			if(!using) return;

			if(eraserEnable){
				context.clearRect(x-10, y-10, 20, 20);
			}else{
				drawPath(lastPoint.x,lastPoint.y,x,y);
				lastPoint = {'x':x,'y':y};
			}
		}

		canvas.ontouchend = function(event){
			using = false;
		}

	}else{
		//非触屏设备
		canvas.onmousedown = function(event){
			var x = event.clientX;
			var y = event.clientY;
			using = true
			if(eraserEnable){
				context.clearRect(x-10, y-10, 20, 20);
			}else{
				lastPoint = {'x':x,'y':y};
			}
		}

		canvas.onmousemove = function(event){
			var x = event.clientX;
			var y = event.clientY;
			if(!using) return;

			if(eraserEnable){
				context.clearRect(x-10, y-10, 20, 20);
			}else{
				drawPath(lastPoint.x,lastPoint.y,x,y);
				lastPoint = {'x':x,'y':y};
			}
			
		}

		canvas.onmouseup = function(event){
			using = false;
		}
	}
	
}


function drawCircle(x,y,radius){
	context.beginPath();
	context.arc(x,y,radius,0,Math.PI*2);
	context.fill();
}

function drawPath(x1,y1,x2,y2){
	context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = 5;
  context.lineTo(x2, y2);
  context.closePath();
 	context.stroke();
}

function autoSetCanvasSize(canvas){
	setCanvasSize()
	window.onresize =function(){
		setCanvasSize();
	}

	function setCanvasSize(){
		//获取页面宽高
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight;
	}
}


function $(selector){
	return document.querySelector(selector)
}

function $$(selector){
	return document.querySelectorAll(selector)
}






