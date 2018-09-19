// change active class of nav item when different items are clicked
$('ul li').click(function() {
	$('a').removeClass('active');
	$(this).children().addClass('active');
});

$('.hiding').hide();
// when you hover over certain items, different text is displayed
$('.dropdown-item').hover(function() {
	$(this).next('.dropdown-item').toggle();
}, function() {
	$(this).next('.dropdown-item').toggle();
});

// change download icon color on hover
$('.thumb-resume').hover(function() {
	$(this).css('-webkit-filter', 'brightness(200%)');
}, function() {
	$(this).css('-webkit-filter', '');
});

// on hovering over each resume item, invert colors of background and title
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

// change color of form button when it's hovered over
$('.form-btn').hover(function() {
	$(this).css('background-color', '#CAE6EC');
}, function() {
	$(this).css('background-color', '#11C3EF');
});

$('.form-body').hide();
/* check which email option is selected and
applying a custom subject to the form */
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

// the button hides the original state and shows player information
$('.stats').hide();
$('.btn-srch').click(function (e) {
	e.preventDefault();
	$('.forma').hide();
	$('.stats').show();
});

$('.first').hide();
$('.last').hide();
// this form hides player info state and shows original state
$('.srch').click(function () {
	$('.srch-name').css('border-color', '');
	$('.forma').show();
	$('.srch-name').val('');
	$('.stats').hide();
});

$('.email-confirmation').hide();
$('.form-btn').click(function() {
	/* hide the form and show a message that says
	your information has been received */
	$('.contact-form').hide();
	$('.email-confirmation').show();
});

// get year
let d = new Date();
let currentYr = d.getFullYear();
// keep footer up-to-date using year
$('footer').append('<p class="footer center">Copyright &copy; '+ currentYr + ' Arum Galadima</p>');

// when a burger menu item is clicked, this closes the burger menue
$('.ham-nav li').click(function () {
	$('#burger').prop('checked', false);
});
