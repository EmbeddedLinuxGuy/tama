# Tama Yaru

Tama Yaru is a game of travel and adventure.

1. Create a character

`./char.js` **ryosho.json**

where **ryosho** is a name corresponding to your character.

2. Start the journey

`./journey.js` **ryosho.json**

## Testing

```
$ ./test.sh
OK
```

Output files tested are:
* test-char.json
* test-result.txt

To update the test files after a code change:

```
./test.sh regen
```
