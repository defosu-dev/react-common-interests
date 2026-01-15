import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.markercluster'

import { useStore } from '../../app/providers/storeContext'
import type { User } from '../../entities/user/model/types'

interface ClusterIconData {
  getChildCount: () => number
}

const createClusterIcon = (cluster: ClusterIconData): L.DivIcon => {
  const count = cluster.getChildCount()

  let size = 40
  let color = 'bg-indigo-700/90'

  if (count >= 100) {
    size = 56
    color = 'bg-red-700/90'
  } else if (count >= 20) {
    size = 48
    color = 'bg-amber-700/90'
  }

  return L.divIcon({
    html: `
      <div
        class="${color} text-white font-bold rounded-full flex items-center justify-center shadow-lg"
        style="width:${size}px;height:${size}px"
      >
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
  })
}

export const MapMarkers = () => {
  const store = useStore()
  const map = useMap()

  const clusterRef = useRef<L.MarkerClusterGroup | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      iconCreateFunction: createClusterIcon,
      chunkedLoading: true,
      chunkInterval: 100,
      chunkDelay: 30,
      showCoverageOnHover: false,
      animate: true,
    })

    clusterRef.current = cluster
    map.addLayer(cluster)

    return () => {
      map.removeLayer(cluster)
    }
  }, [map])

  useEffect(() => {
    if (!clusterRef.current) return

    store.filteredUsers.forEach((user: User) => {
      const id = user.id.toString()
      if (markersRef.current.has(id)) return

      const marker = L.marker([user.lat, user.lon])

      marker.bindPopup(`
        <div class="min-w-45 text-sm">
          <div class="mb-1 text-base font-bold">${user.name}</div>
          <div>${user.interests.join(' • ')}</div>
        </div>
      `)

      markersRef.current.set(id, marker)
    })
  }, [store.filteredUsers])

  useEffect(() => {
    if (!clusterRef.current) return

    const cluster = clusterRef.current
    cluster.clearLayers()

    store.filteredUsers.forEach(user => {
      const marker = markersRef.current.get(user.id.toString())
      if (marker) cluster.addLayer(marker)
    })
  }, [store.filteredUsers])

  return null
}
