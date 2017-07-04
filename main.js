#!/usr/bin/env node

const R = require("ramda");

var q = [ [ ] ];
const rnd = (n) => Math.ceil(Math.random()*n);
var day = 1;
var tty_out;
var char_obj;

exports.start = function(tty, json_char) {
    char_obj = JSON.parse(json_char);
    tty_out = tty;

    q[0][0] = "\nRoll a condition check (str:"
	    + char_obj.str
	    + " + spi:"
	    + char_obj.spi
	    + ") [hit enter]>"
    ;

    tty_out.write("\nDay " + day + "\n-------");
    tty_out.write(q[0][0]);
}

exports.handle = function(cmd) {
    const str = rnd(char_obj.str);
    const spi = rnd(char_obj.spi);
    const condition = str + spi;
    console.log("\nYou rolled: "
		+ str
	        + " + "
		+ spi
		+ " = "
		+ condition);
    if (condition == 2) {
	console.log("You are "
		    + [ "injured", "poisoned", "muddled",
			"exhausted" ][rnd(4)-1]
		    + "! Severity: 4");
    } else if (condition >= 10) {
	console.log("You feel great!");
    }
    ++day;
    tty_out.write("\nDay " + day + "\n------");
    tty_out.write(q[0][0]);
}
