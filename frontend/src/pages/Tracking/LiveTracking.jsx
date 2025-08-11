import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// NOTE: This uses Google Maps JS API dynamically without an API key for placeholder purposes.
// For production, supply your key and use official loader.

function loadGoogleMaps(callback) {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const existing = document.getElementById('gmap-script');
  if (existing) {
    existing.addEventListener('load', callback);
    return;
  }
  const script = document.createElement('script');
  script.id = 'gmap-script';
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const base = 'https://maps.googleapis.com/maps/api/js';
  script.src = key ? `${base}?key=${key}` : base;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}

const LiveTracking = () => {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mapInstance = null;
    let marker = null;
    let watcherId = null;

    function initMap(position) {
      const center = {
        lat: position?.coords?.latitude || 0,
        lng: position?.coords?.longitude || 0,
      };
      mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        disableDefaultUI: true,
      });
      marker = new window.google.maps.Marker({ position: center, map: mapInstance, title: 'Your Location' });
    }

    function updatePosition(position) {
      const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
      if (mapInstance) {
        mapInstance.setCenter(pos);
      }
      if (marker) {
        marker.setPosition(pos);
      }
    }

    loadGoogleMaps(() => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          initMap(pos);
          watcherId = navigator.geolocation.watchPosition(updatePosition, (err) => setError(err.message), {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 10000,
          });
        },
        (err) => setError(err.message),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    });

    return () => {
      if (watcherId) navigator.geolocation.clearWatch(watcherId);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'fixed', top: 90, left: '50%', transform: 'translateX(-50%)', background: '#fee2e2', color: '#991b1b', padding: '8px 12px', borderRadius: 8 }}>
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default LiveTracking;


