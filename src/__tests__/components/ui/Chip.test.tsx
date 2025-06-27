import { render, screen } from '@testing-library/react';
import { Chip } from '@/components/ui/chip';

describe('Chip Component', () => {
  const defaultProps = {
    label: 'Test Chip',
  };

  it('renders with default props', () => {
    render(<Chip {...defaultProps} />);
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <Chip {...defaultProps} icon={<span data-testid="icon">🚀</span>} />,
    );
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Chip {...defaultProps} variant="default" />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveClass('bg-primary/10');
    expect(chip).toHaveClass('text-primary');

    rerender(<Chip {...defaultProps} variant="secondary" />);
    expect(chip).toHaveClass('bg-secondary/10');
    expect(chip).toHaveClass('text-secondary-foreground');

    rerender(<Chip {...defaultProps} variant="outline" />);
    expect(chip).toHaveClass('bg-transparent');
    expect(chip).toHaveClass('text-foreground');

    rerender(<Chip {...defaultProps} variant="ghost" />);
    expect(chip).toHaveClass('bg-transparent');
    expect(chip).toHaveClass('text-muted-foreground');
  });

  it('applies skill category variant classes', () => {
    const { rerender } = render(<Chip {...defaultProps} variant="languages" />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveClass('bg-blue-50');
    expect(chip).toHaveClass('text-blue-700');

    rerender(<Chip {...defaultProps} variant="frameworks" />);
    expect(chip).toHaveClass('bg-purple-50');
    expect(chip).toHaveClass('text-purple-700');

    rerender(<Chip {...defaultProps} variant="dataAi" />);
    expect(chip).toHaveClass('bg-emerald-50');
    expect(chip).toHaveClass('text-emerald-700');

    rerender(<Chip {...defaultProps} variant="cloudDevops" />);
    expect(chip).toHaveClass('bg-orange-50');
    expect(chip).toHaveClass('text-orange-700');

    rerender(<Chip {...defaultProps} variant="databases" />);
    expect(chip).toHaveClass('bg-indigo-50');
    expect(chip).toHaveClass('text-indigo-700');

    rerender(<Chip {...defaultProps} variant="tooling" />);
    expect(chip).toHaveClass('bg-slate-50');
    expect(chip).toHaveClass('text-slate-700');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Chip {...defaultProps} size="sm" />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveClass('px-2');
    expect(chip).toHaveClass('py-1');
    expect(chip).toHaveClass('text-xs');

    rerender(<Chip {...defaultProps} size="default" />);
    expect(chip).toHaveClass('px-3');
    expect(chip).toHaveClass('py-2');
    expect(chip).toHaveClass('text-sm');

    rerender(<Chip {...defaultProps} size="lg" />);
    expect(chip).toHaveClass('px-4');
    expect(chip).toHaveClass('py-2.5');
    expect(chip).toHaveClass('text-base');
  });

  it('applies interactive classes when interactive is true', () => {
    render(<Chip {...defaultProps} interactive />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveClass('cursor-pointer');
    expect(chip).toHaveClass('hover:scale-105');
    expect(chip).toHaveClass('active:scale-95');
    expect(chip).toHaveAttribute('role', 'button');
    expect(chip).toHaveAttribute('tabIndex', '0');
  });

  it('does not apply interactive classes when interactive is false', () => {
    render(<Chip {...defaultProps} interactive={false} />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveClass('cursor-default');
    expect(chip).not.toHaveAttribute('role');
    expect(chip).not.toHaveAttribute('tabIndex');
  });

  it('applies custom className', () => {
    render(<Chip {...defaultProps} className="custom-class" />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Chip {...defaultProps} ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies accessibility attributes for interactive chips', () => {
    render(<Chip {...defaultProps} interactive aria-label="Custom label" />);
    const chip = screen.getByText('Test Chip').closest('div');
    expect(chip).toHaveAttribute('aria-label', 'Custom label');
  });
});
