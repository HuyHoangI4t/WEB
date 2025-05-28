import { findAnswer } from "./data.js";
localStorage.clear()

// Định dạng giờ phút
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Xử lý markdown đơn giản
function parseMarkdown(text) {
  let html = text
    .replace(/(?:\r\n|\r|\n)/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^- (.*)$/gm, '<li>$1</li>');
  if (html.includes("<li>")) html = "<ul>" + html + "</ul>";
  return html;
}

// Lưu lịch sử chat vào localStorage
function saveHistory(msg, sender) {
  let history = JSON.parse(localStorage.getItem("chatbot_history") || "[]");
  history.push({
    sender,
    msg,
    time: new Date().toISOString()
  });
  localStorage.setItem("chatbot_history", JSON.stringify(history));
}

// Lấy khung chat
function ensureChatbotBox() {
  let box = document.querySelector(".chatbot-box");
  if (box) return box;
  const container = document.querySelector(".chatbot-container");
  if (!container) return null;
  return document.querySelector(".chatbot-box");
}

// Thêm tin nhắn vào khung chat
function addMessage(text, sender, time = new Date(), save = true) {
  const box = ensureChatbotBox();
  if (!box) return;
  const messages = box.querySelector(".chatbot-messages");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}-message`;
  let avatar = sender === "bot"
    ? `<img src="/img/logo.png" alt="bot" class="chatbot-avatar" style="width:30px;height:30px;margin-right:6px;">`
    : `<i class="fas fa-user-circle" style="font-size:28px;color:#0072ff;margin-left:6px;"></i>`;

  let btnStyle = `
    border:none;
    background:transparent;
    border-radius:50%;
    min-width:25px;
    min-height:25px;
    height:25px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    color:#666;
    cursor:pointer;
    transition:background 0.18s;
  `;
  let copyBtn = `<button class="copy-btn" title="Copy" style="${btnStyle}" onmouseover="this.style.background='#f0f2f6';" onmouseout="this.style.background='transparent';"><i class="fas fa-copy"></i></button>`;
  let resendBtn = sender === "user"
    ? `<button class="resend-btn" title="Gửi lại" style="${btnStyle}" onmouseover="this.style.background='#f0f2f6';" onmouseout="this.style.background='transparent';"><i class="fas fa-redo"></i></button>`
    : "";
  let reactBtn = sender === "bot"
    ? `<span class="react-btns">
        <button class="react-like" title="Hữu ích" style="${btnStyle}" onmouseover="this.style.background='#f0f2f6';" onmouseout="this.style.background='transparent';"><i class="fas fa-thumbs-up"></i></button>
        <button class="react-dislike" title="Chưa tốt" style="${btnStyle}" onmouseover="this.style.background='#f0f2f6';" onmouseout="this.style.background='transparent';"><i class="fas fa-thumbs-down"></i></button>
      </span>`
    : "";
  let showTime = true;
  const lastMsg = messages.lastElementChild;
  if (lastMsg && lastMsg.dataset && lastMsg.dataset.time) {
    const lastTime = lastMsg.dataset.time;
    if (lastTime === formatTime(time)) showTime = false;
  }
  let timeDiv = showTime
    ? `<div style="text-align:center;margin:8px 0 2px 0;font-size:12px;color:#888;width:100%">${formatTime(time)}</div>`
    : "";
  msgDiv.dataset.time = formatTime(time);

  let botstyle = `
    display:inline-block;
    padding:10px 18px;
    max-width:80%;
    word-break:break-word;
    font-size:15px;
    background:${sender === "user" ? "#00bfff" : "#fff"};
    color:${sender === "user" ? "#fff" : "#031B88"};
    box-shadow:0 1px 2px rgba(0,0,0,0.08);
    margin-bottom:2px;
    margin-top:2px;
    text-align:left;
  `;
  let userstyle = `
    display:inline-block;
    padding:10px 18px;
    border-radius:16px;
    word-break:break-word;
    font-size:15px;
    background:${sender === "user" ? "#00bfff" : "#fff"};
    color:${sender === "user" ? "#fff" : "#031B88"};
    box-shadow:0 1px 2px rgba(0,0,0,0.08);
    margin-bottom:2px;
    margin-top:2px;
    text-align:left;
  `;
  if (sender === "user") {
    msgDiv.innerHTML = `
      ${timeDiv}
      <div style="display:flex;align-items:center;justify-content:flex-end;">
        <div style="flex:1;text-align:right;display:flex;flex-direction:column;align-items:flex-end;">
          <div class="message-content" style="${userstyle}">${parseMarkdown(text)}</div>
          <div class="message-time" style="margin-right:1px;">${copyBtn} ${resendBtn}</div>
        </div>
        ${avatar}
      </div>
    `;
  } else {
    msgDiv.innerHTML = `
      ${timeDiv}
      <div style="display:flex;align-items:flex-end;">
        ${avatar}
        <div style="flex:1;display:flex;flex-direction:column;align-items:flex-start;">
          <div class="message-content" style="${botstyle}">${parseMarkdown(text)}</div>
          <div class="message-time" style="margin-left:1px;">${copyBtn} ${resendBtn} ${reactBtn}</div>
        </div>
      </div>
    `;
  }
  messages.appendChild(msgDiv);
  scrollToBottom(messages);

  // Sự kiện copy nội dung
  msgDiv.querySelectorAll(".copy-btn").forEach(btn => {
    btn.onclick = () => {
      const content = msgDiv.querySelector(".message-content").innerText;
      navigator.clipboard.writeText(content);
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => (btn.innerHTML = '<i class="fas fa-copy"></i>'), 1000);
    };
  });
  // Sự kiện gửi lại
  msgDiv.querySelectorAll(".resend-btn").forEach(btn => {
    btn.onclick = () => {
      const content = msgDiv.querySelector(".message-content").innerText;
      addMessage(content, "user");
      botReply(content);
    };
  });
  // Sự kiện like/dislike
  msgDiv.querySelectorAll(".react-like, .react-dislike").forEach(btn => {
    btn.onclick = () => {
      if (btn.classList.contains("react-like")) {
        btn.style.color = "#2ecc40";
        btn.disabled = true;
        const other = msgDiv.querySelector(".react-dislike");
        if (other) {
          other.disabled = true;
          other.style.pointerEvents = "none";
          other.style.opacity = "0.5";
        }
      } else {
        btn.style.color = "#e74c3c";
        btn.disabled = true;
        const other = msgDiv.querySelector(".react-like");
        if (other) {
          other.disabled = true;
          other.style.pointerEvents = "none";
          other.style.opacity = "0.5";
        }
      }
    };
  });
  if (save) saveHistory(text, sender);
}

// Hiệu ứng typing
function showTyping() {
  const box = ensureChatbotBox();
  if (!box) return null;
  const messages = box.querySelector(".chatbot-messages");
  const typing = document.createElement("div");
  typing.className = "typing-indicator";
  typing.innerHTML = `<span></span><span></span><span></span>`;
  messages.appendChild(typing);
  scrollToBottom(messages);
  return typing;
}

// Cuộn xuống cuối khung chat
function scrollToBottom(messages) {
  setTimeout(() => {
    messages.scrollTop = messages.scrollHeight;
  }, 100);
}

// Trả lời tự động
async function botReply(msg) {
  const typing = showTyping();
  const answer = findAnswer(msg);
  setTimeout(() => {
    if (typing) typing.remove();
    addMessage(answer, "bot");
  }, 600);
}

// Xử lý gửi tin nhắn người dùng
function handleSend() {
  const box = ensureChatbotBox();
  if (!box) return;
  const input = box.querySelector("#user-input");
  const val = input.value.trim();
  if (!val) return;
  addMessage(val, "user");
  input.value = "";
  botReply(val);
}

// Sự kiện mở bot
function setupChatbotToggle() {
  const toggle = document.querySelector(".chatbot-toggle");
  if (!toggle) return;
  toggle.onclick = () => {
    const box = ensureChatbotBox();
    if (!box) return;
    box.style.display = "flex";
    box.classList.add("active");
    const noti = document.querySelector(".chatbot-notification");
    if (noti) noti.style.display = "none";
    setTimeout(() => {
      const messages = box.querySelector(".chatbot-messages");
      if (messages && messages.children.length === 0) {
        renderHistory();
      }
      const input = box.querySelector("#user-input");
      if (input) input.focus();
    }, 200);
  };
}

// Sự kiện đóng bot
function setupChatbotClose() {
  const box = ensureChatbotBox();
  if (!box) return;
  const closeBtn = box.querySelector(".chatbot-close");
  if (closeBtn) {
    closeBtn.onclick = () => {
      box.classList.remove("active");
      box.style.display = "none";
    };
  }
}

// Sự kiện gửi tin nhắn (nút gửi và Enter)
function setupSendEvents() {
  const box = ensureChatbotBox();
  if (!box) return;
  const input = box.querySelector("#user-input");
  const sendBtn = box.querySelector("#send-btn");
  if (sendBtn) sendBtn.onclick = handleSend;
  if (input) {
    input.onkeypress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    };
  }
}

// Hiển thị lịch sử chat khi mở lại bot
function renderHistory() {
  const box = ensureChatbotBox();
  if (!box) return;
  const messages = box.querySelector(".chatbot-messages");
  messages.innerHTML = "";
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("chatbot_history") || "[]");
  } catch {}
  if (history.length === 0) {
    let btnStyle = `
      style="
        border:none;
        background:transparent;
        border-radius:50%;
        width:25px;
        height:25px;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        font-size:12px;
        color:#666;
        cursor:pointer;
        transition:background 0.18s;
      "
      onmouseover="this.style.background='#f0f2f6';"
      onmouseout="this.style.background='transparent';"
    `;
    messages.innerHTML = `
      <div class="message bot-message" data-time="${formatTime(new Date())}">
        <div style="text-align:center;margin:8px 0 2px 0;font-size:12px;color:#888;width:100%">${formatTime(new Date())}</div>
        <div style="display:flex;align-items:flex-end;">
          <img src="/img/logo.png" alt="bot" class="chatbot-avatar" style="width:30px;height:30px;margin-right:6px;">
          <div style="flex:1">
            <div class="message-content" id="welcome-message" style="display:inline-block;padding:10px 18px;max-width:80%;word-break:break-word;font-size:15px;background:#fff;color:#031B88;box-shadow:0 1px 2px rgba(0,0,0,0.08);margin-bottom:2px;margin-top:2px;text-align:left;">
              Xin chào! Tôi là trợ lý ảo của Bộ môn CNTT - ĐH Tây Nguyên. Tôi có thể giúp gì cho bạn?
            </div>
            <div class="message-time">
              <button class="copy-btn" title="Copy" ${btnStyle}><i class="fas fa-copy"></i></button>
              <span class="react-btns">
                <button class="react-like" title="Hữu ích" ${btnStyle}><i class="fas fa-thumbs-up"></i></button>
                <button class="react-dislike" title="Chưa tốt" ${btnStyle}><i class="fas fa-thumbs-down"></i></button>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    messages.querySelectorAll(".copy-btn").forEach(btn => {
      btn.onclick = () => {
        const content = messages.querySelector("#welcome-message").innerText;
        navigator.clipboard.writeText(content);
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => (btn.innerHTML = '<i class="fas fa-copy"></i>'), 1000);
      };
    });
    messages.querySelectorAll(".react-like").forEach(btn => {
      btn.onclick = () => {
        btn.style.color = "#2ecc40";
        btn.disabled = true;
      };
    });
    messages.querySelectorAll(".react-dislike").forEach(btn => {
      btn.onclick = () => {
        btn.style.color = "#e74c3c";
        btn.disabled = true;
      };
    });
    return;
  }
  history.forEach(item => {
    addMessage(item.msg, item.sender, new Date(item.time), false);
  });
}

// Khởi tạo bot và các sự kiện
function setupChatbot() {
  setupChatbotToggle();
  setupChatbotClose();
  setupSendEvents();
}

// Đảm bảo bot hoạt động khi DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setupChatbot();
  const observer = new MutationObserver(() => {
    setupChatbot();
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
