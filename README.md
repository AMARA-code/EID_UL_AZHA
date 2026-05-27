# Qurbani Mubarak

A multi-page Eid ul Adha web app built with Next.js (App Router), TypeScript, Tailwind, Framer Motion, and Supabase.

## 1) Install dependencies

```bash
npm install
```

## 2) Supabase setup (required for Wishes page)

1. Create a project in [Supabase](https://supabase.com/).
2. In Supabase dashboard, go to **SQL Editor** and run:

```sql
create table wishes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  language text default 'English',
  hearts int default 0,
  created_at timestamptz default now()
);
```

3. Go to **Project Settings → API** and copy:
   - Project URL
   - anon public key
   - service_role secret key (server-only)

4. Fill your local env values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY=YOUR_RESEND_API_KEY_OPTIONAL
```

5. Enable read policy for realtime/listing:

```sql
alter table wishes enable row level security;

create policy "Public read wishes"
on wishes
for select
to anon, authenticated
using (true);
```

## 3) Run development server

```bash
npm run dev
```

Open the local URL shown in your terminal.

## 4) Verify Wishes page works

1. Open `/wishes`
2. Submit a wish
3. Click a lantern and react with heart
4. Open a second browser tab to confirm live updates (Realtime)

## 5) Deploy (Vercel)

1. Push this project to GitHub.
2. Import the repo in [Vercel](https://vercel.com/).
3. Add these Environment Variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your deployed app URL)
   - `RESEND_API_KEY` (optional)
4. Deploy.

After first deploy, set `NEXT_PUBLIC_SITE_URL` to your final domain (for cleaner share links), then redeploy.

