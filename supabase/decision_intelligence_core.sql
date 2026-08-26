-- Forge Decision Intelligence core schema
-- Mirrors the live Supabase backend introduced August 2026.
-- Core loop: decision -> assumptions -> prediction -> outcome -> review -> calibration.

alter table public.decision_intakes
  add column if not exists desired_outcome text,
  add column if not exists confidence smallint,
  add column if not exists expected_result text,
  add column if not exists review_date date,
  add column if not exists decision_type text,
  add column if not exists domain text,
  add column if not exists decided_at timestamptz,
  add column if not exists what_would_change_mind text;

alter table public.decision_intakes
  drop constraint if exists decision_intakes_confidence_check;
alter table public.decision_intakes
  add constraint decision_intakes_confidence_check
  check (confidence is null or confidence between 0 and 100);

create table if not exists public.decision_assumptions (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references public.decision_intakes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  statement text not null,
  category text,
  confidence smallint check (confidence is null or confidence between 0 and 100),
  status text not null default 'ACTIVE' check (status in ('ACTIVE','VALIDATED','WEAKENED','INVALIDATED','RETIRED')),
  evidence_for text,
  evidence_against text,
  last_checked_at timestamptz,
  invalidated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.decision_predictions (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references public.decision_intakes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  prediction text not null,
  probability smallint check (probability is null or probability between 0 and 100),
  metric_name text,
  target_value numeric,
  target_text text,
  target_date date,
  resolution_status text not null default 'OPEN' check (resolution_status in ('OPEN','RESOLVED','UNRESOLVABLE','CANCELLED')),
  resolved_value numeric,
  resolved_text text,
  resolved_at timestamptz,
  brier_score numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.decision_outcomes (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references public.decision_intakes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  outcome_status text not null default 'PARTIAL' check (outcome_status in ('POSITIVE','NEGATIVE','MIXED','PARTIAL','UNKNOWN')),
  outcome_summary text not null,
  observed_at timestamptz not null default now(),
  success_score smallint check (success_score is null or success_score between 0 and 100),
  evidence text,
  unintended_effects text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.decision_reviews (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references public.decision_intakes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  review_type text not null default 'MANUAL' check (review_type in ('MANUAL','CHECKPOINT','FINAL','VALIDITY')),
  process_quality_score smallint check (process_quality_score is null or process_quality_score between 0 and 100),
  outcome_quality_score smallint check (outcome_quality_score is null or outcome_quality_score between 0 and 100),
  confidence_was_calibrated boolean,
  what_was_right text,
  what_was_wrong text,
  lesson text,
  future_rule text,
  reviewed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists decision_assumptions_decision_idx on public.decision_assumptions(decision_id);
create index if not exists decision_assumptions_user_status_idx on public.decision_assumptions(user_id, status);
create index if not exists decision_predictions_decision_idx on public.decision_predictions(decision_id);
create index if not exists decision_predictions_user_resolution_idx on public.decision_predictions(user_id, resolution_status);
create index if not exists decision_outcomes_decision_idx on public.decision_outcomes(decision_id);
create index if not exists decision_outcomes_user_idx on public.decision_outcomes(user_id);
create index if not exists decision_reviews_decision_idx on public.decision_reviews(decision_id);
create index if not exists decision_reviews_user_idx on public.decision_reviews(user_id);
create index if not exists decision_intakes_user_review_idx on public.decision_intakes(user_id, review_date) where review_date is not null;
create index if not exists follow_ups_user_idx on public.follow_ups(user_id);

alter table public.decision_assumptions enable row level security;
alter table public.decision_predictions enable row level security;
alter table public.decision_outcomes enable row level security;
alter table public.decision_reviews enable row level security;

-- Owner-scoped RLS policies should mirror the live project policies.
-- See Supabase project migrations for canonical applied policy definitions.
