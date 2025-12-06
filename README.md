# Fast Language

Fullstack Next.js 15 application with PostgreSQL, Prisma ORM, REST API, and comprehensive testing setup.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker Desktop

### Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL
npm run db:up

# 3. Push schema to database
npm run db:push

# 4. Generate Prisma client
npm run db:generate

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

| Command               | Description                    |
| --------------------- | ------------------------------ |
| `npm run dev`         | Start development server       |
| `npm run build`       | Build production bundle        |
| `npm run start`       | Start production server        |
| `npm run lint`        | Run ESLint                     |
| `npm run test`        | Run unit tests (Vitest)        |
| `npm run test:watch`  | Run tests in watch mode        |
| `npm run test:e2e`    | Run E2E tests (Playwright)     |
| `npm run db:up`       | Start PostgreSQL container     |
| `npm run db:down`     | Stop PostgreSQL container      |
| `npm run db:push`     | Push Prisma schema to database |
| `npm run db:studio`   | Open Prisma Studio GUI         |
| `npm run db:generate` | Generate Prisma client         |

## 🗄️ Database

### Local Development (Docker)

```bash
npm run db:up     # Start PostgreSQL
npm run db:push   # Apply schema
npm run db:studio # View data in browser
```

### Production (Neon)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add `DATABASE_URL` to Vercel environment variables

## 🔌 REST API

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| GET    | `/api/items`      | List all items  |
| POST   | `/api/items`      | Create item     |
| GET    | `/api/items/[id]` | Get single item |
| PUT    | `/api/items/[id]` | Update item     |
| DELETE | `/api/items/[id]` | Delete item     |

### Example

```bash
# Create item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"My Item","description":"Optional description"}'

# List items
curl http://localhost:3000/api/items
```

## 🧪 Testing

### Unit Tests (Vitest + React Testing Library)

```bash
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### E2E Tests (Playwright)

```bash
npm run test:e2e     # Run headless
npm run test:e2e:ui  # Interactive mode
```

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Connect repository at [vercel.com](https://vercel.com)
2. Add environment variable:
   - `DATABASE_URL` = Your Neon connection string (with `?sslmode=require`)

### 3. Run migrations

```bash
npx prisma db push
```

## 📁 Project Structure

```
fast-language/
├── src/
│   ├── app/
│   │   ├── api/items/       # REST API routes
│   │   ├── page.tsx         # Home page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components (with data-testid)
│   └── lib/
│       └── prisma.ts        # Prisma client singleton
├── prisma/
│   └── schema.prisma        # Database schema
├── tests/                   # Playwright E2E tests
├── __tests__/               # Vitest unit tests
├── docker-compose.yml       # PostgreSQL for dev
├── playwright.config.ts
└── vitest.config.ts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **E2E Testing**: Playwright
- **Unit Testing**: Vitest + React Testing Library
- **Deployment**: Vercel + Neon
