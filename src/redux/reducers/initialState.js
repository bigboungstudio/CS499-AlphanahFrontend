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
  },
  category: {},
  order: {
    purchaseHistory: {},
    cart: {},
    salesOrder: {},
  },
};
export default initialState;
