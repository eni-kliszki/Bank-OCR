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
    console.log(number);
    return ["ERR"];
}