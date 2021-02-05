import { useQuery } from 'react-query';

//import util functions
import { findNumberBasedOnText } from '../textTransformer';
import { validateChecksum , checkStatusToAccounts} from '../validateNumber'

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
                        <div>
                            <div key={account}>{account} | {status}</div>
                            <PossibleValidNumbers account={account} status={status} />
                        </div>)}
                    )
                )}
        </div>)
        
}

export default Accounts;