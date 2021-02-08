import { useQuery } from 'react-query';
//import style
import { AccountContainer, AccountNumberContainer } from './Accounts.style';
//import util functions
import { findNumbersBasedOnText, reorderAccountArrays } from '../textTransformer';
//import fetch methods
import {getAccountsUS1} from '../fetchFromBackend';


const Accounts = () => {
        
    const {data, isLoading, error} = useQuery<string[]>('accounts', getAccountsUS1);

    // after fetch save reordered account text (eg. [" _ |_||_|", " _ |_||_|", ...]) in variable 
    let reorderedAccountTexts : string[][] = [[]];
    if(!isLoading){
        reorderedAccountTexts =  reorderAccountArrays(data!);
    }
    
    
    if(isLoading){
         return <div>Loading...</div>
    }else if(error) {
        return <div>Something went wrong...</div>
    }
    else{
        return(
            <div>
            <h3>Accounts:</h3>
            {isLoading ? <div>Loading...</div> : (
                // representation of account numbers
                findNumbersBasedOnText(reorderedAccountTexts).map((account, index) => {
                    return (
                        <AccountContainer>
                            <AccountNumberContainer key={index}>{account}</AccountNumberContainer>
                        </AccountContainer>)}
                    )
                )}
            </div>
        )
    }
}

export default Accounts;