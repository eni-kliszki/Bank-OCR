import * as accounts from './resources/accountNumbers.json'

export const TransformTextToStringArray = () : string[][] => {
    let array: string[] = accounts.account.split("\n");;
    let numberArrays: string[][] = [];
    
    let lines: string[] = [];
    for(let i = 0; i < array.length; i++){
        lines.push(array[i] + "\n");
        if((i + 1) % 4 === 0){
            numberArrays.push(lines);
            lines = [];
        }
    }
    return numberArrays;
}

export const findTheMatchWithRealNumber = () =>{
    
}
