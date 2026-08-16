'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

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

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
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
      .select('id, title, decision, deadline, status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
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
      <main className="min-h-screen bg-gray-50 p-8">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <div className="font-bold text-xl">FORGE</div>
            <div className="text-sm text-gray-500">
              {email}
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Your Decisions
            </h1>
            <p className="text-gray-500 mt-1">
              Decisions submitted for independent stress testing.
            </p>
          </div>

          <a
            href="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg text-center"
          >
            New Decision
          </a>
        </div>

        {decisions.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="font-bold text-xl mb-2">
              No decisions yet
            </h2>
            <p className="text-gray-600 mb-5">
              Submit your first consequential decision for review.
            </p>

            <a
              href="/submit"
              className="inline-block bg-gray-900 text-white font-semibold px-5 py-3 rounded-lg"
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
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                      {decision.status}
                    </div>

                    <h2 className="text-xl font-bold mb-2">
                      {decision.title}
                    </h2>

                    <p className="text-gray-600">
                      {decision.decision}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {decision.deadline
                      ? `Deadline: ${decision.deadline}`
                      : 'No deadline'}
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