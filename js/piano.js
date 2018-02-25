
var keys = {
    'a': 0,
    'w': 1,
    's': 2,
    'e': 3,
    'd': 4,
    'f': 5,
    't': 6,
    'g': 7,
    'y': 8,
    'h': 9,
    'u': 10,
    'j': 11,
    'k': 12,
    'o': 13,
    'l': 14,
    'p': 15,
    ';': 16,
    '\'': 17,
}

var octave = 60;

var pressed_keys = [];

var toggleHelp = false;

var colors = {
	{0,0,0}, // 1 - Black
	{250,0,0}, // 2 - Red
	{250,135,0}, // 3 - Orange
	{250,250,0}, // 4 - Yellow
	{0,250,0}, // 5 - Green
	{0,0,250}, // 6 - Blue
	{121,0,220}, // 7 - Purple
}

var currentColor = 7

window.onkeydown = function(event) {
    var key = event.key;
    if (pressed_keys.indexOf(key) == -1 && key in keys) {
        pressed_keys.push(key)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("keydown successfull");
            }
        };
if (key == 'c') {

}

        note = octave + keys[key]

        xhttp.open("GET", "on/" + note + "/100", true);
        xhttp.send();
    }
};

window.onkeyup = function(event) {
    var key = event.key;
    if (key in keys) {
        pressed_keys.splice(pressed_keys.indexOf(key), 1);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("keyup successfull");
            }
        };

        note = octave + keys[key]

        xhttp.open("GET", "off/" + note, true);
        xhttp.send();
    }
};

document.getElementById("test").onmousedown = function(event)
{
  if (toggleHelp)
  {
  document.getElementById("test2").style.display = 'none';
  toggleHelp = false;
  }
  else
  {
  document.getElementById("test2").style.display = 'block';
  toggleHelp = true;
  }
};

document.getElementById("goUp").onmousedown = function (event) {
    
        octave = octave + 12;
    
};

document.getElementById("goDown").onmousedown = function (event) {

    octave = octave - 12;

};
