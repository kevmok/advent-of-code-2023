/* Solution to Trebuchet Part 1 & 2 */

/* --- Trebuchet?! Part 1 --- */

export function Trebuchet(calibrationDocument: (string | number)[]): number {
  let sum = 0;
  for (let i = 0; i < calibrationDocument.length; i++) {
    const str = calibrationDocument[i].toString();
    sum += findFirstAndLastDigit(str);
  }
  return sum;
}

// function to find the first digit and the last digit in a string
function findFirstAndLastDigit(str: string): number {
  let first = '';
  let last = '';
  for (let i = 0; i < str.length; i++) {
    if (isNumber(str[i])) {
      first = str[i];
      break;
    }
  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (isNumber(str[i])) {
      last = str[i];
      break;
    }
  }
  return parseInt([first, last].join(''));
}

// function to check if string character is a number
function isNumber(char: string): boolean {
  return !Number.isNaN(parseInt(char));
}

/* --- Trebuchet?! Part 2 --- */
/* --- Day 1: Trebuchet?! Part 1 --- */

const numberMap = new Map<string, string>([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
]);

export function Trebuchet_2(calibrationDocument: (string | number)[]): number {
  let sum = 0;
  for (let i = 0; i < calibrationDocument.length; i++) {
    const str = calibrationDocument[i].toString();
    sum += findFirstAndLastDigitWithWords(str);
  }
  return sum;
}

// function to find the first digit and the last digit in a string
function findFirstAndLastDigitWithWords(str: string): number {
  let first = '';
  let last = '';
  let wordBuilder = '';
  for (let i = 0; i < str.length; i++) {
    if (isNumber(str[i])) {
      first = str[i];
      break;
    }
    wordBuilder += str[i];
    const key = findKeyInString(wordBuilder);
    if (key) {
      first = numberMap.get(key) as string;
      break;
    }
  }
  wordBuilder = '';
  for (let i = str.length - 1; i >= 0; i--) {
    if (isNumber(str[i])) {
      last = str[i];
      break;
    }
    // prepend to the string
    wordBuilder = str[i] + wordBuilder;
    const key = findKeyInString(wordBuilder);
    if (key) {
      last = numberMap.get(key) as string;
      break;
    }
  }
  return parseInt([first, last].join(''));
}

function findKeyInString(str: string) {
  for (const key of numberMap.keys()) {
    if (str.includes(key)) {
      return key;
    }
  }
}
