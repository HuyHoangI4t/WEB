document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const chatContainer = document.querySelector('.chat-container');
    const toggleBtn = document.getElementById('toggleBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Toggle chat window
    toggleBtn.addEventListener('click', function () {
        chatContainer.classList.add('active');
        toggleBtn.classList.add('hidden');
        scrollToBottom();
    });

    // Minimize chat window
    minimizeBtn.addEventListener('click', function () {
        chatContainer.classList.remove('active');
        toggleBtn.classList.remove('hidden');
    });

    // Send message on button click
    sendBtn.addEventListener('click', function () {
        sendMessage();
    });

    // Send message on Enter key
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to send user message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message to chat
            addMessage(message, 'user');
            userInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            // Process the message and get bot response after a delay
            setTimeout(() => {
                removeTypingIndicator();
                const botResponse = getBotResponse(message);
                addMessage(botResponse.text, 'bot');

                // Add suggestion chips if available
                if (botResponse.suggestions && botResponse.suggestions.length > 0) {
                    addSuggestions(botResponse.suggestions);
                }
            }, 1000);
        }
    }

    // Function to add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender + '-message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = text;

        messageContent.appendChild(messageParagraph);
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Function to add suggestion chips
    function addSuggestions(suggestions) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const suggestionChips = document.createElement('div');
        suggestionChips.classList.add('suggestion-chips');

        suggestions.forEach(suggestion => {
            const chip = document.createElement('button');
            chip.classList.add('suggestion-chip');
            chip.textContent = suggestion;
            chip.addEventListener('click', function () {
                sendSuggestion(suggestion);
            });
            suggestionChips.appendChild(chip);
        });

        messageContent.appendChild(suggestionChips);
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-indicator-container');

        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingIndicator.appendChild(dot);
        }

        typingDiv.appendChild(typingIndicator);
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator-container');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Function to scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle suggestion clicks
    function sendSuggestion(suggestion) {
        addMessage(suggestion, 'user');

        // Show typing indicator
        showTypingIndicator();

        // Process the suggestion and get bot response after a delay
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(suggestion);
            addMessage(botResponse.text, 'bot');

            // Add suggestion chips if available
            if (botResponse.suggestions && botResponse.suggestions.length > 0) {
                addSuggestions(botResponse.suggestions);
            }
        }, 1000);
    }
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    // Function to get bot response based on user input
    function getBotResponse(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();

        // Define responses for different queries
        if (lowerMessage.includes('xin chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return {
                text: 'Xin chào! Tôi có thể giúp gì cho bạn về Khoa Khoa học Tự nhiên và Công nghệ?',
                suggestions: ['Thông tin tuyển sinh', 'Chương trình đào tạo', 'Cơ hội việc làm', 'Thông tin liên hệ']
            };
        }
        else if (lowerMessage.includes('tuyển sinh') || lowerMessage.includes('đăng ký') || lowerMessage.includes('nhập học')) {
            return {
                text: 'Thông tin tuyển sinh ngành CNTT năm 2023:\n- Mã ngành: 7480201\n- Chỉ tiêu: 120\n- Tổ hợp xét tuyển: A00, A01, D01, C01\n- Điểm chuẩn năm 2022: 19.5 điểm\n\nCác phương thức xét tuyển:\n1. Xét tuyển dựa trên kết quả kỳ thi tốt nghiệp THPT\n2. Xét tuyển dựa trên học bạ THPT\n3. Xét tuyển thẳng theo quy định của Bộ GD&ĐT',
                suggestions: ['Học phí', 'Hồ sơ nhập học', 'Học bổng']
            };
        }
        else if (lowerMessage.includes('học phí')) {
            return {
                text: 'Học phí ngành CNTT năm học 2023-2024:\n- Sinh viên chính quy: 15.000.000 đồng/năm\n- Có chính sách miễn giảm học phí cho sinh viên thuộc diện chính sách, sinh viên có hoàn cảnh khó khăn và sinh viên đạt thành tích cao trong học tập.',
                suggestions: ['Học bổng', 'Chương trình đào tạo', 'Thông tin liên hệ']
            };
        }
        else if (lowerMessage.includes('học bổng')) {
            return {
                text: 'Các loại học bổng dành cho sinh viên ngành CNTT:\n1. Học bổng khuyến khích học tập (từ 3-5 triệu đồng/học kỳ)\n2. Học bổng tài trợ từ doanh nghiệp (FPT, Viettel, VNPT...)\n3. Học bổng dành cho sinh viên nghèo vượt khó\n4. Học bổng dành cho tân sinh viên có điểm đầu vào cao',
                suggestions: ['Học phí', 'Chương trình đào tạo', 'Cơ hội việc làm']
            };
        }
        else if (lowerMessage.includes('chương trình') || lowerMessage.includes('đào tạo') || lowerMessage.includes('học phần')) {
            return {
                text: 'Chương trình đào tạo ngành CNTT:\n- Thời gian đào tạo: 4 năm\n- Tổng số tín chỉ: 150\n- Cấu trúc chương trình:\n  + Giáo dục đại cương: 45 tín chỉ\n  + Cơ sở ngành: 35 tín chỉ\n  + Chuyên ngành: 55 tín chỉ\n  + Thực tập và khóa luận tốt nghiệp: 15 tín chỉ\n\nCác học phần chính: Lập trình, Cấu trúc dữ liệu và giải thuật, Cơ sở dữ liệu, Mạng máy tính, Trí tuệ nhân tạo, An toàn thông tin...',
                suggestions: ['Cơ hội việc làm', 'Đội ngũ giảng viên', 'Cơ sở vật chất']
            };
        }
        else if (lowerMessage.includes('việc làm') || lowerMessage.includes('nghề nghiệp') || lowerMessage.includes('công việc')) {
            return {
                text: 'Cơ hội việc làm sau khi tốt nghiệp ngành CNTT:\n- Lập trình viên (Frontend, Backend, Mobile)\n- Chuyên viên quản trị cơ sở dữ liệu\n- Kỹ sư mạng và bảo mật\n- Quản lý dự án CNTT\n- Chuyên gia AI/Machine Learning\n- Kiểm thử phần mềm\n\nThống kê việc làm:\n- 95% sinh viên có việc làm sau 1 năm tốt nghiệp\n- 30% sinh viên làm việc tại các công ty nước ngoài\n- 15% sinh viên tự khởi nghiệp',
                suggestions: ['Doanh nghiệp hợp tác', 'Mức lương', 'Chương trình đào tạo']
            };
        }
        else if (lowerMessage.includes('giảng viên') || lowerMessage.includes('giáo viên') || lowerMessage.includes('thầy cô')) {
            return {
                text: 'Đội ngũ giảng viên ngành CNTT:\n- Tổng số: 25 giảng viên\n- Trình độ: 3 PGS.TS, 10 Tiến sĩ, 12 Thạc sĩ\n- Đều được đào tạo từ các trường đại học uy tín trong và ngoài nước\n- Có kinh nghiệm giảng dạy và nghiên cứu trong các lĩnh vực: Khoa học máy tính, Hệ thống thông tin, Mạng máy tính, Trí tuệ nhân tạo...',
                suggestions: ['Nghiên cứu khoa học', 'Cơ sở vật chất', 'Chương trình đào tạo']
            };
        }
        else if (lowerMessage.includes('cơ sở') || lowerMessage.includes('vật chất') || lowerMessage.includes('phòng lab')) {
            return {
                text: 'Cơ sở vật chất phục vụ đào tạo ngành CNTT:\n- 5 phòng thực hành máy tính với hơn 200 máy cấu hình cao\n- Phòng Lab IoT với các thiết bị hiện đại\n- Phòng Lab AI với máy chủ GPU mạnh mẽ\n- Thư viện chuyên ngành với hàng nghìn đầu sách, tạp chí CNTT\n- Hệ thống mạng internet tốc độ cao\n- Phòng học thông minh với trang thiết bị hiện đại',
                suggestions: ['Đội ngũ giảng viên', 'Nghiên cứu khoa học', 'Học bổng']
            };
        }
        else if (lowerMessage.includes('nghiên cứu') || lowerMessage.includes('đề tài') || lowerMessage.includes('khoa học')) {
            return {
                text: 'Hoạt động nghiên cứu khoa học của ngành CNTT tập trung vào các lĩnh vực:\n- Trí tuệ nhân tạo và học máy\n- Internet of Things và điện toán đám mây\n- An toàn thông tin và bảo mật mạng\n- Phát triển phần mềm và ứng dụng di động\n- Xử lý ảnh và thị giác máy tính\n- Khai phá dữ liệu và dữ liệu lớn\n\nSinh viên được khuyến khích tham gia các nhóm nghiên cứu và các đề tài nghiên cứu khoa học sinh viên.',
                suggestions: ['Đội ngũ giảng viên', 'Hợp tác quốc tế', 'Cơ sở vật chất']
            };
        }
        else if (lowerMessage.includes('liên hệ') || lowerMessage.includes('địa chỉ') || lowerMessage.includes('email')) {
            return {
                text: 'Thông tin liên hệ Khoa Khoa học Tự nhiên và Công nghệ:\n- Địa chỉ: Phòng A1.01, Trường Đại học Tây Nguyên, 567 Lê Duẩn, TP. Buôn Ma Thuột, Đắk Lắk\n- Điện thoại: (0262) 3825 185\n- Email: khoakhtn@ttn.edu.vn\n- Website: khtn.ttn.edu.vn\n\nThời gian làm việc: Thứ 2 - Thứ 6 (7:30 - 11:30 và 13:30 - 17:00)',
                suggestions: ['Tư vấn trực tiếp', 'Fanpage Facebook', 'Thông tin tuyển sinh']
            };
        }
        else {
            return {
                text: 'Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về các chủ đề sau hoặc đặt câu hỏi rõ ràng hơn:',
                suggestions: ['Thông tin tuyển sinh', 'Chương trình đào tạo', 'Cơ hội việc làm', 'Học phí và học bổng', 'Thông tin liên hệ']
            };
        }
    }

    // Expose sendSuggestion to global scope for the suggestion chips
    window.sendSuggestion = sendSuggestion;
});