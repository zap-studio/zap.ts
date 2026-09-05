import type { LifecycleEvent } from "@zap-ts/billing/stripe";

// TODO: Replace these placeholder templates with real branded designs.

const TrialWillEndEmail = ({ trialEndsAt }: { trialEndsAt: Date | null }) => (
  <div>
    <p>
      Your trial{trialEndsAt ? ` ends on ${trialEndsAt.toLocaleDateString()}` : " is ending soon"}.
    </p>
    <p>Add a payment method to keep your subscription active without interruption.</p>
  </div>
);

const PaymentFailedEmail = () => (
  <div>
    <p>We couldn't process your latest payment.</p>
    <p>Please update your payment method to avoid losing access.</p>
  </div>
);

const CanceledEmail = () => (
  <div>
    <p>Your subscription has been canceled.</p>
  </div>
);

export const lifecycleEmail = (event: LifecycleEvent) => {
  if (event.type === "trial_will_end") {
    return {
      subject: "Your trial is ending soon",
      react: <TrialWillEndEmail trialEndsAt={event.trialEndsAt} />,
    };
  }

  if (event.type === "payment_failed") {
    return { subject: "Your payment failed", react: <PaymentFailedEmail /> };
  }

  return { subject: "Your subscription was canceled", react: <CanceledEmail /> };
};
