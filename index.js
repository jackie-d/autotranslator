import { translate } from '@vitalets/google-translate-api';
import keypress from 'keypress';
import promptSync from "prompt-sync";
const prompt = promptSync()

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const inputTerms = require("./input.json");

const translatedTerms = {};

// set the languages for the translation
let sourceLanguage;
let destinationLanguage;

if ( process.argv.length >= 3 ) {
	sourceLanguage = process.argv[2];
} else {
	sourceLanguage = prompt("Which language are the terms to translate in? (it) ", "it");
}
if ( process.argv.length >= 4 ) {
	sourceLanguage = process.argv[3];
} else {
	destinationLanguage = prompt("Which is the language of result for the terms? (en) ", "en");
}

// set the exit on CTRL+C
keypress(process.stdin);
process.stdin.on('keypress', function (ch, key) {
	if (key && key.ctrl && key.name == 'c') {
		console.error('User terminated execution');
		console.log(translatedTerms);
		process.exit();
  	}
});
process.stdin.setRawMode(true);
process.stdin.resume();

// execute the translation
for ( const key in inputTerms ) {
	try {
		const { text } = await translate( 
			inputTerms[key], 
			{
				from: sourceLanguage,
				to: destinationLanguage,

			}
		);
		translatedTerms[key] = text;
	} catch ( err ) {
		if (err.code == 'BAD_REQUEST' || err.code == 'BAD_NETWORK' ) {
			console.error(`Server didn\'t processed the request (key: ${key})`);
			continue;
		}
	}
}

console.log(translatedTerms);
