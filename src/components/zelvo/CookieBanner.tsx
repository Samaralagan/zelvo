import CookieConsent from "react-cookie-consent";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="zelvo_cookie_consent"
      disableStyles
      containerClasses="zelvo-cookie-container"
      contentClasses="zelvo-cookie-content"
      buttonClasses="zelvo-cookie-accept"
      declineButtonClasses="zelvo-cookie-decline"
    >
      <div className="flex items-start gap-3">
        <Cookie className="h-5 w-5 text-highlight shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">We use cookies</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            We use cookies to enhance your experience and analyse site traffic.
            By clicking <span className="text-highlight font-medium">Accept All</span>, you consent to our use of cookies.
          </p>
        </div>
      </div>
    </CookieConsent>
  );
}
