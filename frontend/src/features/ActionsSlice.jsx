import { createSlice } from "@reduxjs/toolkit";
// import { toast } from 'react-toastify';

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const loadCartFromLocalStorage = () => {
  const cartState = localStorage.getItem("cart");
  return cartState ? JSON.parse(cartState) : initialState;
};

const ActionsSlice = createSlice({
  name: "actions",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = null;
      state.totalPrice = null;
      localStorage.removeItem("cart");
    },

    addToCart: (state, action) => {
      const itemsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      itemsToAdd.forEach((item) => {
        const { id } = item;
        const existingItemIndex = state.cart.findIndex(
          (existingItem) => existingItem.id === id
        );

        if (existingItemIndex !== -1) {
          state.cart[existingItemIndex].quantity += 1;
        } else {
          state.cart.push({
            ...item,
            quantity: 1,
          });
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },

    getCartTotal: (state) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { sale_price, price, quantity } = cartItem;
          const itemTotal = sale_price
            ? sale_price * quantity
            : price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );

      state.totalPrice = totalPrice;
      state.totalQuantity = totalQuantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const removedItem = state.cart.find((item) => item.id === itemId);

      if (removedItem) {
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity;

        state.cart = state.cart.filter((item) => item.id !== itemId);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToIncrease = state.cart.find((item) => item.id === itemId);

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        // Update totalQuantity and totalPrice directly
        state.totalQuantity += 1;
        state.totalPrice += itemToIncrease.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToDecrease = state.cart.find((item) => item.id === itemId);

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= itemToDecrease.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartTotal,
  clearCart,
} = ActionsSlice.actions;

export default ActionsSlice.reducer;
