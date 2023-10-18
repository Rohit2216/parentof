// words reverse

function reverseWords(str) {
    var words = [];
    var currentWord = '';

    for (var i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            currentWord += str[i];
        } else {
            words.push(currentWord);
            currentWord = '';
        }
    }
    words.push(currentWord);

    var reversedString = '';
    
    for (var j = words.length - 1; j >= 0; j--) {
        reversedString += words[j];
        if (j > 0) {
            reversedString += ' ';
        }
    }

    return reversedString;
}

var input = "rohit chauhan";
var output = reverseWords(input);
console.log(output); // Output: "chauhan rohit"


// characters reverse

function reverseWordsCharacters(inputString) {
    var words = inputString.split(' ');

    function reverseWord(word) {
        var reversedWord = '';
        for (var i = word.length - 1; i >= 0; i--) {
            reversedWord += word[i];
        }
        return reversedWord;
    }

    var reversedWords = words.map(reverseWord);

    var reversedString = reversedWords.join(' ');

    return reversedString;
}

var input = "rohit manish";
var output = reverseWordsCharacters(input);
console.log(output); // Output: "tihor nahuahc"

