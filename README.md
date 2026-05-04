# GameLink

A production-ready gaming social platform where gamers create accounts, add game profiles (Roblox, Minecraft, etc.), discover other players, and explore featured servers.

## Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (email + password)

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
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)

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

4. Update `.env` with your values:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong random secret
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

Vercel offers the easiest deployment for Next.js apps.

1. Push your code to GitHub
2. Sign up at https://vercel.com with your GitHub account
3. Import your repository
4. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_BASE_URL` (Vercel will provide your URL)
5. Deploy — done!

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
│   ├── db.js                   # MongoDB connection
│   ├── auth.js                 # JWT helpers
│   └── middleware/             # Auth/admin middleware
└── models/                     # Mongoose schemas
```

## Environment Variables

See `.env.example` for all required variables.

Key variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - Token expiration (default: 7d)
- `NEXT_PUBLIC_BASE_URL` - Your app's base URL (public)
- `ADMIN_USER_IDS` - Comma-separated user IDs for admin access

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
