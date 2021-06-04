import { applyMiddleware, createStore } from "redux";
import { logger } from "./Logger";
import Reducer from "./Reducer";
const middleware = applyMiddleware(logger);
const store = createStore(Reducer, middleware);

export default store;
