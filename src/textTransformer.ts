import textAccounts from './resources/accountNumbers.json'
import textNumbers from './resources/numbers.json'


export const transformTextToStringArray = () : string[][] => {
    let array: string[] = textAccounts.account.split("\n");;
    let numberArrays: string[][] = [];
    
    let lines: string[] = [];
    for(let i = 0; i < array.length; i++){
        lines.push(array[i] + "\n");
        if((i + 1) % 4 === 0){
            numberArrays.push(lines);
            lines = [];
        }
    }
    return numberArrays;
}

export const reorderAccountArrays = () : string[][] =>{
    let accounts = transformTextToStringArray();
    let accountArray: string[][] = [];
    const accountLength = 9;

    for(let i = 0; i < accounts.length; i++){
        let numbers : string[] = [];
        for(let j = 0; j < accountLength; j++){
            let firstCharIndex = j*3;
            let number = "";
            if(accounts[i][0] === "\n"){
                number += "   ";
            }else{
                number += accounts[i][0][firstCharIndex];
                number += accounts[i][0][firstCharIndex + 1];
                number += accounts[i][0][firstCharIndex + 2];
            }

            number += accounts[i][1][firstCharIndex];
            number += accounts[i][1][firstCharIndex + 1];
            number += accounts[i][1][firstCharIndex + 2];

            number += accounts[i][2][firstCharIndex];
            number += accounts[i][2][firstCharIndex + 1];
            number += accounts[i][2][firstCharIndex + 2];
            
            numbers.push(number);
        }
        accountArray.push(numbers)
    }
    return accountArray;
}

// export const findNumberBasedOnText = () => {
//     const accountArray = reorderAccountArrays();
//     const accountLength = 9;
//     for(let i = 0; i < accountArray.length; i++){
//         for(let j = 0; j < accountLength; j++){
//             let string : string = accountArray[i][j];
//         }
//     }
// }