import { renderHook, act } from '@testing-library/react';
import { useSectionHighlight } from '@/hooks/useSectionHighlight';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    disconnect: mockDisconnect,
  });
  global.IntersectionObserver = mockIntersectionObserver;
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
        threshold: 0.5,
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
});
