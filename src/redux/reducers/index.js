import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
});
export default rootReducer;
