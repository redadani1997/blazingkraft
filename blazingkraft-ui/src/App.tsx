import ReactDOM from 'react-dom/client';
import MainProvider from 'scenes/main/header/provider/MainProvider';
import './assets/font-family/BlazingKRaftFont.ttf';
import './index.css';
import Main from './scenes/main/Main';
import './worker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
    <MainProvider>
        <Main />
    </MainProvider>,
    // </React.StrictMode>,
);
