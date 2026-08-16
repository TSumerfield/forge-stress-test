'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

type Decision = {
  id: string;
  title: string;
  decision: string;
  deadline: string | null;
  status: string;
  created_at: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setErrorMessage('');

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push('/login');
      return;
    }

    setEmail(user.email ?? null);

    const { data, error } = await supabase
      .from('decision_intakes')
      .select(
        'id, title, decision, deadline, status, created_at'
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Dashboard load error:', error);
      setErrorMessage(
        'We could not load your decisions. Please try again.'
      );
    } else {
      setDecisions(data || []);
    }

    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading Forge...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <a
              href="/"
              className="font-bold text-xl tracking-tight text-gray-900"
            >
              FORGE
            </a>

            {email && (
              <div className="text-sm text-gray-500 mt-1">
                {email}
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Dashboard */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
              Decision Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your decisions
            </h1>

            <p className="text-gray-500 mt-2">
              Track decisions submitted for independent stress testing.
            </p>
          </div>

          <a
            href="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg text-center transition-colors"
          >
            New Decision
          </a>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-sm">
            {errorMessage}
          </div>
        )}

        {decisions.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="font-bold text-xl text-gray-900 mb-2">
              No decisions yet
            </h2>

            <p className="text-gray-600 mb-5">
              Submit your first consequential decision for an independent
              Forge stress test.
            </p>

            <a
              href="/submit"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
            >
              Start Decision Stress Test
            </a>
          </div>
        ) : (
          <div className="grid gap-4">
            {decisions.map((decision) => (
              <div
                key={decision.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {decision.status}
                      </span>

                      <span className="text-xs text-gray-400">
                        Submitted{' '}
                        {new Date(
                          decision.created_at
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {decision.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                      {decision.decision}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {decision.deadline
                      ? `Deadline: ${decision.deadline}`
                      : 'No deadline set'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
