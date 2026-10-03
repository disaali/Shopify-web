import { render, screen } from '@testing-library/react'
import CartPage from '../src/app/cart/page'
import React from 'react'
import * as AuthHook from '../src/hooks/useAuth'
import { api } from '../src/lib/api'

jest.mock('../src/hooks/useAuth')
jest.mock('../src/lib/api')

describe('Cart Page', () => {
  beforeEach(() => {
    (AuthHook.useAuth as jest.Mock).mockReturnValue({ user: { id: 'user1' } })
  })

  it('shows empty state initially', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { items: [], subtotal: 0 } })
    render(<CartPage />)
    
    // initially loading
    expect(screen.getByText('Loading cart...')).toBeInTheDocument()
    
    // wait for mock
    const emptyMsg = await screen.findByText('Your cart is empty')
    expect(emptyMsg).toBeInTheDocument()
  })

  it('renders cart items correctly', async () => {
    const mockCart = {
      items: [
        { id: 'item1', name: 'Test Phone', price: 500, quantity: 2, storage: '128GB', ram: '8GB' }
      ],
      subtotal: 1000
    }
    ;(api.get as jest.Mock).mockResolvedValueOnce({ data: mockCart })
    render(<CartPage />)
    
    const item = await screen.findByText('Test Phone')
    expect(item).toBeInTheDocument()
    expect(screen.getAllByText('Rs. 1,000').length).toBeGreaterThan(0)
  })
})
