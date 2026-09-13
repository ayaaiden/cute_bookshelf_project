import { useBooks } from './presentation/hooks/useBook';
import { BookForm } from './presentation/components/BookForm';
import { BookCard } from './presentation/components/BookCard';
import Balatro from './presentation/components/Balatro'; // 1. Import your new background
import readingRabbit from './assets/reading_rabbit.png';

export default function App() {
  const { books, addBook, addComment, deleteBook } = useBooks();

  return (
    <>
      <Balatro
        isRotate={false}
        mouseInteraction={false}
        pixelFilter={1110}
        color1="#8f486b"
        color2="#ffffff"
        color3="#e95dd4"
      />

      <div style={{ 
        maxWidth: '600px', 
        margin: '40px auto', 
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img 
            src={readingRabbit} 
            alt="Cute reading sticker" 
            style={{ width: '110px', height: '100px' }} 
          />
          <h1 style={{ color: 'var(--color-plum)', margin: 0 }}>
            Rabbit's Cozy Bookshelf
          </h1>
        </div>
        
        <BookForm onAddBook={addBook} />

        <div>
          <h2>My Books ({books.length})</h2>
          {books.length === 0 ? (
            <p style={{ color: 'var(--color-periwinkle)' }}>Your bookshelf is empty. Add a book above!</p>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={deleteBook}
                onAddComment={addComment}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}