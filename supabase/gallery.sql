-- Run in Supabase SQL editor when switching from local store to Supabase.

create table if not exists public.visitor_drawings (
  id uuid primary key,
  image_url text not null,
  visitor_name text not null default 'Anonymous',
  message text not null default '',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'hidden')),
  created_at timestamptz not null default now()
);

create index if not exists visitor_drawings_status_created_idx
  on public.visitor_drawings (status, created_at desc);

-- Create a public Storage bucket named "visitor-art" (or set SUPABASE_GALLERY_BUCKET).
-- Recommended: public read for approved URLs; uploads only via service role from the API.
