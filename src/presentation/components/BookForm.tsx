import { useState } from 'react';
import type { ReadingStatus } from '../../core/entities/Book';
import styles from './BookForm.module.css';

interface BookFormProps {
  onAddBook: (title: string, author: string, status: ReadingStatus) => void;
}

export function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('To Read');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    onAddBook(title, author, status);
    
    // Clear inputs after submitting
    setTitle('');
    setAuthor('');
    setStatus('To Read');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add a New Book</h3>
      <input
        className={styles.input}
        type="text"
        placeholder="Book Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Author Name..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <select
        className={styles.select}
        value={status}
        onChange={(e) => setStatus(e.target.value as ReadingStatus)}
      >
        <option value="To Read">To Read</option>
        <option value="Reading">Reading</option>
        <option value="Completed">Completed</option>
      </select>
      <button className={styles.submitBtn} type="submit">
        Add to Bookshelf
      </button>
    </form>
  );
}