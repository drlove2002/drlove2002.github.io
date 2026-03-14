export interface ServerStats {
  memberCount: number
  onlineCount: number
  memberCountK: string
  memberCountFormatted: string
  onlineCountFormatted: string
  memberCountRoundEnd: number
  onlineCountRoundEnd: number
}

const FALLBACK: ServerStats = {
  memberCount: 50000,
  onlineCount: 2000,
  memberCountK: '50k+',
  memberCountFormatted: '50,000',
  onlineCountFormatted: '2,000',
  memberCountRoundEnd: 50,
  onlineCountRoundEnd: 2,
}

function formatStats(memberCount: number, onlineCount: number): ServerStats {
  const memberK = Math.floor(memberCount / 1000)
  const onlineK = Math.floor(onlineCount / 1000)

  return {
    memberCount,
    onlineCount,
    memberCountK: `${memberK}k+`,
    memberCountFormatted: memberCount.toLocaleString('en-US'),
    onlineCountFormatted: onlineCount.toLocaleString('en-US'),
    memberCountRoundEnd: memberK,
    onlineCountRoundEnd: onlineK,
  }
}

import { cache } from 'react'

export const getServerStats = cache(async function (): Promise<ServerStats> {
  try {
    const res = await fetch(
      'https://discord.com/api/invites/worldwide?with_counts=true',
      { cache: 'force-cache' }
    )
    if (!res.ok) return FALLBACK

    const data = await res.json()
    const memberCount = data.approximate_member_count
    const onlineCount = data.approximate_presence_count

    if (typeof memberCount !== 'number' || typeof onlineCount !== 'number') {
      return FALLBACK
    }

    return formatStats(memberCount, onlineCount)
  } catch {
    return FALLBACK
  }
})
