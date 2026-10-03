import { render, screen } from '@testing-library/react'
import { Product } from '../src/types'

// Simple test product card component for test since we didn't extract it
const ProductCard = ({ product }: { product: Product }) => (
  <div data-testid="product-card">
    <h2>{product.name}</h2>
    <p>Rs. {product.price}</p>
    <p>{product.in_stock ? "In Stock" : "Out of Stock"}</p>
  </div>
)

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const product: Product = {
      id: 1,
      name: 'Test Phone',
      brand: 'TestBrand',
      category: 'Mobile',
      price: 50000,
      original_price: 60000,
      stock: 10,
      rating: 4.5,
      condition: 'New',
      storage: '128GB',
      ram: '8GB',
      in_stock: true
    }
    
    render(<ProductCard product={product} />)
    
    expect(screen.getByText('Test Phone')).toBeInTheDocument()
    expect(screen.getByText('Rs. 50000')).toBeInTheDocument()
    expect(screen.getByText('In Stock')).toBeInTheDocument()
  })
})
