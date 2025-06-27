import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollCueProps {
  readonly className?: string;
  readonly targetId?: string;
}

/**
 * ScrollCue component displays an animated chevron to indicate scrollable content
 * @param className - Additional CSS classes
 * @param targetId - ID of the element to scroll to when clicked
 */
export default function ScrollCue({
  className = '',
  targetId = 'highlights',
}: ScrollCueProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Only show scroll cue on viewports taller than 600px
  useEffect(() => {
    const checkViewportHeight = () => {
      setIsVisible(window.innerHeight > 600);
    };

    checkViewportHeight();
    window.addEventListener('resize', checkViewportHeight);
    return () => window.removeEventListener('resize', checkViewportHeight);
  }, []);

  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <button
        onClick={handleClick}
        className="group p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full scroll-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  );
}
