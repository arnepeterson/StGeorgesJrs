const content = window.SITE_CONTENT;

document.title = `${content.clubName} Junior Fixture ${content.seasonYear}`;

document.getElementById("hero-eyebrow").textContent = content.hero.eyebrow;
document.getElementById("hero-title").textContent = content.hero.title;
document.getElementById("hero-intro").textContent = content.hero.intro;
document.getElementById("hero-image").src = content.hero.image;
document.getElementById("hero-image").alt = content.hero.imageAlt;
document.getElementById("season-year").textContent = content.seasonYear;
document.getElementById("sidebar-summary").textContent = content.summary;

const navList = document.getElementById("section-nav");
const sectionList = document.getElementById("section-list");
const checklist = document.getElementById("editor-checklist");
const siteShell = document.getElementById("site-shell");
const passwordGate = document.getElementById("password-gate");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

const PAGE_PASSWORD = "stgeorges2026";
const PASSWORD_STORAGE_KEY = "junior-fixture-2026-unlocked";

function renderBlock(block) {
  if (block.type === "heading") {
    return `<h4 class="section-card__subheading">${block.text}</h4>`;
  }

  if (block.type === "list") {
    const items = block.items
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return `
            <li>
              <span class="section-card__list-title">${item.title || ""}</span>
              ${item.subtext ? `<span class="section-card__list-subtext">${item.subtext}</span>` : ""}
            </li>
          `;
        }

        return `<li>${item}</li>`;
      })
      .join("");
    return `<ul class="section-card__list">${items}</ul>`;
  }

  if (block.type === "schedule") {
    const rows = block.items
      .map(
        (item) => `
          <div class="section-card__schedule-row">
            <span class="section-card__schedule-date">${item.date || ""}</span>
            <span class="section-card__schedule-status">${item.status || ""}</span>
            <span class="section-card__schedule-club">${item.club || ""}</span>
          </div>
        `
      )
      .join("");

    return `
      <div class="section-card__schedule">
        <div class="section-card__schedule-header">
          <span>Date</span>
          <span>Home/Away</span>
          <span>Club</span>
        </div>
        ${rows}
      </div>
    `;
  }

  if (block.type === "button") {
    return `
      <div class="section-card__actions">
        <a
          class="section-card__action-button"
          href="${block.href}"
          target="_blank"
          rel="noreferrer"
        >
          ${block.label}
        </a>
      </div>
    `;
  }

  return `<p>${block.text}</p>`;
}

function renderMedia(media) {
  if (!media) {
    return "";
  }

  const items = Array.isArray(media) ? media : [media];

  return items
    .map((item) => {
      if (item.type === "video" && item.src) {
        return `
          <figure class="section-card__media">
            <button
              class="section-card__media-video-button"
              type="button"
              data-lightbox-video="${item.src}"
              data-lightbox-caption="${item.caption || item.filename || ""}"
              ${item.poster ? `data-lightbox-poster="${item.poster}"` : ""}
              aria-label="Open video in lightbox"
            >
              <video
                class="section-card__media-video"
                src="${item.src}"
                ${item.poster ? `poster="${item.poster}"` : ""}
                muted
                loop
                playsinline
                controls
                preload="metadata"
                data-autoplay-video
              ></video>
            </button>
            <figcaption class="section-card__media-caption">${item.filename || ""}</figcaption>
          </figure>
        `;
      }

      if (item.src) {
        return `
          <figure class="section-card__media">
            <button
              class="section-card__media-button"
              type="button"
              data-lightbox-image="${item.src}"
              data-lightbox-alt="${item.alt || ""}"
              data-lightbox-caption="${item.caption || item.alt || ""}"
              aria-label="Open photo in lightbox"
            >
              <img src="${item.src}" alt="${item.alt || ""}" />
            </button>
            <figcaption class="section-card__media-caption">${item.filename || ""}</figcaption>
          </figure>
        `;
      }

      return `
        <div class="section-card__media section-card__media--placeholder" aria-label="${item.placeholder}">
          <p class="section-card__media-label">Photo placeholder</p>
          <p class="section-card__media-text">${item.placeholder}</p>
          <p class="section-card__media-file">${item.filename || ""}</p>
        </div>
      `;
    })
    .join("");
}

function renderNote(section) {
  if (section.note && section.note.visible === false) {
    return "";
  }

  const title = section.note?.title || "2026 update note";
  const text = section.note?.text || section.updateNote;
  const links = section.note?.links || [];

  if (!text && links.length === 0) {
    return "";
  }

  const linksMarkup = links.length
    ? `
      <div class="section-card__note-actions">
        ${links
          .map(
            (link) => `
              <a
                class="section-card__note-button"
                href="${link.href}"
                target="_blank"
                rel="noreferrer"
              >
                ${link.label}
              </a>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <aside class="section-card__note">
      <p class="section-card__note-label">${title}</p>
      ${text ? `<p>${text}</p>` : ""}
      ${linksMarkup}
    </aside>
  `;
}

function renderSideContent(section) {
  const noteMarkup = renderNote(section);
  const mediaMarkup = renderMedia(section.media);

  if (section.sideOrder === "media-first") {
    return `${mediaMarkup}${noteMarkup}`;
  }

  return `${noteMarkup}${mediaMarkup}`;
}

content.sections.forEach((section, index) => {
  const navItem = document.createElement("li");
  const navLink = document.createElement("a");
  navLink.href = `#${section.id}`;
  navLink.textContent = section.title;
  navItem.appendChild(navLink);
  navList.appendChild(navItem);

  const article = document.createElement("article");
  article.className = "section-card";
  article.id = section.id;

  const bodyMarkup = section.blocks
    .map((block) => renderBlock(block))
    .join("");

  article.innerHTML = `
    <div class="section-card__header">
      <div>
        <p class="section-card__kicker">${section.kicker}</p>
        <h3>${section.title}</h3>
        ${section.summary ? `<p class="section-card__summary">${section.summary}</p>` : ""}
      </div>
      <div class="section-card__badge">${String(index + 1).padStart(2, "0")}</div>
    </div>
    <div class="section-card__grid">
      <div class="section-card__body">${bodyMarkup}</div>
      ${
        section.layout === "media-below"
          ? ""
          : `
            <div class="section-card__side">
              ${renderSideContent(section)}
            </div>
          `
      }
    </div>
    ${
      section.layout === "media-below"
        ? `
          <div class="section-card__below-media">
            ${renderMedia(section.media)}
          </div>
        `
        : ""
    }
  `;

  sectionList.appendChild(article);
});

if (checklist && Array.isArray(content.editorChecklist)) {
  content.editorChecklist.forEach((item) => {
    const block = document.createElement("div");
    block.className = "checklist__item";
    block.innerHTML = `<strong>${item.title}</strong><span>${item.text}</span>`;
    checklist.appendChild(block);
  });
}

const autoplayVideos = Array.from(document.querySelectorAll("[data-autoplay-video]"));

if ("IntersectionObserver" in window && autoplayVideos.length > 0) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  autoplayVideos.forEach((video) => videoObserver.observe(video));
}

function openLightbox(src, alt, caption) {
  lightboxVideo.pause();
  lightboxVideo.hidden = true;
  lightboxVideo.removeAttribute("src");
  lightboxVideo.removeAttribute("poster");
  lightboxImage.src = src;
  lightboxImage.alt = alt || "";
  lightboxImage.hidden = false;
  lightboxCaption.textContent = caption || "";
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function openVideoLightbox(src, caption, poster) {
  lightboxImage.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxVideo.src = src;
  if (poster) {
    lightboxVideo.poster = poster;
  } else {
    lightboxVideo.removeAttribute("poster");
  }
  lightboxVideo.hidden = false;
  lightboxVideo.currentTime = 0;
  lightboxVideo.play().catch(() => {});
  lightboxCaption.textContent = caption || "";
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxImage.hidden = false;
  lightboxVideo.pause();
  lightboxVideo.hidden = true;
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
  lightboxCaption.textContent = "";
  document.body.classList.remove("lightbox-open");
}

sectionList.addEventListener("click", (event) => {
  const videoButton = event.target.closest("[data-lightbox-video]");
  if (videoButton) {
    openVideoLightbox(
      videoButton.getAttribute("data-lightbox-video"),
      videoButton.getAttribute("data-lightbox-caption"),
      videoButton.getAttribute("data-lightbox-poster")
    );
    return;
  }

  const button = event.target.closest("[data-lightbox-image]");
  if (!button) {
    return;
  }

  openLightbox(
    button.getAttribute("data-lightbox-image"),
    button.getAttribute("data-lightbox-alt"),
    button.getAttribute("data-lightbox-caption")
  );
});

lightbox.addEventListener("click", (event) => {
  if (event.target.matches("[data-lightbox-close]")) {
    closeLightbox();
  }
});

lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
});

function unlockPage() {
  passwordGate.hidden = true;
  passwordGate.setAttribute("aria-hidden", "true");
  siteShell.classList.remove("site-shell--locked");
  document.body.classList.remove("password-gate-open");
  sessionStorage.setItem(PASSWORD_STORAGE_KEY, "true");
}

function lockPage() {
  passwordGate.hidden = false;
  passwordGate.setAttribute("aria-hidden", "false");
  siteShell.classList.add("site-shell--locked");
  document.body.classList.add("password-gate-open");
}

if (sessionStorage.getItem(PASSWORD_STORAGE_KEY) === "true") {
  unlockPage();
} else {
  lockPage();
  passwordInput.focus();
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value === PAGE_PASSWORD) {
    passwordError.hidden = true;
    passwordInput.value = "";
    unlockPage();
    return;
  }

  passwordError.hidden = false;
  passwordInput.select();
});
