import { useQuery } from 'react-query';

//import util functions
import { findNumberBasedOnText } from '../textTransformer';
import { validateChecksum, checkStatusToAccounts } from '../validateNumber'

//import fetch methods
import { getAccountsUS3 } from '../fetchFromBackend';


type Props = {
    account: string,
    status: string
}


export const PossibleValidNumbers : React.FC<Props> = ({account, status}) => {

    return (
        <div>
        </div>
        )
        
}

export default PossibleValidNumbers;
