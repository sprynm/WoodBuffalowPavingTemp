function ensureFormFieldNames() {
  const contactMessage = document.querySelector("#textarea_comp-kvgvkbfq");
  if (contactMessage && !contactMessage.name) {
    contactMessage.name = "message";
  }
}

function getFormStatus(form) {
  return form.querySelector(".form-status, #comp-kvgvkbgy, #comp-kvgvk9de");
}

async function submitResendForm(form, endpoint) {
  const status = getFormStatus(form);
  const submitButton = form.querySelector('button[type="submit"], [data-testid="buttonElement"]');
  const formData = new FormData(form);

  status && (status.textContent = "Sending...");
  submitButton?.setAttribute("disabled", "true");

  try {
    const response = await fetch(endpoint, {
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
    status && (status.textContent = "Thanks for submitting!");
  } catch (error) {
    status && (status.textContent = error instanceof Error ? error.message : "Submission failed.");
  } finally {
    submitButton?.removeAttribute("disabled");
  }
}

document.addEventListener("submit", (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  if (form.id === "comp-kvgvkbf5") {
    event.preventDefault();
    event.stopImmediatePropagation();
    submitResendForm(form, "/api/contact");
  }

  if (form.id === "comp-kvgvk9c3") {
    event.preventDefault();
    event.stopImmediatePropagation();
    submitResendForm(form, "/api/subscribe");
  }
}, true);

ensureFormFieldNames();
