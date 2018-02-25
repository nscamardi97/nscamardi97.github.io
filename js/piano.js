
var keys = {
    'a': 0,
    's': 2,
    'd': 4,
    'f': 6,
    'g': 8,
    'h': 10,
    'j': 12,
    'k': 14,
    'l': 16,
    ';': 18,
    '\'': 20,
    'w': 1,
    'e': 3,
    'r': 5,
    't': 7,
    'y': 9,
    'u': 11,
    'i': 13,
    'o': 15,
    'p': 17,
    'p': 19
}

var octave = 60;

window.onkeydown = function(event) {
    var key = event.key;
    console.log(key);
    if (key in keys) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Request successfull");
            }
        };

        note = octave + keys[key]

        xhttp.open("GET", "on/" + note + "/100", true);
        xhttp.send();
    }
};

window.onkeyup = function(event) {
    var key = event.key;
    console.log(key);
    if (key in keys) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Request successfull");
            }
        };

        xhttp.open("GET", "off/" + keys[key] + "/100", true);
        xhttp.send();
    }
};
