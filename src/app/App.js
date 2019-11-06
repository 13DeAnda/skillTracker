import React from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from './store/stores/AppStore';
import { AppRouter } from './routes/AppRouter';

export const App = () => (
    <Provider store={createAppStore()}>
        <div className="container">
            <AppRouter />
        </div>
    </Provider>
);