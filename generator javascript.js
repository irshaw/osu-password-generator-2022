// define vars

var uppercaseEl = document.getElementById('uppercase');

var lowercaseEl = document.getElementById('lowercase');

var numbersEl = document.getElementById('numbers');

var symbolsEl = document.getElementById('symbols');

var lengthEl = document.getElementById('length');

var generateEl = document.getElementById('generate');

var clipboard = document.getElementById('clipboard');

var resultEl = document.getElementById('result');


// prop & func for upper,lower,number, symbol

var randomFunc = {
	lower: getRandomLower,

	upper: getRandomUpper,

	number: getRandomNumber,

	symbol: getRandomSymbol
}
// save copy clip

clipboard.addEventListener('click', () => {

	var textarea = document.createElement('textarea');
	var password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	// clipboard alert 
	alert('Password copied to clipboard');
});

 // create my key 
generate.addEventListener('click', () => {

	var length = +lengthEl.value;
	var hasLower = lowercaseEl.checked;
	var hasUpper = uppercaseEl.checked;
	var hasNumber = numbersEl.checked;
	var hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// array
function generatePassword(lower, upper, number, symbol, length) {

	let generatedPassword = '';

	var typesCount = lower + upper + number + symbol;

	var typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// no selected type

	if(typesCount === 0) {
		return '';
	}
	
	//  a loop
	for(let i=0; i<length; i+=typesCount) {

		typesArr.forEach(type => {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	var finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}
 // final functions 

function getRandomLower() {

	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {

	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {

	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {

	var symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}
// 

