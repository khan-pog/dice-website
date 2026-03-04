import 'server-only'

import Stripe from 'stripe'

// #region agent log
fetch('http://127.0.0.1:7720/ingest/f96776db-0993-49ff-a7d7-744901e4e243',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e3d8b1'},body:JSON.stringify({sessionId:'e3d8b1',runId:'pre-fix',hypothesisId:'H5',location:'lib/stripe.ts:6',message:'stripe module loaded (lazy mode)',data:{hasStripeSecretKey:Boolean(process.env.STRIPE_SECRET_KEY)},timestamp:Date.now()})}).catch(()=>{});
// #endregion

let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    // #region agent log
    fetch('http://127.0.0.1:7720/ingest/f96776db-0993-49ff-a7d7-744901e4e243',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e3d8b1'},body:JSON.stringify({sessionId:'e3d8b1',runId:'pre-fix',hypothesisId:'H5',location:'lib/stripe.ts:13',message:'getStripe missing STRIPE_SECRET_KEY',data:{hasStripeSecretKey:false},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    throw new Error('Missing environment variable: STRIPE_SECRET_KEY. Add it to your .env.local file.')
  }

  if (!stripeClient) {
    // #region agent log
    fetch('http://127.0.0.1:7720/ingest/f96776db-0993-49ff-a7d7-744901e4e243',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e3d8b1'},body:JSON.stringify({sessionId:'e3d8b1',runId:'pre-fix',hypothesisId:'H6',location:'lib/stripe.ts:20',message:'creating stripe client lazily',data:{keyPrefix:key.slice(0,3)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    stripeClient = new Stripe(key)
  }
  return stripeClient
}
