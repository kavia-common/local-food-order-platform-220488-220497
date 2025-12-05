import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('Loader', {
  template: `
    <Element w="200" h="60">
      <Text :content="'Loading...'" fontSize="28" :textColor="$theme.primaryColor" />
    </Element>
  `,
  state() {
    return { theme }
  }
})
