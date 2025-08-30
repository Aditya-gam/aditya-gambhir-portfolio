import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

/**
 * Chip component variants using class-variance-authority
 * Supports different themes and sizes with proper accessibility
 */
const chipVariants = cva(
  'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15',
        secondary:
          'bg-secondary/10 text-secondary-foreground border border-secondary/20 hover:bg-secondary/15',
        outline:
          'bg-transparent text-foreground border border-border hover:bg-accent hover:text-accent-foreground',
        ghost:
          'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        // Skill category variants using theme variables (HSL triplets)
        languages:
          'bg-[hsl(var(--chip-languages)/0.10)] text-[hsl(var(--chip-languages))] border border-[hsl(var(--chip-languages)/0.25)] hover:bg-[hsl(var(--chip-languages)/0.15)]',
        frameworks:
          'bg-[hsl(var(--chip-frameworks)/0.10)] text-[hsl(var(--chip-frameworks))] border border-[hsl(var(--chip-frameworks)/0.25)] hover:bg-[hsl(var(--chip-frameworks)/0.15)]',
        dataAi:
          'bg-[hsl(var(--chip-data-ai)/0.10)] text-[hsl(var(--chip-data-ai))] border border-[hsl(var(--chip-data-ai)/0.25)] hover:bg-[hsl(var(--chip-data-ai)/0.15)]',
        cloudDevops:
          'bg-[hsl(var(--chip-cloud-devops)/0.10)] text-[hsl(var(--chip-cloud-devops))] border border-[hsl(var(--chip-cloud-devops)/0.25)] hover:bg-[hsl(var(--chip-cloud-devops)/0.15)]',
        databases:
          'bg-[hsl(var(--chip-databases)/0.10)] text-[hsl(var(--chip-databases))] border border-[hsl(var(--chip-databases)/0.25)] hover:bg-[hsl(var(--chip-databases)/0.15)]',
        tooling:
          'bg-[hsl(var(--chip-tooling)/0.10)] text-[hsl(var(--chip-tooling))] border border-[hsl(var(--chip-tooling)/0.25)] hover:bg-[hsl(var(--chip-tooling)/0.15)]',
      },
      size: {
        sm: 'px-2 py-1 text-xs gap-1.5',
        default: 'px-3 py-2 text-sm gap-2',
        lg: 'px-4 py-2.5 text-base gap-2.5',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-105 active:scale-95',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      interactive: false,
    },
  },
);

// Overload for interactive Chip (button)
type InteractiveChipProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'label'
> &
  VariantProps<typeof chipVariants> & {
    icon?: React.ReactNode;
    label: string;
    interactive: true;
  };

// Overload for non-interactive Chip (div)
type NonInteractiveChipProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'label'
> &
  VariantProps<typeof chipVariants> & {
    icon?: React.ReactNode;
    label: string;
    interactive?: false;
  };

export type ChipProps = InteractiveChipProps | NonInteractiveChipProps;

/**
 * Chip component for displaying skills, tags, and other labeled content
 * Supports icons, themes, and accessibility features
 */
const Chip = forwardRef<HTMLDivElement | HTMLButtonElement, ChipProps>(
  (props, ref) => {
    const { className, variant, size, interactive, icon, label, ...rest } =
      props;
    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={cn(
            chipVariants({ variant, size, interactive }),
            className,
          )}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {icon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{label}</span>
        </button>
      );
    }
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(chipVariants({ variant, size, interactive }), className)}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{label}</span>
      </div>
    );
  },
);

Chip.displayName = 'Chip';

export { Chip, chipVariants };
