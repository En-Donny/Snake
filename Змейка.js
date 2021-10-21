const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");//описывает 2D игру

const ground = new Image();//класс для раборы с картинками
ground.src = "zmeicons/Змейка.png";




const foodImg=new Array();
const image1=new Image();
image1.src="zmeicons/Яблоко.png";
const image2=new Image();
image2.src="zmeicons/Вишня.png";
const image3=new Image();
image3.src="zmeicons/Банан.png";
foodImg.push(image1);
foodImg.push(image2);
foodImg.push(image3);

let a=0;





let box=32;

let score=0;





//делаем рандомные координаты для фруктов
let food={
x: Math.round((Math.random()*(18-2)+1))*box,//Math.floor - округляет до целого числа
y:Math.round((Math.random()*(18-4)+3))*box,
};



let snake=[];

snake[0]={
	x:9*box,
	y:10*box,
};

let modal=document.getElementById("modalwind");
let body=document.getElementById("body");
//обработчик события нажатия на клавиши

document.addEventListener("keydown",direction);

let dir;

function direction(event){
	if((event.keyCode==37 && dir!="right")||(event.keyCode==37 && dir!="right" && (dir!="up" || dir!="down"))){//распознавание клавиш нажатия
		dir="left";
	}
	else if(event.keyCode==40 && dir!="down"){
		dir="up";
	}
	else if(event.keyCode==39 && dir!="left"){
		dir="right";
	}
	else if(event.keyCode==38 && dir!="up"){
		dir="down";
	}
}


function fructcheck(arr, foodx,foody){
	for(let i=0;i<arr.length;++i){
		if((arr[i].x==foodx)&&(arr[i].y==foody)){
			food={
				x: Math.round((Math.random()*(18-2)+1))*box,//Math.floor - округляет до целого числа
				y:Math.round((Math.random()*(18-4)+3))*box,
			};
		}
	}
}


function eatself(head,arr){
	for(let i=0;i<arr.length;++i){
		if((head.x==arr[i].x)&&(head.y==arr[i].y)){
			
			
			clearInterval(game);
			// ctx.fillStyle="black";
			// ctx.font="40px Arial";
			// ctx.fillText("Game Over",box*6.5,box*10.5);
			
			
			body.className="modal-open";
			body.style.cssText="overflow: hidden; padding-right: 0px;";
			modal.className="modal fade show";
			modal.setAttribute("aria-modal","true");
			modal.setAttribute("role","dialog");
			modal.setAttribute("aria-hidden","false");
			modal.style.display="block";
			modal.style.zIndex="1010";
			modal.style.trtransition= "opacity .15s linear";
			let pol=document.createElement("div");

			
		}
	}
}






document.getElementById("close").addEventListener("click",closeModal);

function closeModal(){
		modal.style.display="none";
		modal.className="modal fade";
		modal.setAttribute("aria-hidden","true");
}




document.getElementById("restart").addEventListener("click",function(){
	location.reload();
});



let speed=125;
function draw(){
	ctx.drawImage(ground, 0, 0);//метод рисующий картинку в canvas
	

	ctx.drawImage(foodImg[a],food.x, food.y);	

	for(let i=0;i<snake.length;++i){

		ctx.fillStyle = i==0  ?"green" :"white";//рисует квадрат
		ctx.fillRect(snake[i].x,snake[i].y,box,box);//именно создает сам квадрат
		 

	}
	//рисуем текст
	ctx.fillStyle="white";
	ctx.font="40px Arial";
	ctx.fillText(score,box*2.5,box*1.65);
	


	let snakeX=snake[0].x;
	let snakeY=snake[0].y;
	

	





		if((snakeX==food.x) && (snakeY==food.y)){
		score++;
			
			a=Math.floor((Math.random()*3));
			food.x= Math.round((Math.random()*(18-2)+1))*box;//Math.floor - округляет до целого числа
			food.y=Math.round((Math.random()*(18-4)+3))*box;
			fructcheck(snake, food.x,food.y);

		}
		else{
			snake.pop();	
		}



		if(dir=="left"){
			snakeX-=box;
		}
		else if(dir=="right"){
			snakeX+=box;
		}

		else if(dir=="down"){
			snakeY-=box;
		}
		else if(dir=="up"){
			snakeY+=box;
		}
		

		if(snakeX<box){
			snakeX=box*17;
		}
		if(snakeX>17*box){
			snakeX=box;
		}

		if(snakeY<3*box){
			snakeY=box*17;
		}
		if(snakeY>=18*box){
			snakeY=box*3;
		}



		let newHead={
			x:snakeX,
			y:snakeY,
		}

		eatself(newHead,snake);

		snake.unshift(newHead);

	


	

	

}
let game = setInterval(draw,speed);//через каждые 10мск вызываем повторно функцию чтобы картинка была статичной
