document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      // Create mobile menu if it doesn't exist
      if (!document.querySelector(".mobile-menu")) {
        createMobileMenu()
      }

      const mobileMenu = document.querySelector(".mobile-menu")
      mobileMenu.classList.add("active")
    })
  }
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const header = document.querySelector('.main-header');

  toggleBtn.addEventListener('click', () => {
    header.classList.toggle('mobile-nav-active');
  });


  // Function to create mobile menu
  function createMobileMenu() {
    const mobileMenu = document.createElement("div")
    mobileMenu.className = "mobile-menu"

    // Create mobile menu header
    const mobileMenuHeader = document.createElement("div")
    mobileMenuHeader.className = "mobile-menu-header"

    const logo = document.querySelector(".logo img").cloneNode(true)

    const closeButton = document.createElement("button")
    closeButton.className = "mobile-menu-close"
    closeButton.innerHTML = '<i class="fas fa-times"></i>'
    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })

    mobileMenuHeader.appendChild(logo)
    mobileMenuHeader.appendChild(closeButton)

    // Clone navigation
    const mainNav = document.querySelector(".main-nav .nav-list").cloneNode(true)
    mainNav.className = "mobile-menu-nav"

    // Add event listeners to dropdowns
    const dropdowns = mainNav.querySelectorAll(".dropdown")
    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector(".nav-link")
      const menu = dropdown.querySelector(".dropdown-menu")

      link.addEventListener("click", (e) => {
        e.preventDefault()
        menu.classList.toggle("active")
      })
    })

    mobileMenu.appendChild(mobileMenuHeader)
    mobileMenu.appendChild(mainNav)

    document.body.appendChild(mobileMenu)
  }

  // Dropdown hover effect for desktop
  const dropdowns = document.querySelectorAll(".nav-item.dropdown")
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", function () {
      this.querySelector(".dropdown-menu").style.display = "block"
    })

    dropdown.addEventListener("mouseleave", function () {
      this.querySelector(".dropdown-menu").style.display = "none"
    })
  })

  // Search button functionality
  const searchButton = document.querySelector(".search-button")
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      alert("Chức năng tìm kiếm sẽ được phát triển sau!")
    })
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(href)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Add active class to current page in navigation
  const currentLocation = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentLocation || (currentLocation === "/" && href === "index.html")) {
      link.classList.add("active")
    }
  })

  // Responsive image loading
  function handleResponsiveImages() {
    const newsImages = document.querySelectorAll(".news-image img")

    if (window.innerWidth < 768) {
      newsImages.forEach((img) => {
        if (img.src.includes("500x300")) {
          img.src = img.src.replace("500x300", "300x200")
        }
      })
    } else {
      newsImages.forEach((img) => {
        if (img.src.includes("300x200")) {
          img.src = img.src.replace("300x200", "500x300")
        }
      })
    }
  }

  // Call on load and resize
  handleResponsiveImages()
  window.addEventListener("resize", handleResponsiveImages)
})
