'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      setMessage('You need to sign in before submitting a decision.');
      return;
    }

    const formData = new FormData(e.currentTarget);

    const options = String(formData.get('options') || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      user_id: user.id,
      title: formData.get('title'),
      decision: formData.get('decision'),
      context: formData.get('context'),
      constraints: formData.get('constraints'),
      options,
      deadline: formData.get('deadline') || null,
      supporting_evidence: formData.get('supporting_evidence'),
      difficulty: formData.get('difficulty'),
      status: 'SUBMITTED',
    };

    const { error } = await supabase
      .from('decision_intakes')
      .insert(payload);

    if (error) {
      console.error(error);
      setLoading(false);
      setMessage('Something went wrong. Please try again.');
      return;
    }

    setLoading(false);
    setMessage('Decision submitted successfully.');
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">
          Decision Stress Test
        </h1>

        <p className="text-gray-500 mb-8">
          Give Forge the messy situation. We do the thinking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">
              Decision title
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Should we restructure our varsity programme?"
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              What decision needs to be made?
            </label>
            <textarea
              name="decision"
              required
              placeholder="State the decision as clearly as you can."
              className="w-full border p-3 rounded h-24"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Context
            </label>
            <textarea
              name="context"
              required
              placeholder="What is happening, and why does this decision matter now?"
              className="w-full border p-3 rounded h-28"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Options being considered
            </label>
            <textarea
              name="options"
              required
              placeholder={'One option per line\nOption A\nOption B\nOption C'}
              className="w-full border p-3 rounded h-28"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Constraints
            </label>
            <textarea
              name="constraints"
              required
              placeholder="Budget, staffing, politics, facilities, timing, policy, governance..."
              className="w-full border p-3 rounded h-28"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Decision deadline
            </label>
            <input
              type="date"
              name="deadline"
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Supporting evidence
            </label>
            <textarea
              name="supporting_evidence"
              placeholder="What data, feedback, previous attempts or evidence should Forge know about?"
              className="w-full border p-3 rounded h-28"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              What makes this difficult?
            </label>
            <textarea
              name="difficulty"
              required
              placeholder="What are you uncertain about? What are you worried you might be missing?"
              className="w-full border p-3 rounded h-28"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Decision'}
          </button>

          {message && (
            <p className="text-sm text-center text-gray-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}