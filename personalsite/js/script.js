
$('ul li').click(function() {
	$('a').removeClass('active');
	$(this).children().addClass('active');
});

//when you hover over certain items in the different text should be displayed
$('.dropdown-item').hover(function() {
	if($(this).text() === "Facebook") {
		$(this).text('Arum Galadima');
	}
});