//style
import { AppContainer } from './App.style';
import { TransformTextToStringArray } from './textTransformer';

const App = () => {
    console.log(TransformTextToStringArray());

    return (
        <AppContainer>
            <h1>Bank OCR</h1>

        </AppContainer>
    );
}

export default App;
