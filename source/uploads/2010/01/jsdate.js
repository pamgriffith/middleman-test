/* jsdate by Pam Griffith http://www.pamgriffith.net
 * implements most of PHP date() http://php.net/manual/en/function.date.php
 * except time zone name or abbrev. & daylight savings ('e', 'I', and 'T')
 * 
 * day of the year adapted from http://javascript.about.com/library/bldayyear.htm
 * week number adapted from Nick Baicoianu at MeanFreePath http://www.meanfreepath.com/support/getting_iso_week.html
 */

Date.prototype.format = function (formatstr) {
	
	var dateObj = this;
	if (typeof(formatstr) == 'undefined' || formatstr == '') return dateObj.toString();

	
	var formats = {
		// DAYS
		// d  	Day of the month, 2 digits with leading zeros  	01 to 31
		d: function () {
			return util.zerofill(dateObj.getDate(), 2);
		}
		// D 	A textual representation of a day, three letters 	Mon through Sun
		, D: function () {
			return formats.l().substr(0, 3);
		}
		// j 	Day of the month without leading zeros 	1 to 31
		, j: function () {
			return dateObj.getDate();
		}
		// l (lowercase 'L') 	A full textual representation of the day of the week 	Sunday through Saturday
		, l: function () {
			var weekdays = new Array ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
			return weekdays[dateObj.getDay()];
		}
		// N 	ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0) 	1 (for Monday) through 7 (for Sunday)
		, N: function () {
			var day = dateObj.getDay();
			if (day == 0) day = 7;
			return day;
		}
		// S 	English ordinal suffix for the day of the month, 2 characters 	st, nd, rd or th. Works well with j
		, S: function () {
			var day = '' + dateObj.getDate();
			if (day > 10 && day < 14) return 'th';
			switch (parseInt(day.substr(-1, 1))) {
				case 1: return 'st';
				case 2: return 'nd';
				case 3: return 'rd';
				default: return 'th';
			}
		}
		// w 	Numeric representation of the day of the week 	0 (for Sunday) through 6 (for Saturday)
		, w: function () {
			return dateObj.getDay();
		}
		// z 	The day of the year (starting from 0) 	0 through 365
		// code adapted from http://javascript.about.com/library/bldayyear.htm
		, z: function () {
			var jan_first = new Date(dateObj.getFullYear(),0,1);
			return Math.ceil((dateObj - jan_first) / 86400000);
		}
		
		// WEEKS
		// W  	ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0)  	Example: 42 (the 42nd week in the year)
		// code adapted from Nick Baicoianu at MeanFreePath http://www.meanfreepath.com/support/getting_iso_week.html
		, W: function () {
			dowOffset = 1;
			var newYear = new Date(dateObj.getFullYear(),0,1);
			var day = newYear.getDay() - dowOffset; //the day of week the year begins on
			day = (day >= 0 ? day : day + 7);
			var daynum = Math.floor((dateObj.getTime() - newYear.getTime() -
			(dateObj.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
			var weeknum;
			//if the year starts before the middle of a week
			if(day < 4) {
				weeknum = Math.floor((daynum+day-1)/7) + 1;
			} else {
				weeknum = Math.floor((daynum+day-1)/7);
				if (weeknum == 0) {
					var prev = new Date(dateObj.getFullYear() - 1, 11, 31);
					weeknum = parseInt(prev.format('W'));
				}
			}
			if(weeknum > 52) {
				nYear = new Date(dateObj.getFullYear() + 1,0,1);
				nday = nYear.getDay() - dowOffset;
				nday = nday >= 0 ? nday : nday + 7;
				/*if the next year starts before the middle of
				the week, it is week #1 of that year*/
				weeknum = nday < 4 ? 1 : 53;
			}
			return util.zerofill(weeknum, 2);
		}
		
		// MONTHS
		// F  	A full textual representation of a month, such as January or March  	January through December
		, F: function () {
			var months = new Array ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')
			return months[dateObj.getMonth()];
		}
		// m 	Numeric representation of a month, with leading zeros 	01 through 12
		, m: function () {
			return util.zerofill(dateObj.getMonth() + 1, 2);
		}
		// M 	A short textual representation of a month, three letters 	Jan through Dec
		, M: function () {
			return formats.F().substr(0, 3);
		}
		// n 	Numeric representation of a month, without leading zeros 	1 through 12
		, n: function () {
			return dateObj.getMonth() + 1;
		}
		// t 	Number of days in the given month 	28 through 31
		, t: function () {
			if (dateObj.getMonth() != 1) {
				var h = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
				return h.getDate();
			} else {
				if (formats.L()) return 29;
				else return 28;
			}
		}
		
		// YEARS
		// L  	Whether it's a leap year  	1 if it is a leap year, 0 otherwise.
		, L: function () {
			var year = dateObj.getFullYear();
			return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 1 : 0;
		}
		// o 	ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0) 	Examples: 1999 or 2003
		, o: function () {
			if (dateObj.getMonth() == 0 && dateObj.format('W') > 50) return dateObj.getFullYear() - 1;
			else if (dateObj.getMonth() == 11 && dateObj.format('W') == 1) return dateObj.getFullYear() + 1;
			else return dateObj.getFullYear();
		}
		// Y 	A full numeric representation of a year, 4 digits 	Examples: 1999 or 2003
		, Y: function () {
			return dateObj.getFullYear();
		}
		// y 	A two digit representation of a year 	Examples: 99 or 03
		, y: function () {
			return dateObj.getFullYear().toString().substr(-2);
		}
		
		// TIME
		// a  	Lowercase Ante meridiem and Post meridiem  	am or pm
		, a: function () {
			var h = dateObj.getHours();
			if (h < 12) return 'am';
			else return 'pm';
		}
		// A 	Uppercase Ante meridiem and Post meridiem 	AM or PM
		, A: function () {
			return formats.a().toUpperCase();
		}
		// B 	Swatch Internet time 	000 through 999
		// note from http://www.ryanthiessen.com/swatch/resources.htm: [(Hours + 1 {Make sure that the # is not more than 23} *3600*1000) + (Minutes *60*1000) + (Seconds * 1000)] / 86400
		, B: function () {
			return util.zerofill(Math.floor((((dateObj.getHours() + 1) * 3600 * 1000) + (dateObj.getMinutes() * 60 * 1000) + (dateObj.getSeconds() * 1000)) / 86400), 3);
		}
		// g 	12-hour format of an hour without leading zeros 	1 through 12
		, g: function () {
			var h = dateObj.getHours();
			if (h == 0) return 12;
			if (h > 12) return h - 12;
			else return h;
		}
		// G 	24-hour format of an hour without leading zeros 	0 through 23
		, G: function () {
			return dateObj.getHours();
		}
		// h 	12-hour format of an hour with leading zeros 	01 through 12
		, h: function () {
			return util.zerofill(formats.g(), 2);
		}
		// H 	24-hour format of an hour with leading zeros 	00 through 23
		, H: function () {
			return util.zerofill(formats.G(), 2);
		}
		// i 	Minutes with leading zeros 	00 to 59
		, i: function () {
			return util.zerofill(dateObj.getMinutes(), 2);
		}
		// s 	Seconds, with leading zeros 	00 through 59
		, s: function () {
			return util.zerofill(dateObj.getSeconds(), 2);
		}
		// u 	Microseconds (added in PHP 5.2.2) 	Example: 654321
		// Note: javascript doesn't do microseconds, this gets milliseconds and adds 3 zeros
		, u: function () {
			return dateObj.getMilliseconds() + '000';
		}
		
		// TIMEZONES
		/* 
		The following are not implemented:
		e  	Timezone identifier (added in PHP 5.1.0)  	Examples: UTC, GMT, Atlantic/Azores
		I (capital i) 	Whether or not the date is in daylight saving time 	1 if Daylight Saving Time, 0 otherwise.
		T 	Timezone abbreviation 	Examples: EST, MDT ...
		*/
		, e: function () { return undefined; }
		, I: function () { return undefined; }
		, T: function () { return undefined; }
		// O 	Difference to Greenwich time (GMT) in hours 	Example: +0200
		, O: function () {
			var hours = dateObj.getTimezoneOffset();
			var f = util.zerofill(((Math.abs(hours) / 60) * 100), 4);
			if (hours > 0) f = '+' + f;
			else if (hours < 0) f = '-' + f;
			return f;
		}
		// P 	Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3) 	Example: +02:00
		, P: function () {
			var hours = dateObj.getTimezoneOffset();
			var f = util.zerofill(Math.floor(Math.abs(hours) / 60), 2) + ':' + util.zerofill((Math.abs(hours) % 60), 2);
			if (hours > 0) f = '+' + f;
			else if (hours < 0) f = '-' + f;
			return f;
		}
		// Z 	Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. 	-43200 through 50400
		, Z: function () {
			return dateObj.getTimezoneOffset() * 60;
		}
		
		// FULL DATE/TIME
		// c  	ISO 8601 date (added in PHP 5)  	2004-02-12T15:19:21+00:00
		, c: function () {
			return dateObj.format('Y-m-d\TH:i:sP');
		}
		// r 	» RFC 2822 formatted date 	Example: Thu, 21 Dec 2000 16:01:07 +0200
		, r: function () {
			return dateObj.format('D, d M Y H:i:s O');
		}
		// U 	Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT) 	See also time()
		, U: function () {
			return Math.round(dateObj.getTime() / 1000);
		}
	}
	
	var util = {
		// add zeros to the beginning of a number
		zerofill: function (num, len) {
			var numstr = num.toString();
			if (numstr.length < len) {
				var filled = '';
				var num_zeros = len - numstr.length;
				for (var i = 0; i< num_zeros; i++) {
					filled += '0';
				}
				filled += numstr;
				return filled;
			} else return numstr;
		}
	}
	
	var output = '';
	for (var i = 0; i < formatstr.length; i++) {
		if (formatstr[i] == '\\') {
			i++;
			if (typeof(formatstr[i]) != 'undefined') output += formatstr[i];
		} else if (typeof(formats[formatstr[i]]) == 'function') {
			output += formats[formatstr[i]]();
		} else {
			output += formatstr[i];
		}
	}
	return output;

}