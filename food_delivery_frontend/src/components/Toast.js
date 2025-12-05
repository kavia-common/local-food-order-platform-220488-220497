import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'

// PUBLIC_INTERFACE
export const Toast = Blits.Component('Toast', {
  props: ['message', 'type', 'open'],
  template: `
    <Element x="$app.w - 560" y="100" w="520" h="60" :alpha="$open ? 1 : 0">
      <Element w="520" h="60" :color="$bgColor" />
      <Text x="16" y="18" :content="$message || ''" fontSize="22" :textColor="$textColor" />
    </Element>
  `,
  state() {
    return {
      theme,
      bgColor: theme.primaryColor,
      textColor: theme.surfaceColor
    }
  },
  created() {
    if (this.type === 'error') {
      this.bgColor = theme.errorColor
    } else if (this.type === 'success') {
      this.bgColor = theme.success
    }
  }
})
