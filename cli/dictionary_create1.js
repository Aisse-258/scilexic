var fs = require('fs');
var pdfUtil = require('pdf-to-text');
var word_ext = require('../common/word_ext_match.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var Dictionary = {};
var counter = 0;
var dictionary_create = function (files, dictionary_name) {
    if(dictionary_name.slice(-5) != '.json'){
        console.log('WARNING: Dictionary should be a .json file. '+dictionary_name+' is not .json.');
    }
    if (fs.existsSync(dictionary_name)){
        console.log('ERROR: File '+dictionary_name+' is already exists.');
        process.exit(1);
    }
    for (let i = 0; i < files.length; i++){
        pdfUtil.pdfToText(files[i], function(err, data) {
            if (err){
                throw(err);
            }
            data = data.normalize('NFKC');
            fs.writeFileSync(files[i].slice(0,-4) + ".txt", clean_text(data), function(err){
                if(err)
                    return console.log(err);
            });
            word_ext(data.toLowerCase(), Dictionary);
            counter++;
            if (counter == files.length){
                fs.writeFile(dictionary_name, JSON.stringify(Dictionary), function(err){
                    if(err){
                        return console.log(err);
                    }
                });
            }
        });
    }
}
dictionary_create(process.argv.slice(3), process.argv[2]);
