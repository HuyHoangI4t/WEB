// Xoá lịch sử chat mỗi lần reload
localStorage.removeItem("chatHistory")

document.addEventListener("DOMContentLoaded", () => {
  // Chatbot elements
  const chatbotToggle = document.querySelector(".chatbot-toggle")
  const chatbotBox = document.querySelector(".chatbot-box")
  const chatbotClose = document.querySelector(".chatbot-close")
  const chatbotMessages = document.getElementById("chatbot-messages")
  const userInput = document.getElementById("user-input")
  const sendBtn = document.getElementById("send-btn")
  const chatbotNotification = document.querySelector(".chatbot-notification")

  // Default knowledge base for the chatbot
  let knowledgeBase = {
    "thông tin tuyển sinh": [
      "Trường Đại học Tây Nguyên tuyển sinh các ngành đào tạo sau:",
      "1. Công nghệ thông tin",
      "2. Kỹ thuật phần mềm",
      "3. Hệ thống thông tin",
      "4. An toàn thông tin",
      "Điểm chuẩn năm 2024 dao động từ 18-24 điểm tùy ngành. Bạn có thể tìm hiểu thêm tại website tuyển sinh của trường.",
    ],
    "chương trình đào tạo cntt": [
      "Chương trình đào tạo ngành Công nghệ Thông tin bao gồm 150 tín chỉ, thời gian đào tạo 4 năm với các học phần chính:",
      "- Lập trình cơ bản và nâng cao",
      "- Cấu trúc dữ liệu và giải thuật",
      "- Cơ sở dữ liệu",
      "- Mạng máy tính",
      "- Trí tuệ nhân tạo",
      "- Phát triển ứng dụng web/mobile",
      "Sinh viên sẽ được thực tập tại doanh nghiệp trong 2 học kỳ cuối.",
    ],
    "học phí": [
      "Học phí năm học 2024-2025 của Trường Đại học Tây Nguyên như sau:",
      "- Khối ngành Công nghệ thông tin: 18-20 triệu đồng/năm",
      "- Sinh viên có thể đóng học phí theo học kỳ hoặc theo năm",
      "- Trường có nhiều chính sách học bổng cho sinh viên xuất sắc và sinh viên có hoàn cảnh khó khăn",
    ],
    "cơ hội việc làm": [
      "Sinh viên tốt nghiệp ngành CNTT có nhiều cơ hội việc làm với mức lương hấp dẫn:",
      "- Lập trình viên (Frontend, Backend, Fullstack)",
      "- Kỹ sư phát triển phần mềm",
      "- Chuyên viên phân tích dữ liệu",
      "- Chuyên viên an toàn thông tin",
      "- Quản trị hệ thống",
      "Tỷ lệ sinh viên có việc làm sau 3 tháng tốt nghiệp đạt trên 90%.",
    ],
    "giảng viên": [
      "Bộ môn CNTT có đội ngũ giảng viên chất lượng cao:",
      "- 5 Tiến sĩ",
      "- 15 Thạc sĩ",
      "- Nhiều giảng viên được đào tạo từ nước ngoài",
      "- Có kinh nghiệm thực tế tại các doanh nghiệp công nghệ lớn",
    ],
    "cơ sở vật chất": [
      "Trường Đại học Tây Nguyên có cơ sở vật chất hiện đại phục vụ đào tạo CNTT:",
      "- 10 phòng máy tính với hơn 300 máy tính cấu hình cao",
      "- Phòng lab IoT, AI, VR/AR",
      "- Thư viện điện tử với hơn 50.000 đầu sách và tài liệu",
      "- Khu ký túc xá khang trang",
      "- Khu thể thao đa năng",
    ],
    "hoạt động ngoại khóa": [
      "Sinh viên CNTT có thể tham gia nhiều hoạt động ngoại khóa:",
      "- CLB Lập trình",
      "- CLB Robotics",
      "- Cuộc thi Hackathon thường niên",
      "- Chương trình trao đổi sinh viên quốc tế",
      "- Các hoạt động tình nguyện và trải nghiệm thực tế",
    ],
    "liên hệ": [
      "Bạn có thể liên hệ với Bộ môn CNTT qua:",
      "- Địa chỉ: Phòng A203, Tòa nhà A, Trường Đại học Tây Nguyên, 567 Lê Duẩn, TP. Buôn Ma Thuột",
      "- Điện thoại: (0262) 3825 XXX",
      "- Email: cntt@tnu.edu.vn",
      "- Fanpage: facebook.com/cntt.tnu",
    ],
    "xin chào": [
      "Xin chào! Tôi là TNU Assistant, trợ lý ảo của Trường Đại học Tây Nguyên. Tôi có thể giúp gì cho bạn?",
    ],
    "tạm biệt": ["Cảm ơn bạn đã trò chuyện! Nếu có thắc mắc gì thêm, hãy quay lại nhé. Chúc bạn một ngày tốt lành!"],
  }

  // Default responses when no match is found
  let defaultResponses = [
    "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể diễn đạt theo cách khác được không?",
    "Tôi không có thông tin về vấn đề này. Bạn có thể hỏi về thông tin tuyển sinh, chương trình đào tạo, học phí hoặc cơ hội việc làm không?",
    "Câu hỏi của bạn nằm ngoài phạm vi kiến thức của tôi. Bạn có thể liên hệ trực tiếp với nhà trường qua email: contact@tnu.edu.vn hoặc số điện thoại: (0262) 3825 185.",
  ]

  // Chatbot settings
  let chatbotSettings = {
    threshold: 0.5, // Confidence threshold for intent matching
    model: null, // Will store the trained model
  }

  // Load chatbot data from localStorage if available
  function loadChatbotData() {
    const savedData = localStorage.getItem("chatbotData")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        knowledgeBase = data.knowledgeBase || knowledgeBase
        defaultResponses = data.defaultResponses || defaultResponses
        chatbotSettings = data.settings || chatbotSettings

        // If there's a trained model, load it
        if (data.model) {
          chatbotSettings.model = data.model
        }

        console.log("Chatbot data loaded from localStorage")
      } catch (error) {
        console.error("Error loading chatbot data:", error)
      }
    }
  }

  // Save chatbot data to localStorage
  function saveChatbotData() {
    const data = {
      knowledgeBase: knowledgeBase,
      defaultResponses: defaultResponses,
      settings: chatbotSettings,
      model: chatbotSettings.model,
    }

    localStorage.setItem("chatbotData", JSON.stringify(data))
    console.log("Chatbot data saved to localStorage")
  }

  // Load data on initialization
  loadChatbotData()

  // Open chatbot after 3 seconds
  setTimeout(() => {
    if (!localStorage.getItem("chatbotShown")) {
      chatbotBox.classList.add("active")
      localStorage.setItem("chatbotShown", "true")
    }
  }, 3000)

  // Toggle chatbot visibility
  chatbotToggle.addEventListener("click", () => {
    chatbotBox.classList.toggle("active")
    chatbotNotification.style.display = "none"
    scrollToBottom()
  })

  // Close chatbot
  chatbotClose.addEventListener("click", () => {
    chatbotBox.classList.remove("active")
  })

  // Send message when button is clicked
  sendBtn.addEventListener("click", sendMessage)

  // Send message when Enter key is pressed
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  let suggestionCooldown = false;

  // Handle suggestion buttons
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("suggestion-btn")) {
      if (suggestionCooldown) return;
      suggestionCooldown = true;
      setTimeout(() => {
        suggestionCooldown = false;
      }, 1000);

      const suggestionText = e.target.textContent;
      userInput.value = suggestionText;
      sendMessage();
    }
  })

  // Function to send message
  function sendMessage() {
    const message = userInput.value.trim()
    if (message === "") return

    // Add user message to chat
    addMessage(message, "user")
    userInput.value = ""

    // Show typing indicator
    showTypingIndicator()

    // Process the message and respond after a delay
    setTimeout(
      () => {
        removeTypingIndicator()
        const response = getBotResponse(message)

        // Nếu response là mảng, gộp lại thành 1 đoạn văn, mỗi câu xuống dòng
        if (Array.isArray(response)) {
          addMessage(response.join("\n"), "bot")
          addSuggestions()
        } else {
          addMessage(response, "bot")
          addSuggestions()
        }
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  // Function to add a message to the chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`

    const contentDiv = document.createElement("div")
    contentDiv.className = "message-content"

    const paragraph = document.createElement("p")
    paragraph.textContent = text
    contentDiv.appendChild(paragraph)

    const timeSpan = document.createElement("span")
    timeSpan.className = "message-time"
    timeSpan.textContent = getCurrentTime()

    messageDiv.appendChild(contentDiv)
    messageDiv.appendChild(timeSpan)

    chatbotMessages.appendChild(messageDiv)
    scrollToBottom()
  }

  // Function to add suggestion buttons
  function addSuggestions() {
    const suggestions = Object.keys(knowledgeBase).filter((key) => key !== "xin chào" && key !== "tạm biệt")
    const randomSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 4)

    const messageDiv = document.createElement("div")
    messageDiv.className = "message bot-message"

    // Tạo khối suggestion có thể ẩn/hiện
    const contentDiv = document.createElement("div")
    contentDiv.className = "message-content"
    contentDiv.id = "messageContent" + Date.now() // Đảm bảo id duy nhất nếu nhiều khối
    contentDiv.style.display = "none" // Mặc định ẩn

    // Header với nút đóng
    const headSuggestion = document.createElement("div")
    headSuggestion.className = "head-suggestion"

    const paragraph = document.createElement("p")
    paragraph.textContent = "Bạn có thể quan tâm đến: "
    headSuggestion.appendChild(paragraph)

    const closeBtn = document.createElement("i")
    closeBtn.className = "fas fa-times"
    closeBtn.style.cursor = "pointer"
    closeBtn.addEventListener("click", function () {
      contentDiv.style.display = "none"
      openBtn.style.display = "inline-block"
    })
    closeBtn.id = "closeSuggestions" + Date.now()
    headSuggestion.appendChild(closeBtn)

    contentDiv.appendChild(headSuggestion)

    // Danh sách gợi ý
    const suggestionsList = document.createElement("ul")
    suggestionsList.className = "chatbot-suggestions"

    randomSuggestions.forEach((suggestion) => {
      const li = document.createElement("li")
      const button = document.createElement("button")
      button.className = "suggestion-btn"
      button.textContent = suggestion.charAt(0).toUpperCase() + suggestion.slice(1)
      li.appendChild(button)
      suggestionsList.appendChild(li)
    })

    contentDiv.appendChild(suggestionsList)

    // Nút mở lại suggestion
    const openBtn = document.createElement("button")
    openBtn.innerHTML = '<i class="fas fa-comment-dots"></i> Gợi ý'
    openBtn.className = "open-suggestion-btn"
    openBtn.style.display = "inline-block" // Mặc định hiện nút này
    openBtn.addEventListener("click", function () {
      contentDiv.style.display = "block"
      openBtn.style.display = "none"
    })
    openBtn.id = "openSuggestions" + Date.now()

    // Thêm thời gian
    const timeSpan = document.createElement("span")
    timeSpan.className = "message-time"
    timeSpan.textContent = getCurrentTime()

    messageDiv.appendChild(contentDiv)
    messageDiv.appendChild(openBtn)
    messageDiv.appendChild(timeSpan)

    chatbotMessages.appendChild(messageDiv)
    scrollToBottom()
  }

  // Function to show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement("div")
    typingDiv.className = "typing-indicator"
    typingDiv.id = "typing-indicator"

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span")
      typingDiv.appendChild(dot)
    }

    chatbotMessages.appendChild(typingDiv)
    scrollToBottom()
  }

  // Function to remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }

  // Function to get bot response based on user input
  function getBotResponse(userMessage) {
    // Chỉ tìm exact match (hoặc bạn có thể sửa lại cho React xử lý)
    const message = userMessage.toLowerCase()
    for (const key in knowledgeBase) {
      if (message === key) {
        return knowledgeBase[key]
      }
    }
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  // Function to get current time in HH:MM format
  function getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }

  // Function to scroll to the bottom of the chat
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  // Advanced features - Voice recognition (if supported by browser)
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    // Create voice button
    const voiceBtn = document.createElement("button")
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
    voiceBtn.className = "voice-btn"
    voiceBtn.style.backgroundColor = "#f5f5f5"
    voiceBtn.style.color = "#FFFFFF"
    voiceBtn.style.border = "none"
    voiceBtn.style.width = "40px"
    voiceBtn.style.height = "40px"
    voiceBtn.style.borderRadius = "50%"
    voiceBtn.style.cursor = "pointer"

    // Insert before send button
    const chatbotInput = document.querySelector(".chatbot-input")
    chatbotInput.insertBefore(voiceBtn, sendBtn)

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = "vi-VN"
    recognition.continuous = false

    voiceBtn.addEventListener("click", () => {
      recognition.start()
      voiceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
      voiceBtn.style.backgroundColor = "#ff4757"
      voiceBtn.style.color = "white"
    })

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      userInput.value = transcript
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
      voiceBtn.style.backgroundColor = "#f5f5f5"
      voiceBtn.style.color = "#004080"

      // Send the message after a short delay
      setTimeout(() => {
        sendMessage()
      }, 500)
    }

    recognition.onend = () => {
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
      voiceBtn.style.backgroundColor = "#f5f5f5"
      voiceBtn.style.color = "#004080"
    }

    recognition.onerror = () => {
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'
      voiceBtn.style.backgroundColor = "#f5f5f5"
      voiceBtn.style.color = "#004080"
    }
  }

  // Save chat history to localStorage
  function saveChatHistory() {
    const messages = chatbotMessages.innerHTML
    localStorage.setItem("chatHistory", messages)
  }

  // Load chat history from localStorage
  function loadChatHistory() {
    const history = localStorage.getItem("chatHistory")
    if (history) {
      chatbotMessages.innerHTML = history
    }
  }

  // Save chat history when window is closed
  window.addEventListener("beforeunload", saveChatHistory)

  // Load chat history when page is loaded
  // loadChatHistory()

  // Expose functions for the training interface
  window.chatbotAPI = {
    addIntent: (intent, phrases, response) => {
      knowledgeBase[intent] = Array.isArray(response) ? response : [response]
      saveChatbotData()
      return true
    },

    removeIntent: (intent) => {
      if (knowledgeBase[intent]) {
        delete knowledgeBase[intent]
        saveChatbotData()
        return true
      }
      return false
    },

    updateIntent: (intent, phrases, response) => {
      if (knowledgeBase[intent]) {
        knowledgeBase[intent] = Array.isArray(response) ? response : [response]
        saveChatbotData()
        return true
      }
      return false
    },

    getIntents: () =>
      Object.keys(knowledgeBase).map((intent) => ({
        name: intent,
        response: knowledgeBase[intent],
      })),

    setDefaultResponses: (responses) => {
      defaultResponses = responses
      saveChatbotData()
    },

    setThreshold: (threshold) => {
      chatbotSettings.threshold = threshold
      saveChatbotData()
    },

    trainModel: () => {
      // Simple TF-IDF based model training
      const model = {}

      // For each intent, create a vector of token weights
      for (const intent in knowledgeBase) {
        model[intent] = {}

        // Use the intent name itself as training data
        const intentTokens = tokenize(intent)
        for (const token of intentTokens) {
          model[intent][token] = (model[intent][token] || 0) + 3 // Higher weight for intent tokens
        }
      }

      chatbotSettings.model = model
      saveChatbotData()
      return true
    },

    exportData: () => ({
      knowledgeBase: knowledgeBase,
      defaultResponses: defaultResponses,
      settings: chatbotSettings,
    }),

    importData: (data) => {
      if (data.knowledgeBase) knowledgeBase = data.knowledgeBase
      if (data.defaultResponses) defaultResponses = data.defaultResponses
      if (data.settings) chatbotSettings = data.settings
      saveChatbotData()
      return true
    },
  }
})
document.getElementById('closeSuggestions').addEventListener('click', function () {
  document.getElementById('messageContent').style.display = 'none';
  document.getElementById('openSuggestions').style.display = 'inline-block';
});

document.getElementById('openSuggestions').addEventListener('click', function () {
  document.getElementById('messageContent').style.display = 'block';
  document.getElementById('openSuggestions').style.display = 'none';
});