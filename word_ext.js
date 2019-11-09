function is_repeat (dictionary, word){
	for (let i in dictionary)
		if (i == word)
			return true;
	return false;
}
var reg_letter = /[^\d\s.,“”""''<>…|&√\^=_↔«»\\\/()@#\[\]—{}–\*$№/+%:;!‘’`\?]/;
var first_word_pos = 0;
var mem;
var word_ext = function (data, dictionary) {
	for (let i = 0; i < data.length; i++){
		let word = data.slice(first_word_pos, i);
		if (word == '-') {
			continue;
		}
		else if (word[0] == '-'){
			word = word.slice(1);
		}
		else if (word[word.length-1] == '-' && !reg_letter.test(data[i+1])){
			mem = word.slice(0,-1);
			continue;
		}
		let isRepeat = is_repeat(dictionary, word);
		if (!reg_letter.test(data[i]) && reg_letter.test(data[i-1]) && isRepeat) {
			dictionary[word]++;
		}
		if (!reg_letter.test(data[i]) && reg_letter.test(data[i-1]) && !isRepeat){
			if (mem){
				console.log(mem,word);
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