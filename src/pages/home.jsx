import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import lg from "../assets/images/bci-logo.svg";
import vm from "../assets/videos/Company-Reel-2.mp4";
import data from "../assets/data.json";
import { useUser } from "../context/user";

export default function HomeScreen() {
  const [inputRef, setInputRef] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const getUserData = (ref) => {
    if (!ref) return null;
    const key = Object.keys(data).find(
      (k) => k.toLowerCase() === ref.toLowerCase()
    );
    return key ? data[key] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.trim())
      return setError("Please enter your reference number.");
    const user = getUserData(inputRef);
    if (!user) return setError("Invalid reference number.");
    else setUser(user);
    setError("");
    navigate("/claim");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section with Video Background */}
      <div className="relative flex-1 min-h-[400px] md:min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={vm} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/70"></div>

        {/* Foreground Content */}
        <div className="relative text-center px-8 animate-fadeIn z-10">
          <img src={lg} alt="BCI Logo" className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Grants Portal</h1>
          <p className="text-blue-100 text-lg max-w-md mx-auto leading-relaxed">
            Access your{" "}
            <span className="font-semibold">Grant Verification Portal</span> and
            confirm your eligibility for this year’s Christmas Grant Program.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 bg-white text-slate-800 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Verify Your Reference Number
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Enter your assigned grant reference number below to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Reference Number
              </label>
              <input
                type="text"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value)}
                placeholder="e.g. BCI-123456"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:check-circle-outline" width="22" />
              Continue
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-6">
            Powered by <span className="font-semibold">BCI Support</span>
          </p>
        </div>
      </div>
    </div>
  );
}
