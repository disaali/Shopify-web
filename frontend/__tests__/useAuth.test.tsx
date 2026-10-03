import { render, screen, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../src/hooks/useAuth'
import React from 'react'

const TestComponent = () => {
  const { user, login, logout, isLoading } = useAuth()
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <div data-testid="user-state">{user ? user.id : 'logged out'}</div>
      <button onClick={() => login('fake-token', 'user_test')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('useAuth hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initially shows logged out if no token', () => {
    render(<AuthProvider><TestComponent /></AuthProvider>)
    expect(screen.getByTestId('user-state')).toHaveTextContent('logged out')
  })

  it('can login and set local storage', () => {
    render(<AuthProvider><TestComponent /></AuthProvider>)
    act(() => {
      screen.getByText('Login').click()
    })
    expect(screen.getByTestId('user-state')).toHaveTextContent('user_test')
    expect(localStorage.getItem('auth_token')).toBe('fake-token')
  })

  it('can logout and clear local storage', () => {
    localStorage.setItem('auth_token', 'token')
    localStorage.setItem('auth_user_id', 'user1')
    render(<AuthProvider><TestComponent /></AuthProvider>)
    act(() => {
      screen.getByText('Logout').click()
    })
    expect(screen.getByTestId('user-state')).toHaveTextContent('logged out')
    expect(localStorage.getItem('auth_token')).toBeNull()
  })
})
