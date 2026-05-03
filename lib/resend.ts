import { Resend } from "resend";

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
  return new Resend(process.env.RESEND_API_KEY);
}

interface OrderEmailParams {
  to: string;
  orderItems: { name: string; quantity: number; price: number }[];
  totalPence: number;
  pickupNote: string;
  stripeSessionId: string;
}

export async function sendOrderConfirmation({
  to,
  orderItems,
  totalPence,
  pickupNote,
  stripeSessionId,
}: OrderEmailParams) {
  const total = (totalPence / 100).toFixed(2);
  const itemRows = orderItems
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 0;color:#2C1A0E;">${item.name} × ${item.quantity}</td>
          <td style="padding:6px 0;color:#8C7B6B;text-align:right;">£${(
            (item.price * item.quantity) /
            100
          ).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  await getResend().emails.send({
    from: "Fallow Coffee <orders@fallowcoffee.co.uk>",
    to,
    subject: "Your Fallow Coffee order is confirmed ☕",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:4px;overflow:hidden;max-width:560px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#2C1A0E;padding:32px 40px;">
            <p style="margin:0;font-size:22px;font-weight:600;color:#F5F0E8;letter-spacing:-0.02em;">Fallow</p>
            <p style="margin:8px 0 0;font-size:13px;color:#E8C99A;letter-spacing:0.06em;text-transform:uppercase;">Order confirmed</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;font-size:16px;color:#2C1A0E;line-height:1.6;">
              Thanks! Your order is confirmed. Show this email at the counter when you arrive.
            </p>

            <!-- Pickup note -->
            <div style="background:#F5F0E8;border-left:3px solid #C4783A;padding:14px 18px;margin-bottom:28px;border-radius:2px;">
              <p style="margin:0;font-size:13px;font-style:italic;color:#8C7B6B;letter-spacing:0.02em;">Pickup</p>
              <p style="margin:4px 0 0;font-size:15px;color:#2C1A0E;font-weight:500;">${pickupNote}</p>
            </div>

            <!-- Order items -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E8C99A;">
              <tbody>${itemRows}</tbody>
              <tfoot>
                <tr style="border-top:1px solid #E8C99A;">
                  <td style="padding:12px 0;font-weight:600;color:#2C1A0E;">Total</td>
                  <td style="padding:12px 0;font-weight:600;color:#2C1A0E;text-align:right;">£${total}</td>
                </tr>
              </tfoot>
            </table>

            <p style="margin:32px 0 0;font-size:13px;color:#8C7B6B;line-height:1.6;">
              Questions? Reply to this email or call us. See you soon.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #E8C99A;">
            <p style="margin:0;font-size:11px;color:#8C7B6B;">
              Order ref: ${stripeSessionId.slice(-12)}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}
