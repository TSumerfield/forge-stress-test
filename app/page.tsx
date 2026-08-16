export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            FORGE
          </a>

          <nav className="space-x-6 text-sm font-medium text-gray-600 hidden md:block">
            <a href="#reviews" className="hover:text-gray-900">
              Reviews
            </a>

            <a href="#resources" className="hover:text-gray-900">
              Resources
            </a>

            <a href="#letter" className="hover:text-gray-900">
              The Forge Letter
            </a>

            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4">
            Independent decision intelligence
          </p>

          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Better decisions for
            <br />
            <span className="text-blue-600">
              international school sport.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-4 leading-relaxed">
            Forge helps sports leaders stress-test consequential
            department decisions before committing.
          </p>

          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Give us the messy situation. We challenge the assumptions,
            examine the evidence, expose what may be missing and give
            you a clear independent recommendation.
          </p>

          <div className="flex flex-wrap gap-4">

            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Start a Decision Stress Test
            </a>

            <a
              href="#reviews"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              How it works
            </a>

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Founding Decision Review · £195
          </p>

        </div>
      </section>

      {/* Principles */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-gray-600">
          <span>INDEPENDENT CHALLENGE</span>
          <span>·</span>
          <span>EVIDENCE OVER OPINION</span>
          <span>·</span>
          <span>PRACTICAL RECOMMENDATIONS</span>
          <span>·</span>
          <span>INTERNATIONAL SCHOOL SPORT</span>
        </div>
      </section>

      {/* Decision Review */}
      <section
        id="reviews"
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <div className="max-w-3xl mb-12">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
            Forge Decision Review
          </p>

          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Before you commit, stress-test the decision.
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Important department decisions are rarely difficult because
            leaders lack intelligence. They are difficult because the
            evidence is incomplete, assumptions go unchallenged and
            consequences are hard to see from inside the problem.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-blue-600 mb-4">
              01
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Send the decision
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Give us the decision, context, constraints, options,
              deadline and whatever evidence you already have.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-blue-600 mb-4">
              02
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              We stress-test it
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Forge challenges assumptions, identifies missing
              information, examines alternatives and tests
              second-order consequences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-blue-600 mb-4">
              03
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Get a recommendation
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Receive a clear verdict, rationale, recommended actions
              and a decision record you can return to later.
            </p>
          </div>

        </div>
      </section>

      {/* What You Receive */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                The output
              </p>

              <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-5">
                Clarity before commitment.
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed">
                The objective is not more information.