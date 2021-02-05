//import util functions
import { findValidNumbers } from '../findPossibleValidNumbers'

type Props = {
    account: string,
    status: string
}


export const PossibleValidNumbers : React.FC<Props> = ({account, status}) => {

    return (
        <div>
            {findValidNumbers(status, account)}
        </div>
        )
        
}

export default PossibleValidNumbers;
