const form = document.getElementById("demoForm");
const msg = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const business_name = form.business_name.value.trim();
  const contact_number = form.contact_number.value.trim();

  msg.textContent = "Submitting...";

  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, business_name, contact_number }),
    });

    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Submission failed");

    msg.textContent = `Thanks ${name}! Connecting you to our AI Demo...`;

    // ✅ Load Vapi widget (using your real assistant + public key)
    if (document.querySelector("vapi-widget")) {
      return; // Widget already exists
    }
    
    const vapiWidget = document.createElement("vapi-widget");
    vapiWidget.setAttribute("assistant-id", "69c583d7-f0e0-48fd-8756-bd8e4c0e0cdc");
    vapiWidget.setAttribute("public-key", "c714c64a-da01-4f61-85ec-7825be2630b7");
    vapiWidget.setAttribute("mode", "voice");
    vapiWidget.setAttribute("theme", "dark");
    vapiWidget.setAttribute("base-bg-color", "#000000");
    vapiWidget.setAttribute("accent-color", "#14B8A6");
    vapiWidget.setAttribute("cta-button-color", "#000000");
    vapiWidget.setAttribute("cta-button-text-color", "#ffffff");
    vapiWidget.setAttribute("border-radius", "large");
    vapiWidget.setAttribute("size", "full");
    vapiWidget.setAttribute("position", "bottom-right");
    vapiWidget.setAttribute("title", "TALK WITH AI");
    vapiWidget.setAttribute("start-button-text", "Start");
    vapiWidget.setAttribute("end-button-text", "End Call");
    vapiWidget.setAttribute("cta-title", "Take a Demo");
    vapiWidget.setAttribute("chat-first-message", "Hey, How can I help you today?");
    vapiWidget.setAttribute("chat-placeholder", "Type your message...");
    vapiWidget.setAttribute("voice-show-transcript", "true");
    vapiWidget.setAttribute("consent-required", "true");
    vapiWidget.setAttribute("consent-title", "Terms and conditions");
    vapiWidget.setAttribute("consent-content", "By clicking \"Agree,\" and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service.");
    vapiWidget.setAttribute("consent-storage-key", "vapi_widget_consent");
    document.body.appendChild(vapiWidget);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/embed/widget.umd.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  } catch (err) {
    console.error(err);
    msg.textContent = "Error: Could not submit form.";
  }
});
