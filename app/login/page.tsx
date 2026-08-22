'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const redirectTo = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg border border-black/20 bg-[#ece8dd] p-8 md:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-black/45">FORGE ADMINISTRATION</p>
        <h1 className="mt-5 text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.06em]">Validation dashboard.</h1>

        {sent ? (
          <div className="mt-10 border-y border-black py-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-black/45">MAGIC LINK SENT</p>
            <h2 className="mt-4 text-2xl font-semibold uppercase tracking-[-0.03em]">Check your inbox.</h2>
            <p className="mt-4 leading-7 text-black/60">We sent a secure sign-in link to <strong>{email}</strong>. Open it on this device to access the Forge validation dashboard.</p>
            <button type="button" onClick={() => { setSent(false); setError(''); }} className="mt-7 text-xs font-semibold tracking-[0.14em] underline underline-offset-8">USE A DIFFERENT EMAIL</button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-10">
            <label htmlFor="email" className="text-sm font-semibold">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-3 w-full border border-black/30 bg-transparent px-4 py-4 outline-none focus:border-black"
            />

            {error && <div className="mt-4 border border-red-300 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

            <button type="submit" disabled={loading} className="mt-6 w-full bg-black px-6 py-4 text-xs font-semibold tracking-[0.14em] text-white disabled:opacity-40">
              {loading ? 'SENDING…' : 'SEND SECURE SIGN-IN LINK'}
            </button>
          </form>
        )}

        <p className="mt-8 text-xs leading-5 text-black/45">No password required. Access is authenticated through a one-time email link.</p>
      </div>
    </main>
  );
}
