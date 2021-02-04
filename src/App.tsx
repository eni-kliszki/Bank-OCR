import { useQuery } from 'react-query';
//style
import { AppContainer } from './App.style';
//import util functions
import { splitDataInNewEveryFourLines, reorderAccountArrays, findNumberBasedOnText } from './textTransformer';
//import fetch methods
import {getAccountsUS1} from './fetchFromBackend'


const App = () => {
    
    const {data, isLoading, error} = useQuery<string[]>('accounts', getAccountsUS1);
    
    const getTotalAccounts = () => null;
    
    const checkIfDataNotUndefined = (data: any): boolean => {
        return data !== undefined;
    }

    
    
    if(checkIfDataNotUndefined(data)){
        let accounts:string[] = data!; 
        console.log(findNumberBasedOnText(accounts));
    }

    if(isLoading) return <div>Loading...</div>;
    if(error) return <div>Something went wrong...</div>

    return (
        <AppContainer>
            <h1>Bank OCR</h1>
        </AppContainer>
    );
}

export default App;
