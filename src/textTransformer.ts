import textAccounts from './resources/accountNumbers.json'
import textNumbers from './resources/numbers.json'


export const splitDataInNewEveryFourLines = (data: string[]) : string[][] => {
    let accountTexts: string[][] = [];
    
    let accountText: string[] = [];
    for(let i = 0; i < data.length; i++){
        accountText.push(data[i]);
        if((i + 1) % 4 === 0){
            accountTexts.push(accountText);
            accountText = [];
        }
    }
    return accountTexts;
}

export const reorderAccountArrays = (data: string[]) : string[][] =>{
    let accountArray: string[][] = [];

        console.log(splitDataInNewEveryFourLines(data));
        return accountArray;
    }
    
    // const accountLength = 9;

    // for(let i = 0; i < accounts.length; i++){
    //     let numbers : string[] = [];
    //     for(let j = 0; j < accountLength; j++){
    //         let firstCharIndex = j*3;
    //         let number = "";
    //         if(accounts[i][0] === "\n"){
    //             number += "   ";
    //         }else{
    //             number += accounts[i][0][firstCharIndex];
    //             number += accounts[i][0][firstCharIndex + 1];
    //             number += accounts[i][0][firstCharIndex + 2];
    //         }

    //         number += accounts[i][1][firstCharIndex];
    //         number += accounts[i][1][firstCharIndex + 1];
    //         number += accounts[i][1][firstCharIndex + 2];

    //         number += accounts[i][2][firstCharIndex];
    //         number += accounts[i][2][firstCharIndex + 1];
    //         number += accounts[i][2][firstCharIndex + 2];
            
    //         numbers.push(number);
    //     }
    //     accountArray.push(numbers)
    // }
// }

// export const findNumberBasedOnText = () => {
//     const accountArray = reorderAccountArrays();
//     const accountLength = 9;
//     for(let i = 0; i < accountArray.length; i++){
//         for(let j = 0; j < accountLength; j++){
//             let string : string = accountArray[i][j];
//         }
//     }
// }