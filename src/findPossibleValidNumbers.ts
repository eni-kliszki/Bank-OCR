// import resources
import { ASCIIdecoder } from './resources/ASCIIdecoder';
import { possibleNumbers } from './resources/possibleNumbers';
// import util methods
import {findNumberByDict} from './textTransformer'
import { validateChecksum } from './validateNumber';


// gets account symbols of an account as an array, a status and the account number as a string
// calls the appropriate method which finds the possible account numbers for the illegal or error numbers
// returns the possible valid numbers as a string
export const findValidNumbers = (status : string, account: string, accountText: string[]): string => {
    let possibleAccounts :string[]
    if(status === "ILL"){
        possibleAccounts = findValidNumbersForIllegal(accountText, account);
        if(possibleAccounts.length > 0){
            return "AMB [" + possibleAccounts.join(', ') + "]";
        }
        return "ILL"
    }else if(status === "ERR"){
        possibleAccounts = findValidNumbersForError(account);
        if(possibleAccounts.length > 0){
            return "AMB [" + possibleAccounts.join(', ') + "]";
        }
        return "ERR"
    }
    return "";
}

// iterate over the illegal symbols of the account text 
// calls the method which find the possible account numbers to this illegal account number
// returns the possible account numbers as an array of strings
const findValidNumbersForIllegal = (accountText: string[],  account: string): string[] => {
    let illegalNumberIndexes = findIllegalNumberIndexes(account);
    let validAccounts : string[] = [];
    for(let idx of illegalNumberIndexes){
        let array = findPossibleNumbersWithPipesAndUnderscores(account, accountText[idx], idx);
        array.forEach(val => validAccounts.push(val));
    }
    return validAccounts;
}


// stores the possible positions (index) of the characters ("_" or "|")
// calls the findValidNumbersByChangeOneCharacterInText method with the correct characters
// returns the possible account numbers as an array of strings
const findPossibleNumbersWithPipesAndUnderscores = (account: string, text : string, illIndex: number) : string[] => {
    let possibleUnderscorePossitions = [1, 4, 7];
    let possiblePipePossitions = [3, 5, 6, 8];
    let validAccounts = findValidNumbersByChangeOneCharacterInText(account, text, illIndex, possibleUnderscorePossitions, "_");
    let validAccoutsPipe = findValidNumbersByChangeOneCharacterInText(account, text, illIndex, possiblePipePossitions, "|");
    validAccoutsPipe.forEach(val => validAccounts.push(val));
    return validAccounts;
}

// gets the account number, the illegal symbol (e.g. "   | ||_|"), the illegal symbol's index, the character
// and the character's possible positions in the symbol (index)
// iterate over the the possible positions (index) of the character
// replace the character and check if the new account number is valid
// return the possible valid accounts as an array of strings
const findValidNumbersByChangeOneCharacterInText = (account: string, text : string, illIndex: number, positions: number[], char: string) : string[] =>{
    let validAccounts : string[] = [];
    for(let idx of positions){
        let newText = "";
        if(text[idx] === char){
            newText = replaceAt(idx, " ", text);
        }else{
            newText = replaceAt(idx, char, text);
        }
        let newNumber = findNumberByDict(newText, ASCIIdecoder);
        if(newNumber !== "?"){
            let newAccount = replaceAt(illIndex, newNumber, account);
            checkIfNumberIsValid(newAccount, validAccounts);
        }
    }
    return validAccounts;
}

// check if the number is valid
// returns a new array with the valid accounts
const checkIfNumberIsValid = (newAccount: string, validAccounts: string[]): string[] => {
    if(validateChecksum(newAccount)){
        validAccounts.push("'" + newAccount + "'");
    }
    return validAccounts;
}

// iterates over an account number
// finds the indexes of the question marks
// returns the indexes 
const findIllegalNumberIndexes = (account: string) : number[] => {
    let illegalNumberIndexes : number[] = [];
    for(let i = 0; i < account.length; i++){
        if(account[i] === "?"){
            illegalNumberIndexes.push(i)
        }
    }
    return illegalNumberIndexes;
}

// iterates over the characters of the account number
// changes the character to another possible number
// checks if the new number is valid
// returns the possible valid numbers as an array of strings
const findValidNumbersForError = (account: string): string[] => {
    let validAccounts : string[] = [];
    for(let i = 0; i < account.length; i++){
        let char = account[i];
        for(let newNumber of possibleNumbers[char]){
            let newAccount = replaceAt(i, newNumber, account);
            checkIfNumberIsValid(newAccount, validAccounts);

        }
    }
    return validAccounts;
}


// util method to replace a character in a string
const replaceAt = (index: number, replacement: string, account: string) => {
    return account.substr(0, index) + replacement + account.substr(index + replacement.length);
}