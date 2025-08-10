'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const projList = document.querySelector(".project-list");
const projModal = document.querySelector("[data-project-modal-container]");
const projOverlay = document.querySelector("[data-project-overlay]");
const projClose = document.querySelector("[data-project-modal-close]");
const projTitle = document.querySelector("[data-project-modal-title]");
const projDesc = document.querySelector("[data-project-modal-desc]");
const projLinksContainer = document.querySelector("[data-project-modal-links]");

function toggleProjModal(forceOpen) {
  if (!projModal || !projOverlay) return;
  const open = typeof forceOpen === "boolean" ? forceOpen : !projModal.classList.contains("active");
  projModal.classList.toggle("active", open);
  projOverlay.classList.toggle("active", open);
}

function buildLinkButton(label, url) {
  const a = document.createElement("a");
  a.className = "form-btn";
  a.target = "_blank";
  a.rel = "noopener";
  a.href = url;
  a.textContent = label;
  return a;
}

function renderLinksFromDataset(card) {
  const links = [];
  // up to three explicit links
  for (let i = 1; i <= 3; i++) {
    const label = card.dataset[`link${i}Label`];
    const url = card.dataset[`link${i}Url`];
    if (label && url) links.push({ label, url });
  }
  // fallback to legacy fields if present
  if (links.length === 0) {
    if (card.dataset.projUrl) links.push({ label: "Open Project", url: card.dataset.projUrl });
    if (card.dataset.reportUrl) links.push({ label: "Open Report", url: card.dataset.reportUrl });
  }

  if (projLinksContainer) {
    projLinksContainer.innerHTML = "";
    links.slice(0, 3).forEach(({ label, url }) => {
      projLinksContainer.appendChild(buildLinkButton(label, url));
    });
  }
}

// Event delegation so future items work too
projList?.addEventListener("click", (e) => {
  const card = e.target.closest(".project-item");
  if (!card) return;
  e.preventDefault();

  const title = card.dataset.projTitle || card.querySelector(".project-title")?.textContent?.trim() || "Project";
  const desc = card.dataset.projDesc || "";

  if (projTitle) projTitle.textContent = title;
  if (projDesc) projDesc.textContent = desc;

  renderLinksFromDataset(card);
  toggleProjModal(true);
});

// Close modal
projClose?.addEventListener("click", () => toggleProjModal(false));
projOverlay?.addEventListener("click", () => toggleProjModal(false));


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCat = (filterItems[i].dataset.category || "").toLowerCase();
    if (selectedValue === "all" || selectedValue === itemCat) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let n = 0; n < navigationLinks.length; n++) {
  navigationLinks[n].addEventListener("click", function () {
    const target = this.textContent.trim().toLowerCase();
    pages.forEach((p, idx) => {
      const match = p.dataset.page === target;
      p.classList.toggle("active", match);
      navigationLinks[idx].classList.toggle("active", match);
    });
    window.scrollTo(0, 0);
  });
}