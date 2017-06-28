#!/usr/bin/env node

const R = require("ramda");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const tty_out = process.stdout;

if (process.argv.length != 3) {
    process.stderr.write("Usage: " + process.argv[1]
			 + " char.json\n");
    process.exit(1);
}

const json_in = process.argv[2];
const char_obj = JSON.parse(fs.readFileSync(json_in));
console.log(JSON.stringify(char_obj));

var q = [ [ "\nRoll a condition check (str:"
	    + char_obj.str
	    + " + spi:"
	    + char_obj.spi
	    + ") [hit enter]>"
	  ] ];

const rnd = (n) => Math.ceil(Math.random()*n);
tty_out.write(q[0][0]);
rl.on('line', function (cmd) {
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
    tty_out.write(q[0][0]);
});
