import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Projects } from '@/components/Projects';

describe('Projects component', () => {
  it('renders projects section', () => {
    render(<Projects />);
    const projectsHeading = screen.getByText('Projects');
    expect(projectsHeading).toBeInTheDocument();
  });

  it('renders project filters', () => {
    render(<Projects />);
    const filters = ['recent', 'ongoing', 'past'];
    filters.forEach(filter => {
      const filterButton = screen.getByText(filter.charAt(0).toUpperCase() + filter.slice(1));
      expect(filterButton).toBeInTheDocument();
    });
  });
}); 