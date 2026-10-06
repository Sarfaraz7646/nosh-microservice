import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const icon = L.divIcon({
  className: "live-map-marker",
  html: "<span></span>",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});
function Recenter({ point }) {
  const map = useMap();
  if (point) map.setView(point, 15);
  return null;
}
export default function LiveMap({
  partnerLocation,
  customerLocation,
  restaurantLocation,
  height = 360,
}) {
  const points = [partnerLocation, customerLocation, restaurantLocation].filter(
    Boolean,
  );
  const center = partnerLocation ||
    customerLocation ||
    restaurantLocation || [28.6139, 77.209];
  return (
    <div style={{ height, borderRadius: 18, overflow: "hidden" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {partnerLocation && (
          <Marker position={partnerLocation} icon={icon}>
            <Popup>Delivery partner</Popup>
          </Marker>
        )}
        {customerLocation && (
          <Marker position={customerLocation}>
            <Popup>Customer</Popup>
          </Marker>
        )}
        {restaurantLocation && (
          <Marker position={restaurantLocation}>
            <Popup>Restaurant</Popup>
          </Marker>
        )}
        {points.length > 1 && <Polyline positions={points} />}
        <Recenter point={partnerLocation} />
      </MapContainer>
    </div>
  );
}
