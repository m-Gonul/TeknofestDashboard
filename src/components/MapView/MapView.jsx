import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';

const ClickMarker = ({ onClick }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onClick) onClick(e.latlng);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>Seçilen Nokta<br />Lat: {position.lat.toFixed(4)}<br />Lng: {position.lng.toFixed(4)}</Popup>
    </Marker>
  ) : null;
};

const MapView = ({ onMapClick }) => {
  return (
    <MapContainer
      center={[38.4237, 27.1428]} // İzmir başlangıç noktası gibi
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> katkı sağlayanlar'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickMarker onClick={onMapClick} />
    </MapContainer>
  );
};

export default MapView;
