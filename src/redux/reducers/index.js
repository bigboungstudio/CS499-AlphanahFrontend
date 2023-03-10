import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import couponReducer from "./couponReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
  order: orderReducer,
  coupons: couponReducer,
});
export default rootReducer;
