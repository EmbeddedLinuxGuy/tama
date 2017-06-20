#!/usr/bin/env node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const R = require('ramda');

const q0 = [
    "########################",
    "# Welcome to Ryuu-Tama #",
    "########################\n\n"
];
process.stdout.write(q0.join("\n"));
var choices = [];
var step = 0;

const q1 = [ "Choose a class:\n",
	     "1. Healer",
	     "2. Hunter",
	     "3. Merchant",
	     "4. Minstrel",
	     "\n> " ];
process.stdout.write(q1.join("\n"));

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
	process.stdout.write(q[keys[step]].join("\n"));
	++step;
    } else {
	// do bounds checking
	process.stdout.write("You are " + choices[name] + " (Level 1, "
			     + types[choices[type]-1] + "-type "
			     + classes[choices[klass]-1] + ")\n");
	var st = stat_ranks[choices[stats]-1];
	var ra = choices[ranks].split(" ");
	var z = R.zipWith((a, b) => a.toUpperCase() + ":" + b, ra, st);
	process.stdout.write("Stats: " + z.join(" ") + "\n");
	process.exit(0);
    }
//    process.stdout.write("\nYou chose: [" + cmd + "]\n");
});
