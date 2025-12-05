import Blits from '@lightningjs/blits'
import App from './app.js'

// PUBLIC_INTERFACE
export function launchApp() {
  /**
   * Launch the LightningJS app with WebGL canvas 'app'
   * Includes input mappings for navigation and select.
   */
  Blits.Launch(App, 'app', {
    w: 1280,
    h: 720,
    keyboard: {
      // Basic mappings
      left: 37, up: 38, right: 39, down: 40,
      enter: 13, back: 8
    }
  })
}
