import { useQuery } from 'react-query';
//import style
import { AccountContainer, AccountNumberContainer } from './Accounts.style';
//import util functions
import { reorderAccountArrays, findNumberBasedOnText } from '../textTransformer';
import { validateChecksum} from '../validateNumber'

//import fetch methods
import { getAccountsUS3 } from '../fetchFromBackend';
//import components
import PossibleValidNumbers from './PossibleValidNumbers';


const Accounts = () => {
    const {data, isLoading, error} = useQuery<string[]>('accounts', getAccountsUS3);
    let reorderedAccountTexts : string[][] = [[]];

    if(!isLoading){
        reorderedAccountTexts =  reorderAccountArrays(data!);
    }
    
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
                findNumberBasedOnText(reorderedAccountTexts).map((account, index) => {
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