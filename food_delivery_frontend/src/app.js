import Blits from '@lightningjs/blits'
import { Header } from './components/Header.js'
import Home from './pages/Home.js'
import RestaurantDetail from './pages/RestaurantDetail.js'
import Cart from './pages/Cart.js'
import OrderTracking from './pages/OrderTracking.js'
import { theme } from './theme.js'
import { storePlugin } from './store/storePlugin.js'
import { config } from './config.js'

// PUBLIC_INTERFACE
export default Blits.Application({
  /**
   * App root for Food Delivery - sets up theme, routes, and global UI.
   * Includes a Header, RouterView, a slide-in Cart, and an OrderTracking modal.
   */
  name: 'FoodDeliveryApp',
  plugins: [storePlugin],
  components: { Header, Cart, OrderTracking },
  template: `
    <Element w="$app.w" h="$app.h" :color="$theme.backgroundColor">
      <!-- Gradient background subtle -->
      <Element
        x="0" y="0" :w="$app.w" :h="$app.h"
        :color="$theme.backgroundColor"
        :alpha="1"
      />

      <Header />

      <!-- Main content area -->
      <Element x="60" y="120" :w="$app.w - 120" :h="$app.h - 160">
        <RouterView />
      </Element>

      <!-- Slide-in Cart -->
      <Cart :open="$store.ui.cartOpen" />

      <!-- Order Tracking Modal -->
      <OrderTracking :open="$store.ui.trackOpen" />
    </Element>
  `,
  state() {
    return {
      theme,
      config
    }
  },
  routes: [
    { path: '/', component: Home, options: { title: 'Home' } },
    { path: '/restaurant/:id', component: RestaurantDetail, options: { title: 'Restaurant' } },
    { path: '/tracking/:orderId', component: OrderTracking, options: { title: 'Tracking' } }
  ],
  created() {
    // Initialize theme onto global app for easy access
    this.$app.theme = theme
    this.$app.config = config
  }
})
