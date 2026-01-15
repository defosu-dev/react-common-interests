import { observer } from 'mobx-react-lite'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { LatLngTuple } from 'leaflet'

import { MapMarkers } from './MapMarkers'
import { useStore } from '../../app/providers/storeContext'
import { useUsers } from '../../hooks/useUser'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as { _getIconUrl?: string | undefined })._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export const MapView = observer(() => {
  const store = useStore()

  useUsers()

  const center: LatLngTuple = [48.5, 31.3]

  return (
    <div className="relative h-full w-full">
      {store.isLoading && (
        <div className="absolute top-2 right-2 z-20 rounded bg-black/70 px-3 py-1 text-sm text-white">
          Filtering users…
        </div>
      )}

      <MapContainer
        center={center}
        zoom={6}
        minZoom={3}
        scrollWheelZoom
        className="h-full w-full rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MapMarkers />
      </MapContainer>
    </div>
  )
})
