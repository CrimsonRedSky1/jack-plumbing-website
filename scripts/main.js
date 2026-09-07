"use strict";

const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

const quoteForm = document.querySelector("[data-quote-form]");
const formError = document.querySelector("[data-form-error]");

if (quoteForm && formError) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formError.textContent = "";

    const formData = new FormData(quoteForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone || !service || !message) {
      formError.textContent = "Please complete all fields before continuing.";
      return;
    }

    const whatsappMessage = [
      "Hello TNE Plumbing, I would like to request a quote.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Issue: ${message}`,
    ].join("\n");

    // URLSearchParams handles encoding; user input is never inserted as HTML.
    const url = new URL("https://api.whatsapp.com/send");
    url.searchParams.set("phone", "6585037300");
    url.searchParams.set("text", whatsappMessage);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  });
}
