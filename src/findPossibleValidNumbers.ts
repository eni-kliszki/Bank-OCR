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


export const findValidNumbers = (status : string, account: string): string[] => {
    if(status === "ILL"){
        return findValidNumbersForIllegal();
    }else if(status === "ERR"){
        return findValidNumbersForError(account);
    }
    return [];
}

const findValidNumbersForIllegal = () => {
    return ["ILL"];
}

const findValidNumbersForError = (number: string): string[] => {
    let validNumbers : string[] = [];
    return ["ERR"];
}