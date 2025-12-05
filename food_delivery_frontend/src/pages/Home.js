import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'
import Loader from '../components/Loader.js'
import Card from '../components/Card.js'
import { api } from '../api/client.js'

// PUBLIC_INTERFACE
export default Blits.Component('Home', {
  components: { Loader, Card },
  template: `
    <Element w="$parent.w" h="$parent.h">
      <Text x="0" y="0" :content="'Discover Restaurants'" fontSize="36" :textColor="$theme.textColor" />
      <Element x="0" y="60" :w="$parent.w" :h="$parent.h - 60">
        <Element :for="(item, index) in $restaurants" :key="$item.id" :x="($index % 3) * 460" :y="Math.floor($index / 3) * 300">
          <Card :title="$item.name" :subtitle="$item.description" :image="$item.image" :meta="$item.eta + ' • ★' + $item.rating" />
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      theme,
      restaurants: [],
      loading: true
    }
  },
  async created() {
    try {
      const list = await api.getRestaurants()
      this.restaurants = list
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  },
  input: {
    enter() {
      const first = this.restaurants[0]
      if (first) this.$router.to(`/restaurant/${first.id}`)
    }
  }
})
