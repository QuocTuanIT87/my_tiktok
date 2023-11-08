import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './App';
import GlobalStyles from './components/GlobalStyles';
import ModalProvider from '~/components/ModalProvider';
import LoginProvider from './components/LoginProvider';
import VideoProvider from './components/VideoProvider';
import ThemeProvider from './components/ThemeProvider';
import CommentProvider from '~/components/CommentProvider';

// Xử lý thêm

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>

    <GlobalStyles>
        <ThemeProvider>
            <ModalProvider>
                <LoginProvider>
                    <CommentProvider>
                        <VideoProvider>
                            <App />
                        </VideoProvider>
                    </CommentProvider>
                </LoginProvider>
            </ModalProvider>
        </ThemeProvider>
    </GlobalStyles>,
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
