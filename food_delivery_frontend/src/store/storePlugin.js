import Blits from '@lightningjs/blits'

// PUBLIC_INTERFACE
export const storePlugin = Blits.Plugin('store', {
  /**
   * Simple app-wide store holding cart items and UI flags.
   */
  global: {
    cart: [],
    cartOpen: false,
    trackOpen: false,
    activeOrderId: null
  },
  methods: {
    addToCart(item) {
      // item: {id, name, price, qty, image, restaurantId}
      const idx = this.cart.findIndex((i) => i.id === item.id)
      if (idx > -1) {
        this.cart[idx].qty += item.qty || 1
      } else {
        this.cart.push({ ...item, qty: item.qty || 1 })
      }
      this.cartOpen = true
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter((i) => i.id !== itemId)
    },
    updateQty(itemId, qty) {
      const it = this.cart.find((i) => i.id === itemId)
      if (it) it.qty = Math.max(1, qty)
    },
    clearCart() {
      this.cart = []
    },
    toggleCart(open) {
      this.cartOpen = open === undefined ? !this.cartOpen : !!open
    },
    openTracking(orderId) {
      this.activeOrderId = orderId
      this.trackOpen = true
    },
    closeTracking() {
      this.trackOpen = false
    }
  },
  map(app) {
    // expose under $store.ui for clarity
    return {
      ui: app.$store,
      cart: app.$store.cart
    }
  }
})
