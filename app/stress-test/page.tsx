"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type DimensionKey =
  | "leadership"
  | "people"
  | "systems"
  | "programme"
  | "evidence"
  | "resilience";

type Question = {
  id: number;
  dimension: DimensionKey;
  text: string;
};

type Dimension = {
  key: DimensionKey;
  name: string;
  shortName: string;
  description: string;
};

type FragilitySignal = {
  title: string;
  description: string;
};

const dimensions: Dimension[] = [
  {
    key: "leadership",
    name: "Leadership & Direction",
    shortName: "Leadership",
    description:
      "Clarity of priorities, ownership, decision-making and strategic focus.",
  },
  {
    key: "people",
    name: "People & Accountability",
    shortName: "People",
    description:
      "Clear expectations, ownership, accountability and productive challenge.",
  },
  {
    key: "systems",
    name: "Systems & Operations",
    shortName: "Systems",
    description:
      "Reliable processes, accessible information and repeatable delivery.",
  },
  {
    key: "programme",
    name: "Programme & Pathways",
    shortName: "Programme",
    description:
      "Intentional programme design, progression and alignment with student need.",
  },
  {
    key: "evidence",
    name: "Evidence & Improvement",
    shortName: "Evidence",
    description:
      "The ability to measure performance, learn and improve deliberately.",
  },
  {
    key: "resilience",
    name: "Resilience & Continuity",
    shortName: "Resilience",
    description:
      "How well the department can survive absence, turnover and leadership change.",
  },
];

const questions: Question[] = [
  {
    id: 1,
    dimension: "leadership",
    text: "Our department has no more than three to five priorities that staff could identify without referring to a planning document.",
  },
  {
    id: 2,
    dimension: "leadership",
    text: "Staff can explain what success for the department means beyond delivering the calendar of sport.",
  },
  {
    id: 3,
    dimension: "leadership",
    text: "For significant areas of department activity, it is clear who has authority to make the final decision.",
  },
  {
    id: 4,
    dimension: "leadership",
    text: "In the last 12 months, we have stopped, reduced or deprioritised activity because it did not support our priorities.",
  },
  {
    id: 5,
    dimension: "leadership",
    text: "When new opportunities or requests arise, we assess them against existing priorities rather than routinely adding them to the workload.",
  },
  {
    id: 6,
    dimension: "people",
    text: "Staff can identify the outcomes they personally own, not just the activities they help deliver.",
  },
  {
    id: 7,
    dimension: "people",
    text: "Expectations for coaches and staff are sufficiently clear that strong and weak performance can be distinguished.",
  },
  {
    id: 8,
    dimension: "people",
    text: "In the last 12 months, performance or behaviour below the expected standard has been directly addressed.",
  },
  {
    id: 9,
    dimension: "people",
    text: "Important recurring responsibilities have one clearly accountable owner.",
  },
  {
    id: 10,
    dimension: "people",
    text: "Staff can challenge a department decision or existing practice without creating unnecessary personal conflict.",
  },
  {
    id: 11,
    dimension: "systems",
    text: "Our major recurring activities use established processes rather than being rebuilt each time.",
  },
  {
    id: 12,
    dimension: "systems",
    text: "A staff member can find the information needed to perform their responsibilities without routinely asking another person where it is.",
  },
  {
    id: 13,
    dimension: "systems",
    text: "We have one reliable way of seeing important upcoming work, deadlines and ownership.",
  },
  {
    id: 14,
    dimension: "systems",
    text: "When the same operational problem occurs repeatedly, we change the underlying process rather than continuing to solve individual incidents.",
  },
  {
    id: 15,
    dimension: "systems",
    text: "A competent new staff member could take responsibility for a major recurring process using the information currently available to them.",
  },
  {
    id: 16,
    dimension: "programme",
    text: "We can clearly explain why each major part of our sporting programme exists.",
  },
  {
    id: 17,
    dimension: "programme",
    text: "Students and families can understand how sporting opportunities differ by age, level and purpose.",
  },
  {
    id: 18,
    dimension: "programme",
    text: "Participation, development and performance opportunities are intentionally designed rather than emerging primarily from available staff, facilities or historical practice.",
  },
  {
    id: 19,
    dimension: "programme",
    text: "Decisions about team selection, competition level and athlete progression follow principles that staff can explain consistently.",
  },
  {
    id: 20,
    dimension: "programme",
    text: "Within the last 12 months, we have materially changed, added or removed part of the programme because student or school needs justified it.",
  },
  {
    id: 21,
    dimension: "evidence",
    text: "We track a small number of measures that tell us whether the sports programme is achieving its intended outcomes.",
  },
  {
    id: 22,
    dimension: "evidence",
    text: "We can identify at least one important area that has measurably improved or deteriorated during the last 12 months.",
  },
  {
    id: 23,
    dimension: "evidence",
    text: "After major events, seasons or initiatives, lessons are captured in a form that influences future delivery.",
  },
  {
    id: 24,
    dimension: "evidence",
    text: "In the last 12 months, feedback or evidence has caused us to materially change a department practice.",
  },
  {
    id: 25,
    dimension: "evidence",
    text: "When we introduce a significant change, we normally define in advance how we will judge whether it worked.",
  },
  {
    id: 26,
    dimension: "resilience",
    text: "If a key department leader left tomorrow, another person could identify their critical recurring responsibilities.",
  },
  {
    id: 27,
    dimension: "resilience",
    text: "Major recurring responsibilities have sufficient backup that an unexpected absence would not cause serious disruption.",
  },
  {
    id: 28,
    dimension: "resilience",
    text: "Important external relationships, commitments and recurring obligations are recorded somewhere accessible to the department.",
  },
  {
    id: 29,
    dimension: "resilience",
    text: "No single individual holds operational knowledge whose loss would significantly disrupt the department.",
  },
  {
    id: 30,
    dimension: "resilience",
    text: "A new department leader could understand the department's major systems, priorities and key decisions without reconstructing them primarily through conversations.",
  },
];

const responseLabels: Record<number, string> = {
  1: "Strongly disagree",
  2: "Disagree",
  3: "Neither / inconsistent",
  4: "Agree",
  5: "Strongly agree",
};

const recommendations: Record<DimensionKey, string> = {
  leadership:
    "Choose the three most important priorities for the next 12 months. For each, define what success means, who owns it and what work will be deprioritised to make room.",
  people:
    "Identify the five responsibilities where ownership is currently most blurred. Give each one a single accountable owner and define the outcome they are responsible for.",
  systems:
    "Choose one recurring operational process that currently relies on memory or individual knowledge. Document the trigger, owner, steps, deadline and handover point.",
  programme:
    "Review every major part of the sporting programme against three questions: who is it for, what outcome is it designed to produce, and what evidence justifies keeping it?",
  evidence:
    "For the next significant department change, define the expected outcome, two or three measures of success and a review date before implementation begins.",
  resilience:
    "Identify the five areas that would be most disrupted if a key leader left tomorrow. Capture the owner, process, critical relationships, recurring commitments and handover information for each.",
};

const nextStepOptions = [
  "See how my department compares with similar departments",
  "Get practical tools to strengthen this area",
  "Understand this weakness in more depth",
  "Get an independent review of my department",
  "Nothing else right now",
];

function getProfile(score: number) {
  if (score >= 80) {
    return {
      name: "SYSTEMIC",
      description: "Strong systems with relatively low organisational fragility.",
    };
  }

  if (score >= 65) {
    return {
      name: "CAPABLE",
      description:
        "Generally effective, but meaningful weaknesses could constrain performance.",
    };
  }

  if (score >= 50) {
    return {
      name: "DEPENDENT",
      description:
        "Performance relies substantially on individuals, informal knowledge or inconsistent systems.",
    };
  }

  return {
    name: "FRAGILE",
    description: "Multiple structural weaknesses create material operational risk.",
  };
}

function getFragilitySignals(answers: Record<number, number>): FragilitySignal[] {
  const signals: FragilitySignal[] = [];

  if ((answers[29] ?? 5) <= 2 && (answers[30] ?? 5) <= 2) {
    signals.push({
      title: "Key-person risk",
      description:
        "Critical knowledge appears concentrated in individuals, creating material continuity risk if they leave.",
    });
  }

  if ((answers[24] ?? 5) <= 2 && (answers[25] ?? 5) <= 2) {
    signals.push({
      title: "Open-loop improvement",
      description:
        "Changes may be implemented without consistently measuring whether they actually improved outcomes.",
    });
  }

  if ((answers[4] ?? 5) <= 2 && (answers[5] ?? 5) <= 2) {
    signals.push({
      title: "Strategic overload",
      description:
        "The department may be adding work faster than it removes or deprioritises it.",
    });
  }

  if ((answers[12] ?? 5) <= 2 && (answers[15] ?? 5) <= 2) {
    signals.push({
      title: "Informal knowledge dependency",
      description:
        "Operational knowledge may be difficult to access without relying on particular individuals.",
    });
  }

  if ((answers[18] ?? 5) <= 2 && (answers[20] ?? 5) <= 2) {
    signals.push({
      title: "Programme inertia",
      description:
        "Parts of the programme may be continuing because of history or circumstance rather than current need.",
    });
  }

  if ((answers[7] ?? 5) <= 2 && (answers[8] ?? 5) <= 2) {
    signals.push({
      title: "Accountability gap",
      description:
        "Expectations may not be sufficiently clear or consistently enforced.",
    });
  }

  return signals;
}

export default function StressTestPage() {
  const [started, setStarted] = useState(false);
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [desiredNextStep, setDesiredNextStep] = useState("");
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const hasSaved = useRef(false);
  const hasSavedFeedback = useRef(false);

  const currentDimension = dimensions[currentDimensionIndex];
  const currentQuestions = questions.filter(
    (question) => question.dimension === currentDimension.key
  );
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const currentDimensionComplete = currentQuestions.every(
    (question) => answers[question.id]
  );

  const scores = useMemo(() => {
    const result = {} as Record<DimensionKey, number>;

    dimensions.forEach((dimension) => {
      const dimensionQuestions = questions.filter(
        (question) => question.dimension === dimension.key
      );
      const total = dimensionQuestions.reduce(
        (sum, question) => sum + (answers[question.id] ?? 0),
        0
      );

      result[dimension.key] = Math.round(
        (total / (dimensionQuestions.length * 5)) * 100
      );
    });

    return result;
  }, [answers]);

  const overallScore = useMemo(() => {
    const total = Object.values(answers).reduce(
      (sum, value) => sum + value,
      0
    );
    return Math.round((total / 150) * 100);
  }, [answers]);

  const rankedDimensions = useMemo(() => {
    return [...dimensions].sort((a, b) => scores[b.key] - scores[a.key]);
  }, [scores]);

  const strongestDimension = rankedDimensions[0];
  const weakestDimension = rankedDimensions[rankedDimensions.length - 1];
  const profile = getProfile(overallScore);
  const fragilitySignals = getFragilitySignals(answers);

  function selectAnswer(questionId: number, value: number) {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
  }

  async function saveAssessment() {
    if (hasSaved.current) return;

    hasSaved.current = true;
    setSaveStatus("saving");

    const payload = {
      answers,
      forge_score: overallScore,
      profile: profile.name,
      leadership_score: scores.leadership,
      people_score: scores.people,
      systems_score: scores.systems,
      programme_score: scores.programme,
      evidence_score: scores.evidence,
      resilience_score: scores.resilience,
      strongest_dimension: strongestDimension.name,
      weakest_dimension: weakestDimension.name,
      fragility_signals: fragilitySignals.map((signal) => ({
        title: signal.title,
        description: signal.description,
      })),
    };

    try {
      const { error } = await supabase
        .from("stress_test_responses")
        .insert([payload]);

      if (error) {
        console.error("Stress Test save error:", error);
        setSaveStatus("error");
        hasSaved.current = false;
        return;
      }

      setSaveStatus("saved");
    } catch (error) {
      console.error("Unexpected Stress Test save error:", error);
      setSaveStatus("error");
      hasSaved.current = false;
    }
  }

  async function saveFeedback() {
    if (!desiredNextStep || hasSavedFeedback.current) return;

    hasSavedFeedback.current = true;
    setFeedbackStatus("saving");

    const payload = {
      desired_next_step: desiredNextStep,
      biggest_challenge: biggestChallenge.trim() || null,
      email: email.trim() || null,
      forge_score: overallScore,
      profile: profile.name,
      weakest_dimension: weakestDimension.name,
      weakest_score: scores[weakestDimension.key],
      strongest_dimension: strongestDimension.name,
      strongest_score: scores[strongestDimension.key],
    };

    try {
      const { error } = await supabase
        .from("stress_test_feedback")
        .insert([payload]);

      if (error) {
        console.error("Stress Test feedback save error:", error);
        setFeedbackStatus("error");
        hasSavedFeedback.current = false;
        return;
      }

      setFeedbackStatus("saved");
    } catch (error) {
      console.error("Unexpected Stress Test feedback save error:", error);
      setFeedbackStatus("error");
      hasSavedFeedback.current = false;
    }
  }

  async function nextDimension() {
    if (!currentDimensionComplete) return;

    if (currentDimensionIndex === dimensions.length - 1) {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await saveAssessment();
      return;
    }

    setCurrentDimensionIndex((index) => index + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousDimension() {
    if (currentDimensionIndex === 0) return;
    setCurrentDimensionIndex((index) => index - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setAnswers({});
    setCurrentDimensionIndex(0);
    setFinished(false);
    setStarted(false);
    setSaveStatus("idle");
    setDesiredNextStep("");
    setBiggestChallenge("");
    setEmail("");
    setFeedbackStatus("idle");
    hasSaved.current = false;
    hasSavedFeedback.current = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-[#f3f0e8] text-black">
        <section className="border-b border-black/20">
          <div className="mx-auto max-w-[1500px] px-6 py-6 md:px-10">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-sm font-semibold tracking-[0.18em]">
                FORGE
              </Link>
              <span className="text-xs font-semibold tracking-[0.16em] text-black/55">
                SPORT DEPARTMENT STRESS TEST
              </span>
            </div>
          </div>
        </section>

        <section className="border-b border-black/20">
          <div className="mx-auto grid min-h-[78vh] max-w-[1500px] md:grid-cols-12">
            <div className="flex flex-col justify-between border-b border-black/20 px-6 py-12 md:col-span-8 md:border-b-0 md:border-r md:px-10 md:py-16">
              <div>
                <p className="mb-8 text-xs font-semibold tracking-[0.18em]">
                  FREE · CONFIDENTIAL · APPROX. 10 MINUTES
                </p>
                <h1 className="max-w-[1000px] text-[15vw] font-semibold uppercase leading-[0.8] tracking-[-0.07em] md:text-[7vw]">
                  Stress
                  <br />
                  test your
                  <br />
                  department.
                </h1>
              </div>

              <div className="mt-16 max-w-2xl">
                <p className="text-xl leading-relaxed md:text-2xl">
                  Strong sport departments are not just busy or successful. They
                  have systems that survive pressure, change and turnover.
                </p>
                <p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">
                  Forge measures six dimensions of departmental strength to expose
                  hidden fragility, identify your strongest systems and show where
                  improvement will create the most leverage.
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="mt-10 bg-black px-7 py-4 text-xs font-semibold tracking-[0.16em] text-white transition-opacity hover:opacity-80"
                >
                  START THE STRESS TEST →
                </button>
              </div>
            </div>

            <div className="px-6 py-12 md:col-span-4 md:px-10 md:py-16">
              <p className="text-xs font-semibold tracking-[0.18em] text-black/55">
                YOU WILL RECEIVE
              </p>
              <div className="mt-10 divide-y divide-black/20 border-y border-black/20">
                {[
                  ["01", "Your Forge Score"],
                  ["02", "Six system scores"],
                  ["03", "Strongest system"],
                  ["04", "Primary vulnerability"],
                  ["05", "Fragility signals"],
                  ["06", "One priority action"],
                ].map(([number, label]) => (
                  <div key={number} className="flex items-center gap-5 py-5">
                    <span className="text-xs font-semibold text-black/40">{number}</span>
                    <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm leading-relaxed text-black/55">
                Answer based on how the department actually operates today, not how
                it is intended to operate.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-[#f3f0e8] text-black">
        <section className="border-b border-black/20">
          <div className="mx-auto max-w-[1500px] px-6 py-6 md:px-10">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-sm font-semibold tracking-[0.18em]">
                FORGE
              </Link>
              <span className="text-xs font-semibold tracking-[0.16em] text-black/55">
                RESULTS
              </span>
            </div>
          </div>
        </section>

        <section className="border-b border-black/20">
          <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
            <div className="border-b border-black/20 px-6 py-12 md:col-span-7 md:border-b-0 md:border-r md:px-10 md:py-16">
              <p className="text-xs font-semibold tracking-[0.18em] text-black/55">
                FORGE SCORE
              </p>
              <div className="mt-6 flex items-end gap-3">
                <span className="text-[28vw] font-semibold leading-[0.75] tracking-[-0.08em] md:text-[14vw]">
                  {overallScore}
                </span>
                <span className="mb-2 text-2xl font-semibold text-black/35 md:mb-4">
                  /100
                </span>
              </div>
              <div className="mt-10 border-t border-black pt-7">
                <p className="text-sm font-semibold tracking-[0.16em]">{profile.name}</p>
                <p className="mt-3 max-w-xl text-xl leading-relaxed">
                  {profile.description}
                </p>
              </div>
            </div>

            <div className="px-6 py-12 md:col-span-5 md:px-10 md:py-16">
              <p className="text-xs font-semibold tracking-[0.18em] text-black/55">
                DEPARTMENT PROFILE
              </p>
              <div className="mt-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-black/50">
                  STRONGEST SYSTEM
                </p>
                <p className="mt-2 text-3xl font-semibold uppercase tracking-[-0.04em]">
                  {strongestDimension.name}
                </p>
                <p className="mt-2 text-lg">{scores[strongestDimension.key]}</p>
              </div>
              <div className="mt-10 border-t border-black/20 pt-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-black/50">
                  PRIMARY VULNERABILITY
                </p>
                <p className="mt-2 text-3xl font-semibold uppercase tracking-[-0.04em]">
                  {weakestDimension.name}
                </p>
                <p className="mt-2 text-lg">{scores[weakestDimension.key]}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/20">
          <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/55">
              SIX SYSTEMS
            </p>
            <div className="mt-8 divide-y divide-black/20 border-y border-black/20">
              {dimensions.map((dimension) => (
                <div
                  key={dimension.key}
                  className="grid gap-3 py-6 md:grid-cols-[240px_1fr_90px] md:items-center"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.08em]">
                    {dimension.name}
                  </p>
                  <div className="h-2 overflow-hidden bg-black/10">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${scores[dimension.key]}%` }}
                    />
                  </div>
                  <p className="text-right text-2xl font-semibold">
                    {scores[dimension.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {fragilitySignals.length > 0 && (
          <section className="border-b border-black/20 bg-black text-[#f3f0e8]">
            <div className="mx-auto max-w-[1500px] px-6 py-12 md:px-10 md:py-16">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
                FRAGILITY SIGNALS DETECTED
              </p>
              <div className="mt-8 grid gap-px bg-white/20 md:grid-cols-2">
                {fragilitySignals.map((signal) => (
                  <div key={signal.title} className="bg-black p-7">
                    <h2 className="text-2xl font-semibold uppercase tracking-[-0.03em]">
                      {signal.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-white/65">
                      {signal.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-b border-black/20">
          <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
            <div className="border-b border-black/20 px-6 py-12 md:col-span-4 md:border-b-0 md:border-r md:px-10 md:py-16">
              <p className="text-xs font-semibold tracking-[0.18em] text-black/55">
                ONE THING TO DO NEXT
              </p>
            </div>
            <div className="px-6 py-12 md:col-span-8 md:px-10 md:py-16">
              <h2 className="text-4xl font-semibold uppercase tracking-[-0.05em] md:text-6xl">
                Strengthen {weakestDimension.shortName}.
              </h2>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed">
                {recommendations[weakestDimension.key]}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-black/20 bg-[#ece8dd]">
          <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
            <div className="border-b border-black/20 px-6 py-12 md:col-span-4 md:border-b-0 md:border-r md:px-10 md:py-16">
              <p className="text-xs font-semibold tracking-[0.18em] text-black/55">
                HELP SHAPE WHAT FORGE BUILDS
              </p>
              <h2 className="mt-6 max-w-sm text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.05em]">
                What would actually help next?
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-black/60">
                Your answer is optional. It helps Forge understand which problems
                sports leaders genuinely want solved. No school name is required.
              </p>
            </div>

            <div className="px-6 py-12 md:col-span-8 md:px-10 md:py-16">
              {feedbackStatus === "saved" ? (
                <div className="max-w-2xl border-t border-black pt-8">
                  <p className="text-xs font-semibold tracking-[0.18em] text-black/50">
                    INPUT RECORDED
                  </p>
                  <h3 className="mt-5 text-4xl font-semibold uppercase tracking-[-0.04em]">
                    Thank you. This is the evidence Forge needs.
                  </h3>
                  <p className="mt-5 leading-relaxed text-black/60">
                    Forge will use aggregated and anonymised patterns to decide what
                    deserves to be built next.
                  </p>
                </div>
              ) : (
                <div className="max-w-3xl">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-black/50">
                      01 · WHAT WOULD BE MOST USEFUL NEXT?
                    </p>
                    <div className="mt-5 grid gap-2">
                      {nextStepOptions.map((option) => {
                        const selected = desiredNextStep === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setDesiredNextStep(option)}
                            className={`border px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.06em] transition-colors ${
                              selected
                                ? "border-black bg-black text-white"
                                : "border-black/25 bg-transparent hover:border-black"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-10 border-t border-black/20 pt-8">
                    <label
                      htmlFor="biggest-challenge"
                      className="text-xs font-semibold tracking-[0.14em] text-black/50"
                    >
                      02 · WHAT IS THE BIGGEST OPERATIONAL CHALLENGE IN YOUR DEPARTMENT RIGHT NOW?
                    </label>
                    <textarea
                      id="biggest-challenge"
                      value={biggestChallenge}
                      onChange={(event) => setBiggestChallenge(event.target.value)}
                      rows={4}
                      placeholder="Optional. One or two sentences is enough."
                      className="mt-5 w-full resize-y border border-black/25 bg-transparent px-4 py-4 text-base outline-none transition-colors placeholder:text-black/35 focus:border-black"
                    />
                  </div>

                  <div className="mt-10 border-t border-black/20 pt-8">
                    <label
                      htmlFor="feedback-email"
                      className="text-xs font-semibold tracking-[0.14em] text-black/50"
                    >
                      03 · WANT TO HEAR WHEN FORGE PUBLISHES RELEVANT FINDINGS?
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email address, optional"
                      className="mt-5 w-full border border-black/25 bg-transparent px-4 py-4 text-base outline-none transition-colors placeholder:text-black/35 focus:border-black"
                    />
                    <p className="mt-3 text-xs leading-relaxed text-black/45">
                      Optional. Diagnostic responses remain confidential and Forge
                      will not publish identifiable school-level results.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={saveFeedback}
                      disabled={!desiredNextStep || feedbackStatus === "saving"}
                      className="bg-black px-6 py-4 text-xs font-semibold tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {feedbackStatus === "saving" ? "SAVING..." : "SAVE MY INPUT →"}
                    </button>
                    <span className="text-xs text-black/45">
                      Only question 01 is required to submit.
                    </span>
                  </div>

                  {feedbackStatus === "error" && (
                    <p className="mt-4 text-sm font-medium text-black/65">
                      We could not save that response. Please try once more.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-black/45">
                FORGE
              </p>
              <p className="mt-2 text-2xl font-semibold uppercase tracking-[-0.03em]">
                Measure → Understand → Improve
              </p>
              {saveStatus === "saving" && (
                <p className="mt-3 text-xs tracking-[0.1em] text-black/40">
                  SAVING ASSESSMENT...
                </p>
              )}
              {saveStatus === "saved" && (
                <p className="mt-3 text-xs tracking-[0.1em] text-black/40">
                  ASSESSMENT RECORDED
                </p>
              )}
              {saveStatus === "error" && (
                <button
                  onClick={saveAssessment}
                  className="mt-3 text-xs font-semibold tracking-[0.1em] underline"
                >
                  RETRY SAVING ASSESSMENT
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={restart}
                className="border border-black px-6 py-4 text-xs font-semibold tracking-[0.14em]"
              >
                RETAKE TEST
              </button>
              <Link
                href="/"
                className="bg-black px-6 py-4 text-xs font-semibold tracking-[0.14em] text-white"
              >
                RETURN TO FORGE →
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black">
      <section className="border-b border-black/20">
        <div className="mx-auto max-w-[1500px] px-6 py-6 md:px-10">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="text-sm font-semibold tracking-[0.18em]">
              FORGE
            </Link>
            <span className="text-right text-xs font-semibold tracking-[0.16em] text-black/55">
              {answeredCount} / 30 ANSWERED
            </span>
          </div>
        </div>
      </section>

      <div className="h-1 bg-black/10">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="border-b border-black/20">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-12">
          <aside className="border-b border-black/20 px-6 py-10 md:col-span-4 md:min-h-[calc(100vh-100px)] md:border-b-0 md:border-r md:px-10 md:py-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-black/45">
              DIMENSION {currentDimensionIndex + 1} OF {dimensions.length}
            </p>
            <h1 className="mt-5 text-4xl font-semibold uppercase leading-[0.92] tracking-[-0.05em] md:text-5xl">
              {currentDimension.name}
            </h1>
            <p className="mt-6 max-w-sm leading-relaxed text-black/60">
              {currentDimension.description}
            </p>
            <div className="mt-10 hidden md:block">
              {dimensions.map((dimension, index) => (
                <div
                  key={dimension.key}
                  className={`border-t border-black/15 py-3 text-xs font-semibold tracking-[0.08em] ${
                    index === currentDimensionIndex ? "text-black" : "text-black/30"
                  }`}
                >
                  0{index + 1} · {dimension.shortName.toUpperCase()}
                </div>
              ))}
            </div>
          </aside>

          <div className="px-6 py-10 md:col-span-8 md:px-10 md:py-14">
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-black/55">
              Choose the answer that best describes how the department actually
              operates today.
            </p>
            <div className="space-y-12">
              {currentQuestions.map((question) => (
                <div key={question.id} className="border-t border-black/20 pt-7">
                  <div className="flex gap-5">
                    <span className="mt-1 min-w-8 text-xs font-semibold text-black/35">
                      {String(question.id).padStart(2, "0")}
                    </span>
                    <p className="max-w-3xl text-lg font-medium leading-relaxed md:text-xl">
                      {question.text}
                    </p>
                  </div>

                  <div className="mt-7 grid grid-cols-5 gap-2 md:ml-13">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const selected = answers[question.id] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => selectAnswer(question.id, value)}
                          className={`min-h-14 border px-2 py-3 text-sm font-semibold transition-colors ${
                            selected
                              ? "border-black bg-black text-white"
                              : "border-black/25 bg-transparent text-black hover:border-black"
                          }`}
                          aria-label={`${responseLabels[value]}: ${value}`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-[0.08em] text-black/35 md:ml-13">
                    <span>Strongly disagree</span>
                    <span>Strongly agree</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-center justify-between border-t border-black/20 pt-8">
              <button
                onClick={previousDimension}
                disabled={currentDimensionIndex === 0}
                className="text-xs font-semibold tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-25"
              >
                ← PREVIOUS
              </button>
              <button
                onClick={nextDimension}
                disabled={!currentDimensionComplete}
                className="bg-black px-6 py-4 text-xs font-semibold tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-25"
              >
                {currentDimensionIndex === dimensions.length - 1
                  ? "SEE MY RESULTS →"
                  : "NEXT DIMENSION →"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
