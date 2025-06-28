import { renderHook, act } from '@testing-library/react';
import { useSectionHighlight } from '@/hooks/useSectionHighlight';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockDisconnect = jest.fn();
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    disconnect: mockDisconnect,
  });
  global.IntersectionObserver = mockIntersectionObserver;

  // Mock window scroll methods
  global.window.addEventListener = mockAddEventListener;
  global.window.removeEventListener = mockRemoveEventListener;
  Object.defineProperty(global.window, 'scrollY', {
    value: 0,
    writable: true,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useSectionHighlight', () => {
  const mockSectionIds = ['hero', 'projects', 'about'] as const;

  it('should initialize with empty active section', () => {
    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    expect(result.current.activeSection).toBe('');
  });

  it('should create IntersectionObserver with correct options', () => {
    renderHook(() =>
      useSectionHighlight({
        sectionIds: mockSectionIds,
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px',
      }),
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-10% 0px -10% 0px',
      },
    );
  });

  it('should observe all section elements', () => {
    // Mock getElementById to return mock elements
    const mockObserve = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      disconnect: mockDisconnect,
    });

    const mockElements = mockSectionIds.map((id) => ({ id }) as HTMLElement);
    const mockGetElementById = jest.fn((id: string): HTMLElement | null => {
      return mockElements.find((el) => el.id === id) || null;
    });
    document.getElementById = mockGetElementById;

    renderHook(() => useSectionHighlight({ sectionIds: mockSectionIds }));

    expect(mockObserve).toHaveBeenCalledTimes(mockSectionIds.length);
    mockSectionIds.forEach((id) => {
      expect(mockGetElementById).toHaveBeenCalledWith(id);
    });
  });

  it('should update active section when intersection occurs', () => {
    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    // Simulate intersection
    act(() => {
      const mockEntry = {
        isIntersecting: true,
        target: { id: 'projects' },
      } as IntersectionObserverEntry;
      intersectionCallback([mockEntry]);
    });

    expect(result.current.activeSection).toBe('projects');
  });

  it('should not update active section when intersection is false', () => {
    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    // Simulate non-intersection
    act(() => {
      const mockEntry = {
        isIntersecting: false,
        target: { id: 'projects' },
      } as IntersectionObserverEntry;
      intersectionCallback([mockEntry]);
    });

    expect(result.current.activeSection).toBe('');
  });

  it('should provide scrollToSection function', () => {
    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    expect(typeof result.current.scrollToSection).toBe('function');
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should handle missing elements gracefully', () => {
    // Mock getElementById to return null for all elements
    document.getElementById = jest.fn(() => null);

    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    expect(result.current.activeSection).toBe('');
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it('should set hero section as active when at top of page', () => {
    // Set scroll position to top
    Object.defineProperty(global.window, 'scrollY', {
      value: 50, // Less than 100px threshold
      writable: true,
    });

    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    // Simulate intersection with about section, but since we're at top, hero should be active
    act(() => {
      const mockEntry = {
        isIntersecting: true,
        intersectionRatio: 0.8,
        target: { id: 'about' },
      } as IntersectionObserverEntry;
      intersectionCallback([mockEntry]);
    });

    expect(result.current.activeSection).toBe('hero');
  });

  it('should use most visible section when not at top', () => {
    // Set scroll position away from top
    Object.defineProperty(global.window, 'scrollY', {
      value: 200, // More than 100px threshold
      writable: true,
    });

    let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;
    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    const { result } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    // Simulate multiple intersecting sections
    act(() => {
      const mockEntries = [
        {
          isIntersecting: true,
          intersectionRatio: 0.3,
          target: { id: 'about' },
        },
        {
          isIntersecting: true,
          intersectionRatio: 0.7,
          target: { id: 'projects' },
        },
      ] as IntersectionObserverEntry[];
      intersectionCallback(mockEntries);
    });

    // Should select the most visible section (projects with 0.7 ratio)
    expect(result.current.activeSection).toBe('projects');
  });

  it('should add and remove scroll event listener', () => {
    const { unmount } = renderHook(() =>
      useSectionHighlight({ sectionIds: mockSectionIds }),
    );

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
