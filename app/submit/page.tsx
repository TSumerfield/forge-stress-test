'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const engagementId = `ENG-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
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

    // 1. Save the submission to Supabase
    const { data, error } = await supabase
      .from('submissions')
      .insert([payload])
      .select()
      .single();

    if (error) {
      alert('Error saving your request. Please try again.');
      console.error(error);
      setLoading(false);
      return;
    }

    // 2. Upload documents if any
    if (files.length > 0 && data) {
      for (const file of files) {
        const filePath = `${data.id}/${uuidv4()}-${file.name}`;
        await supabase.storage
          .from('client_docs')
          .upload(filePath, file);
      }
    }

    setLoading(false);
    alert('Your Stress Test has been submitted! We will get back to you within 3-5 days.');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">Decision Stress Test</h1>
        <p className="text-gray-500 mb-6">Fill out this 5-8 minute form. A confidential report follows.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section A: Context */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">1. Your school in brief</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="school_name" placeholder="School Name" className="border p-3 rounded" required />
              <input name="enrolment" placeholder="Enrolment (e.g., 1100)" className="border p-3 rounded" />
              <input name="age_range" placeholder="Age Range (e.g., 3-18)" className="border p-3 rounded" />
              <input name="curriculum" placeholder="Curriculum (IB / UK / US)" className="border p-3 rounded" />
              <input name="staffing_teaching" placeholder="Teaching FTE" className="border p-3 rounded" />
              <input name="staffing_admin" placeholder="Admin FTE" className="border p-3 rounded" />
              <input name="staffing_coaching" placeholder="Coaching FTE" className="border p-3 rounded" />
              <input name="facility_constraint" placeholder="Biggest facility constraint" className="border p-3 rounded" />
            </div>
          </div>

          {/* Section B: Decision */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">2. The decision & stakes</h2>
            <textarea name="decision_question" placeholder="What are you deciding? (One sentence)" className="w-full border p-3 rounded h-12" required />
            <textarea name="stakes" placeholder="What happens if you get this wrong? What if you do nothing?" className="w-full border p-3 rounded h-20 mt-2" />
          </div>

          {/* Section C: Your current thinking */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">3. Your current lean</h2>
            <textarea name="current_lean" placeholder="What are you leaning towards? Other options considered?" className="w-full border p-3 rounded h-20" />
            <textarea name="assumptions" placeholder="List your assumptions (what must be true for your preferred option to work?)" className="w-full border p-3 rounded h-20 mt-2" />
          </div>

          {/* Section D: Evidence & Politics */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">4. Evidence & politics</h2>
            <textarea name="evidence" placeholder="What evidence supports (or undermines) your lean?" className="w-full border p-3 rounded h-20" />
            <textarea name="politics" placeholder="Who is most affected? Who is hardest to convince?" className="w-full border p-3 rounded h-20 mt-2" />
            <input name="deadline" placeholder="Decision deadline (e.g., End of Term)" className="w-full border p-3 rounded mt-2" />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload supporting documents (optional)</label>
            <input type="file" multiple onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            <p className="text-xs text-gray-400 mt-1">Accepts budgets, policies, proposals, schedules.</p>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit for Review (£195)'}
          </button>
          <p className="text-xs text-center text-gray-400">We will send an invoice separately.</p>
        </form>
      </div>
    </div>
  );
}