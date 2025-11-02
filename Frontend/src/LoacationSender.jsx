import React, { useState } from "react";

const LocationSender = () => {
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState(null);

  const sendLocation = async (latitude, longitude) => {
    try {
      const res = await fetch("http://localhost:4000/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "pratham",
          latitude,
          longitude,
        }),
      });

      const data = await res.json();
      console.log("Server response:", data);
      setStatus("✅ Location sent successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send location");
    }
  };

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported by your browser");
      return;
    }

    setStatus("📍 Getting location...");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ latitude, longitude });
            sendLocation(latitude, longitude);
        },
        (error) => {
            console.error(error);

            if (error.code === error.PERMISSION_DENIED) {
            setStatus("⚠️ You denied location. Please enable it in browser settings.");
            } else if (error.code === error.POSITION_UNAVAILABLE) {
            setStatus("❌ Location unavailable. Turn on GPS or check network.");
            } else if (error.code === error.TIMEOUT) {
            setStatus("⌛ Location request timed out. Try again.");
            } else {
            setStatus("❌ Unknown error getting location.");
            }
        }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>📡 Location Tracker</h1>
      <button
        onClick={handleSendLocation}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Send My Location
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>

      {coords && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Latitude:</strong> {coords.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {coords.longitude}
          </p>
          <a
            href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            🌍 View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationSender;
