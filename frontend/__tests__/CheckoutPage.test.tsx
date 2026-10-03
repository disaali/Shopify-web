import { render, screen, waitFor } from '@testing-library/react'
import CheckoutPage from '../src/app/checkout/page'
import React from 'react'
import * as AuthHook from '../src/hooks/useAuth'
import { api } from '../src/lib/api'
import { useRouter } from 'next/navigation'

jest.mock('../src/hooks/useAuth')
jest.mock('../src/lib/api')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

describe('Checkout Page', () => {
  it('redirects to cart if no checkout draft', async () => {
    const pushMock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })
    ;(AuthHook.useAuth as jest.Mock).mockReturnValue({ user: { id: 'user1' } })
    ;(api.get as jest.Mock).mockRejectedValueOnce({ response: { status: 400 } })
    
    render(<CheckoutPage />)
    
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/cart')
    })
  })
  
  it('renders delivery form on step 1', async () => {
    ;(AuthHook.useAuth as jest.Mock).mockReturnValue({ user: { id: 'user1' } })
    ;(api.get as jest.Mock).mockResolvedValueOnce({ data: { items: [], subtotal: 0 } })
    
    render(<CheckoutPage />)
    
    const formHeading = await screen.findByText('Delivery Information')
    expect(formHeading).toBeInTheDocument()
    expect(screen.getByText('Full Name')).toBeInTheDocument()
  })
})
