/* the javascript in this file is rather inefficient and silly, and would be better off replaced with additional 
   markup and css, but for this project I wanted to explore the possibility of doing without.
   */

$(document).ready(function () {
	
	// bold the first 3 words of the text paragraphs.  there's probably a more flexible way to get the first n words...
	$('.text_body>p').each(function(){
		var text = $(this);
		var word = /(^\w+\W+\w+\W+\w+)/; // w!
		text.html( text.html().replace(word,'<strong>$1</strong>') );
	});
	
	// dim the 3rd line of the quotations.
	// code adapted from http://stackoverflow.com/questions/1966441/how-to-select-nth-line-of-text-css-js
	$('section.quotations p').each(function(){ 
		var p = $(this); 
		var words = p.text().split(' '); 
		var text = ''; 
		$.each(words, function(i, w){
			if($.trim(w)) text = text + '<span>' + w + '</span> ' }
		); //each word 
		p.html(text); 
		
		function lines (){ 
		
			var line = 0; 
			var prevTop = -15; 
			$('span', p).each(function(){ 
				var word = $(this); 
				var top = word.offset().top; 
				if(top!=prevTop){ 
					prevTop=top; 
					line++; 
				} 
				word.attr('class', 'line' + line); 
			});//each 
		
		};

		lines(); //first one
		//$(window).resize(lines); //resize (not necessary here)
	});

	
});