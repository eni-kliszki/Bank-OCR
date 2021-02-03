//style
import { AppContainer } from './App.style';

import { textTransformer } from './textTransformer';

const App = () => {
    console.log(textTransformer());

    return (
        <AppContainer>
            <h1>Bank OCR</h1>

        </AppContainer>
    );
}

export default App;
