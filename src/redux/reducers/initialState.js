const initialState = {
  auth: {
    buyer: {
      isFacebook: false,
      isAuthentication: false,
      currentUser: {},
      token: {},
    },
    seller: {
      isAuthentication: false,
      currentUser: {},
      token: {},
    },
  },
  products: {
    allProducts: {},
    oneProduct: {},
    merchantProducts: {},
    merchantDetail: {},
  },
  categories: {},
  order: {
    purchaseHistory: {},
    cart: {},
    salesOrder: {},
  },
  coupons: {},
};
export default initialState;
