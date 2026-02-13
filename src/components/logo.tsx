import { cn } from '@/lib/utils';
import { Cog } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-8 w-8', className)}>
      <Cog className="h-full w-full text-primary" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 m-auto h-4 w-4 text-accent"
      >
        <path
          d="M3 12H6L9 3L15 21L18 12H21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
