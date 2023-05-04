import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
//import 'leaflet/dist/leaflet.css';

function LeafletMap({ latlng, onMarkerChange }) {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView(latlng, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 18,
    }).addTo(map);

    // Create a new marker and add it to the map
    const marker = L.marker(latlng, {
      draggable: true,
    }).addTo(map);

    // Update the marker location when it's dragged
    marker.on('dragend', (e) => {
      setMarker(e.target);
      onMarkerChange(e.target);
    });

    // Update the marker location when the map is clicked
    function onMapClick(e) {
      marker.setLatLng(e.latlng);
      setMarker(marker);
      onMarkerChange(marker);
    }

    map.on('click', onMapClick);

    return () => {
      map.off('click', onMapClick);
      marker.off('dragend');
      map.remove();
    };
  }, [latlng, onMarkerChange]);

  return (
    <div ref={mapRef} style={{ height: '500px' }}></div>
  );
}

LeafletMap.propTypes = {
  latlng: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMarkerChange: PropTypes.func.isRequired,
};

export default LeafletMap;
