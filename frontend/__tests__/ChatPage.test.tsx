import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatPage from '../src/app/chat/page'
import React from 'react'
import * as AuthHook from '../src/hooks/useAuth'
import { api } from '../src/lib/api'
import { useRouter } from 'next/navigation'

jest.mock('../src/hooks/useAuth')
jest.mock('../src/lib/api')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('Chat Page', () => {
  beforeEach(() => {
    (AuthHook.useAuth as jest.Mock).mockReturnValue({ user: { id: 'user1' } })
    ;(useRouter as jest.Mock).mockReturnValue({ push: jest.fn() })
  })

  it('renders initial assistant message', () => {
    render(<ChatPage />)
    expect(screen.getByText(/Hi! I am your AI shopping assistant/i)).toBeInTheDocument()
  })

  it('sends message and displays response', async () => {
    ;(api.post as jest.Mock).mockResolvedValueOnce({
      data: { response: 'This is a test response', selected_product: null }
    })
    
    render(<ChatPage />)
    
    const input = screen.getByPlaceholderText('Type your message...')
    fireEvent.change(input, { target: { value: 'Hello' } })
    
    const sendBtn = screen.getByRole('button')
    fireEvent.click(sendBtn)
    
    expect(screen.getByText('Hello')).toBeInTheDocument() // user message
    
    await waitFor(() => {
      expect(screen.getByText('This is a test response')).toBeInTheDocument() // assistant msg
    })
  })
})
