
$('ul li').click(function() {
	$('a').removeClass('active');
	$(this).children().addClass('active');
});

$('.hiding').hide();
//when you hover over certain items different text should be displayed
$('.dropdown-item').hover(function() {
	$(this).next('.dropdown-item').toggle();
	// $(this).show();
}, function() {
	$(this).next('.dropdown-item').toggle();
});

$('.thumb-resume').hover(function() {
	$(this).css('-webkit-filter', 'brightness(200%)');
}, function() {
	$(this).css('-webkit-filter', '');
});

//on hovering over each resume item, invert colors of background and title
$('.box').hover(function() {
	$(this).css('background-color', 'tomato');
	$(this).children().css('color', 'white');
}, function() {
	$(this).css('background-color', 'white');
	$(this).children().css('color', 'tomato');
	$('.company').css('color', 'tomato');
	$('.dates-worked').css('color', 'gray');
	$('.role').css('color', 'black');
});