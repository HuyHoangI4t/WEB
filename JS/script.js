// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && !event.target.closest('.main-menu')) {
            if (mainMenu && mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainMenu && mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Chatbot functionality for index.html
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const zoomChatbot = document.getElementById('zoomChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    
    if (chatbotButton && chatbotContainer) {
        // Toggle chatbot
        chatbotButton.addEventListener('click', function() {
            chatbotContainer.style.display = chatbotContainer.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close chatbot
        if (closeChatbot) {
            closeChatbot.addEventListener('click', function() {
                chatbotContainer.style.display = 'none';
            });
        }
        
        // Zoom chatbot (redirect to chat.html)
        if (zoomChatbot) {
            zoomChatbot.addEventListener('click', function() {
                window.location.href = 'Page/chat.html';
            });
        }
        
        // Send message function
        function sendUserMessage() {
            const message = userInput.value.trim();
            if (message === '') return;
            
            // Add user message to chat
            addMessage(message, 'user', chatbotMessages);
            
            // Clear input
            userInput.value = '';
            
            // Get bot response after a short delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot', chatbotMessages);
            }, 600);
        }
        
        // Send message on button click
        if (sendMessage) {
            sendMessage.addEventListener('click', sendUserMessage);
        }
        
        // Send message on Enter key
        if (userInput) {
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendUserMessage();
                }
            });
        }
    }
    
    // Chatbot functionality for chat.html
    const fullpageUserInput = document.getElementById('fullpageUserInput');
    const fullpageSendMessage = document.getElementById('fullpageSendMessage');
    const fullpageChatMessages = document.getElementById('fullpageChatMessages');
    const topicButtons = document.querySelectorAll('.topic-btn');
    
    if (fullpageUserInput && fullpageSendMessage && fullpageChatMessages) {
        // Send message function for fullpage chat
        function sendFullpageUserMessage() {
            const message = fullpageUserInput.value.trim();
            if (message === '') return;
            
            // Add user message to chat
            addMessage(message, 'user', fullpageChatMessages);
            
            // Clear input
            fullpageUserInput.value = '';
            
            // Get bot response after a short delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot', fullpageChatMessages);
            }, 600);
        }
        
        // Send message on button click
        fullpageSendMessage.addEventListener('click', sendFullpageUserMessage);
        
        // Send message on Enter key
        fullpageUserInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendFullpageUserMessage();
            }
        });
        
        // Topic buttons
        if (topicButtons.length > 0) {
            topicButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const topic = this.getAttribute('data-topic');
                    if (topic) {
                        fullpageUserInput.value = topic;
                        sendFullpageUserMessage();
                    }
                });
            });
        }
    }
    
    // Add message to chat
    function addMessage(message, sender, chatContainer) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        if (sender === 'user') {
            messageElement.classList.add('user-message');
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
        } else {
            messageElement.classList.add('bot-message');
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/12/logo-truong-dai-hoc-tay-nguyen-inkythuatso-01-27-16-02-29.jpg" alt="Bot Avatar">
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            `;
        }
        
        chatContainer.appendChild(messageElement);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Simple bot responses based on keywords
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Common questions and responses for IT department
        if (message.includes('xin chào') || message.includes('hello') || message.includes('hi')) {
            return 'Xin chào! Tôi có thể giúp gì cho bạn về Khoa Công nghệ thông tin?';
        }
        else if (message.includes('tuyển sinh') || message.includes('đăng ký') || message.includes('nhập học')) {
            return 'Khoa CNTT tuyển sinh hàng năm thông qua các phương thức: xét tuyển điểm thi THPT Quốc gia, xét tuyển học bạ và xét tuyển thẳng đối với học sinh giỏi. Điểm chuẩn điểm thi THPT năm 2024 là 16.85 điểm và 24.0 điểm chuẩn cho xét tuyển học bạ. Bạn có thể tìm hiểu thêm tại website <a href="https://tuyensinh.ttn.edu.vn" target="_blank" style="color: #0078D7; text-decoration: underline;">tuyensinh.ttn.edu.vn</a>.';
        }
        else if (message.includes('chương trình đào tạo') || message.includes('ngành học') || message.includes('môn học')) {
            return 'Khoa CNTT đào tạo các ngành: Công nghệ thông tin, Kỹ thuật phần mềm, Hệ thống thông tin và Trí tuệ nhân tạo. Chương trình đào tạo được thiết kế theo chuẩn ACM/IEEE với 130-145 tín chỉ, bao gồm các môn cơ sở ngành và chuyên ngành, thực hành, thực tập và khóa luận tốt nghiệp.';
        }
        else if (message.includes('học phí') || message.includes('chi phí')) {
            return 'Học phí ngành CNTT năm học 2023-2024 là 300.000đ/tín chỉ. Sinh viên học trung bình 15-18 tín chỉ mỗi học kỳ, tương đương khoảng 4.5-5.4 triệu đồng/học kỳ. Ngoài ra còn có các khoản phí khác như bảo hiểm y tế, phí ký túc xá (nếu ở).';
        }
        else if (message.includes('cơ hội việc làm') || message.includes('nghề nghiệp') || message.includes('tương lai')) {
            return 'Sinh viên tốt nghiệp từ Khoa CNTT có nhiều cơ hội việc làm tại các công ty phần mềm, công ty công nghệ, ngân hàng, và các tổ chức có bộ phận IT. Các vị trí phổ biến bao gồm: Lập trình viên, Kỹ sư phần mềm, Chuyên viên phân tích dữ liệu, Quản trị hệ thống, Chuyên gia bảo mật, và Quản lý dự án CNTT. Tỷ lệ sinh viên có việc làm sau 1 năm tốt nghiệp đạt trên 90%.';
        }
        else if (message.includes('học bổng') || message.includes('hỗ trợ tài chính')) {
            return 'Khoa CNTT có nhiều chương trình học bổng cho sinh viên: Học bổng khuyến khích học tập (từ 3-5 triệu đồng/học kỳ), Học bổng doanh nghiệp từ các đối tác như FPT, VNPT, Viettel, và Học bổng nghiên cứu khoa học. Ngoài ra còn có chính sách miễn giảm học phí theo quy định của Nhà nước.';
        }
        else if (message.includes('thực tập') || message.includes('kinh nghiệm')) {
            return 'Sinh viên Khoa CNTT được thực tập tại các công ty công nghệ hàng đầu như FPT Software, VNPT, Viettel, TMA Solutions... thông qua các chương trình hợp tác của Khoa. Thời gian thực tập thường kéo dài 2-3 tháng vào học kỳ cuối của năm thứ 3 hoặc đầu năm thứ 4. Nhiều sinh viên được nhận vào làm việc chính thức sau khi hoàn thành thực tập.';
        }
        else if (message.includes('nghiên cứu') || message.includes('đề tài') || message.includes('dự án')) {
            return 'Khoa CNTT có các nhóm nghiên cứu mạnh về Trí tuệ nhân tạo, Phân tích dữ liệu lớn, IoT, An toàn thông tin và Ứng dụng CNTT trong nông nghiệp. Sinh viên có thể tham gia nghiên cứu từ năm thứ 2, được hướng dẫn bởi các giảng viên có chuyên môn cao và có cơ hội công bố kết quả nghiên cứu tại các hội thảo khoa học.';
        }
        else if (message.includes('giảng viên') || message.includes('giáo sư') || message.includes('tiến sĩ')) {
            return 'Khoa CNTT có đội ngũ giảng viên chất lượng cao với 5 Phó Giáo sư, 15 Tiến sĩ và 25 Thạc sĩ. Nhiều giảng viên được đào tạo tại các trường đại học hàng đầu trong và ngoài nước như Đại học Quốc gia Hà Nội, ĐH Bách Khoa Hà Nội, ĐH Công nghệ Sydney (Úc), ĐH Kyushu (Nhật Bản)...';
        }
        else if (message.includes('cơ sở vật chất') || message.includes('phòng máy') || message.includes('thiết bị')) {
            return 'Khoa CNTT có cơ sở vật chất hiện đại với 10 phòng máy tính được trang bị các máy tính cấu hình cao, 3 phòng thí nghiệm chuyên sâu (AI Lab, Network Lab, IoT Lab), hệ thống máy chủ mạnh và đường truyền internet tốc độ cao. Sinh viên được sử dụng các phần mềm bản quyền và công cụ phát triển chuyên nghiệp trong quá trình học tập.';
        }
        else if (message.includes('liên hệ') || message.includes('địa chỉ') || message.includes('số điện thoại')) {
            return 'Khoa Công nghệ thông tin - Trường Đại học Tây Nguyên\nĐịa chỉ: 567 Lê Duẩn, TP. Buôn Ma Thuột, Đắk Lắk\nĐiện thoại: (0262) 3825 185 (ext: 107)\nEmail: cntt@ttn.edu.vn\nWebsite: cntt.ttn.edu.vn';
        }
        else if (message.includes('cảm ơn') || message.includes('thank')) {
            return 'Rất vui được giúp đỡ bạn! Nếu có thắc mắc gì khác về Khoa CNTT, đừng ngần ngại hỏi tôi nhé.';
        }
        else {
            return 'Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về thông tin tuyển sinh, chương trình đào tạo, cơ hội việc làm, học bổng, thực tập, nghiên cứu khoa học hoặc cơ sở vật chất của Khoa CNTT.';
        }
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                contactForm.reset();
            } else {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        });
    }
    
    // Add active class to current menu item based on scroll position
    function setActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.main-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.main-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveMenu);
    
    // Initialize active menu on page load
    setActiveMenu();
});

// Animation on scroll
window.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.program-card, .news-card, .lab-card, .about-image, .about-text, .research-image, .research-text');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Add initial animation styles
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.program-card, .news-card, .lab-card, .about-image, .about-text, .research-image, .research-text');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation check
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});