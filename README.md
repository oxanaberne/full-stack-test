# Plant Collection App - 1 Day Assessment
A full-stack inventory management application for plant collections built with Next.js, TypeScript, and Supabase.

Deployed link : https://full-stack-test-oxana-berne.vercel.app/

<ins>Admin account:</ins>

**email**: admin@gmail.com
**password**: admin1

<ins>User account:</ins>

**email**: user@gmail.com
**password**: user01

<ins>Goal of Assessment:</ins> Build a small inventory-style web app that demonstrates full-stack skills using Next.js + React (TypeScript) for the frontend and a managed Supabase backend for speed. 

This project has been done in 1 working day (6–10 hours)

## Features

- **Authentication**: Email/password login with role-based access (admin/user)
- **Plant Management**: Create, read, update, delete plant items
- **Search & Pagination**: Find plants with search and pagination (10 items per page)
- **Admin Controls**: Create, Edit and Delete plants (admin only)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **Testing**: Jest, React Testing Library
- **Deployment**: GitHub Actions CI/CD

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Key Pages

- **`/`** - Main plant collection with search and pagination
- **`/item/[id]`** - Individual plant details (public access)
- **`/admin/new`** - Create new plant (admin only)
- **`/admin/[id]/edit`** - Edit plant (admin only)
- **`/login`** - User login
- **`/register`** - User registration

## Admin Features
- Create new plants
- Edit existing plants
- Delete plants

## User Features
- Browse plant collection
- Search plants by name
- View detailed plant information

## Notes
- Plant images are randomly assigned from `/public/images/` directory
- User avatars are generated deterministically based on user ID
- All admin operations require authentication and admin role
- The app uses Supabase for all backend functionality

## Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setup & Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Create a table named `item_alba` with columns:
     - `id` (uuid, primary key)
     - `name` (text)
     - `description` (text)
     - `image` (text)
     - `quantity` (integer)
     - `price` (integer)
     - `created_by` (uuid)
     - `timestamp` (timestamp)
   - Enable Row Level Security (RLS)
   - Add your environment variables to `.env.local` (see section above)

4. **Run the development server**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Running Tests

```bash
npm run test
```
