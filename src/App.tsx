//style
import { AppContainer } from './App.style';
import { reorderAccountArrays } from './textTransformer';

const App = () => {
    console.log(reorderAccountArrays());

    return (
        <AppContainer>
            <h1>Bank OCR</h1>

        </AppContainer>
    );
}

export default App;
