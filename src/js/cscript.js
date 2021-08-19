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



$( 'input[name=phone]' ).mask( "+7 (999) 999-99-99" );

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


//Появление стрелки вверх
$(window).scroll( function() {
			if ( $(this).scrollTop() > 1600 ) {
					$('.pgup').fadeIn();
			} else {
					$('.pgup').fadeOut();
			}			
});

$("a[href^='#']").click( function() {
	const _href = $(this).attr("href");
	$("html, body").animate( { scrollTop: $( _href ).offset().top+"px" } );
	return false;
});

