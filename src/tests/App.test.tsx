import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from '../App';

vi.mock('../presentation/components/Balatro', () => ({
  default: () => <div data-testid="balatro-background" />,
}));

describe('Bookshelf App', () => {
  it('renders the main title correctly', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Rabbit's Cozy Bookshelf/i }),
    ).toBeInTheDocument();
  });
});