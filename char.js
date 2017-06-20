#!/usr/bin/env node

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const q0 = [
    "########################",
    "# Welcome to Ryuu-Tama #",
    "########################\n\n"
];

const classes = [ "Healer", "Hunter", "Merchant", "Minstrel" ];
const types = [ "Attack", "Magic", "Technical" ];

const q1 = [ "Choose a class:\n",
	     "1. Healer",
	     "2. Hunter",
	     "3. Merchant",
	     "4. Minstrel",
	     "\n> " ];

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
	    ]
	  };

var choices = [];

process.stdout.write(q0.join("\n"));
process.stdout.write(q1.join("\n"));

var step = 0;

rl.on('line', function (cmd) {
    choices.push(cmd);
    ++step;
    if (step == 1) {
	process.stdout.write(q["type"].join("\n"));
    } else if (step == 2) {
	process.stdout.write("\nEnter a name: ");
    } else if (step == 3) {
	process.stdout.write(q["stats"].join("\n"));
    } else if (step == 4) {
	process.stdout.write(q["ranks"].join("\n"));
    } else {
	process.stdout.write("You are " + choices[2] + " (Level 1, "
			     + types[choices[1]-1] + "-type "
			     + classes[choices[0]-1] + ")\n");
	process.exit(0);
    }
//    process.stdout.write("\nYou chose: [" + cmd + "]\n");
});
