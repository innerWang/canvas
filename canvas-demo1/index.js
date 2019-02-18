var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas);
listenToMouse(canvas);

var eraserEnable = false;
var eraser = document.querySelector('.actions .eraser');
var brush = document.querySelector('.actions .brush');

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




function listenToMouse(canvas){
	var lastPoint = {'x':0,'y':0};
	var using = false;
	canvas.onmousedown = function(event){
		var x = event.clientX;
		var y = event.clientY;
		using = true
		if(eraserEnable){
			context.clearRect(x-5, y-5, 10, 10);
		}else{
			lastPoint = {'x':x,'y':y};
		}
	}


	canvas.onmousemove = function(event){
		var x = event.clientX;
		var y = event.clientY;
		if(!using) return;

		if(eraserEnable){
			context.clearRect(x-5, y-5, 10, 10);
		}else{
			drawPath(lastPoint.x,lastPoint.y,x,y);
			lastPoint = {'x':x,'y':y};
		}
		
	}

	canvas.onmouseup = function(event){
		using = false;
		lastPoint = {'x':event.clientX,'y':event.clientY};
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







