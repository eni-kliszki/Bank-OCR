// get an account number
// iterate over the characters of the number and count the checksum
// returns the checksum value as a number
const countChecksum = (number : string) : number => {
    let counter = number.length;
    let checksum = 0;

    for(let char of number){
        checksum += counter * parseInt(char);
        counter--;
    }
    return checksum
}

// use countChecksum method to decide if the checksum is valid  
export const validateChecksum = (number: string): boolean => 
    countChecksum(number) % 11 === 0;
