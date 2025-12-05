import { config } from '../config.js'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const mockRestaurants = [
  {
    id: 'r1',
    name: 'Blue Ocean Sushi',
    description: 'Fresh sushi and sashimi',
    rating: 4.7,
    image: 'assets/restaurant1.jpg',
    eta: '25-35 min',
  },
  {
    id: 'r2',
    name: 'Amber Grill',
    description: 'Burgers, steaks, and fries',
    rating: 4.5,
    image: 'assets/restaurant2.jpg',
    eta: '20-30 min',
  },
  {
    id: 'r3',
    name: 'Harbor Greens',
    description: 'Healthy bowls and salads',
    rating: 4.6,
    image: 'assets/restaurant3.jpg',
    eta: '15-25 min',
  },
]

const mockMenus = {
  r1: [
    { id: 'm1', name: 'Salmon Nigiri', price: 6.5, image: 'assets/menu_salmon.jpg' },
    { id: 'm2', name: 'Tuna Roll', price: 8.0, image: 'assets/menu_tuna.jpg' },
    { id: 'm3', name: 'Miso Soup', price: 3.5, image: 'assets/menu_miso.jpg' },
  ],
  r2: [
    { id: 'm4', name: 'Classic Burger', price: 9.5, image: 'assets/menu_burger.jpg' },
    { id: 'm5', name: 'Ribeye Steak', price: 19.0, image: 'assets/menu_steak.jpg' },
    { id: 'm6', name: 'Fries', price: 3.0, image: 'assets/menu_fries.jpg' },
  ],
  r3: [
    { id: 'm7', name: 'Power Bowl', price: 10.0, image: 'assets/menu_bowl.jpg' },
    { id: 'm8', name: 'Kale Caesar', price: 8.5, image: 'assets/menu_kale.jpg' },
    { id: 'm9', name: 'Avocado Toast', price: 7.0, image: 'assets/menu_avocado.jpg' },
  ],
}

// PUBLIC_INTERFACE
export const api = {
  /** Get list of restaurants */
  async getRestaurants() {
    if (!config.apiBase) {
      await delay(200)
      return mockRestaurants
    }
    const res = await fetch(`${config.apiBase}/restaurants`)
    if (!res.ok) throw new Error('Failed to fetch restaurants')
    return res.json()
  },

  /** Get details for a restaurant, including menu */
  async getRestaurantDetails(id) {
    if (!config.apiBase) {
      await delay(200)
      const rest = mockRestaurants.find((r) => r.id === id)
      return {
        ...rest,
        menu: mockMenus[id] || [],
      }
    }
    const res = await fetch(`${config.apiBase}/restaurants/${id}`)
    if (!res.ok) throw new Error('Failed to fetch restaurant details')
    return res.json()
  },

  /** Create an order; returns orderId */
  async createOrder(payload) {
    if (!config.apiBase) {
      await delay(300)
      return { orderId: 'mock-' + Math.random().toString(36).slice(2, 8) }
    }
    const res = await fetch(`${config.apiBase}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to create order')
    return res.json()
  },

  /** Get order status; used for tracking */
  async getOrderStatus(orderId) {
    if (!config.apiBase) {
      await delay(300)
      // cycle through sample statuses randomly
      const statuses = ['confirmed', 'preparing', 'picked_up', 'delivering', 'arrived']
      const idx = Math.floor(Math.random() * statuses.length)
      return { orderId, status: statuses[idx], eta: '10-15 min' }
    }
    const res = await fetch(`${config.apiBase}/orders/${orderId}/status`)
    if (!res.ok) throw new Error('Failed to fetch order status')
    return res.json()
  }
}
