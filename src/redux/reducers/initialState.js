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
};
export default initialState;
