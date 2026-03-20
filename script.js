const menuToggle = document.querySelector(".menu-toggle");
const quickLinks = document.querySelector(".quick-links");

if (menuToggle && quickLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = quickLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

async function submitResendForm(form) {
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);

  status.textContent = "Sending...";
  submitButton?.setAttribute("disabled", "true");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Unable to submit form right now.");
    }

    form.reset();
    status.textContent = "Thanks for submitting!";
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : "Submission failed.";
  } finally {
    submitButton?.removeAttribute("disabled");
  }
}

document.querySelectorAll("form[data-resend-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitResendForm(form);
  });
});
