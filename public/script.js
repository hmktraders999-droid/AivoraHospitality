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

    // ✅ Load Vapi Web SDK and initialize voice demo
    const initializeVapiWidget = (apiKey, assistantId) => {
      const buttonConfig = {
        style: "round",
        position: "bottom-right",
        backgroundColor: "#14B8A6",
        foregroundColor: "#FFFFFF",
        width: "60px",
        height: "60px",
        offset: "40px"
      };

      window.vapiInstance = window.vapiSDK.run({
        apiKey: apiKey,
        assistant: assistantId,
        config: buttonConfig
      });

      // Log events for debugging
      if (window.vapiInstance) {
        window.vapiInstance.on('call-start', () => console.log('Voice call started'));
        window.vapiInstance.on('call-end', () => console.log('Voice call ended'));
        window.vapiInstance.on('error', (error) => console.error('Vapi error:', error));
      }
    };

    if (!window.vapiSDK) {
      const script = document.createElement("script");
      script.src = "https://cdn.vapi.ai/webclient/latest/vapi-client.js";
      script.async = true;
      script.onload = () => {
        initializeVapiWidget("c714c64a-da01-4f61-85ec-7825be2630b7", "69c583d7-f0e0-48fd-8756-bd8e4c0e0cdc");
      };
      document.head.appendChild(script);
    } else {
      initializeVapiWidget("c714c64a-da01-4f61-85ec-7825be2630b7", "69c583d7-f0e0-48fd-8756-bd8e4c0e0cdc");
    }
  } catch (err) {
    console.error(err);
    msg.textContent = "Error: Could not submit form.";
  }
});
