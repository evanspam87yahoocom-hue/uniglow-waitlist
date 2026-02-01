# UniGlow Waitlist

A beautiful, responsive waitlist landing page for UniGlow - a student-to-student beauty platform.

## Features

- 🎨 Modern, distinctive design with warm coral/glow color palette
- 📱 Fully responsive for mobile and desktop
- 🔀 Branching form logic (booker vs provider paths)
- ✅ Client-side validation
- 🗄️ Supabase integration for data storage
- 📊 Automatic interest score calculation
- ✨ Smooth animations and micro-interactions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Fonts**: Instrument Serif + Plus Jakarta Sans

## Getting Started

### 1. Clone and Install

```bash
cd uniglow-waitlist
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run this query to create the `waitlist` table:

```sql
-- Create the waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  school TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('booker', 'provider')),
  interest_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Booker-specific fields
  services_wanted TEXT[],
  budget TEXT,
  frequency TEXT,
  timeline TEXT,
  
  -- Provider-specific fields
  services_offered TEXT[],
  experience TEXT,
  portfolio_link TEXT,
  availability TEXT[],
  background_check TEXT,
  start_date TEXT
);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index on user_type for filtering
CREATE INDEX idx_waitlist_user_type ON waitlist(user_type);

-- Create index on interest_score for sorting high-value signups
CREATE INDEX idx_waitlist_interest_score ON waitlist(interest_score DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from the API
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows reads with service role key only
CREATE POLICY "Allow service role full access" ON waitlist
  FOR ALL
  USING (auth.role() = 'service_role');
```

3. Get your API credentials from Settings → API:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the waitlist page.

## Interest Score Calculation

### Bookers (max 8 points)
| Criteria | Points |
|----------|--------|
| ASAP timeline | +3 |
| 2-3x/month frequency | +2 |
| Multiple services (2+) | +2 |
| Higher budget ($50+) | +1 |

### Providers (max 8 points)
| Criteria | Points |
|----------|--------|
| ASAP start date | +3 |
| Portfolio link provided | +2 |
| Intermediate/Advanced/Licensed | +2 |
| Background check = Yes | +1 |

## Project Structure

```
uniglow-waitlist/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # API endpoint for form submission
│   ├── thanks/
│   │   └── page.tsx          # Thank you page
│   ├── globals.css           # Global styles + Tailwind
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main waitlist form page
├── .env.example              # Environment variables template
├── tailwind.config.ts        # Tailwind configuration
├── package.json
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Customization

### Colors
Edit the color palette in `tailwind.config.ts` under `theme.extend.colors`.

### Services
Modify the `SERVICES` array in `app/page.tsx` to add/remove service options.

### Form Fields
All form fields and options are defined as constants at the top of `app/page.tsx`.

---

Built with 💜 for UniGlow by Jayla
