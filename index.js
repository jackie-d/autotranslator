const translate = require('@vitalets/google-translate-api');
const process = require('process');
const tunnel = require('tunnel');
const ProxyList = require('free-proxy');
const proxyList = new ProxyList();
var keypress = require('keypress');


var langs = require('./langs.json');

var output = "";

var keys = Object.keys(langs);

var i = 0;

let proxyURL = '';
let proxyPort = 80;

proxyList.random().then(proxy => {
	console.log(proxy);
	proxyURL = proxy.ip;
	proxyPort = proxy.port;
	tran(keys[i]);
});

function tran(key){
	console.log("---"+key);
	translate(
		langs[key], 
		{from: 'it', to: 'en'}, 
		{
		    agent: tunnel.httpsOverHttp({
			    proxy: { 
			      host: proxyURL,
			      port: proxyPort+'',
			      headers: {
			        'User-Agent': 'Node'
			      }
			    }
			})
		}
	).then(res => {
	    output += "\""+key+"\" => \""+res.text+"\",\n";
	    checkDone();
	}).catch(err => {
	    console.error(err);
	    if (err.code == 'BAD_REQUEST' || err.code == 'BAD_NETWORK' ) {
	    	proxyList.random().then(proxy => {
				console.log(proxy);
				proxyURL = proxy.ip;
				proxyPort = proxy.port;
				checkDone();
			});
	    } else {
	    	checkDone();
	    }
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

process.on('SIGINT', function() {
    console.log(output);

    process.exit();
});

keypress(process.stdin);
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key && key.name == 'n') {
  	console.log('Change proxy...');
	proxyList.random().then(proxy => {
		console.log(proxy);
		proxyURL = proxy.ip;
		proxyPort = proxy.port;
	});
  } else if (key && key.ctrl && key.name == 'c') {
  	console.log('Exit...');
  	console.log(output);
  	process.exit();
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();