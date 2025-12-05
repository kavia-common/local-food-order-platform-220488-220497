import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'

// PUBLIC_INTERFACE
export const Header = Blits.Component('Header', {
  components: {},
  template: `
    <Element x="40" y="40" :w="$app.w - 80" h="60">
      <!-- Surface background with rounded corners and subtle shadow (via secondary layer alpha) -->
      <Element
        w="$parent.w" h="$parent.h"
        :color="$theme.surfaceColor"
        :alpha="1"
      />
      <Text
        x="24" y="16" :content="$title"
        :textColor="$theme.textColor"
        fontSize="28"
      />
      <!-- Nav buttons -->
      <Element x="$parent.w - 580" y="10" w="560" h="40">
        <Element x="0" y="0"><Text :content="'Home'" fontSize="22" :textColor="$theme.primaryColor" /></Element>
        <Element x="120" y="0"><Text :content="'Restaurants'" fontSize="22" :textColor="$theme.primaryColor" /></Element>
        <Element x="280" y="0"><Text :content="'Cart'" fontSize="22" :textColor="$theme.secondaryColor" /></Element>
        <Element x="380" y="0"><Text :content="'Track'" fontSize="22" :textColor="$theme.primaryColor" /></Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      theme,
      title: 'Ocean Eats'
    }
  },
  input: {
    enter() {
      // no-op; navigation is via routing keys below
    },
    right(e) { this.parent && this.parent.focus && this.parent.focus(e) }
  },
  methods: {
    /** Programmatic navigation helpers */
    goHome() { this.$router.to('/') },
    goRestaurants() { this.$router.to('/') },
    goCart() { this.$store.toggleCart(true) },
    goTrack() { this.$store.openTracking(this.$store.activeOrderId || 'mock-order') }
  }
})
