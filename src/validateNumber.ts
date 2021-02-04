export const countChecksum = (number : string) => {
    let counter = number.length;
    let checksum = 0;

    for(let char of number){
        checksum += counter * parseInt(char);
        counter--;
    }
    return checksum
}

