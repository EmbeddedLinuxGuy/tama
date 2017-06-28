#!/usr/bin/env node

const readline = require('readline');
const fs = require("fs");
const R = require('ramda');


if (process.argv.length != 3) {
    process.stderr.write("Usage: " + process.argv[1]
			 + " outfile.json\n");
    process.exit(1);
}

const json_out = process.argv[2];
const tty_out = process.stdout;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const q0 = [
    "########################",
    "# Welcome to Ryuu-Tama #",
    "########################\n\n"
];
tty_out.write(q0.join("\n"));
var choices = [];
var step = 0;

const q1 = [ "Choose a class:\n",
	     "1. Healer",
	     "2. Hunter",
	     "3. Merchant",
	     "4. Minstrel",
	     "\n> " ];
tty_out.write(q1.join("\n"));

const classes = [ "Healer", "Hunter", "Merchant", "Minstrel" ];
const types = [ "Attack", "Magic", "Technical" ];

const q = { "type":
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

rl.on('line', function (cmd) {
    choices.push(cmd);
    if (step < 4) {
	tty_out.write(q[keys[step]].join("\n"));
	++step;
    } else {
	// do bounds checking
	const zo = R.zipObj(choices[ranks].split(" "),
			    stat_ranks[choices[stats]-1]);

	tty_out.write("You are " + choices[name] + " (Level 1, "
		      + types[choices[type]-1] + "-type "
		      + classes[choices[klass]-1] + ")\n"
		      + "Stats: "
		      + JSON.stringify(zo)
		      + "\n");
	fs.writeFileSync(json_out, JSON.stringify(zo));
	process.exit(0);
    }
});
