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
        // Skill category variants
        languages:
          'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/50',
        frameworks:
          'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-950/50',
        dataAi:
          'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/50',
        cloudDevops:
          'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-950/50',
        databases:
          'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-950/50',
        tooling:
          'bg-slate-50 dark:bg-slate-950/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-950/50',
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

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  readonly icon?: React.ReactNode;
  readonly label: string;
  readonly interactive?: boolean;
}

/**
 * Chip component for displaying skills, tags, and other labeled content
 * Supports icons, themes, and accessibility features
 */
const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, size, interactive, icon, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, size, interactive }), className)}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
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
