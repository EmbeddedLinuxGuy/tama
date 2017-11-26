#!/usr/bin/env node

const R = require("ramda");
const fs = require("fs");
//const S = require("sanctuary");

// arguments

// tty_out: supports "write"
// json_outfile: name of character file

// 'handle': should be called after input is complete

// move q0, q1, q to static file
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
const rnd = (n) => (1+Math.floor(Math.random()*n));

// can this live locally in one function (combined init/handle)?
var char_obj;

// this is already passed on each request so can be eliminated (?)
var tty_out;

// needs to be passed on each request and eliminated as a global
var json_out;

const start_adventure = function () {
    char_obj = JSON.parse(fs.readFileSync(json_out, "utf8"));
    q[0][0] = `\nRoll a condition check (str:${char_obj.str} + spi:${char_obj.spi})`
	+ ` [hit enter]>`;

    tty_out.write(JSON.stringify(char_obj));
    tty_out.write("\n\nDay " + (1+char_obj.days) + "\n-------");
    tty_out.write(q[0][0]);
};

exports.init = function(tty, json_filename) {
    json_out = json_filename;
    tty_out = tty;

    if (fs.existsSync(json_out)) {
	char_obj = JSON.parse(fs.readFileSync(json_out, "utf8"));
	if (char_obj.chargen_done) {
	    start_adventure();
	} else {
	    // continue character creation
	    tty.write("Resuming character creation at step ${char_obj.step}\n");
	}
    } else {
	tty.write(q0.join("\n"));
	tty.write("Creating new character\n\n");
	fs.writeFileSync(json_out, JSON.stringify({"step": 0, "choices": []}));
	// first prompt: class
	tty.write(q1.join("\n"));
    }
};

// move q2 to static file

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

// old behavior: build up 4 steps, then write file

// new behavior:
// 1. extract next step from char.json
// 2. send next step query to client (from steps.json)
// 3. wait for response from client
// 4. parse client response and write char.json with updated step

const build_char = function(cmd) {
    char_obj.choices.push(cmd);
    let step = char_obj.step;
    if (step < 4) {
	tty_out.write(q2[keys[step]].join("\n"));
	++(char_obj.step);
        fs.writeFileSync(json_out, JSON.stringify(char_obj));
    } else {
	// do bounds checking
	fs.writeFileSync(json_out,
			 JSON.stringify(
			     R.assoc("chargen_done", true,
				     R.assoc("days", 0,
					     R.zipObj(char_obj.choices[ranks].split(" "),
						      stat_ranks[char_obj.choices[stats]-1])))));
	tty_out.write("You are " + char_obj.choices[name] + " (Level 1, "
		      + types[char_obj.choices[type]-1] + "-type "
		      + classes[char_obj.choices[klass]-1] + ")\n");
	start_adventure();
    }
};

exports.handle = function(cmd, alt_tty) {
    if (alt_tty) { tty_out = alt_tty; }
    char_obj = JSON.parse(fs.readFileSync(json_out, "utf8"));
    if (! char_obj.chargen_done) {
	build_char(cmd);
	return;
    }
    const str = rnd(char_obj.str);
    const spi = rnd(char_obj.spi);
    const condition = str + spi;
    ++(char_obj.days);
    fs.writeFileSync(json_out, JSON.stringify(char_obj));
    tty_out.write(`\nYou rolled: ${str} + ${spi} = ${condition}\n`
		  + ((condition == 2) ? `You are ${[ "injured", "poisoned", "muddled",
			"exhausted" ][rnd(4)-1]}! Severity: 4\n`
		     : ``)
		  + ((condition >= 10) ? `You feel great!\n` : ``)
		  + `Next Day\nDay ${1+char_obj.days}\n------\n
                     ${q[0][0]}\n`
		 );
}
