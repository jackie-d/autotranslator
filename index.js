const translate = require('google-translate-api');

var langs = require('./langs.json');

var output = "";

var keys = Object.keys(langs);

var i = 0;

tran(keys[i]);

function tran(key){
	console.log("---"+key);
	translate(langs[key], {from: 'en', to: 'es'}).then(res => {
	    output += "\""+key+"\" => \""+res.text+"\",\n";
	    checkDone();
	}).catch(err => {
	    console.error(err);
	    checkDone();
	});
}

function checkDone(){
	i++;
	if(keys.length > i){
		var key = keys[i];
		tran(key);
		return;
	}
	done();
}

function done(){
	console.log(output);
}