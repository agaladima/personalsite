$('ul li').click(function() {
	$('a').removeClass('active');
	$(this).children().addClass('active');
});

$(function () {
  $('[data-toggle="popover"]').popover()
})