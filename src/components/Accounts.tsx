import { useQuery } from 'react-query';
//import style
import { AccountContainer, AccountNumberContainer } from './Accounts.style';
//import util functions
import { reorderAccountArrays, findNumbersBasedOnText } from '../textTransformer';
import { validateChecksum} from '../validateNumber'

//import fetch methods
import { getAccountsUS4 } from '../fetchFromBackend';
//import components
import PossibleValidNumbers from './PossibleValidNumbers';


const Accounts = () => {
    // use useQuery method to fech data from backend, save the result as data
    const {data, isLoading, error} = useQuery<string[]>('accounts',getAccountsUS4);
    
    // after fetch save reordered account text (eg. [" _ |_||_|", " _ |_||_|", ...]) in variable 
    let reorderedAccountTexts : string[][] = [[]];
    if(!isLoading){
        reorderedAccountTexts =  reorderAccountArrays(data!);
    }
    
    // util method to represent if account number is valid, error or illegal
    const checkIfNumberIsInvalidOrIllegal = (number: string) : string => {
        if(number.includes("?")){
            return "ILL";
        }
        return validateChecksum(number) ? "" : "ERR";
    }

    return (
        <div>
            {error && <div>There is no account number</div>}
            <h3>Accounts:</h3>
            {isLoading ? <div>Loading...</div> : (
                // representation of account numbers
                findNumbersBasedOnText(reorderedAccountTexts).map((account, index) => {
                    let status = checkIfNumberIsInvalidOrIllegal(account);
                    return (
                        <AccountContainer>
                            <AccountNumberContainer key={account}>{account}</AccountNumberContainer>
                            <PossibleValidNumbers account={account} status={status} accountText={reorderedAccountTexts[index]} />
                        </AccountContainer>)}
                    )
                )}
        </div>)
        
}

export default Accounts;