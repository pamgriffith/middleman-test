// JavaScript Document

// this inserts some elements into the page that otherwise would be inserted with multiple backgrounds or border images
// and can't be inserted with :before or :after because those are in use or because they need to be scaled

$(document).ready(function () {
	if (!Modernizr.multiplebgs) {
		$('.text_body').prepend('<img src="images/corner-cut.jpg" class="corner-cut" />');
	}
	if (!Modernizr.borderimage) {
		$('.text_body').append('<div class="text-bottom-line"></div>');
		$('footer').prepend('<div class="footer-border"></div>');
	}
});