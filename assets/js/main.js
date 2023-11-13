/**
 * Template Name: BizLand
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  let selectTopbar = select("#topbar");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("fixed-top");
        selectTopbar.classList.add("fixed-top");
        selectHeader.classList.add("bg-color");
        selectHeader.classList.add("scrolled-offset");
        selectTopbar.classList.add("bg-color-white");
      } else {
        selectHeader.classList.remove("fixed-top");
        selectTopbar.classList.remove("fixed-top");
        selectHeader.classList.remove("bg-color");
        selectHeader.classList.remove("scrolled-offset");
        selectTopbar.classList.remove("bg-color-white");
      }
    };
    window.addEventListener("load", headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  let teamMembers;
  let nextActive = true;
  let prevActive = false;

  const determineVisibleItems = () => (window.innerWidth < 768 ? 1 : 4);

  const mobile = window.innerWidth < 768;

  const toggleTeamMembers = () => {
    const numVisibleItems = determineVisibleItems();
    teamMembers.forEach((member, index) =>
      member.classList.toggle(
        "hidden",
        index < currentIndex || index >= currentIndex + numVisibleItems
      )
    );
  };

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (!mobile && nextActive) {
      currentIndex = (currentIndex + 1) % teamMembers.length;
      toggleTeamMembers();
      nextActive = false;
      prevActive = true;
    } else if (mobile) {
      currentIndex = (currentIndex + 1) % teamMembers.length;
      toggleTeamMembers();
    }
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    const numVisibleItems = determineVisibleItems();

    if (!mobile && prevActive) {
      if (currentIndex === 0) {
        currentIndex = teamMembers.length - numVisibleItems;
      } else {
        currentIndex =
          (currentIndex - 1 + teamMembers.length) % teamMembers.length;
      }
      toggleTeamMembers();
      prevActive = false;
      nextActive = true;
    } else if (mobile) {
      if (currentIndex === 0) {
        currentIndex = teamMembers.length - numVisibleItems;
      } else {
        currentIndex =
          (currentIndex - 1 + teamMembers.length) % teamMembers.length;
      }
      toggleTeamMembers();
    }
  });

  const updateVisibility = () => {
    teamMembers = document.querySelectorAll(".col-12.col-lg-3");
    toggleTeamMembers();
  };

  // Initial toggle
  updateVisibility();

  // Update visibility on window resize
  window.addEventListener("resize", updateVisibility);
});
