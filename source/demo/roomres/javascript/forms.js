// JavaScript Document

function formsubmit_date1 () {
	
	//get the dates and put them into a string
	var datestring = "dates=";
	for (var i=0; i<31; i++) {
		if (datesarray[i] == true) {
			if (datestring[datestring.length-1]!='=')
				datestring += "," + i;
			else datestring += i;
		}
	}
	
	//get the week days and put them into a string
	var daylist = document.getElementById("semesterdays");
	var daystring = "days=";
	for (var i=0; i<7; i++) {
		if (daylist.options[i].selected) {
			if (daystring[daystring.length-1]!='=')
				daystring += "," + daylist.options[i].value;
			else daystring += daylist.options[i].value;
		}
	}
	
	//get the search type (any vs all) and put it into a string
	var allstring = "all=" + document.anyallform.all_or_any[1].checked;
	
	//get the times and put them into a string
	var timelist = document.getElementById("times");
	var timestring = "times=";
	for (var i=0; i<timelist.options.length; i++) {
		if (timelist.options[i].selected) {
			if (timestring[timestring.length-1]!='=')
				timestring += "," + timelist.options[i].value;
			else timestring += timelist.options[i].value;
		}
	}
	
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "date2.html";
	//create the query string from the form stuff
	var query = "?" + datestring + "&" + daystring + "&" + allstring + "&" + timestring;
	//put the new url together
	var newhref = "http://" + host + pathname + query;
	
	//go to the new page
	location.href = newhref;
}

function formsubmit_date2() {
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "details_date.html";
	
	var newhref = "http://" + host + pathname;
	
	//go to the new page
	location.href = newhref;
}

function formsubmit_feature1() {
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "feature2.html";
	
	var newhref = "http://" + host + pathname;
	
	//go to the new page
	location.href = newhref;
}

function formsubmit_feature2() {
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "feature3.html";
	
	var newhref = "http://" + host + pathname;
	
	//go to the new page
	location.href = newhref;
}

function formsubmit_feature3() {
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "details_feature.html";
	
	var newhref = "http://" + host + pathname;
	
	//go to the new page
	location.href = newhref;
}

function formsubmit_room2() {
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "details_room.html";
	
	var newhref = "http://" + host + pathname;
	
	//go to the new page
	location.href = newhref;
}



function formsubmit_details() {
	//get the url
	//get all the pieces of the url, pull them apart, and put them back together with a new page and new arguments
	var host = location.host;
	//get the path name and replace the current page name with the next page
	var paththispage = location.pathname;
	var patharray = paththispage.split("/");
	var pathname = "";
	for (var i=0; i<patharray.length-1; i++) {
		pathname += patharray[i] + "/";
	}
	pathname += "confirmation.html";
	
	var newhref = "http://" + host + pathname;
	
	//go to the new page
	location.href = newhref;
}