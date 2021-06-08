import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { logger } from "./Logger";
import Reducer from "./Reducer";
const middleware = applyMiddleware(logger, thunk);
const store = createStore(Reducer, middleware);

export default store;
