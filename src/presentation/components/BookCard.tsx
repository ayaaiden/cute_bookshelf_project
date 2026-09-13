import { useState } from 'react';
import type { Book } from '../../core/entities/Book';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  onAddComment: (bookId: string, text: string) => void;
}

export function BookCard({ book, onDelete, onAddComment }: BookCardProps) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    onAddComment(book.id, commentText);
    setCommentText(''); // Clear input box
  };

  return (
    <div className={styles.card}>
      {/* Left Side: Book Info */}
      <div className={styles.bookInfo}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>by {book.author}</p>
        <div>
          <span className={styles.badge}>{book.status}</span>
        </div>
      </div>

      {/* Right Side: Comments & Notes Section */}
      <div className={styles.commentSection}>
        <h4 className={styles.commentTitle}>Notes & Comments:</h4>
        <ul className={styles.commentList}>
          {book.comment.map((comment, index) => (
            <li key={index} className={styles.commentItem}>💬 {comment}</li>
          ))}
        </ul>

        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
          <input
            type="text"
            className={styles.commentInput}
            placeholder="Add a note..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className={styles.commentBtn}>Post</button>
        </form>
      </div>

      {/* Delete Button */}
      <button 
        className={styles.deleteBtn} 
        onClick={() => onDelete(book.id)}
      >
        Remove
      </button>
    </div>
  );
}