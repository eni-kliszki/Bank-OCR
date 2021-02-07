// import resources
import { ASCIIdecoder } from './resources/ASCIIdecoder';
import { possibleNumbers } from './resources/possibleNumbers';
// import util methods
import {findNumberByDict} from './textTransformer'
import { validateChecksum } from './validateNumber';



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

const findValidNumbersForIllegal = (accountText: string[],  account: string): string[] => {
    let illegalNumberIndexes = findIllegalNumberIndexes(account);
    let validAccounts : string[] = [];
    for(let idx of illegalNumberIndexes){
        let array = findPossibleNumbersWithPipesAndUnderscores(account, accountText[idx], idx);
        array.forEach(val => validAccounts.push(val));
    }
    return validAccounts;
}

const findPossibleNumbersWithPipesAndUnderscores = (account: string, text : string, illIndex: number) : string[] => {
    let possibleUnderscorePossitions = [1, 4, 7];
    let possiblePipePossitions = [3, 5, 6, 8];
    let validAccounts = changeOneCharacterInText(account, text, illIndex, possibleUnderscorePossitions, "_");
    let validAccoutsPipe = changeOneCharacterInText(account, text, illIndex, possiblePipePossitions, "|");
    validAccoutsPipe.forEach(val => validAccounts.push(val));
    return validAccounts;
}

const changeOneCharacterInText = (account: string, text : string, illIndex: number, positions: number[], char: string) : string[] =>{
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
            if(validateChecksum(newAccount)){
                validAccounts.push("'" + newAccount + "'");
            }
        }
    }
    return validAccounts;
}


const findIllegalNumberIndexes = (account: string) : number[] => {
    let illegalNumberIndexes : number[] = [];
    for(let i = 0; i < account.length; i++){
        if(account[i] === "?"){
            illegalNumberIndexes.push(i)
        }
    }
    return illegalNumberIndexes;
}

const findValidNumbersForError = (account: string): string[] => {
    let validAccounts : string[] = [];
    for(let i = 0; i < account.length; i++){
        let char = account[i];
        for(let newNumber of possibleNumbers[char]){
            let newAccount = replaceAt(i, newNumber, account);
            if(validateChecksum(newAccount)){
                validAccounts.push("'" + newAccount + "'");
            }
        }
    }
    return validAccounts;
}

const replaceAt = (index: number, replacement: string, account: string) => {
    return account.substr(0, index) + replacement + account.substr(index + replacement.length);
}