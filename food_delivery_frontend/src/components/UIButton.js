import Blits from '@lightningjs/blits'
import { theme } from '../theme.js'

// PUBLIC_INTERFACE
export const UIButton = Blits.Component('UIButton', {
  props: ['label', 'type', 'w', 'h'],
  template: `
    <Element :w="$w || 200" :h="$h || 56">
      <Element :w="$w || 200" :h="$h || 56" :color="$bgColor" :alpha="$alpha" />
      <Text x="16" y="16" :content="$label || 'Button'" fontSize="22" :textColor="$textColor" />
    </Element>
  `,
  state() {
    return {
      theme,
      bgColor: theme.primaryColor,
      textColor: theme.surfaceColor,
      alpha: 1
    }
  },
  created() {
    if (this.type === 'secondary') {
      this.bgColor = this.theme.secondaryColor
      this.textColor = this.theme.surfaceColor
    }
    if (this.type === 'ghost') {
      this.bgColor = this.theme.surfaceColor
      this.textColor = this.theme.primaryColor
    }
  },
  input: {
    enter() {
      this.alpha = 0.85
      // bubble event so parent can listen if needed
      this.parent && this.parent.buttonClicked && this.parent.buttonClicked(this)
      setTimeout(() => (this.alpha = 1), 120)
    }
  }
})
