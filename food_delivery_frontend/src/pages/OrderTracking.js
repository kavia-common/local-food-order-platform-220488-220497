import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import Loader from '../components/Loader.js'
import { api } from '../api/client.js'

// PUBLIC_INTERFACE
export default Blits.Component('OrderTracking', {
  props: ['open', 'orderId'],
  components: { Loader },
  template: `
    <Element :alpha="$open ? 1 : 0" :x="0" :y="0" :w="$app.w" :h="$app.h">
      <!-- Scrim -->
      <Element :w="$app.w" :h="$app.h" color="#000000" :alpha="$open ? 0.3 : 0" />
      <!-- Modal panel -->
      <Element x="460" y="260" w="1000" h="560" :color="$theme.surfaceColor" :alpha="$open ? 1 : 0">
        <Text x="24" y="24" :content="'Order Tracking'" fontSize="30" :textColor="$theme.textColor" />
        <Text x="24" y="70" :content="'Order: ' + ($orderId || '')" fontSize="24" :textColor="$theme.textColor" />
        <Text x="24" y="110" :content="'Status: ' + $status" fontSize="26" :textColor="$theme.primaryColor" />
        <Text x="24" y="150" :content="'ETA: ' + $eta" fontSize="24" :textColor="$theme.textColor" />
      </Element>
    </Element>
  `,
  state() {
    return {
      theme,
      poller: null,
      status: 'pending',
      eta: '--',
      orderIdLocal: null
    }
  },
  created() {
    // prefer prop orderId, else from store
    const id = this.orderId || this.$store.activeOrderId
    this.orderIdLocal = id
    if (id) this.startPolling(id)
  },
  destroyed() {
    this.stopPolling()
  },
  watchers: {
    open(v) {
      if (v) {
        const id = this.orderId || this.$store.activeOrderId
        this.orderIdLocal = id
        if (id) this.startPolling(id)
      } else {
        this.stopPolling()
      }
    }
  },
  methods: {
    startPolling(id) {
      this.stopPolling()
      this.poller = setInterval(async () => {
        try {
          const { status, eta } = await api.getOrderStatus(id)
          this.status = status
          this.eta = eta || '--'
          if (status === 'arrived') {
            // auto-close after short delay
            setTimeout(() => this.$store.closeTracking(), 1000)
          }
        } catch (e) {
          console.error(e)
        }
      }, 2000)
    },
    stopPolling() {
      if (this.poller) {
        clearInterval(this.poller)
        this.poller = null
      }
    }
  },
  input: {
    back() {
      this.$store.closeTracking()
      this.$router.back()
    }
  },
  computed: {
    orderId() {
      return this.orderIdLocal
    }
  }
})
