/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import App from './App';

// Object만 받는 Store가 Promise, Function도 받을 수 있도록 해주는 redux-promise, redux-thunk middleware 추가
// createStore로 Redux에 Store 생성
const createStoreWithMiddleware = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore);

// <Provider>로 Redux와 어플리케이션을 연결
// Provider의 store에 Reducer를 넣어준다
ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(Reducer,
            // Redux를 더 편하게 쓸 수 있도록 Redux Devtools extension 추가
            window.__REDUX_DEVTOOLS_EXTENSION__
            && window.__REDUX_DEVTOOLS_EXTENSION__())}
    >
        <App />
    </Provider>,
    document.getElementById('root'),
);
