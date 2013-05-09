/*
	1.0.0: Created
	1.0.1: Made the widget update itself if the date changes when Dashboard is open.
	1.0.2: Circa May 2013, no idea
	1.0.3: Removed links and references to the defunct 1985.lv site
*/

var Months = ['janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris'];

var DoneButton;
var InfoButton;

var DateChangeTimer = null;

var valuesSetFor = 0;

function setup()
{
	DoneButton = new AppleGlassButton(document.getElementById('doneButton'),
		'Done', hidePrefs);

    InfoButton = new AppleInfoButton(document.getElementById('infoButton'),
    	document.getElementById('front'), 'white', 'white', showPrefs);

	//document.getElementById('Info').onclick = function()
	//{
        //var Link = document.getElementById('Link');
		//window.open(Link.href);
	//}

	setValues();
}

function setupDateChangeUpdate()
{
	if (DateChangeTimer != null)
	{
		clearTimeout(DateChangeTimer);
		DateChangeTimer = null;
	}

	var cDate = new Date();

	// create a new timer for when we need to update the date
	var hr_ms = ((23 - cDate.getHours()) * 3600000);
	var mn_ms = ((59 - cDate.getMinutes()) * 60000);
	var sc_ms = ((60 - cDate.getSeconds()) * 1000); // overshoot a second
	var ms_togo = hr_ms + mn_ms + sc_ms;

	DateChangeTimer = setTimeout('setValues()', ms_togo);
}

function showPrefs()
{
	var front = document.getElementById("front");
	var back = document.getElementById("back");

	if (window.widget)
	{
		widget.prepareForTransition("ToBack");
	}

	front.style.display = "none";
	back.style.display = "block";

	if (window.widget)
	{
		setTimeout('widget.performTransition();', 0);
	}
}

function hidePrefs()
{
	var front = document.getElementById("front");
	var back = document.getElementById("back");

	if (window.widget)
	{
		widget.prepareForTransition("ToFront");
	}

	back.style.display = "none";
	front.style.display = "block";

	if (window.widget)
	{
		setTimeout('widget.performTransition();', 0);
	}
}

function setValues()
{
	var curr_date = new Date();
	var curr_day = curr_date.getDate();
	var curr_month = curr_date.getMonth();

	if (valuesSetFor != curr_day)
	{
		valuesSetFor = curr_day;

		var DateElem = document.getElementById('Date');
		DateElem.innerHTML = curr_day + '. ' + Months[curr_month];

		var NamesElem = document.getElementById('Names');
		if (Names[curr_month][curr_day - 1])
		{
			NamesElem.innerHTML = Names[curr_month][curr_day - 1];
		}
		else
		{
			NamesElem.innerHTML = '---';
		}
	}

	setupDateChangeUpdate();
}

window.onload = setup;
widget.onshow = setValues;