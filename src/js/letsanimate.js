
/* Константы */
const //Имена координат базис-векторов
	A = 0, B = 2, Tx = 4,
	C = 1, D = 3, Ty = 5,
	
	//Вспомогательные константы
	ZERO = 0,	
	ONE = 1,
	X = 0,
	Y = 1,
	OPAC = 6,	//OPACity	
	PI = Math.PI;
	defaultArray = [ONE, ZERO, ZERO, ONE, ZERO, ZERO, ZERO];


class startMatrix{

	constructor( matrix = defaultArray){
		this[0] = matrix[A];
		this[1] = matrix[C];
		this[2] = matrix[B];
		this[3] = matrix[D];
		this[4] = matrix[Tx];
		this[5] = matrix[Ty];
		this[6] = matrix[OPAC];	
	}
	
	modified(){
		return [ 
			this[0], this[1], 
			this[2], this[3], 
			this[4], this[5], 
			this[6] 
		];
	}	
}

class AnimationUnit {
	constructor (		
		animations = [], 
		sMatrix = defaultArray 
		){
		
		if(animations.length == 0){
			console.log("AnimationUnit: no animations!");			
		} else {
			this.aMatrix = calculationTransform(animations, sMatrix);
		}
	}

 /*Перемножение матриц*/
 	mixingTransforms(transforms = []){		

		console.log(`mixingTransforms recursion: ${transforms.length}`);
		
		if(transforms.length > 0){

			let trans = transforms.pop();
			this.mixingTransforms(transforms);			
			this.multMatrix(trans[0], trans[1]);						 
		}
		if(transforms.length == 0){
			console.log('mixingTransforms recursion: underworld :)'); 
		}
		
		
	} 
	
	//Путем умножения матриц смешивает анимации
	multMatrix(		
		  b, 				 //анимация для смешивания с анимацией объекта
		  startpoints = 0    //номер позиции анимации объекта с которого нужно начать смешивание анимаций
		){
			let a = this.aMatrix		
		
			let aa = null, 
				ac = null, 
				ab = null, 
				ad = null;
		
			for(let bcount = 0, acount = startpoints; bcount < b.length; acount++, bcount++){		
				
				aa = b[bcount][A] * a[acount][A] + b[bcount][C] * a[acount][B];
				ac = b[bcount][A] * a[acount][C] + b[bcount][C] * a[acount][D];
				ab = b[bcount][B] * a[acount][A] + b[bcount][D] * a[acount][B];
				ad = b[bcount][B] * a[acount][C] + b[bcount][D] * a[acount][D];

				a[acount][A] = aa;
				a[acount][C] = ac;
				a[acount][B] = ab;
				a[acount][D] = ad;			
				
			}
			console.log('matrixmult: finished');
	}

 /*Функция отрисовки*/

	letsAnimate(targetObject, pauses = []){	
		

		let aMatrix = this.aMatrix;
		let finish = aMatrix.length;		
		let frame = 0;	
		let pauseTrigger = false;
		let pauseDuration = 0;		
		
		
		requestAnimationFrame(function animate() {        		

			
			if(pauses.length != 0){
				
				if(frame == pauses[ZERO][ZERO] && pauseTrigger == false){
					pauseTrigger = true;			
				}
			}		
				
			targetObject.style.transform = `matrix(
				${aMatrix[frame][A]}, 
				${aMatrix[frame][C]}, 
				${aMatrix[frame][B]}, 
				${aMatrix[frame][D]}, 
				${aMatrix[frame][Tx]}, 
				${aMatrix[frame][Ty]})`;
				targetObject.style.opacity = +aMatrix[frame][OPAC];	
				 		
			
			
			if(pauseTrigger == false){
				frame++;
			} else {			
				if(pauses[ZERO][1] == pauseDuration){				
					pauseTrigger = false;
					pauseDuration = 0;					
					pauses.shift();				
				} else {								
					pauseDuration++; 
				}				
			}		  

			if(frame < finish) { 
				requestAnimationFrame(animate);				
			}
		});
	}

	/*Добавляет паузу в конец или задержку в начало*/
	pauseDalay(operation, frames){

		let messages = '';
		
		switch(operation){
			case 'pause':	
				for(let i = 0; i < frames; i++){
					this.aMatrix.push(
						this.aMatrix[this.aMatrix.length - 1]
					);			
				}
				messages = 'ОК!'
			break;
			case 'delay':
				for(let i = 0; i < frames; i++){
					this.aMatrix.unshift(
						this.aMatrix[ZERO]
					);			
				}
				messages = 'ОК!'
			break;
			default:
				messages = 'BAD!'
	
		}
		console.log(`pauseDalay: ${operation} => ${messages}`);	
	}
}



//Класс для элементов которые нужно анимировать
class TargetObjects{
	constructor(objects = [], animUnit, event =''){
		this.tObjects = objects;
		this.tAnimation = animUnit;

		for(let i = 0; i < objects.length; i++){

			objects[i].style.transform = `matrix(
					${animUnit.aMatrix[ZERO][A]}, 
					${animUnit.aMatrix[ZERO][C]}, 
					${animUnit.aMatrix[ZERO][B]}, 
					${animUnit.aMatrix[ZERO][D]}, 
					${animUnit.aMatrix[ZERO][Tx]}, 
					${animUnit.aMatrix[ZERO][Ty]})`;
					objects[i].style.opacity = +animUnit.aMatrix[ZERO][OPAC];

		}
	}

	letsAnimate(pauses = []){		
		for(let i = 0; i < this.tObjects.length; i++)		
		this.tAnimation.letsAnimate(this.tObjects[i] ,pauses)
	}

	addElements(elements){		
		this.tObjects = this.tObjects.concat(elements);	
	}
}

	/*ФУНКЦИИ*/

//Найти элемент по id
function getEl(elementId){
	return document.getElementById(elementId);
}

//Массив элементов по именам класса (аргумент строка имён классов с )
function getClass(ClassNames = ''){	
	
	let clasNamesArr = ClassNames.split(', ');
	let elementsArr = [];
	
	while(clasNamesArr.length > 0){

		let classCol = document.getElementsByClassName(clasNamesArr.shift());

		for(let ind = 0; ind < classCol.length; ind++){
			elementsArr.push(classCol[ind]);
		}		
	}

	console.log(elementsArr);
	return elementsArr;
}

//Создает массив с анимацией
//Если передано несколько функций с анимациями то, слепит их в один массив по очереди начиная с первой
function calculationTransform(
			animParts,              //Массив функций с анимациями
			params = defaultArray   //Стартовые значения параметров, 
		){

	let startOptions = new startMatrix(params);
	let trigger = false;	
	let CalculatedTransform = [];		
	let start = performance.now(); //Время старта функции	

	//CalculatedTransform.push(startOptions.modified());
	
	for (let partsCount = 0, totalFrames = 0; partsCount < animParts.length; partsCount++){
			
		let animArr = animParts[partsCount];
		let counter = animArr.length;
		let startPos = startOptions.modified();				
	
		for (let currentFrame = 0; true;){  //Цикл запускается только если есть хоть один элемент в массиве					
				
			for (let key = 0; key < counter; key++) {	
					
				if (currentFrame <= animArr[key].finishFrame){ 
						
					if(!trigger){
						trigger = true;					
					}
					startOptions[animArr[key].param] = 
					animArr[key].func(currentFrame, startPos);	//Вычисляем параметр и вставляем его в соответствующую позицию элемента итогового массива							
				} 
			}	
				
			if(trigger){				
				CalculatedTransform.push(startOptions.modified());
				console.log(totalFrames +", "+ CalculatedTransform[totalFrames]);	
				currentFrame++;
				totalFrames++;			
				trigger = false;		
			} else {				
				break;				
			}	
		}		
	}
	
	//console.log('calculationTransform: time passed ' + performance.now() - start);
	return CalculatedTransform;
};
	

/*Округление числа*/
let round = function(number){
	return Math.round(number * 10000) /10000;
};

/*Возведение в степень*/
	//в n степень
let pow = Math.pow;
	//в квадрат
let sqr = function(n){
	return Math.pow(n, 2);
};
	//в куб
let cube = function(n){
	return Math.pow(n, 3);
};

const sin = Math.sin;
const cos = Math.cos;
const abs = Math.abs


//Координаты вектора после поворота на заданный угол
//Аргументы: (x,y) - стартовые координаты вектора,
//(angle) - угол на который нужно повернуть вектор
//Возвращает массив с новыми координатами вектора после поворота на угол (angle)
function rotateVector(x, y, angle){
	return [
		round(x * cos(angle) - y * sin(angle)),
		round(x * sin(angle) + y * cos(angle)) 
	];
}

/*Timing functions*/
//Кривые Безье
	/*Кубическая (по 4-м точкам)*/
	let cubic_bezier = function(p_1, p_2, p_3, p_4, t){	
		let delta = (1-t);
		return round(
			cube(delta)*p_1 + 3*(sqr(delta)*t*p_2 + 
			delta*sqr(t)*p_3) + cube(t)*p_4
		);
	};

	/*Квадратная (по 3-м точкам)*/
	let quad_bezier = function(p_1, p_2, p_3, t){	
		let delta = (1-t);
		console.log(sqr(delta)*p_1 + 2*delta*t*p_2 + sqr(t)*p_3);
		return round(
			sqr(delta)*p_1 + 2*delta*t*p_2 + sqr(t)*p_3
		);
	};

//Откат и выстрел
function back(timeFraction, points, start = ZERO) {
	return Math.pow(
		timeFraction, 2) * ((points + 1) * timeFraction - points);
}

/*АНИМАЦИИ*/
//Колебания переданной координаты. Учитывает текущее значение переданной координаты
function oscillations(
	vectorCoord, //Имя координаты вектора (которым будем манипулировать)
	angle, 		 //Периоды колебаний
	frames,		  //Количество кадров
	amplitude = 1 //Амплитуда колебаний 
	){
	
	return [	
		{
			param: vectorCoord,
			points: angle,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame //текущий кадр делим на общее количество (значения от 0 до 1) 
				return round(
					 start[vectorCoord] +   //Начальное значение координаты вектора
					 amplitude *		    //максимальная амплитуда
					 sqr(fraction -1) *     //Затухание колебаний (умножаем значение синусоиды на заначение параболы от 1 до 0)
					 sin(angle * fraction)  //Синус, задает колебания (принимает угол от 0 до заданного)
				);
			}			
		}		
	];
};


/*Функция для изменения какого-либо параметра по кубической кривой безье*/
function slideBezier(
		vectorCoord, //Имя координаты вектора (которым будем манипулировать)
		finishValue, 		 //(Целевое, конечное значение, отсчитывается от стартового передпнного в calculationTransform()) Дистанция, угол и т.д. В общем еденици измерения параметра который хотим изменить
		frames,		  //Количество кадров
		p_1 = 0, 
		p_2 = 0, 
		p_3 = 0, 
		p_4 = 0
	){
	
	return [	
		{
			param: vectorCoord,
			points: finishValue,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame
				return round(
					this.points + start[this.param] * cubic_bezier(p_1, p_2, p_3, p_4, fraction)
				);
			}			
		},		
	];
};




/*Отскок*/
//Падение с высоты и затухающие отскоки
function bounces(vectorCoord, angle, frames, finishPoint = ZERO){
	
	return [	
		{
			param: vectorCoord,
			points: angle,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame //текущий кадр делим на общее количество (значения от 0 до 1) 
				return round(					
					finishPoint +
					start[vectorCoord]*    //Начальное значение координаты вектора					 
					 quad_bezier(1, 0.8, 0, fraction) *     //Затухание колебаний (умножаем значение синусоиды на заначение параболы от 1 до 0)
					 abs(cos(angle * fraction))  //Синус, задает колебания (принимает угол от 0 до заданного)
				);
			}			
		},
		{
			param: D,
			points: angle,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame //текущий кадр делим на общее количество (значения от 0 до 1) 
				return round(					
					1 +
					0.4 *    //Начальное значение координаты вектора					 
					 sqr(fraction -1) *     //Затухание колебаний (умножаем значение синусоиды на заначение параболы от 1 до 0)
					 (abs(sin(angle * fraction  + PI))*(-1) +1)  //Синус, задает колебания (принимает угол от 0 до заданного)
				);
			}			
		},
		{
			param: A,
			points: angle,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame //текущий кадр делим на общее количество (значения от 0 до 1) 
				return round(					
					1 +
					0.4 *    //Начальное значение координаты вектора					 
					 sqr(fraction -1) *     //Затухание колебаний (умножаем значение синусоиды на заначение параболы от 1 до 0)
					 (abs(sin(angle * fraction  - 0.5*PI))*(-1) +1)  //Синус, задает колебания (принимает угол от 0 до заданного)
				);
			}			
		}
		
	]				
};


/*Гусеница*/
function сaterpillar(
	vectorCoord, 
	units, 		 
	frames,
){

	return [	
		{
			param: vectorCoord,
			points: units,
			finishFrame: frames,

			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame
				return round(
					this.points + start[this.param] * (1 - fraction) + 80*sin(8*PI*fraction)
				);
			}			
		},		
		{
			param: A,
			points: units,
			finishFrame: frames,

			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame
				return round(
					start[this.param] + 0.2*sin(8*PI*fraction)
				);
			}			
		},		
		{
			param: D,
			points: units,
			finishFrame: frames,

			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame
				return round(
					start[this.param] - 0.35*sin(8*PI*fraction)
				);
			}			
		},		
	];
};



/*Вираж*/
//Движение элемента по заданной траектории (задается кривой Безье либо как-то иначе)
//из стартовой текущей точки(задается при расчёте анимации) в точку (x, y) передается как аргумент функции
function crazyturn(
		bfunction, //Имя функции траектории (cтрока)
		x, y,  	  //координаты конечной точки
		frames,   //количество кадров		
		//координаты точек
		p_1 = [0, 0], 
		p_2 = [0, 0], 
		p_3 = [0, 0], 
		p_4 = [0, 0], 
	){
		
		let tfunction;
		
		switch(bfunction){
			case 'cubic':
				tfunction = function(p1, p2, p3, p4, fraction){
					return round(
						cubic_bezier(p1, p2, p3, p4, fraction)
					)
				};
			break;
			case 'quad':
				tfunction = function(p1, p2, p3, p4, fraction){
					return round(
						quad_bezier(p1, p2, p3, fraction)
					)
				};
			break;
			default:
				return console.log(`crazyturn: ${bfunction}`);
		}

	
	return [	
		{
			param: Tx,
			points: x,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame
				return round(
					this.points + start[this.param] * (1 - tfunction(p_1[X], p_2[X], p_3[X], p_4[X], fraction))
				);
			}			
		},
		{
			param: Ty,
			points: y,
			finishFrame: frames,
	
			func: function(currentFrame, start){			
				let fraction = currentFrame/this.finishFrame
				return round(
					this.points + start[this.param] * tfunction(p_1[Y], p_2[Y], p_3[Y], p_4[Y], fraction)
				);
			}			
		},		
	]
}


//Вращение вокруг центра на заданный угол
function rotateAround( 
		angleRad,      //Угол поворота в радианах
		frames,        //Длительность в кадрах
		tfunction = function(fraction){  //Тайминг функция 										
			return fraction;             //(задает параметры вращения, скорость, замедление и т.д. добавляем свою при необходимости)
		}){								//функция по умолчанию возвращает значения 0 до 1 (угол от 0 до заданного)
	
	return [
			{
				param: A,	//координата вектора	
				points: angleRad, //угол поворота
				finishFrame: frames,
		
				func: function(currentFrame, start){			
							let fraction = currentFrame/this.finishFrame //часть времени										
							return rotateVector(       //Функция поворота
									start[A], start[C], //стартавая позиция вектора (от которой осчитывается поворот)
									this.points * 
									tfunction(fraction) //тайминг функция
							)[X];	
				}	
			},
			{
				param: C,
				points: angleRad,
				finishFrame: frames,
		
				func: function(currentFrame, start){			
					let fraction = currentFrame/this.finishFrame
						return rotateVector(
								start[A], start[C],
								this.points * 
								tfunction(fraction)
						)[Y];
				},			
			},
			{
				param: B,
				points: angleRad,
				finishFrame: frames,
		
				func: function(currentFrame, start){			
					let fraction = currentFrame/this.finishFrame
						return rotateVector(
								start[B], start[D],
								this.points * 
								tfunction(fraction)
						)[X];	
				}
			},
			{
				param: D,
				points: angleRad,
				finishFrame: frames,
		
				func: function(currentFrame, start){			
					let fraction = currentFrame/this.finishFrame
						return rotateVector(
								start[B], start[D],
								this.points * 
								tfunction(fraction)
						)[Y];	
				}
			}
	];
}



/*let crzy = new AnimationUnit(
			'item_1_img',
			[
				crazyturn(0, 0, 90, 'cubic',[0, 1], [0.35, 4], [1, 0.5], [1, 0]), 
				oscillations(B, 16*PI, 90, 0.4),				
			],
			[1,0,0,1,-500, 500, 0]
);*/





/*let rot = CalculationTransform(
	[
		rotateAround(-6*PI, 54)
	],
	new startMatrix(1,0,0,1,0,0,0)
);

matrixmult(crzy, rot, 35);

matrixmult(crzy, 		
		CalculationTransform(
			[
				oscillations(D, 16*PI, 90, 0.4)
			],
			new startMatrix(1,0,0,1,0,0,0)
		),
		90
);

let bounc = CalculationTransform(
		[
			bounces(Ty, 6*PI, 300, 0)
		],
		new startMatrix(1,0,0,1,0,-2000,0)
);

let item_1_img = getEl('item_1_img');
let item_1_name = getEl('item_1_name');
let item_1_achiev = getEl('item_1_achievements');
let item_1_text = getEl('item_1_text');
*/






  

