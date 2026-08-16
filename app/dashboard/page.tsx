'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { supabaseAdmin } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- PASSWORD CHECK ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-xl font-bold mb-4 text-center">Admin Access</h1>
          <input 
            type="password" 
            placeholder="Enter password" 
            className="border p-3 rounded w-full mb-4 text-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="bg-blue-600 text-white w-full py-3 rounded font-bold"
            onClick={() => {
              // CHANGE THIS PASSWORD TO WHATEVER YOU WANT
              if (password === 'forge123') {
                setIsAuthorized(true);
              } else {
                alert('Wrong password');
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD LOGIC (only runs if password is correct) ---
  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSubmissions(data);
    setLoading(false);
  }

  async function handleReportUpload(submissionId: string, file: File, verdict: string) {
    if (!file) return;
    
    const filePath = `${submissionId}/${file.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from('forge_reports')
      .upload(filePath, file);

    if (uploadError) {
      alert('Upload failed');
      return;
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('forge_reports')
      .getPublicUrl(filePath);

    await supabase
      .from('submissions')
      .update({ 
        status: 'report_sent', 
        report_file_url: urlData.publicUrl,
        verdict: verdict 
      })
      .eq('id', submissionId);

    alert('Report uploaded! Status updated.');
    fetchSubmissions();
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Forge Admin</h1>
      <div className="grid gap-6">
        {submissions.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-xl">{sub.school_name || 'Unnamed School'}</h2>
                <p className="text-sm text-gray-500">ID: {sub.engagement_id} | Status: <span className={`font-semibold ${sub.status === 'received' ? 'text-yellow-600' : 'text-green-600'}`}>{sub.status}</span></p>
                <p className="mt-2"><strong>Decision:</strong> {sub.decision_question}</p>
                <p className="text-sm text-gray-600 mt-1"><strong>Deadline:</strong> {sub.deadline}</p>
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer text-blue-600">View Full Context</summary>
                  <pre className="bg-gray-50 p-3 rounded mt-2 whitespace-pre-wrap">{JSON.stringify(sub, null, 2)}</pre>
                </details>
              </div>
              <div>
                {sub.status !== 'report_sent' && (
                  <div className="mt-4 border-t pt-4">
                    <label className="block text-sm font-medium">Upload Final Report (PDF)</label>
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        const verdict = prompt('Enter verdict (PROCEED / MODIFY / DELAY / REJECT):');
                        if (file && verdict) {
                          handleReportUpload(sub.id, file, verdict);
                        }
                      }} 
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}