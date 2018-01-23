

//change active class of nav item when different items are clicked
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

//change download icon color on hover
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

//change color of form button when hovered over
$('.form-btn').hover(function() {
	$(this).css('background-color', '#CAE6EC');
}, function() {
	$(this).css('background-color', '#11C3EF');
});

$('.form-body').hide();
//check if an email option is selected
$('#contact-type').change(function() {
	if($(this).val() === 'General') {
		$('#subject').val('Just Connecting');
		$('.form-body').show();
	} else if($(this).val() === 'JobOp') {
		$('#subject').val('Job You Might Be Interested In');
		$('.form-body').show();
	} else if($(this).val() === 'Networking') {
		$('#subject').val('We Might Be Able To Help Each Other Out');
		$('.form-body').show();
	} else if($(this).val() === 'Podcast') {
		$('#subject').val('About Knowledge Bandits');
		$('.form-body').show();
	} else if($(this).val() === 'Other') {
		$('#subject').val('');
		$('.form-body').show();
	} else {
		$('.form-body').hide();
	}
});

//checking to see whether the search form is complete or not
	//if it's complete then post the form
$('.stats').hide();
$('.btn-srch').click(function (e) {
	$('.mistake').hide();
	let firstName = $('.first').val();
	let lastName = $('.last').val();
	//console.log(firstName + ' ' + lastName);
	if($('.first').val() === '' || $('.last').val() === '') {
		e.preventDefault();
		$('.description-nba').append('<p class="mistake">Oops! Looks like you missed a search field</p>');
		$('.srch-name').css('border-color', 'tomato');
	} else if ($('.srch-name').val() !== '' ) {
		$('.mistake').hide();
		$('.forma').hide();
		$('.stats').show();
		$('.forma').submit().serialize();
		e.preventDefault();
	} 
	e.preventDefault();
});

//search button to allow user to perform another search
$('.srch').click(function () {
	$('.srch-name').css('border-color', '');
	$('.forma').show();
	$('.srch-name').val('');
	$('.stats').hide();
	
});