"use client"
import { useState } from 'react';

const JoinWaitlist = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thanks for joining the waitlist!');
        setEmail('');
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
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Joining...' : 'Get Early Access'}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-white">{message}</p>}
    </div>
  );
};

export default JoinWaitlist;
