import { useState, useMemo } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { books } from '../data/books'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'


export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('')


  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return books
    
    const term = searchTerm.toLowerCase()
    return books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term)
    )
  }, [searchTerm])

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Browse Our Collection</h1>
        <p className="lead text-muted">
          Find your next favorite book from our extensive catalog
        </p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by title, author, or category..."
      />

      {filteredBooks.length > 0 ? (
        <>
          <p className="text-muted mb-4">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          </p>
          <Row className="g-4">
            {filteredBooks.map(book => (
              <Col key={book.id} md={6} lg={4} xl={3}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="text-center py-5">
          <h3 className="text-muted">No books found</h3>
          <p className="text-muted">Try adjusting your search term</p>
        </div>
      )}
    </Container>
  )
}
