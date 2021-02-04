//style
import { AppContainer } from './App.style';
//import util functions
import { reorderAccountArrays } from './textTransformer';
//
import {getAccountsUS1, AccountType} from './fetchFromBackend'
import { useQuery } from 'react-query';

const App = () => {
    console.log(reorderAccountArrays())

    const {data, isLoading, error} = useQuery<AccountType[]>('accounts', getAccountsUS1);

    console.log(data);

    return (
        <AppContainer>
            <h1>Bank OCR</h1>

        </AppContainer>
    );
}

export default App;
