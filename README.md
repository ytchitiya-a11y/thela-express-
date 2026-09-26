# Thela Express — Customer Website (Frontend)

React + Vite + Tailwind. Connects to the Node.js/Express backend built earlier.

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # fill in backend URL + Firebase web config
npm run dev
```

Runs on `http://localhost:3000`

### Firebase Web Config
Firebase Console → Project Settings → General → "Your apps" → Add a **Web app** →
copy the config values into `.env`.

> Note: this MVP uses **email/password** login (simplest to wire up). Phone OTP can be
> added later in `src/context/AuthContext.jsx` + `src/pages/Login.jsx` using
> `signInWithPhoneNumber` + `RecaptchaVerifier` — needs a bit more setup so it's left
> for a follow-up pass.

## Pages
- `/` — Home: hero + menu grid, add to cart
- `/checkout` — address + payment method → places order
- `/track/:id` — live order tracking (Socket.io)
- `/orders` — order history
- `/login` — login/signup

## How it connects to the backend
- All API calls go through `src/api/client.js`, which auto-attaches the Firebase ID
  token to every request — no page manages auth headers manually.
- `src/socket.js` connects once the user logs in (see `AuthContext`) and joins their
  personal room (`user_<id>`), matching the backend's Socket.io room structure.
- Product images (`image_url`) come straight from the backend, which are Cloudinary
  URLs uploaded via the Admin Dashboard — this frontend just renders `<img src>`, no
  extra work needed here.
- **Payments**: selecting "UPI" at checkout opens the Razorpay popup (`Checkout.jsx`).
  On success it calls the backend to verify the signature before the order is
  considered placed — see `src/api/client.js` (`createRazorpayOrder`, `verifyPayment`).
  COD orders skip this entirely.

## Design
- Colors: tandoor charcoal (#1F1815), marigold saffron (#E8A23D), chili red (#C13B2C),
  chutney green (#6B8E4E), kraft paper (#FBF3E7) — a Prayagraj street-food identity.
- Type: Fraunces (headlines), Inter (body), Caveat (handwritten "Aaj ka Special" tags).
- Signature element: the hero's steel-thali visual with a rising steam animation.
  Product cards are styled as "order chits" with a perforated top edge.

## Before going live
- Swap the sample colors/copy only if you want a different brand direction — otherwise
  ready to use as-is.
- Add real product photos via the Admin Dashboard (Cloudinary upload) — placeholder
  "No image" shows until then.
- Set `ALLOWED_ORIGINS` in the **backend** `.env` to this site's deployed URL.
