const navToggle = document.querySelector(".nav-toggle");
const shell = document.querySelector(".page-shell");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle && shell) {
  navToggle.addEventListener("click", () => {
    const isOpen = shell.classList.toggle("is-nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    shell?.classList.remove("is-nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

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
