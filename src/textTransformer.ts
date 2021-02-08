import { symbolDecoder } from './resources/symbolDecoder';

// iterate over the result of the fetch method (array which contains the lines of the document as a string) 
// returns a nested array, in which the inner array contains the four lines of an account number as strings
// eg. [ ...
// [" _  _  _  _  _  _  _  _  _ ", "|_||_||_||_||_||_||_||_||_|", "|_||_||_||_||_||_||_||_||_|", ""]
//       ...]
export const splitDataInNewEveryFourLines = (data: string[]) : string[][] => {
    let accountTexts: string[][] = [];
    
    let accountText: string[] = [];
    for(let i = 0; i < data.length; i++){
        data[i] = data[i].replace(',','');
        accountText.push(data[i]);
        if((i + 1) % 4 === 0){
            accountTexts.push(accountText);
            accountText = [];
        }
    }
    return accountTexts;
}


// iterate over the result of the splitDataInNewEveryFourLines method
// reorder every inner array,
// returns 9 long arrays in an array, in which every string in the inner array
// represents the symbols of an arabic number 
// eg. [ ...
// [" _ |_||_|", " _ |_||_|", " _ |_||_|", " _ |_||_|", " _ |_||_|", " _ |_||_|", " _ |_||_|", " _ |_||_|", " _ |_||_|"]
//       ...]
export const reorderAccountArrays = (data: string[]) : string[][] =>{
    const accountText = splitDataInNewEveryFourLines(data);
    let accountArray: string[][] = [];
    const accountLength = 9;
    
    for(let i = 0; i < accountText.length; i++){
        let numbers : string[] = [];
        for(let j = 0; j < accountLength; j++){
            let firstCharIndex = j*3;
            let number = "";
            if(accountText[i][0] === ""){
                number += "   ";
            }else{
                number += accountText[i][0][firstCharIndex];
                number += accountText[i][0][firstCharIndex + 1];
                number += accountText[i][0][firstCharIndex + 2];
            }

            number += accountText[i][1][firstCharIndex];
            number += accountText[i][1][firstCharIndex + 1];
            number += accountText[i][1][firstCharIndex + 2];

            number += accountText[i][2][firstCharIndex];
            number += accountText[i][2][firstCharIndex + 1];
            number += accountText[i][2][firstCharIndex + 2];
            
            numbers.push(number);
        }
        accountArray.push(numbers);
    }
    return accountArray;
}

// iterate over the result of the reorderAccountArrays method
// calls a util method, which finds the correct arabic account number to the symbols
// returns an array which contains the correct arabic account numbers as strings
export const findNumbersBasedOnText = (accountArray: string[][]) : string[] => {
    let accountNumbers : string[] = [];
    for(let i = 0; i < accountArray.length; i++){
        let accountNumber = findAccountNumberByDict(accountArray[i]);
        accountNumbers.push(accountNumber);
    }
    return accountNumbers;
}

// iterate over an array, which contains one account number's symbols
// calls a util method, which finds the correct arabic number to a symbol
// returns an account number as a string
const findAccountNumberByDict = (accountText: string[]) => {
    let accountNumber : string = "";
    const accountLength = 9;
    for(let j = 0; j < accountLength; j++){
        accountNumber += findNumberByDict(accountText[j], symbolDecoder);
    }
    return accountNumber;
}

// get a symbol and find the correct arabic number to it
// returns and arabic number, if it is a valid symbol, else returns a question mark 
export const findNumberByDict = (text: string, symbolDecoder:{[key: string]: string}) : string => {
    let arabicNumber = symbolDecoder[text];
    return arabicNumber === undefined ? "?" : arabicNumber;
}