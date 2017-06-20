#!/bin/bash

if [ "$1" = "regen" ]; then
    (echo 4; echo 2; echo Guy; echo 2; echo str dex int spi) \
	| ./char.js > test-result.txt
else
    if (echo 4; echo 2; echo Guy; echo 2; echo str dex int spi) \
	   | ./char.js | diff -u - test-result.txt; then
	echo OK
    else
	echo Fail
    fi
fi

    
