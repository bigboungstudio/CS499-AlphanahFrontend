const initialState = {
  auth: {
    buyer: {
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
  category: {},
  order: {
    purchaseHistory: {},
    cart: {},
    salesOrder: {},
  },
  coupons: {},
};
export default initialState;
