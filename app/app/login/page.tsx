'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        'Account created. Check your email to confirm your account before signing in.'
      );

      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="mb-8">
          <div className="font-bold text-xl mb-6">FORGE</div>

          <h1 className="text-3xl font-bold">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </h1>

          <p className="text-gray-500 mt-2">
            {mode === 'login'
              ? 'Access your Decision Stress Tests.'
              : 'Create your Forge account.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg"
              placeholder="Minimum 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign in'
              : 'Create account'}
          </button>

          {message && (
            <p className="text-sm text-gray-600 text-center">
              {message}
            </p>
          )}
        </form>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <button
            onClick={() =>
              setMode(mode === 'login' ? 'signup' : 'login')
            }
            className="text-blue-600 font-semibold text-sm"
          >
            {mode === 'login'
              ? 'Need an account? Create one'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </main>
  );
}