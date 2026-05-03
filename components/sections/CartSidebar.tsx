import type { CartItem } from "@/types";
import { useState } from "react";

interface CartSidebarProps {
  cart: CartItem[];
  onCheckout: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function CartSidebar({
  cart,
  onCheckout,
  loading,
  error,
}: CartSidebarProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const total = cart.reduce(
    (sum, c) => sum + c.menuItem.price * c.quantity,
    0
  );
  const itemCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const isEmpty = cart.length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address for your confirmation.");
      return;
    }
    setEmailError("");
    onCheckout(email);
  }

  return (
    <aside className="lg:sticky lg:top-24 self-start">
      <div className="border border-crema rounded-sm bg-white/60 backdrop-blur-sm p-6">
        <h2 className="text-h3 text-espresso mb-4">
          {isEmpty ? "Your order" : `Your order (${itemCount})`}
        </h2>

        {isEmpty ? (
          <p className="text-small text-stone py-4">
            Add items from the menu to get started.
          </p>
        ) : (
          <>
            {/* Line items */}
            <ul className="space-y-3 mb-4">
              {cart.map(({ menuItem, quantity }) => (
                <li
                  key={menuItem._id}
                  className="flex justify-between text-small"
                >
                  <span className="text-espresso">
                    {menuItem.name}
                    {quantity > 1 && (
                      <span className="text-stone ml-1">× {quantity}</span>
                    )}
                  </span>
                  <span className="text-stone tabular-nums">
                    £{(menuItem.price * quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="flex justify-between items-center py-3 border-t border-crema mb-6">
              <span className="text-body font-medium text-espresso">Total</span>
              <span className="text-body font-medium text-espresso tabular-nums">
                £{total.toFixed(2)}
              </span>
            </div>

            {/* Pickup note */}
            <div className="bg-crema/30 border-l-2 border-roast px-3 py-2 mb-6 rounded-sm">
              <p className="text-label text-stone uppercase tracking-widest mb-0.5">
                Pickup
              </p>
              <p className="text-small text-espresso">
                Ready in approx. 15 minutes
              </p>
            </div>

            {/* Email + checkout */}
            <form onSubmit={handleSubmit} noValidate>
              <label className="block mb-1">
                <span className="text-label text-stone uppercase tracking-widest">
                  Confirmation email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full border border-crema rounded-sm px-3 py-2.5 text-small text-espresso bg-white placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-roast focus:border-transparent"
                  required
                />
              </label>

              {emailError && (
                <p className="text-small text-roast mt-1">{emailError}</p>
              )}

              {error && (
                <p className="text-small text-roast mt-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-roast text-milk font-body font-medium py-3 rounded-sm hover:bg-espresso transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Redirecting…" : "Pay & confirm order"}
              </button>
            </form>

            <p className="text-label text-stone text-center mt-3">
              Secure payment via Stripe
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
