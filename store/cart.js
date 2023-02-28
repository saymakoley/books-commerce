export const state = () => ({
    cartItems: [],
  })
  
  export const mutations = {
    addToCart(state, item) {
      const cartItem = state.cartItems.find(i => i.id === item.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        state.cartItems.push({ ...item, quantity: 1 })
      }
    },
    removeFromCart(state, item) {
      const index = state.cartItems.findIndex(i => i.id === item.id)
      if (index !== -1) {
        const cartItem = state.cartItems[index]
        if (cartItem.quantity > 1) {
          cartItem.quantity--
        } else {
          state.cartItems.splice(index, 1)
        }
      }
    },
  }
  
  export const getters = {
    cartTotal(state) {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  }
  