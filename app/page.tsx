export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <span className="text-2xl font-bold tracking-tight text-gray-900">FORGE</span>
          <nav className="space-x-6 text-sm font-medium text-gray-600 hidden md:block">
            <a href="#" className="hover:text-gray-900">Reviews</a>
            <a href="#" className="hover:text-gray-900">Resources</a>
            <a href="#" className="hover:text-gray-900">The Forge Letter</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Independent Intelligence <br />
            <span className="text-blue-600">For International School Sport</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Forge exists to improve sports leadership in international schools through independent research, practical frameworks and evidence-based reviews.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Your Stress Test (£195)
            </a>
            <a 
              href="#" 
              className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Read The Forge Letter
            </a>
          </div>
        </div>
      </section>

      {/* Principles Bar */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">
          <span>INDEPENDENT INTELLIGENCE</span>
          <span>·</span>
          <span>EVIDENCE-BASED</span>
          <span>·</span>
          <span>PRACTICAL FRAMEWORKS</span>
          <span>·</span>
          <span>INTERNATIONAL SCHOOLS</span>
        </div>
      </section>

      {/* Three Service Columns */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Department Reviews */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Department Reviews</h2>
            <p className="text-gray-600 leading-relaxed">
              Independent reviews that uncover strengths, risks and the highest leverage improvements.
            </p>
          </div>

          {/* Leadership Intelligence */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Leadership Intelligence</h2>
            <p className="text-gray-600 leading-relaxed">
              Research and insights for sports leaders who want to make better decisions with confidence.
            </p>
          </div>

          {/* Research & Frameworks */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Research & Frameworks</h2>
            <p className="text-gray-600 leading-relaxed">
              Practical frameworks and resources built from deep experience across international schools.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 text-center mb-12">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-900">Department Health Check</h3>
              <p className="text-sm text-gray-500 mt-1">A diagnostic framework across six key domains</p>
            </a>
            <a href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold text-gray-900">Annual Planning Checklist</h3>
              <p className="text-sm text-gray-500 mt-1">Plan your year with confidence</p>
            </a>
            <a href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900">Hiring Scoreboard</h3>
              <p className="text-sm text-gray-500 mt-1">Evaluate candidates systematically</p>
            </a>
            <a href="#" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-gray-900">Safeguarding Checklist</h3>
              <p className="text-sm text-gray-500 mt-1">Essential safeguarding review</p>
            </a>
          </div>
        </div>
      </section>

      {/* The Forge Letter / Blog Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">The Forge Letter</h2>
            <p className="text-gray-600 mt-2 text-lg">Insights. Frameworks. Practical tools. Every week.</p>
          </div>
          <a href="#" className="mt-4 md:mt-0 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm">
            Subscribe
          </a>
        </div>

        {/* Featured Article */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Latest Letter</span>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mt-2 mb-3">
                Why good departments slowly become chaotic
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A look at the invisible patterns that create complexity—and how to simplify without losing quality.
              </p>
              <a href="#" className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700">
                Read the full letter →
              </a>
            </div>
            <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              [Feature Image]
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-gray-500">© 2026 FORGE. All rights reserved.</span>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900">Reviews</a>
            <a href="#" className="hover:text-gray-900">Resources</a>
            <a href="#" className="hover:text-gray-900">The Forge Letter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}