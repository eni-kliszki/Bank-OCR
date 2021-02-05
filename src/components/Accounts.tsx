import { useQuery } from 'react-query';
//import style
import { AccountContainer } from './Accounts.style';
//import util functions
import { findNumberBasedOnText } from '../textTransformer';
import { validateChecksum} from '../validateNumber'

//import fetch methods
import { getAccountsUS3 } from '../fetchFromBackend';
//import components
import PossibleValidNumbers from './PossibleValidNumbers';


const Accounts = () => {
    const {data, isLoading, error} = useQuery<string[]>('accounts', getAccountsUS3);

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
                findNumberBasedOnText(data!).map(account => {
                    let status = checkIfNumberIsInvalidOrIllegal(account);
                    return (
                        <AccountContainer>
                            <div key={account}>{account}</div>
                            <PossibleValidNumbers account={account} status={status} />
                        </AccountContainer>)}
                    )
                )}
        </div>)
        
}

export default Accounts;