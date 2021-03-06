//import util functions
import { findValidNumbers } from '../findPossibleValidNumbers'

type Props = {
    account: string,
    status: string,
    accountText: string[]
}

// calls the findValidNumbers method and represents the account numbers
export const PossibleValidNumbers : React.FC<Props> = ({account, status, accountText}) => {
    let possibleAccounts = findValidNumbers(status, account, accountText)

    return (
        <div>
            {possibleAccounts.includes("[]") ? "" : 
                <span>{possibleAccounts}</span>
            }
        </div>
        )
        
}

export default PossibleValidNumbers;
