//style
import { AppContainer } from './App.style';
//import util functions
import { findNumberBasedOnText , reorderAccountArrays } from './textTransformer';
//
import {getAccountsUS1} from './fetchFromBackend'

const App = () => {
    console.log(reorderAccountArrays())
    console.log(findNumberBasedOnText());

    return (
        <AppContainer>
            <h1>Bank OCR</h1>

        </AppContainer>
    );
}

export default App;
