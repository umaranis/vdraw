/**
 * @fileoverview Based on https://www.w3.org/TR/SVG11/paths.html#PathDataBNF.
 */

import type { Command, Segment } from './Path.js';

const argsCountPerCommand = {
	M: 2,
	m: 2,
	Z: 0,
	z: 0,
	L: 2,
	l: 2,
	H: 1,
	h: 1,
	V: 1,
	v: 1,
	C: 6,
	c: 6,
	S: 4,
	s: 4,
	Q: 4,
	q: 4,
	T: 2,
	t: 2,
	A: 7,
	a: 7
};

const isCommand = (c: string): c is Command => {
	return c in argsCountPerCommand;
};

const isWhiteSpace = (c: string) => {
	return c === ' ' || c === '\t' || c === '\r' || c === '\n';
};

const isDigit = (c: string) => {
	const codePoint = c.codePointAt(0);
	if (codePoint == null) {
		return false;
	}
	return 48 <= codePoint && codePoint <= 57;
};

const readNumber = (string: string, cursor: number): [number, number | null] => {
	let i = cursor;
	let value = '';
	let state = 'none';
	for (; i < string.length; i += 1) {
		const c = string[i];
		if (c === '+' || c === '-') {
			if (state === 'none') {
				state = 'sign';
				value += c;
				continue;
			}
			if (state === 'e') {
				state = 'exponent_sign';
				value += c;
				continue;
			}
		}
		if (isDigit(c)) {
			if (state === 'none' || state === 'sign' || state === 'whole') {
				state = 'whole';
				value += c;
				continue;
			}
			if (state === 'decimal_point' || state === 'decimal') {
				state = 'decimal';
				value += c;
				continue;
			}
			if (state === 'e' || state === 'exponent_sign' || state === 'exponent') {
				state = 'exponent';
				value += c;
				continue;
			}
		}
		if (c === '.') {
			if (state === 'none' || state === 'sign' || state === 'whole') {
				state = 'decimal_point';
				value += c;
				continue;
			}
		}
		if (c === 'E' || c == 'e') {
			if (state === 'whole' || state === 'decimal_point' || state === 'decimal') {
				state = 'e';
				value += c;
				continue;
			}
		}
		break;
	}
	const number = Number.parseFloat(value);
	if (Number.isNaN(number)) {
		return [cursor, null];
	} else {
		// step back to delegate iteration to parent loop
		return [i - 1, number];
	}
};

export const parsePathData = (string: string) => {
	const pathData: Array<Segment> = [];
	let command: Command | null = null;
	let args: number[] = [];
	let argsCount = 0;
	let canHaveComma = false;
	let hadComma = false;
	for (let i = 0; i < string.length; i += 1) {
		const c = string.charAt(i);
		if (isWhiteSpace(c)) {
			continue;
		}
		// allow comma only between arguments
		if (canHaveComma && c === ',') {
			if (hadComma) {
				break;
			}
			hadComma = true;
			continue;
		}
		if (isCommand(c)) {
			if (hadComma) {
				return pathData;
			}
			if (command == null) {
				// moveto should be leading command
				if (c !== 'M' && c !== 'm') {
					return pathData;
				}
			} else if (args.length !== 0) {
				// stop if previous command arguments are not flushed
				return pathData;
			}
			command = c;
			args = [];
			argsCount = argsCountPerCommand[command];
			canHaveComma = false;
			// flush command without arguments
			if (argsCount === 0) {
				pathData.push(convertToPathItem(command, args));
			}
			continue;
		}
		// avoid parsing arguments if no command detected
		if (command == null) {
			return pathData;
		}
		// read next argument
		let newCursor = i;
		let number = null;
		if (command === 'A' || command === 'a') {
			const position = args.length;
			if (position === 0 || position === 1) {
				// allow only positive number without sign as first two arguments
				if (c !== '+' && c !== '-') {
					[newCursor, number] = readNumber(string, i);
				}
			}
			if (position === 2 || position === 5 || position === 6) {
				[newCursor, number] = readNumber(string, i);
			}
			if (position === 3 || position === 4) {
				// read flags
				if (c === '0') {
					number = 0;
				}
				if (c === '1') {
					number = 1;
				}
			}
		} else {
			[newCursor, number] = readNumber(string, i);
		}
		if (number == null) {
			return pathData;
		}
		args.push(number);
		canHaveComma = true;
		hadComma = false;
		i = newCursor;
		// flush arguments when necessary count is reached
		if (args.length === argsCount) {
			pathData.push(convertToPathItem(command, args));
			// subsequent moveto coordinates are treated as implicit lineto commands
			if (command === 'M') {
				command = 'L';
			}
			if (command === 'm') {
				command = 'l';
			}
			args = [];
		}
	}
	return pathData;
};

function convertToPathItem(c: Command, args: number[]) {
	switch (c) {
		case 'M':
		case 'm':
			return { c, x: args[0], y: args[1] };
		case 'L':
		case 'l':
			return { c, x: args[0], y: args[1] };
		case 'H':
		case 'h':
			return { c, x: args[0] };
		case 'V':
		case 'v':
			return { c, y: args[0] };
		case 'C':
		case 'c':
			return {
				c: c,
				x1: args[0],
				y1: args[1],
				x2: args[2],
				y2: args[3],
				x: args[4],
				y: args[5]
			};
		case 'S':
		case 's':
			return {
				c: c,
				x2: args[0],
				y2: args[1],
				x: args[2],
				y: args[3]
			};
		case 'Q':
		case 'q':
			return {
				c: c,
				x1: args[0],
				y1: args[1],
				x: args[2],
				y: args[3]
			};
		case 'T':
		case 't':
			return {
				c: c,
				x: args[0],
				y: args[1]
			};
		case 'A':
		case 'a':
			return {
				c: c,
				rx: args[0],
				ry: args[1],
				xRotation: args[2],
				largeArcFlag: args[3],
				sweepFlag: args[4],
				x: args[5],
				y: args[6]
			};
		case 'Z':
		case 'z':
			return { c };
	}
}
