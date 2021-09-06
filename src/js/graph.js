
/*


//BinSearch
let arr=[];



for(let i = 0; i < 1000000; i++) {
		arr.push(i);
}

const lengh = arr.length-1;
let middle = 0;
let start = 0;
let end = lengh;
const schNumber = 123451;

alert(lengh);





for(let i = 1 ;; i++) {
	
		middle = Math.round((start + end) / 2); //Получаем средний элемент

		//alert(middle);

		if(schNumber === arr[middle]) { //если нашли искомый
			alert(`Итераций: ${i}` + "\n Число найдено на позиции: " + String(middle)); 
					break;
		} else if(!middle || middle === lengh) { //если не нашли
					 alert(`Итераций: ${i}` + "\n Число не найдено!");
					 break;    
		}            
		
		if(schNumber > arr[middle]) { //если искомое число больше сдвигаем стартовую позицию
				start = middle + 1;   
		} else {                      //если меньше сдвигаем конечную позицию
				end = middle - 1;
		}
			
		
}

*/



/*let a;
let user = {
 name: "John",
 age: 30, 
};

user["like a birds"]=true;

alert(user["like a birds"]);


let s = Symbol();
let b =user.name;
alert(b);
c="name";
a= ([c] in user);
alert(a);

for(let key in user){
	alert(key);
}*/







//Short way alg
//Алгоритм дэйкстры
/*

  Проверяем каждую вершину (один раз) графа 

1. Начинаем со страртовой вершины;
2. Берем ее потомков и вычисляем их вес (вес родителя + вес ребра от родителя к потомку);
3. Обнавляем вес потомка на вычисленный если он больше вычисленного;
4. Назначаем потомку нового родителя если вес новый меньше текущего родителя (проверяемая вершина).
5. Помечаем проверенную вершину как пройденую;
6. Если есть еще не проверенные вершины, то переходим к следующей и повторяем все со следующей вершиной;
7. Иначе завершаем.
 */



/*
   Данный объект отображает совокупность всех вершин графа и содержит информацию по кждой из вершин, такую как:
1) Вершина - родитель через которую путь к данной вершине максимально короткий на данный момент;
2) Вес вершины = вес вершины родителя + вес ребра от родителя к данному потомку;
3) Статус проверки: true - проверена / false (по умолчанию) - не проверена

*/
let names = { 
	start:{ par:"", weight: Infinity, copmlite: false }, 
	a: { par:"", weight: Infinity, copmlite: false}, 
	b: { par:"", weight: Infinity, copmlite: false}, 
	c: { par:"", weight: Infinity, copmlite: false}, 
	d: { par:"", weight: Infinity, copmlite: false}, 
	e: { par:"", weight: Infinity, copmlite: false}, 
	f: { par:"", weight: Infinity, copmlite: false}, 
	end: { par:"", weight: Infinity, copmlite: false},
};



/*
Объект отображает связи (рёбра) между вершинами.
Ключевые поля отображают вершины графа, значением которых так же являются объекты, поля которых
отображают с какими вершинами связана данная вершина, значение поля подобъекта отображает вес ребра
*/
const gra = {

start: { a: 2, c: 8, b: 5, },
a: { d: 6 },
b: { c: 4, e: 3},
c: { e: 9,  b: 4, d: 11},
d: { f: 20, },
e: { f: 4},
f: { end: 3},
end: {},

};

let shortWay = function(graph, names, start) {

	let w = 0; //вес
	names[start].weight = 0; //Вес стартовой точки
	let cash = []; //сюда будем заносить вершины

	cash.push(start);

	while ( cash.length != 0 ) {		//пока в массиве есть не проверенные вершины

	//Пробегаем всех потомков вершины
	for( let grpkey in graph[cash[0]] ) { //берем первое в массиве имя вершины (текущая вершина - родитель)

		if (names[grpkey].copmlite === false ) {    //Если вершина - потомок не проверялась
				w = names[cash[0]].weight + graph[cash[0]][grpkey]; //вычисляем вес (вес вершины родителя + вес идущего от неё ребра к потомку)
				
				if( w < names[grpkey].weight ) { //Если вес меньше веса потомка (нашли более короткий путь к данной вершине потомку)

					names[grpkey].weight = w;  //Обновить вес вершины (потомка)
					names[grpkey].par = cash[0];
				}
				
				cash.push(grpkey); //Назачить родителя потомку (путь к данной вершине-потомку наиболее короткий через данного родителя)
		}    
	}
				names[cash[0]].copmlite = true;   //Помечаем вершину как пройденую (чтобы повторно ее не проверять)
				
				while(cash.length >0 && names[cash[0]].copmlite === true) { //начиная сверху удаляем из массива все пройденые вершины до первой не пройденой
					cash.shift();	
				}						

	}

};







let rect = { w: 1000, h: 500 };

let per = function(rect) {

	let cash = 0;

	//Проверяем равны b делятся ли стороны по модулю
	let res = rect.w > rect.h ? rect.w % rect.h : (	

	//Ширина должна быть больше высоты (так удобнее)
		cash = rect.w,
		rect.w = rect.h,
		rect.h = cash,
		rect.w % rect.h
	);

	if (!res) {
		return String(rect.h);
	}

	return per({w: res, h: rect.h});

}






/*
При клике на canvas рисуем кружок.
При клике на кружок, он закрасится

*/


//Объект окружность
let GraphCircle = function( cx, cy, r, name ) {
	
	this.name = name;
	this.r = r;
	this.x = cx;
	this.y = cy;
	this.color = '#fff';
	this.unselectionColor = '#fff';
	this.connections = {};	
	


	//Изменить цвет объекта
	this.changeColor = function( color ) {
		this.color = color;
		obj = this;
		graphCanvas.drawCircle( obj ); 
	};


	//Выделить цветом объект
	this.selectMe = function( color = '#9aec02' ) {
		obj = this;
		obj.color = color;
		graphCanvas.drawCircle( obj); 		
	};

	//снять выделение цветом с объекта
	this.unselectMe = function() {

		this.color = this.unselectionColor;		
		this.changeColor (this.color);
	};

	//Отрисовка объекта
	this.changeColor (this.color);
	
	
}


//Связь вершин (конструктор объекта Connection).
/*
   Создается объект Connection который хранит информацию о связи между двумя вершинами графа,
   ссылка на данный объект передается вершине от которой данная связь исходит. Тем самым в объекте 
   вершины хранится вся информация об исходящих связях
*/

let Connection = function( parent, child ) {		
	
	//снимаем выделение с вершин
	parent.unselectMe(); 
	child.unselectMe();
	
	//Если такая связь уже существует
	if( parent.connections ?.[child.name] != undefined ) {	
		
		delete this;
		console.log('Связь уже существует!');
		return null;
	}
	
	this.parent = parent;   //вершина родитель (от которой связь исходит)
	this.child = child;     //вершина потомок (к которой ведёт связь)
	this.weight = null;	    //вес ребра между вершинами (длина в пикселях)
	this.start = null;	    //координаты (x, y) стартовой точки
	this.end = null;        //координаты (x, y) конечной точки
	this.color = '#ec028a';	//цвет в который вершины окрашиваются
		
	//Добавить родителю ссылку на исходящую связь
	parent.connections[child.name] = this;
		
	//Координаты вектора (от центра первой вершины до центра второй)
	let vx = parent.x - child.x; 
	let vy = parent.y - child.y;
		
	//cos и sin для вычисления точки на окружности (костыль чтобы начертить ребро не от центра до центра)
	let len = graphCanvas.pointsDistance( parent.x, parent.y,  child.x, child.y);					
	kx = ( vx / len ).toFixed( 4 );
	ky = ( vy / len ).toFixed( 4 );

		
	//Стартовая и конечная точка ребра
	this.start = { x: parent.x - kx * parent.r, y: parent.y - ky * parent.r };
	this.end = { x: child.x + kx * child.r, y: child.y + ky * child.r };
		
	//Вес ребра (расстояние от центра до центра минус оба радиуса)
	this.weight = len - parent.r - child.r;

	//Отображаем (рисуем ребро) связь между вершинами на canvas

	if( child.connections ?. [parent.name] == undefined ) { //Если существует обратная связь, то ребро уже существуе. Просто добавляем стрелочку
		graphCanvas.drawLine( this.start, this.end ); 	
		
		graphCanvas.context.fillStyle = '#000000';		
		graphCanvas.context.fillText(
			this.weight, 
			Math.round( this.parent.x - ( vx / 2 + Math.abs(ky*17))), 
			Math.round( this.parent.y - ( vy / 2 + Math.abs(kx*10)))
		);
		console.log( `Вектор x: ${vx}, Вектор y: ${vy}` );
		
	}
		
	graphCanvas.drawCircle( { x: this.end.x, y: this.end.y, r: 8 }, '#000000' ); //пока кружочек вместо стрелочки на конце ребра		
		
	//Окрашиваем связаные вершины
	parent.changeColor( this.color );
	child.changeColor( this.color );

	console.log( `Коэфиценты: ${kx}, ${ky}` );
}

/* 
	Объект-граф.

*/

const graphCanvas = {	

	elementID: null,
	canvas: null,    //сюда передаётся ссылка на canvas
	context: null,   //сюда соответственно на context

	width: null,    //Ширина canvas px
	height: null,   //Высота canvas px
	pair: [],		//Для создания пар (связи)

	countObj: 0, //Счетчик всех объектов (вершин). Каждой новой вершине присваивается имя след. обр.: name = '_' + countObj 

	arrObj: {}, //Поле отображает все созданные вершины на графе (вершины добавляются в это поле при создании)

	//Информация о подплоскостях
	patrOfplane: { 
					stepPlane: 250,    //размер подплоскости, минимальная высота/ширина px
					tolerance: 20,     //Допуск	px
					wCountPlants:null,  //Количество подплоскостей по горизонтали
					hCountPlants: null, //Количество подплоскостей по вертикали
	}, 

	arrPlans: [], //Плоскости со ссылками на содержащиеся объекты в них



	//Нарисовать окружность
	drawCircle: function( obj, color = obj.color ) {

		this.context.beginPath();
		this.context.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2, true); // Outer circle
		this.context.fillStyle = color;
		this.context.fill();
		this.context.stroke(); 
	},


	//Нарисовать линию
	drawLine: function( begin, end ) {				
		
		context = this.context;
		context.beginPath();
    	context.moveTo( begin.x, begin.y );
    	context.lineTo( end.x, end.y );
		context.stroke();		

	},


//Проверяет попали ли мы в какой-нибудь из кругов (папали если растояние от 
//курсора до центра окружности меньше радиуса окружности).
//Если попали выделит объект и вернет на него ссылку, иначе null
//
	inObj: function( x, y, array ) {	

			for( let i = 0; i < array.length; i++ ) {			
				if( this.pointsDistance( x, y, array[i].x, array[i].y ) < array[i].r ) {					
					
					array[i].selectMe();
					return array[i];						
				}			
			}
			
			return null;	
	},



	//Инициализация объекта, получаем ID canvas для дальнейшей работы с ним
	initGraphCanvas: function( canv ) {
		this.elementID = canv;
		this.canvas = document.getElementById(this.elementID);
		this.context = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.markplan();
	},


//Получить позицию курсора по событию (событие задается в теле скрипта)
	getCursorPosition: function( canvas, event ) {
		const rect = canvas.getBoundingClientRect();
		const x = event.offsetX /* - Math.trunc( rect.left )*/;
		const y = event.offsetY /*- Math.trunc( rect.top )*/;		
		console.log( "x: " + x +", y: " + y );
		return { x, y };
	},

//Вычислить расстояние между двумя точками
	pointsDistance: function( x_1 = 0, y_1 = 0, x_2 = 0, y_2 = 0 ) {

		d = Math.pow(( x_1 - x_2 ), 2) + Math.pow(( y_1 - y_2 ), 2);
		return Math.ceil( Math.sqrt( d ));
	},


//Разметка canvas на подплоскости
	markplan: function () { 

		let sizePlan = this.patrOfplane.stepPlane + this.patrOfplane.tolerance;

		let w = this.width >= sizePlan ? Math.ceil( this.width / this.patrOfplane.stepPlane ) : 0;  //Количество частей по горизонтали
		let h = this.height >= sizePlan ? Math.ceil( this.height / this.patrOfplane.stepPlane ) : 0; //Количество частей по вертикали

		for( let i = 0; i < h; i++ ) {
			this.arrPlans.push([]);	

			for( let j = 0; j < w; j++ ) {
			this.arrPlans[i].push([])
			}

			this.patrOfplane.wCountPlants = w;
			this.patrOfplane.hCountPlants = h;

			console.log(`Плоскостей по горизонтали: ${w}; по вертикали: ${h}`);
		}	
	},
	
	//Метод определяет к какой подплоскости пренадлежит точка
	/**/


//Нарисовать объект
makeObj: function( x, y, r ) { 

		// Находим стартовую плоскость для начала проверки

		let startPlansY = y > r ? Math.floor((y - r) / this.patrOfplane.stepPlane) : 0;
		let startPlansX = x > r ? Math.floor((x - r) / this.patrOfplane.stepPlane) : 0;

		console.log(`Стартовая плоскость: ${startPlansX}, ${startPlansY}`);

		 startPlansY = ((y - r) % this.patrOfplane.stepPlane == 0) && startPlansY > 0 ? startPlansY - 1 : startPlansY;
		 startPlansX = ((x - r) % this.patrOfplane.stepPlane == 0) && startPlansX > 0 ? startPlansX - 1 : startPlansX;
		
		console.log(`Стартовая плоскость: ${startPlansX}, ${startPlansY}`);


		
		let pair = this.pair;
		
		//Проверяем попали ли мы в существующую окружность, результат добавляем в массив (поле pair)
		pair.push( this.inObj( x, y, this.arrPlans[ startPlansY ][ startPlansX ] )); 
		
		//Вычисляем длину массива
		let lenpair = this.pair.length;
		
		
		
		if( this.pair[ lenpair - 1 ] != null ) { //Если последний добавленный элемент не null			

			if( pair.length > 1 ) {

				if( pair[0] != pair[1] ) { //Если добавлено уже два элемента и они не равны, закрашиваем второй и соединяем их линией										
					
					//Создаём связь, при создании связи между выбранными объектами выделение с них снимается
					new Connection( pair[ 0 ], pair[ 1 ] );						
	
					pair.splice(0, 2);	//Пара состоялась очищаем массив		
					console.log(`Элементов в паре после очистки: ${pair.length}`)		
					
				} else {			//иначе элементы равны снимаем выделение и очищаем массив
						
					pair[ 0 ].unselectMe();
					pair[ 1 ].unselectMe();
					console.log(`Элементов в паре после очистки: ${pair.length}`)		
				}
			}		
			
		} else {

			//Очищаем массив пар
			while(pair.length > 0) {				
				if(pair[0] != null)
					pair[0].unselectMe();
				pair.shift();
			}

			//Длина пути (количество подплоскостей необходимо пройти)
			let PathLength = Math.ceil(2*r / this.patrOfplane.stepPlane);

			console.log(`PathLength: ${PathLength}`);


			//Находим путь по горизонтали и вертикали, проверяем чтобы путь был не больше оставшегося места
			let xPath = PathLength > this.patrOfplane.wCountPlants - startPlansX ? 
			this.patrOfplane.wCountPlants - startPlansX : PathLength;

			let yPath = PathLength > this.patrOfplane.hCountPlants - startPlansY ? 
			this.patrOfplane.hCountPlants - startPlansY : PathLength;


			//Находим конечные точки
			xPath += startPlansX;
			yPath +=startPlansY;

			console.log(`xPath: ${xPath}, yPath: ${yPath}`);


			let stackArr = []; //сюда будем заносить имена ближайших точек

			//Запихиваем имена элементов в очередь
			for( let i = startPlansY; i < yPath; i++ ) {

				for( j = startPlansX; j < xPath; j++ ) {
					
					for(let k = 0; k < this.arrPlans[i][j].length; k++ ) {
						stackArr.push(this.arrPlans[i][j][k]);
					}				
				}
			}

			//Проверяем расстояния между ближайшими точками (центрами)
			let flag = true;

			while(stackArr.length > 0) {
				//вычисляем расстояние между точками (центрами)
				let dist =	this.pointsDistance( x, y, stackArr[0].x, stackArr[0].y );

				//Если дистанция меньше чем сумма радиусов, значит место не подходит, покидаем цикл
				if ( dist < stackArr[0].r + r ) {				
					
					flag = false;
					console.log("сумма радиусов: " + (stackArr[0].r + r) + ", dist: " + dist);
					break;
				}
					stackArr.shift(); //удаляем проверенный из очереди
			}			

			//Тут нужно отрисовать объект

			if( flag ) {			
				

					//Получаем новое имя для объекта и добавляем еденичку к счетчику			
					let name = '_' + String( this.countObj++ ); 

					//Добавляем элемент в поле и он отрисовывается
					let newObj = this.arrObj[name] = new GraphCircle( x, y, r, name);
					

					//Добавляем ссылку на объект в занимаемые подплоскости
					for( let i = startPlansY; i < yPath; i++ ) {

						for( j = startPlansX; j < xPath; j++ ) {				
						
							this.arrPlans[i][j].push(newObj);
						}
					}
			}	

				console.log(`Всего объектов: ${this.countObj}`);
		}

	},


};


graphCanvas.initGraphCanvas('stockGraph');

//Слушаем клик по canvas
/*graphCanvas.canvas.addEventListener('click', function(e) {
	let ccc = graphCanvas.getCursorPosition(graphCanvas.canvas, e);
	graphCanvas.makeObj(ccc.x, ccc.y, 20);	
});*/


/*

graphCanvas.drawLine({
	
		x: 0,
		y:240,
}, 

{
		x: 640,
		y: 240,
});

graphCanvas.drawLine({
	
	x: 320,
	y:0,
}, 

{
	x: 320,
	y: 480,
});*/

//===========================================================
/*

let Ox = 320;
let Oy = 240;

let gr = function( beginX, endX ) {				
	
	context = graphCanvas.context;
	context.moveTo( Ox, Oy );
	context.beginPath();
	

	let step = 8 * Math.PI / 200; 
	
	let y = 0;
	let ampl = 50;


	
	for(let x = beginX; x <= endX; x++) {
		
		console.log(y);
		context.lineTo( Ox + x, Oy + ampl*Math.sin(y));
		//context.arc( 15*x, Oy + 100*Math.sin(x/Math.PI), 4, 0, Math.PI*2);	
		y = y + step;
		
		
	}
	
	context.stroke();		
}

gr(0, 200);
*/
//===========================================================================



//======================================================================
/*

let a = 0.7;
let b = 0.3;


let x;
let y;

let w = 0;

let xr = 400;
let yr = 200;

let subx = 300;
let suby = 300;


let cyka = 20;
let eblan = 0.7;

//requestAnimationFrame(tick);

function tick() {

	requestAnimationFrame(tick);

	a = a + 0.06;
	b = b + 0.05;
	w = w + 0.01;


	subx = 320 + 90 * Math.cos(w);
	suby = 240 + 90 * Math.sin(w);

	//if(a > 1000) {
		
		//a = 0;
	//}

	graphCanvas.context.clearRect(0, 0, 640, 480);

	
	for( let i = 0; i < 10; i++ ) {

		x = subx +  40 * Math.cos(a);
		y = suby +  40 * Math.sin(a);
	
		graphCanvas.context.beginPath();
		graphCanvas.context.arc( x, y, 10, 0, 2 * Math.PI );		
		graphCanvas.context.stroke();	



		sin = Math.cos(b);
		cos = Math.sin(b);

		x = 200 + 40 * cos;
		y = 200 + 40 * sin;
	
		graphCanvas.context.beginPath();
		graphCanvas.context.arc( x, y, 10, 0, 2 * Math.PI );		
		graphCanvas.context.stroke();

		

		a = a + 0.7;
		b = b + 0.7;
	
	}


	if( graphCanvas.pair[0] != null ) {
		graphCanvas.pair[0].r = cyka;
		graphCanvas.drawCircle(graphCanvas.pair[0]);
	}
		
		for(key in graphCanvas.arrObj)
		{ 
			graphCanvas.drawCircle(graphCanvas.arrObj[key])
		}
	
	cyka = cyka + eblan;

	if( cyka > 25 ) {
		eblan = eblan * (-1);
	}

	if( cyka < 10 ) {
		eblan = eblan * (-1);
	}

	

}
*/
//========================================================================================


////Балавство с canvas

function animate({drawAxis, drawSin, drawRotateLine, drawUpDownLine, context}) {	
	
	//Координаты центра осей
	Ox = 320; 
	Oy = 240;	
	rotateSpeedRad = Math.PI/90; //скорость в радианах
	y = 0;
	x = 0;
	amplR = 80; //амплитуда - радиус
	progress = 0; //смещение в радианах
	context = context; //Контекст canvas

	requestAnimationFrame(function animate() {
		context.clearRect(0, 0, 640, 480);			
		//console.log(tick);			

		//Отрисовка анимации
		/*
			drawRotateLine() рисует вращающуся линию и передает координаты (+ context)
			своей крайней точки в функцию drawUpDownLine(), которая рисует линию начиная
			от переданных ей координат до оси y паралельно оси x и далее передает ссылку
			на context в функцию drawSin(), та в свою очередь отрисовывает синусоиду со 
			смещением на progress радиан синхронизируясь тем самым с вращающейся линией.
		*/

		//Отрисовка осей

		
		drawAxis(context);

		drawSin(drawUpDownLine(drawRotateLine(context)));			

		progress = progress + (-1)*rotateSpeedRad;	//Умножаем на -1 чтобы изменить направление вращения	
		y = amplR*Math.sin(progress);
		x = amplR*Math.cos(progress);
		amplR = amplR + Math.sin(progress);		
		requestAnimationFrame(animate);
		
	});
}



animate({
	drawAxis: function(context) {
		//Оси x, y
		context.beginPath();
		context.moveTo(Ox, 0);
		context.lineTo(Ox, Oy*2);
		context.stroke();

		context.beginPath();
		context.moveTo(0, Oy);
		context.lineTo(Ox*2, Oy);
		context.stroke();

		//Окружнось
		context.beginPath();
		context.arc(Ox-amplR, Oy, amplR, 0, Math.PI*2);
		context.stroke();
	},
	drawSin: function(context){	
		
		
		//options.context.beginPath();		
		let sinY = 0;
		context.beginPath();
		for(let i = 0; i < 180; i++) {
			context.lineTo(Ox + i, Oy +  amplR * Math.sin(sinY + progress));
			sinY = sinY + 0.10;
		}
		context.stroke();
	}, 
	drawRotateLine: function(context){

		let Cx = Ox - amplR; //Смещаем центр вращения по x на величину радиуса
		let toX = Cx + x;    //координата x конца вращающейся линии
		let toY = Oy + y;    //Координата y конца вращающейся линии
		context.beginPath();
		context.moveTo(Cx, Oy);
		context.lineTo(toX, toY)		
		context.stroke();		

		return {toX, toY, context}
	}, 
	drawUpDownLine: function(start){
		start.context.beginPath();			
		start.context.moveTo(start.toX, start.toY);
		start.context.lineTo(Ox, start.toY)
		start.context.stroke();

		return start.context;
	}, 
	context: graphCanvas.context
});

