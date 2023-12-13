# autotranslator

## Read the key-values Json with terms in a set languague from a country and translates it to another language

Reads a Json file from the user locally which contains words or sentences of natural human language, translates it by Google services and it gives out a Json with same keys and updated values.

## Requirements

Install [node.js](https://nodejs.org/)

Install with 

`npm install`

## Usage

Set your key values on this file: `input.json`

Run with:

`node index.js`

#### Non-interactive

It's possible to run the command also as `node index.js it en` so it gets specified on prior which languages to translate from and to.

#### Save output to a file

If you run the script by `node index.js > output.json` you can save the resulting Json object directly to a local file.

#### Terminate execution

If you press `CTRL+C` you can terminate in any moment the program exection but you keep the Json output of the work already did

#### Codes for language

Codes of two letters are requested as language identifiers
- [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

## GitHub Repository

This is a software written in Javascript Module and it uses [@vitalets/google-translate-api](@vitalets/google-translate-api) library

## Creator and contributors

Author Suns Deglinnocenti a.k.a. Jackie

Software under the MIT license