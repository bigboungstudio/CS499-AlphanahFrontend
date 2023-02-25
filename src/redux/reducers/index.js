import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
});
export default rootReducer;
