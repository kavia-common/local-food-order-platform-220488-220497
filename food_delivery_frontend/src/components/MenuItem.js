import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import { UIButton } from './UIButton.js'

// PUBLIC_INTERFACE
export const MenuItem = Blits.Component('MenuItem', {
  props: ['item', 'restaurantId', 'x', 'y'],
  components: { UIButton },
  template: `
    <Element :x="$x || 0" :y="$y || 0" w="420" h="200">
      <Element w="420" h="200" :color="$theme.surfaceColor" />
      <Element x="12" y="12" w="180" h="120" :src="$item.image || ''" />
      <Text x="206" y="20" :content="$item.name" fontSize="24" :textColor="$theme.textColor" />
      <Text x="206" y="60" :content="$priceText" fontSize="22" :textColor="$theme.primaryColor" />
      <Element x="206" y="100">
        <UIButton :label="'Add to cart'" type="secondary" :w="180" :h="48" />
      </Element>
    </Element>
  `,
  state() {
    return {
      theme,
      priceText: this.item && this.item.price != null ? `$${this.item.price.toFixed(2)}` : '$0.00'
    }
  },
  watchers: {
    item() {
      this.priceText = this.item && this.item.price != null ? `$${this.item.price.toFixed(2)}` : '$0.00'
    }
  },
  // Called by UIButton parent when pressed
  buttonClicked() {
    const it = this.item
    if (!it) return
    this.$store.addToCart({
      id: it.id,
      name: it.name,
      price: it.price,
      image: it.image,
      restaurantId: this.restaurantId,
      qty: 1
    })
  }
})
