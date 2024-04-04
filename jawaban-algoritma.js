// jawban soal 1
function reverseAlphabetWithNumber(str) {
    let alphabetPart = str.match(/[A-Za-z]+/);
    let numberPart = str.match(/\d+/);
    if (alphabetPart && numberPart) {
        let reversedAlphabet = alphabetPart[0].split('').reverse().join('');
        return reversedAlphabet + numberPart[0];
    } else {
        return "String tidak valid.";
    }
}

console.log(reverseAlphabetWithNumber("NEGIE1"));

// jawaban soal 2
function longest(sentence) {
    const words = sentence.split(" ");
    let longestWord = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }

    return `${longestWord}: ${longestWord.length} character`;
}

function findLongestWord() {
    const sentence = prompt("Masukkan kalimat:");
    const result = longest(sentence);
    console.log(result);
}

findLongestWord();

// jawaban soal 3
function countWordsInQuery(INPUT, QUERY) {
    const wordCount = {};
    INPUT.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const result = QUERY.map(word => wordCount[word] || 0);
    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(countWordsInQuery(INPUT, QUERY));

// jawaban soal 4 
function diagonalDifference(matrix) {
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < matrix.length; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][matrix.length - 1 - i];
    }

    const difference = primaryDiagonalSum - secondaryDiagonalSum;

    console.log("Diagonal pertama =", primaryDiagonalSum);
    console.log("Diagonal kedua =", secondaryDiagonalSum);
    console.log("Maka hasilnya adalah", Math.abs(difference));
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

diagonalDifference(matrix);

