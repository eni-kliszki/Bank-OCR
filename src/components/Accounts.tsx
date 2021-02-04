import { useQuery } from 'react-query';

//import util functions
import { findNumberBasedOnText } from '../textTransformer';
import { validateChecksum } from '../validateNumber'

//import fetch methods
import {getAccountsUS1, getAccountsUS3} from '../fetchFromBackend';



const Accounts = () => {
        
    const {data, isLoading, error} = useQuery<string[]>('accounts', getAccountsUS3);

    const checkIfDataNotUndefined = (data: any): boolean => {
        return data !== undefined;
    }

    const checkIfNumberIsInvalidOrIllegal = (number: string) : string => {
        if(number.includes("?")){
            return "ILL";
        }
        return validateChecksum(number) ? "" : "ERR";
    }
    

    if(isLoading){
         return <div>Loading...</div>
    }else if(error) {
        return <div>Something went wrong...</div>
    }
    else{
        if(checkIfDataNotUndefined(data)){
            let dataArray:string[] = data!; 
            let accounts = findNumberBasedOnText(dataArray);
            return(
                <div>
                <h3>Accounts:</h3>
                {accounts.map(account => 
                    <div key={account}>{account} | {checkIfNumberIsInvalidOrIllegal(account)}</div>
                    )}
                </div>
            )
        }else{
            return <div>There is no account number</div>
        }
    }
}

export default Accounts;