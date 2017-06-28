#!/bin/bash

CHARGEN=./char.js
NEW_JSON=new-char.json
REF_JSON=test-char.json
OUTPUT=test-result.txt

if [ "$1" = "regen" ]; then
    (echo 4; echo 2; echo Guy; echo 2; echo str dex int spi) \
	| $CHARGEN $REF_JSON > $OUTPUT
else
    if (echo 4; echo 2; echo Guy; echo 2; echo str dex int spi) \
	   | ./char.js $NEW_JSON | diff -u - $OUTPUT; then
	if diff -u $NEW_JSON $REF_JSON; then
	    echo OK
	else
	    echo CHARGEN FAILED: output OK
	fi
    else
	echo OUTPUT FAILED
    fi
fi

    
