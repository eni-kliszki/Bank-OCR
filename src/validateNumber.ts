const countChecksum = (number : string) : number => {
    let counter = number.length;
    let checksum = 0;

    for(let char of number){
        checksum += counter * parseInt(char);
        counter--;
    }
    return checksum
}

export const validateChecksum = (number: string): boolean => 
    countChecksum(number) % 11 === 0;


export const checkStatusToAccounts = (accountNumbers : string[]) => {
    for(let i = 0; i < accountNumbers.length; i++){
        if(accountNumbers[i].includes("?")){
            findValidNumbersForIllegal();
        }else if(!validateChecksum(accountNumbers[i])){
            findValidNumbersForError(accountNumbers[i]);
        }
    }
}

const findValidNumbersForIllegal = () => {}

const findValidNumbersForError = (number: string): string[] => {
    let validNumbers : string[] = [];
    console.log(number);
    return validNumbers;
}