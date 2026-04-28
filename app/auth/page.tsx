'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch('/api/auth/send-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900">Chessy</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to play</p>

          <div className="mt-6">
            {sent ? (
              <div className="text-center space-y-3 py-4">
                <p className="text-base font-semibold text-gray-800">Check your email</p>
                <p className="text-sm text-gray-600">
                  If <span className="font-medium">{email}</span> is allowed, we&rsquo;ve sent a sign-in link.
                  <br />
                  It expires in 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="mt-1 block w-full h-10 px-3 rounded border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full h-10 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : 'Send magic link'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
