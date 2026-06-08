/**
 * ContactFormWidget — native Web Component.
 * Runs entirely outside React's render tree so zero React re-renders
 * can interfere with typing in the input fields.
 */

const ENDPOINT = "https://formspree.io/f/mzdqrkpa";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  :host { display: block; width: 100%; }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2rem;
    border-radius: 1.25rem;
    background: var(--card, #1c1c2e);
    border: 1px solid oklch(0.5 0 0 / 18%);
    box-shadow: 0 20px 60px -12px oklch(0 0 0 / 0.45);
  }

  .form-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--foreground, #f0f0f0);
    margin: 0 0 0.25rem;
    font-family: inherit;
  }
  .form-sub {
    font-size: 0.8rem;
    color: var(--muted-foreground, #888);
    margin: 0 0 0.5rem;
    font-family: inherit;
  }
  .divider {
    height: 1px;
    background: oklch(0.5 0 0 / 15%);
    margin: 0 0 0.25rem;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 520px) {
    form { padding: 1.25rem; gap: 1rem; }
    .row { grid-template-columns: 1fr; }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  label {
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--muted-foreground, #888);
    font-family: inherit;
  }
  label .opt {
    text-transform: none;
    font-size: 0.65rem;
    font-weight: 400;
    opacity: 0.55;
    letter-spacing: 0;
  }

  input, textarea {
    width: 100%;
    padding: 0.7rem 0.95rem;
    border-radius: 0.7rem;
    border: 1.5px solid oklch(0.5 0 0 / 20%);
    background: oklch(0.5 0 0 / 8%);
    color: var(--foreground, #f0f0f0);
    font-size: 0.875rem;
    font-family: inherit;
    outline: none;
    transition: border-color 0.18s, background 0.18s;
    -webkit-appearance: none;
  }
  input::placeholder, textarea::placeholder {
    color: oklch(0.5 0 0 / 40%);
  }
  input:focus, textarea:focus {
    border-color: var(--highlight, oklch(0.88 0.18 185));
    background: oklch(0.5 0 0 / 12%);
  }
  input.invalid, textarea.invalid {
    border-color: oklch(0.65 0.22 27);
  }
  input.valid, textarea.valid {
    border-color: oklch(0.72 0.17 155);
  }
  textarea { resize: vertical; min-height: 110px; }

  .field-error {
    font-size: 0.72rem;
    color: oklch(0.65 0.22 27);
    font-family: inherit;
    min-height: 1rem;
    display: none;
  }
  .field-error.show { display: block; }

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  button {
    padding: 0.7rem 1.75rem;
    border-radius: 0.7rem;
    border: none;
    background: var(--highlight, oklch(0.88 0.18 185));
    color: var(--highlight-foreground, #0a0a0a);
    font-size: 0.875rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.18s, transform 0.15s;
    white-space: nowrap;
  }
  button:hover:not(:disabled) { opacity: 0.87; transform: translateY(-1px); }
  button:active:not(:disabled) { transform: translateY(0); }
  button:disabled { opacity: 0.45; cursor: default; }

  .msg {
    font-size: 0.82rem;
    font-family: inherit;
    padding: 0.55rem 0.85rem;
    border-radius: 0.55rem;
    display: none;
  }
  .msg.show { display: block; }
  .msg.success {
    background: oklch(0.88 0.18 185 / 12%);
    color: var(--highlight, oklch(0.78 0.16 185));
    border: 1px solid oklch(0.88 0.18 185 / 25%);
  }
  .msg.error {
    background: oklch(0.65 0.22 27 / 12%);
    color: oklch(0.65 0.22 27);
    border: 1px solid oklch(0.65 0.22 27 / 25%);
  }

  :host-context(.light) form {
    background: #ffffff;
    border-color: #d1d5db;
    box-shadow: 0 8px 32px -8px oklch(0 0 0 / 0.12);
  }
  :host-context(.light) input,
  :host-context(.light) textarea {
    background: #f8fafc;
    border-color: #94a3b8;
    color: #0f172a;
  }
  :host-context(.light) input::placeholder,
  :host-context(.light) textarea::placeholder {
    color: #94a3b8;
  }
  :host-context(.light) input:focus,
  :host-context(.light) textarea:focus {
    border-color: oklch(0.44 0.14 192);
    background: #f1f5f9;
  }
  :host-context(.light) .form-title { color: #0f172a; }
  :host-context(.light) .form-sub { color: #64748b; }
  :host-context(.light) label { color: #475569; }
  :host-context(.light) .divider { background: #e2e8f0; }
`;

const HTML = `
  <form id="cf" novalidate>
    <p class="form-title">Send us a message</p>
    <p class="form-sub">We\'ll get back to you within one business day.</p>
    <div class="divider"></div>
    <div class="row">
      <div class="field">
        <label>Name <span style="color:var(--highlight,oklch(0.88 0.18 185))">*</span></label>
        <input id="f-name" name="name" type="text" placeholder="Your name" autocomplete="name" />
        <span id="f-name-err" class="field-error"></span>
      </div>
      <div class="field">
        <label>Email <span style="color:var(--highlight,oklch(0.88 0.18 185))">*</span></label>
        <input id="f-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" />
        <span id="f-email-err" class="field-error"></span>
      </div>
    </div>
    <div class="field">
      <label>Contact Number <span class="opt">(Optional)</span></label>
      <input id="f-phone" name="phone" type="tel" placeholder="+1 234 567 8900" autocomplete="tel" />
      <span id="f-phone-err" class="field-error"></span>
    </div>
    <div class="field">
      <label>Reason <span style="color:var(--highlight,oklch(0.88 0.18 185))">*</span></label>
      <textarea id="f-reason" name="reason" placeholder="Tell us about your project\u2026"></textarea>
      <span id="f-reason-err" class="field-error"></span>
    </div>
    <div id="f-msg" class="msg"></div>
    <div class="actions">
      <button type="submit" id="f-btn">Send Message</button>
    </div>
  </form>
`;

class ContactFormWidget extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `<style>${CSS}</style>${HTML}`;

    const form     = shadow.getElementById("cf") as HTMLFormElement;
    const btn      = shadow.getElementById("f-btn") as HTMLButtonElement;
    const msgEl    = shadow.getElementById("f-msg") as HTMLDivElement;
    const name     = shadow.getElementById("f-name") as HTMLInputElement;
    const email    = shadow.getElementById("f-email") as HTMLInputElement;
    const phone    = shadow.getElementById("f-phone") as HTMLInputElement;
    const reason   = shadow.getElementById("f-reason") as HTMLTextAreaElement;
    const nameErr  = shadow.getElementById("f-name-err") as HTMLSpanElement;
    const emailErr = shadow.getElementById("f-email-err") as HTMLSpanElement;
    const phoneErr = shadow.getElementById("f-phone-err") as HTMLSpanElement;
    const reasonErr = shadow.getElementById("f-reason-err") as HTMLSpanElement;

    function setFieldError(input: HTMLInputElement | HTMLTextAreaElement, errEl: HTMLSpanElement, msg: string) {
      if (msg) {
        input.className = "invalid";
        errEl.textContent = msg;
        errEl.className = "field-error show";
      } else {
        input.className = "valid";
        errEl.textContent = "";
        errEl.className = "field-error";
      }
    }

    function validateName() {
      const v = name.value.trim();
      if (!v) return setFieldError(name, nameErr, "Name is required.");
      if (v.length < 2) return setFieldError(name, nameErr, "Name must be at least 2 characters.");
      setFieldError(name, nameErr, "");
    }

    function validateEmail() {
      const v = email.value.trim();
      if (!v) return setFieldError(email, emailErr, "Email is required.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setFieldError(email, emailErr, "Enter a valid email address.");
      setFieldError(email, emailErr, "");
    }

    function validatePhone() {
      const v = phone.value.trim();
      if (v && !/^[\+]?[\d\s\-\(\)]{7,15}$/.test(v)) return setFieldError(phone, phoneErr, "Enter a valid phone number.");
      setFieldError(phone, phoneErr, "");
    }

    function validateReason() {
      const v = reason.value.trim();
      if (!v) return setFieldError(reason, reasonErr, "Please describe your project.");
      if (v.length < 10) return setFieldError(reason, reasonErr, "Please provide at least 10 characters.");
      setFieldError(reason, reasonErr, "");
    }

    name.addEventListener("blur", validateName);
    email.addEventListener("blur", validateEmail);
    phone.addEventListener("blur", validatePhone);
    reason.addEventListener("blur", validateReason);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msgEl.className = "msg";
      validateName(); validateEmail(); validatePhone(); validateReason();
      if (name.classList.contains("invalid") || email.classList.contains("invalid") ||
          phone.classList.contains("invalid") || reason.classList.contains("invalid")) return;
      if (!name.value.trim() || !email.value.trim() || !reason.value.trim()) return;
      btn.disabled = true;
      btn.textContent = "Sending\u2026";
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            phone: phone.value,
            reason: reason.value,
          }),
        });
        if (res.ok) {
          msgEl.textContent = "\u2713 Thanks! We\u2019ll get back to you within one business day.";
          msgEl.className = "msg success show";
          btn.textContent = "Sent!";
          form.reset();
          [name, email, phone, reason].forEach(el => { el.className = ""; });
          [nameErr, emailErr, phoneErr, reasonErr].forEach(el => { el.className = "field-error"; });
        } else {
          throw new Error("bad response");
        }
      } catch {
        msgEl.textContent = "Something went wrong. Please try again.";
        msgEl.className = "msg error show";
        btn.disabled = false;
        btn.textContent = "Send Message";
      }
    });
  }
}

if (!customElements.get("contact-form-widget")) {
  customElements.define("contact-form-widget", ContactFormWidget);
}

// Tell TypeScript about the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "contact-form-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
