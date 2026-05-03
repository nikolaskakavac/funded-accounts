# Arbex Fund Website

Full-stack website for Arbex Fund.

Tech stack:
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express
- Database: MongoDB
- Payments: Stripe + NOWPayments
- Process manager: PM2

## Project Structure

```text
frontend/   React frontend
backend/    Express API
```

## Main Features

- Landing page with multilingual support
- User registration, login, email verification, forgot password
- Dashboard and admin panel
- Stripe card checkout
- Crypto checkout via NOWPayments
- Affiliate system with custom codes
- 5% checkout discount when a valid code is entered
- Contact/support email flow
- Floating WhatsApp live chat button

## Local Setup

### 1. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 2. Environment Variables

Create these files manually:

- `backend/.env`
- `frontend/.env`

### Backend `.env`

Required variables:

```env
MONGODB_URI=
JWT_SECRET=
PORT=4000

FRONTEND_URL=
BACKEND_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NOWPAYMENTS_API_KEY=
NOWPAYMENTS_IPN_SECRET=
NOWPAYMENTS_BASE_URL=https://api.nowpayments.io/v1

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
```

### Frontend `.env`

Required variables:

```env
VITE_API_BASE_URL=
VITE_STRIPE_PUBLISHABLE_KEY=
```

## Running Locally

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Build

Frontend production build:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm start
```

## Deployment Notes

Current deployment style:

- frontend is built from `frontend/dist`
- backend runs with PM2
- backend source entry point is `backend/src/server.js`

Typical backend restart:

```bash
pm2 restart funded-api
```

## Important Integrations

### Stripe

- Card payments are handled on-site through Stripe Elements
- Webhook secret must match the live Stripe endpoint

### NOWPayments

- Crypto payments are created in EUR and converted to the selected token
- IPN secret must match the configured NOWPayments webhook

### Email

- Outgoing email uses SMTP credentials from backend `.env`
- Automated emails include verification, password reset, support, and purchase/account emails

## Affiliate / Discount Notes

- Affiliate codes can be assigned from the admin panel
- Codes can be reserved for an email even before that user registers
- A valid code entered during checkout currently gives a 5% discount
- Affiliate commissions are handled separately from the discount logic

## Git Ignore

Sensitive files are intentionally not committed:

- `.env`
- `backend/.env`
- `frontend/.env`
- `node_modules`

## Handover Notes

Before giving this project to another developer, also provide:

- backend `.env`
- frontend `.env`
- hosting/server access
- MongoDB access
- Stripe account access
- NOWPayments account access
- SMTP mailbox access

