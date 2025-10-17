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
    const vapiWidget = document.createElement("vapi-widget");
    vapiWidget.setAttribute("assistant-id", "69c583d7-f0e0-48fd-8756-bd8e4c0e0cdc");
    vapiWidget.setAttribute("public-key", "c714c64a-da01-4f61-85ec-7825be2630b7");
    document.body.appendChild(vapiWidget);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  } catch (err) {
    console.error(err);
    msg.textContent = "Error: Could not submit form.";
  }
});
