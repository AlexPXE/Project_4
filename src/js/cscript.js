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

  });


var btn = document.getElementById('show');
var nav = document.getElementById('nav');

btn.addEventListener('click', function() {
nav.classList.toggle('active');
});
