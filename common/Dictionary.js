var Dictionary = function(o) {
	o = o || {};
	this.text = o.text || '';
	this.words = o.words || {};
	this.total_words = o.total_words || 0;
	this.two_words = o.two_words || {};
	this.total_two_words = o.total_two_words || 0;
	this.n_words = o.n_words || {};
	this.total_n_words = o.total_n_words || 0;
	this.word_count = function () {
		this.total_words = 0;
		for (let i in this.words) {
			this.total_words += this.words[i];
		}
		this.total_two_words = 0;
		for (let i in this.two_words) {
			this.total_two_words += this.two_words[i];
		}
		this.total_n_words = 0;
		for (let i in this.n_words) {
			this.total_n_words += this.n_words[i];
		}
	}
	this.clean_f = function () {
		f_reg = /^[npmlobtyjksedqwrufghzxcv]$/;
		for (let i in this.words) {
			if (f_reg.test(i)) {
				this.total_words -= this.words[i];
				delete this.words[i];
			}
		}
		for (let i in this.two_words) {
			let a = i.split(' ')[0], b = i.split(' ')[1];
			if (f_reg.test(a) || f_reg.test(b)) {
				this.total_two_words -= this.two_words[i];
				delete this.two_words[i];
			}
		}
		for (let i in this.n_words) {
			let a = i.split(' ');
			for (let j = 0; j < a.length; j++) {
				a[j] = a[j].split(',')[0];
				if (f_reg.test(a[j])) {
					this.total_n_words -= this.n_words[i];
					delete this.n_words[i];
				}
			}
		}
	}
	this.repair_broken_words = function () {
		for (let twoWords in this.two_words) {
			var maybeUnited = twoWords.split(' ').join('');
			if (maybeUnited in this.words && this.two_words[twoWords] == 1) {
				this.words[maybeUnited]++;
				this.total_words++;
				this.total_two_words -= this.two_words[twoWords]
				delete this.two_words[twoWords];
			}
		}
	}
	this.clean_greek = function () {
		var greek_reg = /[\u0370-\u03ff]/;
		for (let i in this.words) {
			if (greek_reg.test(i)) {
				this.total_words -= this.words[i];
				delete this.words[i];
			}
		}
		for (let i in this.two_words) {
			if (greek_reg.test(i)) {
				this.total_two_words -= this.two_words[i];
				delete this.two_words[i];
			}
		}
		for (let i in this.n_words) {
			if (greek_reg.test(i)) {
				this.total_n_words -= this.n_words[i];
				delete this.n_words[i];
			}
		}
	}
}
module.exports = Dictionary;
