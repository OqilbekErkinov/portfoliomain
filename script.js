// === GLOBAL CONFIG ===
const TELEGRAM_BOT_TOKEN = "8505196776:AAFp84Mx6DAZujnQEovJFKAHWpkWl6zKqzA";
const TELEGRAM_CHAT_ID = "1771891844";

// === PRELOADER ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }, 1000);

  // Initialize features
  trackVisitor();
  initCustomCursor();
  // trackTelegramMiniAppUser() will run immediately outside

  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  updateTime();
  setInterval(updateTime, 1000);
});

// === LOCAL TIME LOGIC ===
function updateTime() {
  const timeDisplay = document.getElementById("local-time");
  if (timeDisplay) {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
}

// === DARK MODE LOGIC ===
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  html.classList.remove("dark");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    localStorage.theme = "dark";
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.theme = "light";
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// === MOBILE MENU ===
const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-menu");
const links = document.querySelectorAll(".mobile-link");

const toggleMenu = () => {
  const isOpen = menu.style.opacity === "1";
  menu.style.opacity = isOpen ? "0" : "1";
  menu.style.pointerEvents = isOpen ? "none" : "auto";
};

if (btn) btn.addEventListener("click", toggleMenu);
if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
links.forEach((link) => link.addEventListener("click", toggleMenu));

// === SCROLL TO TOP & ACTIVE NAVIGATION (ScrollSpy) ===
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const sections = document.querySelectorAll(".section-spy");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (scrollToTopBtn) {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.remove("translate-y-20", "opacity-0");
    } else {
      scrollToTopBtn.classList.add("translate-y-20", "opacity-0");
    }
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary", "dark:text-white", "font-bold");
    link.classList.add("text-slate-600", "dark:text-slate-400");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("text-primary", "dark:text-white", "font-bold");
      link.classList.remove("text-slate-600", "dark:text-slate-400");
    }
  });
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// === PROJECT FILTER LOGIC ===
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projects.forEach((project) => {
      const categories = project
        .getAttribute("data-filter-category")
        .split(" ");

      if (filterValue === "all" || categories.includes(filterValue)) {
        project.style.display = "block";
        project.classList.add("reveal-on-scroll", "is-visible");
      } else {
        project.style.display = "none";
        project.classList.remove("reveal-on-scroll", "is-visible");
      }
    });
  });
});

// === 3D TILT EFFECT ===
if (window.matchMedia("(min-width: 768px)").matches) {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
}

// === PARALLAX EFFECT ===
window.addEventListener("scroll", () => {
  const parallaxImages = document.querySelectorAll(".parallax-img");
  parallaxImages.forEach((img) => {
    const rect = img.parentElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      const speed = 0.08;
      const yPos = (window.innerHeight - rect.top) * speed;
      img.style.transform = `translateY(${yPos - 20}px) scale(1.1)`;
    }
  });
});

// === PROJECT MODAL LOGIC ===
const modal = document.getElementById("project-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");
const triggers = document.querySelectorAll(".project-trigger");

const mTitle = document.getElementById("modal-title");
const mCategory = document.getElementById("modal-category");
const mImage = document.getElementById("modal-image");
const mDesc = document.getElementById("modal-desc");
const mLink = document.getElementById("modal-link");

function openModal(data) {
  if (!modal) return;
  mTitle.textContent = data.title;
  mCategory.textContent = data.category;
  mImage.src = data.image;
  mDesc.textContent = data.desc;

  if (data.link) {
    mLink.href = data.link;
    mLink.classList.remove("opacity-50", "pointer-events-none");
  } else {
    mLink.href = "#";
    mLink.classList.add("opacity-50", "pointer-events-none");
  }

  modal.classList.remove("hidden");
  setTimeout(() => {
    modalBackdrop.classList.remove("opacity-0");
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
  document.body.style.overflow = "hidden";
}

function hideModal() {
  if (!modal) return;
  modalBackdrop.classList.add("opacity-0");
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }, 300);
}

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const data = {
      title: trigger.dataset.title,
      category: trigger.dataset.category,
      image: trigger.dataset.image,
      desc: trigger.dataset.desc,
      link: trigger.dataset.link,
    };
    openModal(data);
  });
});

if (closeModal) closeModal.addEventListener("click", hideModal);
if (modalBackdrop) modalBackdrop.addEventListener("click", hideModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideModal();
});

// === TOAST NOTIFICATION LOGIC ===
const toastContainer = document.getElementById("toast-container");

function showToast(message, type = "success") {
  const toast = document.createElement("div");

  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-exclamation-circle"></i>';
  const colorClass =
    type === "success"
      ? "bg-slate-900 text-white dark:bg-white dark:text-black"
      : "bg-red-500 text-white";

  toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${colorClass}`;
  toast.innerHTML = `${icon} <span>${message}</span>`;

  if (toastContainer) toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("toast-enter-active");
    toast.classList.add("toast-exit-active");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// === CONTACT FORM SUBMISSION ===
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector("button");
    const originalText = btn.innerHTML;

    const name = contactForm.querySelector('[name="name"]').value;
    const email = contactForm.querySelector('[name="email"]').value;
    const message = contactForm.querySelector('[name="message"]').value;

    btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
    btn.disabled = true;

    const text = `
📩 *New Message from Portfolio!*

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:*
${message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        showToast("Message sent successfully! 🚀");
        contactForm.reset();
      } else {
        throw new Error("Telegram error");
      }
    } catch (error) {
      showToast("Failed to send message 😢", "error");
      console.error("Contact form error:", error);
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}

// === SCROLL REVEAL ANIMATION [MODERN] ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
  observer.observe(el);
});

// === MAGNETIC BUTTON EFFECT ===
const magneticBtns = document.querySelectorAll(".magnetic-btn");

if (window.matchMedia("(min-width: 768px)").matches) {
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
}

// === SPOTLIGHT EFFECT LOGIC [NEW] ===
const spotlightCards = document.querySelectorAll(".spotlight-card");

spotlightCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// === VISITOR TRACKING LOGIC ===
async function trackVisitor() {
  if (sessionStorage.getItem('visitor_notified')) return;

  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    const location = `${data.city || "Unknown City"}, ${data.region || "Unknown Region"}, ${data.country_name || "Unknown Country"}`;
    const ip = data.ip || "Unknown IP";
    const isp = data.org || "Unknown ISP";
    const platform = navigator.platform;
    const resolution = `${window.screen.width}x${window.screen.height}`;
    const language = navigator.language;
    const source = document.referrer || "Direct Visit";
    const time = new Date().toLocaleString("sv-SE");

    const text = `
🚀 *New Visitor on Portfolio!*

📍 *Location:* ${location}
🌐 *IP:* ${ip}
🏢 *ISP:* ${isp}
💻 *Platform:* ${platform}
🖥️ *Resolution:* ${resolution}
🌍 *Language:* ${language}
🔗 *Source:* ${source}
⏰ *Time:* ${time}
    `;

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (res.ok) {
      sessionStorage.setItem('visitor_notified', 'true');
    }
  } catch (error) {
    console.error("Visitor tracking failed:", error);
  }
}

// === CUSTOM CURSOR LOGIC ===
function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  const dot = document.getElementById("custom-cursor-dot");
  if (!cursor || !dot) return;

  if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;

      cursor.animate({
        left: `${x}px`,
        top: `${y}px`
      }, { duration: 500, fill: "forwards" });

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    });

    const hoverables = document.querySelectorAll('.hoverable, a, button, .project-trigger');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        dot.classList.add('dot-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        dot.classList.remove('dot-hover');
      });
    });
  }
}

// === TELEGRAM MINI APP TRACKING [FINAL & ROBUST] ===
function trackTelegramMiniAppUser() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return;

  webApp.ready();
  webApp.expand();

  let attempts = 0;
  const maxAttempts = 10;

  const checkUser = () => {
    let user = webApp.initDataUnsafe?.user;

    if (!user && webApp.initData) {
      try {
        const params = new URLSearchParams(webApp.initData);
        const userJson = params.get('user');
        if (userJson) user = JSON.parse(userJson);
      } catch (e) {}
    }

    if (user) {
      const text = `
<b>🚀 Telegram User Captured!</b>

<b>👤 Name:</b> ${user.first_name} ${user.last_name || ""}
<b>🔗 Username:</b> @${user.username || "no_username"}
<b>🆔 ID:</b> <code>${user.id}</code>
<b>🌍 Lang:</b> ${user.language_code || "unknown"}
<b>💎 Premium:</b> ${user.is_premium ? "Yes" : "No"}
<b>⏰ Time:</b> ${new Date().toLocaleString("sv-SE")}
      `;
      sendToBot(text, 'tg_mini_app_notified');
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(checkUser, 1000);
    }
  };

  checkUser();
}

// RUN IMMEDIATELY
trackTelegramMiniAppUser();

async function sendToBot(text, storageKey) {
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    });
    if (storageKey) sessionStorage.setItem(storageKey, 'true');
  } catch (e) {
    console.error("TWA Notification Error:", e);
  }
}
