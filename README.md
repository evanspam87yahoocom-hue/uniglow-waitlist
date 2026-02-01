# UniGlow Waitlist v2

A beautiful, pomegranate-inspired waitlist landing page for UniGlow with a comprehensive provider tier system.

## ✨ Features

- **Pomegranate-inspired design** - Deep reds, blush pinks, and tan accents
- **Provider Tier System** - Two distinct onboarding paths:
  - **Beauty School Student Provider** - For enrolled cosmetology students
  - **Independent Provider** - For self-taught/experienced students
- **Dynamic forms** - Type-specific fields based on user selection
- **Client-side validation** - Real-time form validation
- **Interest scoring** - Automatic scoring for prioritization
- **Responsive design** - Works on all devices
- **Accessible** - Proper form labels and focus states

## 🎨 Design System

### Colors
- **Pomegranate** - Deep reds (#C41E3A → #450A15)
- **Blush** - Soft pinks (#FFF8F6 → #7A3528)
- **Tan** - Warm neutrals (#FDFBF7 → #5E4A30)
- **Cream** - Background (#FFF9F5)
- **Seed** - Brown accents (#FBF7F4 → #5A362B)

### Typography
- **Display**: Fraunces (serif)
- **Body**: DM Sans (sans-serif)

## 🏗️ Provider Tier System

### Beauty School Student Provider
| Aspect | Details |
|--------|---------|
| **Badge** | 🎓 Beauty School Student |
| **Requirements** | Proof of enrollment (Student ID, Letter, or Transcript) |
| **License Required** | No |
| **Allowed Services** | Services within current training curriculum |
| **Trust Disclosure** | Clients see "beauty school student gaining supervised experience" |

### Independent Provider
| Aspect | Details |
|--------|---------|
| **Badge** | 🛡️ Independent Provider |
| **Requirements** | ID verification, Portfolio submission, Background check consent |
| **License Required** | Subject to state regulations |
| **Allowed Services** | Services they're experienced in |
| **Trust Disclosure** | Clients see verification status and portfolio |

## 📊 Interest Score Calculation

### Bookers (max ~7 points)
| Criteria | Points |
|----------|--------|
| 3+ services selected | +2 |
| 2 services selected | +1 |
| Weekly/Biweekly frequency | +2 |
| Monthly frequency | +1 |
| Budget $100+ | +2 |
| Budget $50-100 | +1 |
| Base engagement | +1 |

### Providers (max ~10 points)
| Criteria | Points |
|----------|--------|
| Independent tier | +3 |
| Beauty school tier | +2 |
| Portfolio provided (independent) | +2 |
| Background check consent | +1 |
| 3+ services offered | +2 |
| 2 services offered | +1 |
| 4+ availability slots | +2 |
| 2+ availability slots | +1 |

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd uniglow-v2
npm install
```

### 2. Set Up Supabase

Create a new project at [supabase.com](https://supabase.com), then run this SQL:

```sql
-- Create the waitlist table with provider tier support
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('booker', 'provider')),
  interest_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Booker-specific fields
  services_wanted TEXT[],
  budget TEXT,
  frequency TEXT,
  
  -- Provider-specific fields
  provider_tier TEXT CHECK (provider_tier IN ('beauty-school', 'independent')),
  services_offered TEXT[],
  availability TEXT[],
  
  -- Beauty School Provider fields
  beauty_school_name TEXT,
  enrollment_proof_type TEXT,
  
  -- Independent Provider fields
  id_verification_consent BOOLEAN,
  portfolio_link TEXT,
  background_check_consent BOOLEAN
);

-- Indexes for performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_user_type ON waitlist(user_type);
CREATE INDEX idx_waitlist_provider_tier ON waitlist(provider_tier);
CREATE INDEX idx_waitlist_interest_score ON waitlist(interest_score DESC);
CREATE INDEX idx_waitlist_school ON waitlist(school);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON waitlist
  FOR ALL
  USING (auth.role() = 'service_role');
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials.

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
uniglow-v2/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # API with tier support
│   ├── thanks/
│   │   └── page.tsx          # Type & tier-specific thank you
│   ├── globals.css           # Pomegranate design system
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main form with tier system
├── .env.example
├── tailwind.config.ts        # Custom colors & animations
├── package.json
└── README.md
```

## 🔒 Legal Disclaimers

The form includes two disclaimers:

1. **General** (all users):
   > "By joining the waitlist, you agree to receive UniGlow updates. UniGlow is a platform connecting students with independent providers and does not provide beauty services."

2. **Provider-specific** (shown only to providers):
   > "Providers are responsible for following applicable rules for their services."

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Manual Build

```bash
npm run build
npm start
```

---

Built with 💜 for UniGlow by Jayla
