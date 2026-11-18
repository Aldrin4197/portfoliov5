import { projects } from './featured'
import { archive } from './projects'

export interface CatalogProject {
  id: string
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  status: string
  url?: string
  activity: string
}

// Last documented work or project snapshot. Dates are not release dates.
const recentActivity: Record<string, string> = {
  perchwise: '2026-10-15', overlays: '2026-11-17', katha: '2026-11', aadi: '2026-11', color: '2026-11', esports: '2026-11',
  game: '2026-11', stria: '2026-11', amari: '2026-03-24',
}

const earlierActivity: Record<string, string> = {
  'Personnel Recruitment System': '2026-03-24',
  'SSU Helpdesk': '2026-02-26',
  'Document Tracking System': '2026-02-18',
  'SSU Digital Assets Management System': '2025-07-06',
  'MLBB Draft Simulator V1': '2025-06-08',
  'Air Quality Monitoring': '2025-05-27',
  'iPOVCON 2025': '2025',
}

export const catalog: CatalogProject[] = [
  ...projects.map(p => ({
    ...p, activity: recentActivity[p.id] ?? '',
    image: p.image ? import.meta.env.BASE_URL + 'projects/' + p.image + '.webp' : '',
  })),
  ...archive.map(p => ({
    id: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: p.title, description: p.desc, image: p.img, status: p.status, tags: p.tags,
    category: p.tags.includes('Embedded Systems') ? 'Hardware' :
      p.title === 'MLBB Draft Simulator V1' ? 'Games' : 'Web apps',
    activity: earlierActivity[p.title] ?? '',
  })),
].sort((a,b) => b.activity.localeCompare(a.activity) || a.title.localeCompare(b.title))

const month = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' })
export function activityLabel(date: string) {
  if (!date) return 'Undated'
  if (date.length === 4) return date
  return month.format(new Date(date.slice(0,7) + '-01T00:00:00Z'))
}
