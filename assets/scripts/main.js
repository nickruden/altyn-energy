// == СКРИПТ МОДАЛЬНОГО ОКНА ==
document.addEventListener("DOMContentLoaded", function () {
  const modalOpeners = document.querySelectorAll("[data-modal-open]");

  modalOpeners.forEach((opener) => {
    opener.addEventListener("click", function (e) {
      e.preventDefault();

      let modalId = opener.getAttribute("data-modal-open");
      if (modalId.startsWith("#")) modalId = modalId.slice(1);

      const modal = document.querySelector(`[data-modal-id="${modalId}"]`);

      document.body.style.overflow = "hidden";
      modal.style.display = "flex";
      modal.setAttribute("opened", "");

      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.style.display = "none";
          modal.removeAttribute("opened");
          document.body.style.overflow = "";
        }
      });

      const closeButtons = modal.querySelectorAll(".close-modal-button");
      closeButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          modal.style.display = "none";
          modal.removeAttribute("opened");
          document.body.style.overflow = "";
        });
      });
    });
  });
});


// == МАСКА ДЛЯ ТЕЛЕФОНА ==
document.addEventListener("DOMContentLoaded", function () {
  const telInputs = document.querySelectorAll('input[type="tel"]');

  telInputs.forEach((input) => {
    function formatPhone(value) {
      const digits = value.replace(/\D/g, "");

      let result = "+7 (";

      if (digits.startsWith("8")) {
        value = "7" + digits.slice(1);
      }

      const clean = digits.replace(/^8/, "7").slice(0, 11);

      if (clean.length > 1) result = "+7 (";
      if (clean.length >= 2) result += clean.slice(1, 4);
      if (clean.length >= 5) result += ") " + clean.slice(4, 7);
      if (clean.length >= 8) result += " " + clean.slice(7, 9);
      if (clean.length >= 10) result += " " + clean.slice(9, 11);

      return result;
    }

    input.addEventListener("input", (e) => {
      const value = e.target.value;

      let formatted = formatPhone(value);
      input.value = formatted;
    });

    input.addEventListener("focus", () => {
      if (input.value.trim() === "") {
        input.value = "+7 (";
      }
    });

    input.addEventListener("blur", () => {
      const digits = input.value.replace(/\D/g, "");
      if (digits.length < 11) {
        input.value = "";
      }
    });

    input.addEventListener("keypress", (e) => {
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    });
  });
});


// == ВАЛИДАЦИЯ ПОЛЕЙ ==
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const fields = form.querySelectorAll("input, textarea, select");

    fields.forEach((field) => {
      // когда браузер считает поле невалидным
      field.addEventListener("invalid", () => {
        field.classList.add("no-valid");
      });

      // когда пользователь исправляет ошибку
      field.addEventListener("input", () => {
        if (field.checkValidity()) {
          field.classList.remove("no-valid");
        }
      });
    });

    // на случай, если форма отправляется кастомно (через JS)
    form.addEventListener("submit", (e) => {
      const invalid = form.querySelectorAll(":invalid");
      invalid.forEach((el) => el.classList.add("no-valid"));
    });
  });
});