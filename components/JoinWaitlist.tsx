"use client";
import { useState, useEffect } from "react";

const JoinWaitlist = ({ className }: {id?:string, className?: string }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/join-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thanks for joining the waitlist!");
        setEmail("");
        setFirstName("");
        setShowModal(false);
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      className={`relative font-fustat ${className}`}
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <form onSubmit={handleInitialSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 lg:p-5 bg-[#D7D7D780] rounded-xl text-[14px] lg:text-[16px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-1 lg:right-2 inline-flex p-2 lg:p-3 rounded-xl top-1 lg:top-2 bg-[#5D26FF] text-white"
        >
          {loading ? "Processing..." : "Get Early Access"}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-white">{message}</p>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4"
            data-aos="zoom-in"
          >
            <h2 className="text-xl font-bold mb-4 text-black">One last step</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#5D26FF] text-white rounded-lg"
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinWaitlist;
