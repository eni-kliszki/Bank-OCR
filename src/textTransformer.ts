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
    const accountText = splitDataInNewEveryFourLines(data);
    console.log(accountText);

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

// export const findNumberBasedOnText = () => {
//     const accountArray = reorderAccountArrays();
//     const accountLength = 9;
//     for(let i = 0; i < accountArray.length; i++){
//         for(let j = 0; j < accountLength; j++){
//             let string : string = accountArray[i][j];
//         }
//     }
// }