import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import Loader from '../components/Loader.js'
import { api } from '../api/client.js'
import { MenuItem } from '../components/MenuItem.js'

// PUBLIC_INTERFACE
export default Blits.Component('RestaurantDetail', {
  props: ['id'],
  components: { Loader, MenuItem },
  template: `
    <Element w="$parent.w" h="$parent.h">
      <Text x="0" y="0" :content="$titleText" fontSize="36" :textColor="$theme.textColor" />
      <Text x="0" y="50" :content="$descText" fontSize="22" :textColor="$theme.textColor" />

      <Element x="0" y="100" w="$parent.w" h="$parent.h - 120">
        <Element :for="(it, idx) in $menu" :key="$it.id" :x="$positions[$idx].x" :y="$positions[$idx].y">
          <MenuItem :item="$it" :restaurantId="$id" :x="0" :y="0" />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      theme,
      loading: true,
      restaurant: null,
      menu: [],
      positions: [],
      titleText: '',
      descText: ''
    }
  },
  methods: {
    computePositions() {
      const positions = []
      const cols = 3
      const dx = 460
      const dy = 220
      for (let i = 0; i < this.menu.length; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        positions.push({ x: col * dx, y: row * dy })
      }
      this.positions = positions
    },
    updateHeaderTexts() {
      this.titleText = this.restaurant ? this.restaurant.name : ''
      this.descText = this.restaurant ? this.restaurant.description || '' : ''
    }
  },
  watchers: {
    menu() {
      this.computePositions()
    },
    restaurant() {
      this.updateHeaderTexts()
    }
  },
  async created() {
    try {
      const data = await api.getRestaurantDetails(this.id)
      this.restaurant = data
      this.menu = data.menu || []
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
      this.computePositions()
      this.updateHeaderTexts()
    }
  }
})
