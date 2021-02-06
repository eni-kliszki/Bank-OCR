import { ASCIIdecoder } from './ASCIIdecoder';

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

export const findNumberBasedOnText = (accountArray: string[][]) : string[] => {
    let accountNumbers : string[] = [];
    for(let i = 0; i < accountArray.length; i++){
        let accountNumber = findAccountNumberByDict(accountArray[i], ASCIIdecoder);
        accountNumbers.push(accountNumber);
    }
    return accountNumbers;
}

export const findAccountNumberByDict = (accountText: string[], ASCIIdecoder:{[key: string]: string}) => {
    const accountLength = 9;
    let accountNumber : string = "";
    for(let j = 0; j < accountLength; j++){
        let arabicNumber = ASCIIdecoder[accountText[j]];
        if(arabicNumber === undefined){
            accountNumber += "?";
        }else{
            accountNumber += arabicNumber;
        }
    }
    return accountNumber;
}