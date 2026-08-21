'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    const engagementId = `ENG-${String(
      Math.floor(Math.random() * 1000000)
    ).padStart(6, '0')}`;

    const payload = {
      engagement_id: engagementId,

      school_name: formData.get('school_name'),
      enrolment: formData.get('enrolment'),
      age_range: formData.get('age_range'),
      curriculum: formData.get('curriculum'),

      staffing_teaching: formData.get('staffing_teaching'),
      staffing_admin: formData.get('staffing_admin'),
      staffing_coaching: formData.get('staffing_coaching'),

      facility_constraint: formData.get('facility_constraint'),

      decision_question: formData.get('decision_question'),
      stakes: formData.get('stakes'),

      current_lean: formData.get('current_lean'),
      assumptions: formData.get('assumptions'),

      evidence: formData.get('evidence'),
      politics: formData.get('politics'),

      deadline: formData.get('deadline'),

      status: 'received',
    };

    try {
      // Save submission
      const { data, error } = await supabase
        .from('submissions')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Submission error:', error);

        setErrorMessage(
          'We could not save your request. Please try again.'
        );

        setLoading(false);
        return;
      }

      // Upload supporting documents
      if (files.length > 0 && data) {
        for (const file of files) {
          const safeFileName = file.name.replace(
            /[^a-zA-Z0-9._-]/g,
            '_'
          );

          const filePath =
            `${data.id}/${uuidv4()}-${safeFileName}`;

          const { error: uploadError } =
            await supabase.storage
              .from('client_docs')
              .upload(filePath, file);

          if (uploadError) {
            console.error(
              'Document upload error:',
              uploadError
            );
          }
        }
      }

      alert(
        'Your Decision Stress Test has been submitted successfully.'
      );

      router.push('/');
    } catch (error) {
      console.error('Unexpected error:', error);

      setErrorMessage(
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            FORGE
          </a>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
            Forge Decision Review
          </p>

          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Decision Stress Test
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Give us the messy situation. The better we understand
            the decision, evidence and constraints, the better we
            can challenge it.
          </p>

          <p className="text-sm text-gray-500 mt-3">
            Approximately 5–8 minutes. Your information will be
            treated confidentially.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-10"
        >
          {/* SECTION 1 */}
          <section>
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                01
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                Your school in brief
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Enough context for us to understand the environment
                around the decision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School name
                </label>

                <input
                  name="school_name"
                  required
                  placeholder="School name"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student enrolment
                </label>

                <input
                  name="enrolment"
                  placeholder="e.g. 1,100"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age range
                </label>

                <input
                  name="age_range"
                  placeholder="e.g. 3–18"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Curriculum
                </label>

                <input
                  name="curriculum"
                  placeholder="e.g. IB, UK, US"
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                02
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                Department capacity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="staffing_teaching"
                placeholder="Teaching FTE"
                className="border border-gray-300 p-3 rounded-lg"
              />

              <input
                name="staffing_admin"
                placeholder="Admin FTE"
                className="border border-gray-300 p-3 rounded-lg"
              />

              <input
                name="staffing_coaching"
                placeholder="Coaching FTE"
                className="border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biggest facility or operational constraint
              </label>

              <textarea
                name="facility_constraint"
                placeholder="What most limits the department?"
                className="w-full border border-gray-300 p-3 rounded-lg min-h-[90px]"
              />
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                03
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                The decision
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                State the decision as clearly as you can.
              </p>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              What are you deciding?
            </label>

            <textarea
              name="decision_question"
              required
              placeholder="In one or two sentences, what decision needs to be made?"
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[110px]"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
              What is at stake?
            </label>

            <textarea
              name="stakes"
              placeholder="What happens if you get this wrong? What happens if you do nothing?"
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[110px]"
            />
          </section>

          {/* SECTION 4 */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                04
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                Your current thinking
              </h2>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              What are you currently leaning towards?
            </label>

            <textarea
              name="current_lean"
              placeholder="Your preferred option and any alternatives you have considered."
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[110px]"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
              What assumptions are you making?
            </label>

            <textarea
              name="assumptions"
              placeholder="What needs to be true for your preferred option to work?"
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[110px]"
            />
          </section>

          {/* SECTION 5 */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                05
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                Evidence and stakeholders
              </h2>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              What evidence do you currently have?
            </label>

            <textarea
              name="evidence"
              placeholder="What supports or undermines your current view?"
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[110px]"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
              Who is affected?
            </label>

            <textarea
              name="politics"
              placeholder="Key stakeholders, competing interests, resistance or people who will need convincing."
              className="w-full border border-gray-300 p-3 rounded-lg min-h-[110px]"
            />
          </section>

          {/* SECTION 6 */}
          <section className="border-t border-gray-100 pt-8">
            <div className="mb-5">
              <p className="text-sm font-semibold text-blue-600">
                06
              </p>

              <h2 className="text-xl font-bold text-gray-900">
                Deadline and supporting evidence
              </h2>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              When does the decision need to be made?
            </label>

            <input
              name="deadline"
              placeholder="e.g. 30 September 2026"
              className="w-full border border-gray-300 p-3 rounded-lg"
            />

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting documents
              </label>

              <input
                type="file"
                multiple
                onChange={(e) =>
                  setFiles(
                    e.target.files
                      ? Array.from(e.target.files)
                      : []
                  )
                }
                className="block w-full text-sm text-gray-500"
              />

              <p className="text-xs text-gray-400 mt-2">
                Optional. Upload relevant proposals, budgets,
                policies, schedules or other supporting material.
              </p>
            </div>
          </section>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          {/* SUBMIT */}
          <section className="border-t border-gray-100 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              {loading
                ? 'Submitting...'
                : 'Submit Decision for Review'}
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Founding Decision Review · £195 · Invoice sent
              separately
            </p>
          </section>
        </form>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Return to Forge
          </a>
        </div>
      </section>
    </main>
  );
}
