$(document).ready(function(){
		$('.carousel__inner').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,        
				speed: 1000,        
				//adaptiveHeight: true,
				//autoplay: true,
				//autoplaySpeed: 2000,
				fade: true,
				cssEase: 'linear',
				prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></img></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></img></button>',
				responsive: [
						{
							breakpoint: 991,
							settings: {
								arrows: false,
								dots: true
							}
						}  
					]
			});


			//Табы
			$('ul.catalog__nav').on('click', 'li:not(.catalog__navtab_active)', function() {
				$(this)
					.addClass('catalog__navtab_active').siblings().removeClass('catalog__navtab_active')
					.closest('div.container').find('div.catalog__units').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
			});


			function toggleSlide(item) {
				$(item).each(function(i) {
						$(this).on('click', function(e) {
								e.preventDefault();
								$('.catalog__item-content').eq(i).toggleClass('catalog__item-content_active');
								$('.catalog__item-list').eq(i).toggleClass('catalog__item-list_active');
						})
				});
		};

		toggleSlide('.catalog__item-more');
		toggleSlide('.catalog__item-back');



		//modal

		$('[data-modal=consultation]').on('click', function(){
				$('.overlay, #consultation').fadeIn('slow');
		});

		$('.modal__close').on('click', function(){
			$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
		});

		$('.catalog__btn').each(function(i){
			$(this).on('click', function(){
				$('#order .modal__subtitle').text($('.catalog__item-title').eq(i).text())
				$('.overlay, #order').fadeIn('slow');
			});
		});

	});


		var btn = document.getElementById('show');
		var nav = document.getElementById('nav');

		btn.addEventListener('click', function() {
		nav.classList.toggle('active');

});



//Валидация форм (плагин (скрипт))
for(let item in (obj={ form_1: "#consultation form", form_2: "#order form", form_3: "#fff form" })){
	$(obj[item]).validate({
		rules:{
				name: {
						required: true,
						minlength: 3,             
				},
				phone: "required",
				email: {
						required: true,
						email: true,                  
				}    
			 },
			
			 messages:{
			 name: {
					required: "Быстро признался кто такой!", 
					minlength: jQuery.validator.format("Мала букав, нннада хотябы {0}!"),
				 },
				 phone: {
						required: "Нет цЫфар-нет консультации!",
						phone: "цЫфрыыыы, цЫфры вводи!" 
				 },  
					email:{
							required: "ННАДА мыло!",
							email: "хотябы @ вставь!",
								
					}
			 }
	});

};


//Maskedinput script
$('input[name=phone]').mask( "+7 (999) 999-99-99" );


//отправка информации из форм на email
$('form').submit(function(e) {
			e.preventDefault(); //отменить стандартное поведение браузера, чтобы после отправки данных формы страница не отправлялась
			$.ajax({
					type: "POST", //Отправить данные
					url: "mailer/smart.php", //Обработчик
					data: $(this).serialize() //работаем с данными текущей формы
			}).done(function() {
						$(this).find("input").val( "" ); //Очищаем инпуты формы
						$('#consultation, #order').fadeOut();
						$('.overlay, #thanks').fadeIn();
						$('form').trigger('reset'); //Очистка всехформ

						return false;
			});
		 
});


//Появление стрелочки вверх
$(window).scroll( function() {
			if ( $(this).scrollTop() > 1600 ) {

					$('.pgup').fadeIn();
			} else {
					$('.pgup').fadeOut();
			}			
});


//Плавная прокрутка до якоря
$("a[href^='#']").click( function() {
	const _href = $(this).attr("href");
	$("html, body").animate( { scrollTop: $( _href ).offset().top+"px" } );
	return false;
});


/* Анимация блока review=============================================================================*/

/*
item_1_img 
item_1_name
item_1_achievements
item_1_text
review_2_item
review__nameruner
review__achievements
*/



//Отскоки для первой картинки
let bounceImg = new AnimationUnit(
	[
		bounces(Ty, 6*PI, 280, 0)
	], 
	[1, 0, 0, 1, 0, -700, 1]
);

//Прячем первый img
bounceImg.aMatrix[0][Tx] = -3000;
bounceImg.aMatrix[ZERO][OPAC] = 0;


//Вылет из-за экрана первого иекста
let turn = new AnimationUnit(
	[
		crazyturn('cubic', 0, 0, 140, [0, 1], [0.35, 4], [1, 0.5], [1, 0]),
		oscillations(B, 4*PI, 60, 0.25)
	],
	[1, 0, 0,1, -2000, -1000, 1]
);

turn.aMatrix[ZERO][OPAC] = 0;

//Вылет второго текста
let slideText = new AnimationUnit(
	[
		slideBezier(Tx, 0, 60, 1, 0.4, -0.7, 0),
		oscillations(B, -4*PI, 40, 0.25)
	],
	[1, 0, 0,1, -2000, 0, 1]
);

slideText.aMatrix[ZERO][OPAC] = 0;

//Появоение второго img - гусеница
let сaterpill = new AnimationUnit(
	[
		сaterpillar(Tx, 0, 140),
		bounces(Ty, 2*PI, 60, 0)
	],
	[1, 0, 0,1, -2000, -300, 1]
);

сaterpill.aMatrix[ZERO][OPAC] = 0;

//Анимация третьего блока
let emergence = new AnimationUnit(
	[
		slideBezier(OPAC, 1, 120, 1, 0.4, 0.6, 0),		
	],
	[1, 0, 0,1, 0, 0, -1]
);

emergence.aMatrix[ZERO][OPAC] = 0;

let achivm = new AnimationUnit(
	[
		slideBezier(Tx, 0, 120, 1, 0.4, -0.3, 0),
		oscillations(B, -2*PI, 40, 0.25)
	],
	[1, 0, 0,1, 3000, 0, 1]
);

achivm.aMatrix[ZERO][OPAC] = 0;



turn.mixingTransforms(
	[
		[
			calculationTransform(
				[rotateAround(8*PI, 100)]
			), 40
		],
		[
			calculationTransform(
				[oscillations(D, 6*PI, 50, 1)]
			), 140
		]
	]
);



let item_1Img = new TargetObjects(
						[getEl('item_1_img')], 
						bounceImg
);

let item_1Text = new TargetObjects(
						[getEl('item_1_text')], turn
);

let item2_Img = new TargetObjects(
						[getEl('item_2_img')], сaterpill
);

let item_2Text = new TargetObjects(
						[getEl('item_2_text')], slideText
);


let review3_item = new TargetObjects(
						[getEl('review_3_item')], emergence
);


let achiv = new TargetObjects(						
				getClass('review__nameruner, review__achievements'),
				achivm 
);



	
review3_item.letsAnimate();
item_2Text.letsAnimate([[0, 60]]);
item2_Img.letsAnimate([[0, 100]]);		
item_1Img.letsAnimate([[0, 220]]);
achiv.letsAnimate();
item_1Text.letsAnimate([[0, 300]]);

item_1Text.tObjects[0].addEventListener('dblclick', function (e){	

	review3_item.letsAnimate();
	item_2Text.letsAnimate([[0, 60]]);
	item2_Img.letsAnimate([[0, 100]]);		
	item_1Img.letsAnimate([[0, 220]]);
	achiv.letsAnimate();
	item_1Text.letsAnimate([[0, 300]]);
		
});













/*
//Анимация блоков (отзывов)
let AnimationForBlocks = function(ClassName_of_targets, animin, animout) {

	this.animation = {in: animin, out: animout}; //Входная/выходная анимация
	this.targets = document.getElementsByClassName(ClassName_of_targets); //Имя класса блоков к которым нужно прнименить анимацию
	this.blocksOut = []; //Блоки к которым нужно применить анимацию
	this.blocksIn = [];  //Блоки к которым уже применена анимация		
	
	//Инициализация объекта
	this.init = function() {

		if(this.targets.length == 0) { //Если не найдено элементов с заданным классом
			console.log(`AnimationForBlocks: No selected objects by class name ${ClassName_of_targets}!`);
			return null;
		}				

		for(let i = 0; i < this.targets.length ; i++) {		
			
			//Прячем выбранные элементы за пределы родительского блока исходя из его ширины
			this.hideElement(this.targets[i]);			
			this.blocksOut.push (this.targets[i]); //ссылка на блок
			
			//overflow родительского элемента устанавливаем в hidden
			if(this.targets[i].parentElement.style.overflow !='hidden') { 
				this.targets[i].parentElement.style.overflow ='hidden';
			}
		}

		console.log(`AnimationForBlocks: Nice job! Initialized! Blocks selected: ${this.targets.length}`);

	};

	//Проверка блока
	
	this.checkBlock = function() {				

		//Если есть спрятанные элементы
		if(this.blocksOut.length > 0) {	

			if(this.blocksOut[0].getBoundingClientRect().y - window.innerHeight <= 0) {

				this.animateBlockIn(this.blocksOut[0]);				
				//Блок отображён
				this.blocksIn.push(this.blocksOut.shift());				
			}		
		}	

		//Если есть не спрятанные элементы
		if(this.blocksIn.length > 0) {	
			
			
			if(this.blocksIn[this.blocksIn.length - 1].getBoundingClientRect().y - window.innerHeight > 0) {

				this.animateBlockOut(this.blocksIn[this.blocksIn.length - 1]);				
				//Блок спрятан
				this.blocksOut.unshift(this.blocksIn.pop());
				
			}		
		}
		
		
	};	
	
	//Анимация при попадании элемента в поле зрения
	this.animateBlockIn = function(elem) {		

		let positionX = elem.parentElement.offsetWidth;

		//Расчет времени анимации
		//Путь в пикселях делим на количество кадров = получим шаг в пикселях за один кадр 
		let step_px_p_frame = positionX/60; 
		
		function repeat() {
			
			console.log('call In!');

			if((positionX = positionX - step_px_p_frame) > 0) {

				elem.style.transform = "translateX(" + positionX + "px" + ")";
				requestAnimationFrame(repeat);

			} else {

				console.log(" Animation finished! " + elem.style.transform);
				elem.style.transform = "translateX(" + 0 + "px" + ")";
			}
		}

		requestAnimationFrame(repeat);
	};

	//Анимация при выпадении из поля зрения
	this.animateBlockOut = function(elem) {

		let positionX = 0;
		let finishX = elem.parentElement.offsetWidth;

		//Расчет времени анимации
		//Путь в пикселях делим на количество кадров = получим шаг в пикселях за один кадр 
		let step_px_p_frame = finishX/20; 
		
		function repeat() {
			
			console.log('call Out!');

			if((positionX = positionX + step_px_p_frame) < finishX) {

				elem.style.transform = "translateX(" + positionX + "px" + ")";
				requestAnimationFrame(repeat);

			} else {

				console.log(" Animation finished! " + elem.style.transform);
				elem.style.transform = "translateX(" + finishX + "px" + ")";
			}
		}

		requestAnimationFrame(repeat);
	};

	//Прячет элементы за пределы родительского блока в зависимости от его ширины
	this.hideElement = function(element) {
		element.style.transform = ("translateX(" + element.parentElement.offsetWidth + "px" + ")");
		console.log("hideElement(): Hidden!");
	}

	this.init();
	
	let obj = this;	
	
	window.addEventListener('scroll', function () {
		obj.checkBlock();
		console.log(obj.targets[0].getBoundingClientRect());
	});

	//Меняем translateX у спрятанных элементов если изменились размеры окна т.к. размеры родителей также могли изменится
	window.addEventListener('resize', function () {

		for(let i = 0; i < obj.blocksOut.length; i++) {			
			obj.hideElement(obj.blocksOut[i]);			
		}
	});	

}

*/

let canvas = document.getElementById('stockGraph');
let context = canvas.getContext('2d');
/*
let time = 300/1728000;


context.beginPath();


for(let i = 0 ; i < 120; i++) {	
	context.lineTo(320 + i, 240 - (Math.pow(i, 3)* time + Math.pow(i, 2)* time)) ;		
}
context.stroke();


context.beginPath();
//context.moveTo(320, 240);
for(let i = 0 ; i < 120; i++) {	
	context.lineTo(320, 240 - i);		
}
context.stroke();



for(let i = 0 ; i < 1; i+=0.01) {
	console.log(Math.pow(i, 2));
}






let one = function(a){
	
	let ss = 0;
	console.log("ONE!");
	console.log(a);
	console.log(ss++);
	return 1;
};

let two = function(b){
	

	let ss = 0;
	console.log("TWO!");
	console.log(b);		
	console.log(ss++);	
	return 1;
};


function mainfunc(arg){	
	
	for(let c = 0; c < 10; c++){
		for(let i = 0; i < 2; i++) {		
			
			if( arg[i]() == 0 ){
				arg.pop();
				console.log("Самоликвидация! " + arg.length);
			}		
		}
	}

	let hhh = 0;

	return hhh == 1 ? true : false;
}




console.log(mainfunc([function() {return one('sdsd');}, function(){ return two('sdsdsd');}]));


//console.log(w[0].getBoundingClientRect());

window.addEventListener('scroll', function () {
	
	console.log(w[0].getBoundingClientRect().y - window.innerHeight);
	
});

let w = new AnimationForBlocks('review__item');
console.log(performance.now());

let ddd = 0.2;
let ccc = 0;

for(let i = 0.2; i < 1; i+=0.1) {

	console.log( i + ": " + Math.pow(i, 2));
	//ccc = ddd * 500;
}
*/
















