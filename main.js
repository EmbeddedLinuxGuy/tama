#!/usr/bin/env node

const R = require("ramda");
const fs = require("fs");

const q0 = [
    "########################",
    "# Welcome to Ryuu-Tama #",
    "########################\n\n"
];
const q1 = [ "Choose a class:\n",
	     "1. Healer",
	     "2. Hunter",
	     "3. Merchant",
	     "4. Minstrel",
	     "\n> " ];

var q = [ [

] ];
const rnd = (n) => Math.ceil(Math.random()*n);
var day = 1;
var tty_out;
var char_obj;
var json_out;

const start_adventure = function () {
    q[0][0] = "\nRoll a condition check (str:"
	+ char_obj.str
	+ " + spi:"
	+ char_obj.spi
	+ ") [hit enter]>"
    ;

    tty_out.write(JSON.stringify(char_obj));
    tty_out.write("\n\nDay " + day + "\n-------");
    tty_out.write(q[0][0]);
};

exports.init = function(tty, json_filename) {
    tty.write(q0.join("\n"));
    tty.write("Creating new character [" + json_filename + "]\n\n");
    tty.write(q1.join("\n"));
    tty_out = tty;
    json_out = json_filename;
};

exports.start = function(tty, json_char, json_outfile) {
    char_obj = JSON.parse(json_char);
    tty_out = tty;
    start_adventure();
};

var choices = [];
var step = 0;

const q2 = { "type":
	     [ "\nChoose a type:\n",
	       "1. Attack",
	       "2. Magic",
	       "3. Technical",
	       "\n> " ],
	     "stats": [
		 "\nChoose your stats:\n",
		 "1. Well-Rounded (6666)",
		 "2. Standard (4668)",
		 "3. Specialist (4488)",
		 "\n> " ],
	     "ranks": [
		 "\nArrange your stats by importance",
		 "(e.g: 'dex int spi str'\n",
		 "str (Strength)",
		 "dex (Dexterity)",
		 "int (Intelligence)",
		 "spi (Spirit)",
		 "\n> "
	     ],
	     "name": [ "\nEnter a name: " ]
	   };

const keys = [ "type", "name", "stats", "ranks" ];
const klass = 0;
const type = 1;
const name = 2;
const stats = 3;
const ranks = 4;
const stat_ranks = [ [ 6, 6, 6, 6 ], [ 8, 6, 6, 4], [8, 8, 4, 4] ];
const classes = [ "Healer", "Hunter", "Merchant", "Minstrel" ];
const types = [ "Attack", "Magic", "Technical" ];

const build_char = function(cmd) {
    choices.push(cmd);
    if (step < 4) {
	tty_out.write(q2[keys[step]].join("\n"));
	++step;
    } else {
	// do bounds checking
	fs.writeFileSync(json_out,
			 JSON.stringify(R.zipObj(
			     choices[ranks].split(" "),
			     stat_ranks[choices[stats]-1])));
	char_obj = JSON.parse(fs.readFileSync(json_out));
	tty_out.write("You are " + choices[name] + " (Level 1, "
		      + types[choices[type]-1] + "-type "
		      + classes[choices[klass]-1] + ")\n");
	start_adventure();
    }
};

exports.handle = function(cmd) {
    if (char_obj === undefined) {
	build_char(cmd);
	return;
    }
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
