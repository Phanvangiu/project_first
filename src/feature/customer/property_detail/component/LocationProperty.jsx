import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import styled from "styled-components";

// Custom icon cho marker
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/4284/4284108.png",
  iconSize: [30, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component để thay đổi vị trí bản đồ
const ChangeView = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position, 15); // Zoom tới vị trí
  }
  return null;
};
const StyledHeader = styled.div`
  margin: 4rem 0;
  font-size: 22px;
  font-weight: bold;
`;
// Component hiển thị bản đồ
const LocationProperty = ({ data }) => {
  const position = [data.coordinatesX, data.coordinatesY]; // Lấy tọa độ từ props

  return (
    <div>
      <StyledHeader>Where you’ll be</StyledHeader>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Coordinates: {position[0]}, {position[1]}
          </Popup>
        </Marker>
        <ChangeView position={position} />
      </MapContainer>
    </div>
  );
};

export default LocationProperty;
