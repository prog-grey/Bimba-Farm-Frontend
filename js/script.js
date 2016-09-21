$(document).ready(function(){

	// время прокрутки карусели
	$('#mainSlider').carousel({
		interval: 3500,
		pause: "true"
	});

	// появление/скрытие поиска
	$('.searchIcon>i').click(function(e){
		if( e.currentTarget.className == 'mdi mdi-magnify' ){
			$('.searchIcon>i.mdi-magnify').removeClass('mdi-magnify').addClass('mdi-close');
			$('.searchBlock').fadeIn(750).css('display', 'block');
		}
		else if( e.currentTarget.className == 'mdi mdi-close' ){
			$('.searchIcon>i.mdi-close').removeClass('mdi-close').addClass('mdi-magnify');
			$('.searchBlock').fadeOut(750);
		}
	});

	// появдение/скрытие кнопки "вверх"
	$(window).scroll(function(){
		if( $(this).scrollTop() <= 500 && $(this).scrollTop() == 0 )
			$('.btnToTop').fadeOut();
		else if( $(this).scrollTop() > 500 )
			$('.btnToTop').fadeIn();
	});

	// при клике на кнопку "вверх" плавно возвращаемся в начало страницы
	$('.btnToTop').click(function(){
		$('body').animate({scrollTop: 0}, 1000);
	});

	// запрет на ввод других символов кроме цифер 1-9
	$('.counterProduct input.countProduct').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g))
			this.value = this.value.replace(/[^0-9]/g, '');
	});

	// при клике уменьшаем/увеличиваем кол-во товаров. если кол-во <= 1 то кнопка "минус" не уменьшает
	var countProductVal;
	$('.counterProduct').each(function(index, obj){
		$('button.btnPlus', $(this)).click(function(){
			countProductVal = Number($("input.countProduct", obj).val());
			$('input.countProduct', obj).val(countProductVal+1);
		});
		$("button.btnMinus", $(this)).click(function(){
			countProductVal = Number($('input.countProduct', obj).val());
			if(countProductVal > 1 && countProductVal != 1)
				$('input.countProduct', obj).val(countProductVal-1);
		});
		$('input.countProduct', obj).blur(function(){
			if( $(this).val() == '' ){
				countProductVal = $(this).attr('value');
				$(this).val(countProductVal);
			}
		});
	});

	// меню под моб. тел.
	var navbarMain = $('.navbarMain');
	var searchBlock = $('.searchBlock');
	var headerCartBlock = $('.order .cart');

	$('.order .cart').find('a').addClass('btnCartForNavPhone').find('span:first').addClass('hidden-xs').find('countProductInCart').addClass('countProductInCart');
	var navMenuForPhoneTitleContent = '<h3 class="titleNavMenuForPhone">Contact Lens Store</h3><div class="rightContent pull-right">' + headerCartBlock.html() + '<a class="btnAccount" href ="'+ $('.userAccount li a:first').attr('href') +'"><i class="mdi mdi-key" aria-hidden="true"></i></a></div>';

	if( window.innerWidth <= 767 ){
		$('.navbarMain').remove();
		$('header').prepend( $(navbarMain) );
		$('header .headerTop').css({'margin-top' : $(navbarMain).height() + 'px'});
		$('.navbarMain .searchIcon').remove();
		$('.navig').prepend( $(searchBlock) );
		$('.navbarMain button.navbar-toggle').after(navMenuForPhoneTitleContent);
		$('.navbarMain .btnCartForNavPhone').hover(
			function(){
				$(this).not('.countProductInCart').addClass('btnCartForNavPhoneHover');
				$('.countProductInCart', $(this)).addClass('countProductInCartHover');
			},
			function(){
				$(this).not('.countProductInCart').removeClass('btnCartForNavPhoneHover');
				$('.countProductInCart', $(this)).removeClass('countProductInCartHover');
			}
		);
	}
	else{
		$('.navig').append( $(navbarMain) );
		$('.order .cart').prepend( $(headerCartBlock) );
	}

});

