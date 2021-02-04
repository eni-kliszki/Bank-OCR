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
