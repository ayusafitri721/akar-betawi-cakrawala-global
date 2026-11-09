(function () {
  "use strict";

  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav-utama");

  if (toggle && nav) {
    var setExpanded = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", function () {
      setExpanded(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setExpanded(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setExpanded(false);
        toggle.focus();
      }
    });
  }

  var copyButton = document.getElementById("copy-cite");
  var bibtex = document.getElementById("bibtex");
  var status = document.getElementById("copy-status");

  if (copyButton && bibtex && status) {
    var showStatus = function (message) {
      status.textContent = message;
      window.clearTimeout(showStatus.timer);
      showStatus.timer = window.setTimeout(function () {
        status.textContent = "";
      }, 4000);
    };

    copyButton.addEventListener("click", function () {
      var text = bibtex.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            showStatus("Sitasi tersalin ke papan klip.");
          },
          function () {
            showStatus("Gagal menyalin. Pilih teks sitasi secara manual.");
          }
        );
        return;
      }

      var range = document.createRange();
      range.selectNodeContents(bibtex);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showStatus("Teks sitasi dipilih. Tekan Ctrl+C untuk menyalin.");
    });
  }

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
