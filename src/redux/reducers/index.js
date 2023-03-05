import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
  order: orderReducer,
});
export default rootReducer;
