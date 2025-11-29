"use client"
import { useState } from 'react';

const JoinWaitlist = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thanks for joining the waitlist!');
        setEmail('');
        setFirstName('');
        setLastName('');
        setShowModal(false);
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className={`relative font-fustat ${className}`}>
      <form onSubmit={handleInitialSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 lg:p-5 bg-white rounded-xl text-[16px]"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-1 lg:right-2 inline-flex p-2 lg:p-3 rounded-xl top-1 lg:top-2 bg-[#5D26FF] text-white"
        >
          {loading ? 'Processing...' : 'Get Early Access'}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-white">{message}</p>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Enter Your Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg text-black"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black"
                required
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
                  {loading ? 'Joining...' : 'Join Waitlist'}
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
