// JavaScript Document

var datesarray = new Array ();
var selected = 16;

for (var i=0; i<31; i++) {
	datesarray[i] = false;
}

function dayselect_toggle (day) {
	if ((day != selected)&&(selected != null)) dayselect_toggle (selected);
	var daysquare = document.getElementById(day);
	if (daysquare.className=='day') {
		daysquare.className = 'day_selected';
		datesarray[day] = true;
	}
	else {
		daysquare.className = 'day';
		datesarray[day] = false;
	}
	selected = day;
	return;
}