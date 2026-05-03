-- Run this in the Supabase SQL editor or via the Supabase CLI.

create table if not exists orders (
  id                uuid        default gen_random_uuid() primary key,
  stripe_session_id text        unique not null,
  items             jsonb       not null,       -- [{name, quantity, unit_price_pence}]
  total_pence       integer     not null,
  customer_email    text        not null,
  pickup_note       text        not null default 'Ready in approx. 15 minutes',
  status            text        not null default 'confirmed'
                                check (status in ('confirmed', 'ready', 'collected')),
  created_at        timestamptz default now()
);

-- Index for looking up orders by email (e.g. admin view)
create index if not exists orders_customer_email_idx on orders (customer_email);

-- Index for webhook idempotency checks
create index if not exists orders_stripe_session_idx on orders (stripe_session_id);
