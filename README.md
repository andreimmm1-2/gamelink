# GameLink

A production-ready gaming social platform where gamers create accounts, add game profiles (Roblox, Minecraft, etc.), discover other players, and explore featured servers.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase PostgreSQL
- **Auth:** JWT (email + password) with bcryptjs hashing

## Features

- User authentication (register/login with JWT)
- Game profiles (add multiple games per user)
- Player discovery by game
- Search and filter players
- Featured server promotions (admin-only)
- Dark mode UI
- Responsive design

## Getting Started Locally

### Prerequisites

- Node.js 18+ (download from https://nodejs.org/)
- Supabase account (free at https://supabase.com)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/gamelink.git
   cd gamelink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` (rename to `.env.local`) with your values:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (from Settings > API)
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key (from Settings > API)
   - `JWT_SECRET`: A strong random secret (openssl rand -base64 32)
   - `NEXT_PUBLIC_BASE_URL`: `http://localhost:3000` (for local dev)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

## Running in Production

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git push origin main
   ```

2. Visit https://vercel.com and sign in with your GitHub account

3. Click "Add New" → "Project" and select your GameLink repository

4. Set environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL` - From Supabase > Settings > API
   - `SUPABASE_SERVICE_KEY` - From Supabase > Settings > API (service_role key)
   - `JWT_SECRET` - Generate with: `openssl rand -base64 32`
   - `JWT_EXPIRES_IN` - `7d`
   - `NEXT_PUBLIC_BASE_URL` - Your Vercel domain (e.g., https://gamelink.vercel.app)

5. Click "Deploy" and wait for the build to complete

6. Your app is now live!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user from JWT

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/:username` - Update user profile (auth required)

### Game Profiles
- `GET /api/profiles?game=Roblox` - List profiles by game
- `GET /api/profiles?userId=...` - List user's profiles
- `POST /api/profiles` - Create profile (auth required)
- `GET /api/profiles/:id` - Get profile by ID
- `PUT /api/profiles/:id` - Update profile (owner only)
- `DELETE /api/profiles/:id` - Delete profile (owner only)

### Promotions
- `GET /api/promotions` - Get active promotions
- `POST /api/promotions` - Create promotion (admin only)
- `DELETE /api/promotions/:id` - Delete promotion (admin only)

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   ├── (routes)/               # Page routes
│   ├── layout.js               # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── game/                   # Game profile components
│   ├── layout/                 # Nav, Footer
│   ├── profile/                # User profile components
│   ├── promotions/             # Promotion components
│   └── ui/                     # Reusable UI (Button, Card, Input)
├── lib/
│   ├── supabase.js             # Supabase client initialization
│   ├── auth.js                 # JWT helpers
│   └── middleware/             # Auth/admin middleware
```

## Environment Variables

See `.env.example` for all required variables.

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (public)
- `SUPABASE_SERVICE_KEY` - Supabase service role key (private)
- `JWT_SECRET` - Secret key for JWT signing (private)
- `JWT_EXPIRES_IN` - Token expiration (default: 7d)
- `NEXT_PUBLIC_BASE_URL` - Your app's base URL (public)
- `ADMIN_USER_IDS` - Comma-separated user UUIDs for admin access (optional)

## Future Improvements

- Email verification & password reset
- File uploads for profile pictures (S3/Cloudinary)
- OAuth (Discord/Google login)
- Payment integration (Stripe) for promotions
- Admin panel UI
- Automated tests (Jest + Playwright)
- Rate limiting & abuse protection
- Pagination on discover endpoints
- Internationalization (i18n)

## License

MIT

## Support

For issues or questions, open a GitHub issue.
