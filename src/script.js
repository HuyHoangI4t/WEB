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

    // Hiện logo và nút đóng ngang hàng
    const logo = document.querySelector(".logo img").cloneNode(true)
    mobileMenuHeader.appendChild(logo)

    const closeButton = document.createElement("button")
    closeButton.className = "mobile-menu-close"
    closeButton.innerHTML = '<i class="fas fa-times"></i>'
    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
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

  // Search button functionality (tìm kiếm toàn bộ nội dung trên web)
  const searchButton = document.querySelector(".search-button")
  const searchIcon = document.querySelector(".search-icon")
  let searchInput = document.querySelector(".search-input")
  if (!searchInput) {
    searchInput = document.createElement("input")
    searchInput.type = "text"
    searchInput.placeholder = "Tìm kiếm..."
    searchInput.className = "search-input"
    searchInput.style.display = "inline-block"
    searchInput.style.marginLeft = "10px"
    searchInput.style.marginRight = "20px"
    searchInput.style.padding = "6px 10px"
    searchInput.style.borderRadius = "16px"
    searchInput.style.border = "1px solid #ccc"
    searchInput.style.fontSize = "14px"
    searchInput.style.width = "200px"
    searchInput.style.transition = "all 0.2s"
    searchIcon.style.display = "flex"
    searchIcon.style.alignItems = "center"
    searchIcon.appendChild(searchInput)
  }

  let originalMainHTML = null

  function highlightKeyword(html, keyword) {
    if (!keyword) return html
    // Escape keyword for regex
    const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${safeKeyword})`, "gi")
    return html.replace(regex, '<span class="search-highlight">$1</span>')
  }

  function showSearchResults(keyword) {
    const main = document.querySelector("main")
    if (!originalMainHTML) originalMainHTML = main.innerHTML

    // Ẩn toàn bộ nội dung cũ trong main khi tìm kiếm
    Array.from(main.children).forEach(child => {
      // Ẩn tất cả, riêng .welcome-banner thì xóa luôn khỏi DOM
      if (child.classList && child.classList.contains("welcome-banner")) {
        child.remove();
      } else {
        child.style.display = "none";
      }
    });

    // Tìm tất cả các phần tử có chứa từ khóa (không chỉ news-item)
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = originalMainHTML

    // Duyệt toàn bộ các phần tử có textContent chứa từ khóa (không loại bỏ theo class, chỉ bỏ header/footer/nav)
    const allNodes = tempDiv.querySelectorAll("*")
    const matches = []
    const added = new Set()
    allNodes.forEach(node => {
      // Loại bỏ các node nằm trong header, footer, nav
      const skip = node.closest('header, footer, nav')
      if (
        !skip &&
        node.children.length === 0 &&
        node.textContent &&
        node.textContent.trim() !== "" &&
        node.textContent.toLowerCase().includes(keyword.toLowerCase())
      ) {
        // Lấy phần tử cha gần nhất là .news-item nếu có, nếu không thì lấy chính node
        let container = node.closest('.news-item')
        if (!container) container = node
        const html = highlightKeyword(container.outerHTML, keyword)
        if (!added.has(html)) {
          matches.push(html)
          added.add(html)
        }
      }
    })

    // Tạo vùng kết quả tìm kiếm mới, không thay thế vào layout cũ
    const resultTitle = `
      <div class="search-results-container">
        <div class="search-results-title">
          <b>Kết quả tìm kiếm cho:</b> "<span style='color:#0072ff'>${keyword}</span>"
        </div>
        ${
          matches.length === 0
            ? `<div style="font-size:15px;color:#888;margin-bottom:24px;">Không tìm thấy kết quả phù hợp.</div>`
            : `<div class="news-grid search-news-grid">${matches.join("")}</div>`
        }
        <button class="search-back-btn">Quay lại</button>
      </div>
    `
    // Thêm vùng kết quả vào main
    const resultDiv = document.createElement("div")
    resultDiv.innerHTML = resultTitle
    main.appendChild(resultDiv)

    // Xử lý nút quay lại
    document.querySelector(".search-back-btn").onclick = function () {
      resultDiv.remove();
      Array.from(main.children).forEach(child => {
        child.style.display = "";
      });
      searchInput.value = "";
      searchInput.style.display = "none";
    }
  }

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      // Toggle input
      if (searchInput.style.display === "none") {
        searchInput.style.display = "inline-block"
        searchInput.focus()
      } else {
        searchInput.style.display = "none"
      }
    })
    // Khi nhấn Enter trong input thì tìm kiếm
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const keyword = searchInput.value.trim()
        if (keyword) {
          showSearchResults(keyword)
        }
      }
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
