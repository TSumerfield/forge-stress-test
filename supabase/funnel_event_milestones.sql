-- Keep the anonymous analytics event allow-list aligned with the frontend tracker.
-- Funnel events have no personal or school-identifying fields.

alter table public.funnel_events
  drop constraint if exists funnel_events_event_name_check;

alter table public.funnel_events
  add constraint funnel_events_event_name_check
  check (
    event_name = any (
      array[
        'page_view',
        'diagnostic_started',
        'diagnostic_completed',
        'action_review_viewed',
        'action_review_submitted',
        'stress_test_started',
        'stress_test_progress',
        'stress_test_completed',
        'stress_test_result_viewed',
        'stress_test_next_action'
      ]::text[]
    )
  );
