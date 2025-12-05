import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('Card', {
  props: ['title', 'subtitle', 'image', 'meta'],
  template: `
    <Element w="420" h="260">
      <Element w="420" h="260" :color="$theme.surfaceColor" :alpha="1" />
      <Element x="16" y="16" w="388" h="160" :src="$image || ''" />
      <Text x="16" y="184" :content="$title || ''" fontSize="24" :textColor="$theme.textColor" />
      <Text x="16" y="214" :content="$subtitle || ''" fontSize="18" :textColor="$theme.textColor" />
      <Text x="300" y="214" :content="$meta || ''" fontSize="18" :textColor="$theme.primaryColor" />
    </Element>
  `,
  state() {
    return { theme }
  }
})
