import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import { api } from '../api/client.js'
import Loader from '../components/Loader.js'
import { UIButton } from '../components/UIButton.js'

// PUBLIC_INTERFACE
export default Blits.Component('Cart', {
  props: ['open'],
  components: { Loader, UIButton },
  template: `
    <Element :x="$open ? $app.w - 520 : $app.w" y="0" w="520" :h="$app.h" :alpha="1">
      <Element w="520" :h="$app.h" :color="$theme.surfaceColor" />
      <Text x="24" y="40" :content="'Your Cart'" fontSize="28" :textColor="$theme.textColor" />
      <Element x="24" y="90" w="472" h="760">
        <Element :for="(it, idx) in $computedItems" :key="$it.id" :x="0" :y="$idx * 90" w="472" h="80">
          <Element w="472" h="80" :color="'#ffffff'" />
          <Text x="0" y="8" :content="$it.name" fontSize="22" :textColor="$theme.textColor" />
          <Text x="0" y="42" :content="$it.qtyText" fontSize="18" :textColor="$theme.textColor" />
          <Text x="360" y="12" :content="$it.priceText" fontSize="22" :textColor="$theme.primaryColor" />
        </Element>
      </Element>
      <Text x="24" y="870" :content="$totalText" fontSize="26" :textColor="$theme.primaryColor" />

      <Element x="24" y="910">
        <UIButton label="Checkout" type="secondary" />
      </Element>
    </Element>
  `,
  state() {
    return {
      theme,
      items: [],
      computedItems: [],
      totalText: 'Total: $0.00',
      loading: false
    }
  },
  created() {
    this.refresh()
  },
  watchers: {
    open() {
      this.refresh()
    },
    '$store.cart': {
      deep: true,
      handler() { this.refresh() }
    }
  },
  methods: {
    computeDerived() {
      this.computedItems = this.items.map((it) => ({
        ...it,
        qtyText: `Qty: ${it.qty}`,
        priceText: `$${(it.price * it.qty).toFixed(2)}`
      }))
      const t = this.items.reduce((s, it) => s + it.price * it.qty, 0)
      this.totalText = `Total: $${t.toFixed(2)}`
    },
    refresh() {
      this.items = this.$store.cart.slice()
      this.computeDerived()
    },
    async checkout() {
      if (!this.items.length) return
      this.loading = true
      try {
        const payload = {
          items: this.items.map(({ id, qty }) => ({ id, qty }))
        }
        const { orderId } = await api.createOrder(payload)
        this.$store.clearCart()
        this.$store.toggleCart(false)
        this.$store.openTracking(orderId)
      } catch (e) {
        console.error(e)
        this.$store.toggleCart(true)
      } finally {
        this.loading = false
      }
    }
  },
  // simple button click handling
  buttonClicked() {
    this.checkout()
  }
})
