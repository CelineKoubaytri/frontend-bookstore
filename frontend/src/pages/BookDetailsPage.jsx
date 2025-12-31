import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Badge } from 'react-bootstrap'
import { books } from '../data/books'
import { useCart } from '../context/CartContext'

export default function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const book = books.find(b => b.id === parseInt(id))

  if (!book) {
    return (
      <Container className="py-5 text-center">
        <h2>Book not found</h2>
        <Button as={Link} to="/books" variant="primary" className="mt-3">
          Back to Books
        </Button>
      </Container>
    )
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(book)
    setTimeout(() => {
      setIsAdding(false)
      navigate('/cart')
    }, 1000)
  }

  return (
    <Container className="py-5">
      <Button as={Link} to="/books" variant="outline-secondary" className="mb-4">
        ← Back to Books
      </Button>

      <Row>
        <Col md={4}>
          <img
            src={book.coverImage}
            alt={book.title}
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <h1 className="fw-bold mb-3">{book.title}</h1>
          <h4 className="text-muted mb-3">by {book.author}</h4>
          <div className="mb-3">
            <Badge bg="secondary" className="me-2">{book.category}</Badge>
          </div>
          <h2 className="text-primary fw-bold mb-4">${book.price.toFixed(2)}</h2>
          <p className="lead mb-4">{book.description}</p>
          
          <div className="d-flex gap-3">
            <Button
              variant={isAdding ? 'success' : 'primary'}
              size="lg"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? '✓ Added to Cart!' : 'Add to Cart'}
            </Button>
            <Button
              as={Link}
              to="/cart"
              variant="outline-primary"
              size="lg"
            >
              View Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
