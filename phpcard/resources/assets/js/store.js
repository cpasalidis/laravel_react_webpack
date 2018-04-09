//redux
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import promise from "redux-promise";
import {createLogger} from 'redux-logger';
import cardApp from "./reducers";

const logger = createLogger();
let store = createStore(cardApp,composeWithDevTools(applyMiddleware(thunk,promise,logger),
));

export default store;
