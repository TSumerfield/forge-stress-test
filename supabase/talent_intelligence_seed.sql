-- Forge Talent Intelligence seed schema
-- Privacy-first MVP. Use non-identifying subject codes only.

create table if not exists public.talent_predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_code text not null,
  sport text not null,
  cohort text,
  evaluation_context text,
  current_level smallint check (current_level is null or current_level between 1 and 10),
  potential_level smallint check (potential_level is null or potential_level between 1 and 10),
  progression_probability smallint check (progression_probability is null or progression_probability between 0 and 100),
  evaluator_confidence smallint check (evaluator_confidence is null or evaluator_confidence between 0 and 100),
  key_strength text,
  key_constraint text,
  trajectory text check (trajectory is null or trajectory in ('DECLINING','STABLE','IMPROVING','RAPIDLY_IMPROVING')),
  recommendation text check (recommendation is null or recommendation in ('SELECT','DEVELOP','MONITOR','RELEASE','UNDECIDED')),
  prediction_horizon_months integer not null default 12 check (prediction_horizon_months between 1 and 60),
  target_date date,
  frozen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.talent_outcomes (
  id uuid primary key default gen_random_uuid(),
  prediction_id uuid not null references public.talent_predictions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  observed_at timestamptz not null default now(),
  realised_level smallint check (realised_level is null or realised_level between 1 and 10),
  progressed boolean,
  retained boolean,
  outcome_summary text,
  evidence text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists talent_predictions_user_sport_idx on public.talent_predictions(user_id, sport);
create index if not exists talent_predictions_target_date_idx on public.talent_predictions(user_id, target_date) where target_date is not null;
create index if not exists talent_outcomes_prediction_idx on public.talent_outcomes(prediction_id);
create index if not exists talent_outcomes_user_idx on public.talent_outcomes(user_id);

alter table public.talent_predictions enable row level security;
alter table public.talent_outcomes enable row level security;

comment on column public.talent_predictions.subject_code is
'Non-identifying subject code only. Do not store athlete names, DOBs, contact details, or other direct identifiers in this MVP table.';

-- Owner-scoped RLS policies are applied in the live Supabase project.
