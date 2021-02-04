//style
import { AppContainer } from './App.style';
import { findNumberBasedOnText , reorderAccountArrays } from './textTransformer';

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
