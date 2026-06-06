const HEADER_OFFSET = 150

export interface HeadingRegion {
  id: string
  start: number
  end: number
}

export interface TOCState {
  headings: HTMLElement[]
  regions: HeadingRegion[]
}

export function createTOCState(): TOCState {
  return {
    headings: [],
    regions: [],
  }
}

export function buildHeadingRegions(state: TOCState): void {
  state.headings = Array.from(
    document.querySelectorAll<HTMLElement>(
      '.prose h2, .prose h3, .prose h4, .prose h5, .prose h6',
    ),
  )

  if (state.headings.length === 0) {
    state.regions = []
    return
  }

  state.regions = state.headings.map((heading, index) => {
    const nextHeading = state.headings[index + 1]
    return {
      id: heading.id,
      start: heading.offsetTop,
      end: nextHeading ? nextHeading.offsetTop : document.body.scrollHeight,
    }
  })
}

export function getVisibleIds(
  state: TOCState,
  headerOffset = HEADER_OFFSET,
): string[] {
  if (state.headings.length === 0) return []

  const viewportTop = window.scrollY + headerOffset
  const viewportBottom = window.scrollY + window.innerHeight
  const visibleIds = new Set<string>()

  const isInViewport = (top: number, bottom: number) =>
    (top >= viewportTop && top <= viewportBottom) ||
    (bottom >= viewportTop && bottom <= viewportBottom) ||
    (top <= viewportTop && bottom >= viewportBottom)

  state.headings.forEach((heading) => {
    const headingBottom = heading.offsetTop + heading.offsetHeight
    if (isInViewport(heading.offsetTop, headingBottom)) {
      visibleIds.add(heading.id)
    }
  })

  state.regions.forEach((region) => {
    if (region.start <= viewportBottom && region.end >= viewportTop) {
      const heading = document.getElementById(region.id)
      if (heading) {
        const headingBottom = heading.offsetTop + heading.offsetHeight
        if (
          region.end > headingBottom &&
          (headingBottom < viewportBottom || viewportTop < region.end)
        ) {
          visibleIds.add(region.id)
        }
      }
    }
  })

  return Array.from(visibleIds)
}

export function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}
