var reg_letter = /[^\s“”—–′‘’`\u0001-\u002c \u005b-\u0060 \u002e-\u0040 \u00a1-\u00bf \u007b-\u007e \u20a0-\u20b0 \u2020-\u2027 \u2100-\u214f \u2190-\u2426 \u2900-\u2aff]/;
var first_word_pos = 0;
var mem;
var word_ext = function (data, dictionary) {
	for (let i = 0; i < data.length; i++){
		let word = data.slice(first_word_pos, i);
		if (/^-+$/.test(word) || word == "") {
			continue;
		}
		else if (word[0] == '-'){
			word = word.slice(1);
		}
		else if (word[word.length-1] == '-' && !reg_letter.test(data[i+1])){
			mem = word.slice(0,-1);
			continue;
		}
		let isRepeat = word in dictionary;
		if (!reg_letter.test(data[i]) && reg_letter.test(data[i-1]) && isRepeat) {
			dictionary[word]++;
		}
		if (!reg_letter.test(data[i]) && reg_letter.test(data[i-1]) && !isRepeat){
			if (mem){
				word = mem + word;
				mem = false;
			}
			dictionary[word] = 1;
		}
		if (reg_letter.test(data[i]) && !reg_letter.test(data[i-1])){
			first_word_pos = i;
		}
	}
}
module.exports = word_ext;
