import { validateChecksum } from './validateNumber'

const possibleNumbers: {[key: string]: string[]} = {
    "0": ["8"],
    "1": ["7"],
    "2": [""], 
    "3": ["9"], 
    "4": [""], 
    "5": ["9", "6"], 
    "6": ["8"], 
    "7": ["1"], 
    "8": ["0", "9", "6"], 
    "9": ["3", "8", "5"]
}


export const findValidNumbers = (status : string, account: string, accountText: string[]): string => {
    let possibleAccounts :string[]
    if(status === "ILL"){
        possibleAccounts = findValidNumbersForIllegal(accountText, account);
        return "AMB [" + possibleAccounts.join(', ') + "]";
    }else if(status === "ERR"){
        possibleAccounts = findValidNumbersForError(account);
        return "AMB [" + possibleAccounts.join(', ') + "]";
    }
    return "";
}

const findValidNumbersForIllegal = (accountText: string[],  account: string,): string[] => {
    let illegalNumberIndexes = findIllegalNumberIndexes(accountText);
    
    return ["ILL"];
}

const findIllegalNumberIndexes = (accountText: string[]) : number[] => {
    let illegalNumberIndexes : number[] = [];
    let index = 0;
    while (index !== -1) {
        illegalNumberIndexes.push(index);
        index = accountText.indexOf("?", index + 1);
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