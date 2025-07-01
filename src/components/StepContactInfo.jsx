import React from "react";
import "./ChatBotContainer.css";

const iconEmail = <span style={{ marginRight: 6, fontSize: 18 }}>📧</span>;
const iconPhone = <span style={{ marginRight: 6, fontSize: 18 }}>📞</span>;

export default function StepContactInfo({ data = {}, onChange, onNext, onBack }) {
  return (
    <div
      style={{
        background: "#f8fdff",
        borderRadius: 18,
        padding: "2.5rem 2rem 2rem 2rem",
        maxWidth: 420,
        margin: "2rem auto 0 auto",
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
        border: "1px solid #e3f2fd",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 28, marginRight: 10 }}>📩</span>
        <h2
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: 22,
            color: "#1a237e",
          }}
        >
          I’m ready with your tailored solution.
        </h2>
      </div>
      <div
        style={{
          color: "#374151",
          fontSize: 17,
          marginBottom: 24,
        }}
      >
        How should I send it to you?
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        autoComplete="off"
      >
        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 15,
              display: "block",
              marginBottom: 6,
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            value={data?.name || ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Your full name"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #bdbdbd",
              fontSize: 16,
              marginBottom: 0,
              background: "#fff",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 15,
              display: "block",
              marginBottom: 6,
            }}
          >
            Email{" "}
            <span style={{ color: "#d32f2f" }}>(required)</span>
          </label>
          <input
            type="email"
            value={data?.email || ""}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="you@email.com"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #bdbdbd",
              fontSize: 16,
              background: "#fff",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 15,
              display: "block",
              marginBottom: 6,
            }}
          >
            Phone{" "}
            <span style={{ color: "#888", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            type="tel"
            value={data?.phone || ""}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="Phone number"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #bdbdbd",
              fontSize: 16,
              background: "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 15,
              display: "block",
              marginBottom: 10,
            }}
          >
            Preferred Contact Method
          </label>
          <div style={{ display: "flex", gap: 18 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={data?.contactMethod === "email"}
                onChange={() => onChange({ ...data, contactMethod: "email" })}
                style={{ marginRight: 6 }}
                required
              />
              {iconEmail}Email Only
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="contactMethod"
                value="both"
                checked={data?.contactMethod === "both"}
                onChange={() => onChange({ ...data, contactMethod: "both" })}
                style={{ marginRight: 6 }}
              />
              {iconPhone}Email + Phone
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "#fff",
              color: "#1976d2",
              border: "1.5px solid #1976d2",
              borderRadius: 7,
              padding: "10px 22px",
              fontWeight: 500,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            ← Back
          </button>
          <button
            type="submit"
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "10px 28px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.08)",
              transition: "background 0.2s",
            }}
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
}
