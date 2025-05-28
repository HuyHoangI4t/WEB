// Danh sách từ khóa và câu trả lời cho chatbot
export const knowledgeBase = [
  {
    keywords: ["giới thiệu", "bộ môn", "cntt", "công nghệ thông tin", "giới thiệu cntt", "giới thiệu bộ môn cntt"],
    answer: "Bộ môn Công nghệ Thông tin thuộc Khoa Khoa học Tự nhiên và Công nghệ, Trường Đại học Tây Nguyên."
  },
  {
    keywords: ["chương trình", "đào tạo", "ngành", "chuyên ngành", "hệ thống", "mạng", "phần mềm", "chuyên ngành cntt", "chuyên ngành công nghệ thông tin", "đào tạo cntt", "đào tạo công nghệ thông tin"],
    answer: "Bộ môn CNTT đào tạo 2 chuyên ngành: Hệ thống và mạng, Công nghệ phần mềm."
  },
  {
    keywords: ["liên hệ", "địa chỉ", "email", "số điện thoại", "contact", "phone", "hotline"],
    answer: "Địa chỉ: Phòng 7.4.25, tầng 4 Nhà số 7, 567 Lê Duẩn, TP. Buôn Ma Thuột. Điện thoại: (0262) 3825 185. Email: khoakhtncn@ttn.edu.vn"
  },
  {
    keywords: ["hoạt động", "ngoại khóa", "hợp tác", "tma", "đối ngoại", "hội thảo", "hợp tác doanh nghiệp", "hoạt động ngoại khóa"],
    answer: "Bộ môn hợp tác với doanh nghiệp như TMA Solutions, tổ chức hội thảo, hoạt động ngoại khóa cho sinh viên."
  },
  {
    keywords: ["giảng viên", "thầy cô", "đội ngũ", "giáo viên", "giảng viên cntt", "giảng viên công nghệ thông tin"],
    answer: "Đội ngũ gồm 1 Phó Giáo sư, 3 Tiến sĩ, 8 Thạc sĩ và các nghiên cứu sinh."
  },
  {
    keywords: ["học phí", "học phí cntt", "học phí ngành cntt", "học phí công nghệ thông tin", "học phí bao nhiêu"],
    answer: "Học phí ngành CNTT: 18-20 triệu đồng/năm."
  },
  {
    keywords: ["cơ hội việc làm", "việc làm", "tốt nghiệp", "làm gì", "công việc", "cơ hội nghề nghiệp", "ra trường làm gì"],
    answer: "Sinh viên tốt nghiệp CNTT có thể làm lập trình viên, kỹ sư phần mềm, quản trị hệ thống, chuyên viên dữ liệu, an toàn thông tin."
  },
  {
    keywords: ["cơ sở vật chất", "phòng máy", "lab", "thư viện", "ký túc xá", "phòng học", "phòng thực hành"],
    answer: "Có 10 phòng máy tính, phòng lab IoT, AI, VR/AR, thư viện điện tử, ký túc xá."
  },
  {
    keywords: ["tin tức", "news", "tin mới", "tin tức cntt", "tin tức trường"],
    answer: `<a href="https://www.ttn.edu.vn/index.php/mthongbao/tintuc" target="_blank">https://www.ttn.edu.vn/index.php/mthongbao/tintuc</a> (Trang tổng hợp tin tức mới nhất của trường và bộ môn)`
  },
  {
    keywords: ["thông báo", "announcement", "thông báo mới", "thông báo trường"],
    answer: `<a href="https://www.ttn.edu.vn/index.php/mthongbao/thongbao" target="_blank">https://www.ttn.edu.vn/index.php/mthongbao/thongbao</a> (Trang thông báo chính thức của trường)`
  },
  {
    keywords: ["tiện ích", "tiện ích cntt", "tiện ích trường"],
    answer: "Các tiện ích: Lịch thi, Kết quả học tập, Thời khoá biểu, tra cứu điểm, xem điểm, v.v. (Bạn có thể hỏi từng tiện ích cụ thể để nhận link trực tiếp)"
  },
  {
    keywords: ["lịch thi"],
    answer: `<a href="http://ttn.edu.vn/index.php/mthongbao/lichthi" target="_blank">Lịch thi</a> (Tra cứu lịch thi các môn học, kỳ thi tại trường Đại học Tây Nguyên)`
  },
  {
    keywords: ["kết quả học tập", "xem điểm", "tra cứu điểm"],
    answer: `<a href="https://www.ttn.edu.vn/?option=com_tnu&view=kqchinhquy" target="_blank">Kết quả học tập</a> (Xem điểm, kết quả học tập, bảng điểm cá nhân)`
  },
  {
    keywords: ["thời khoá biểu", "thời khóa biểu", "tkb"],
    answer: `<a href="https://www.ttn.edu.vn/index.php/component/tnu/?view=sinhvien" target="_blank">Thời khoá biểu</a> (Xem thời khoá biểu, lịch học từng lớp, từng sinh viên)`
  },
  {
    keywords: ["facebook", "fb", "fanpage", "facebook trường", "facebook cntt"],
    answer: `<a href="https://www.facebook.com/dhtn567" target="_blank">https://www.facebook.com/dhtn567</a> (Đây là fanpage Facebook chính thức của trường, cập nhật thông tin, sự kiện, tuyển sinh)`
  },
  {
    keywords: ["youtube", "yt", "youtube trường", "youtube cntt", "kênh youtube"],
    answer: `<a href="https://www.youtube.com/@dhtn567" target="_blank">https://www.youtube.com/@dhtn567</a> (Kênh Youtube chính thức của trường, xem video sự kiện, hoạt động, tuyển sinh)`
  },
  {
    keywords: ["hệ thống", "mạng", "hệ thống mạng", "chuyên ngành hệ thống", "chuyên ngành mạng"],
    answer: "Chuyên ngành Hệ thống và Mạng tập trung đào tạo về quản trị mạng, bảo mật thông tin, hệ thống máy chủ, hệ điều hành và triển khai hệ thống mạng doanh nghiệp."
  },
  {
    keywords: ["phần mềm", "lập trình", "công nghệ phần mềm", "chuyên ngành phần mềm", "chuyên ngành lập trình"],
    answer: "Chuyên ngành Công nghệ Phần mềm đào tạo về phát triển ứng dụng, thiết kế phần mềm, kiểm thử, quản lý dự án, DevOps và công nghệ lập trình hiện đại."
  },
  {
    keywords: ["chương trình", "đào tạo", "ngành", "chuyên ngành", "đào tạo cntt", "đào tạo công nghệ thông tin"],
    answer: "Bộ môn CNTT đào tạo 2 chuyên ngành: Hệ thống và mạng, Công nghệ phần mềm. Mỗi chuyên ngành đều có chương trình đào tạo riêng phù hợp xu hướng công nghệ."
  },
  {
    keywords: ["lập trình c", "c programming", "ngôn ngữ c"],
    answer: "Ngôn ngữ lập trình C là một ngôn ngữ lập trình thủ tục mạnh mẽ, thường dùng để phát triển hệ điều hành, trình biên dịch, và các ứng dụng nhúng."
  },
  {
    keywords: ["python", "lập trình python", "ngôn ngữ python"],
    answer: "Python là ngôn ngữ lập trình bậc cao, dễ học, đa năng, phổ biến trong AI, ML, web, scripting, và khoa học dữ liệu."
  },
  {
    keywords: ["sql", "cơ sở dữ liệu", "database", "truy vấn sql"],
    answer: "SQL (Structured Query Language) là ngôn ngữ truy vấn dữ liệu trong các hệ quản trị cơ sở dữ liệu quan hệ như MySQL, SQL Server, PostgreSQL."
  },
  {
    keywords: ["mạng máy tính", "network", "tcp/ip", "osi", "giao thức mạng"],
    answer: "Mạng máy tính là hệ thống kết nối các máy tính với nhau để chia sẻ tài nguyên. Các giao thức phổ biến: TCP/IP, UDP, HTTP, FTP, v.v."
  },
  {
    keywords: ["ai", "trí tuệ nhân tạo", "machine learning", "học máy", "deep learning"],
    answer: "Trí tuệ nhân tạo (AI) là lĩnh vực nghiên cứu phát triển các hệ thống có khả năng học hỏi, suy luận, và tự động hóa. Machine Learning là một nhánh của AI."
  },
  {
    keywords: ["hệ điều hành", "operating system", "linux", "windows", "process", "thread"],
    answer: "Hệ điều hành quản lý tài nguyên phần cứng và phần mềm của máy tính. Ví dụ: Windows, Linux, macOS. Các khái niệm: tiến trình (process), luồng (thread), bộ nhớ, file system."
  },
  {
    keywords: ["thuật toán", "algorithm", "sắp xếp", "tìm kiếm", "đệ quy"],
    answer: "Thuật toán là tập hợp các bước giải quyết bài toán. Các thuật toán cơ bản: sắp xếp (bubble, quick, merge), tìm kiếm (tuyến tính, nhị phân), đệ quy."
  },
  {
    keywords: ["c++", "lập trình c++", "ngôn ngữ c++"],
    answer: "C++ là ngôn ngữ lập trình hướng đối tượng, mở rộng từ C, mạnh về xử lý hệ thống, game, phần mềm nhúng và các ứng dụng hiệu năng cao."
  },
  {
    keywords: ["java", "lập trình java", "ngôn ngữ java"],
    answer: "Java là ngôn ngữ lập trình hướng đối tượng, đa nền tảng, phổ biến cho phát triển ứng dụng web, mobile (Android), desktop và hệ thống doanh nghiệp."
  },
  {
    keywords: ["javascript", "js", "lập trình javascript", "web frontend", "nodejs"],
    answer: "JavaScript là ngôn ngữ lập trình chính cho web frontend (trình duyệt) và cả backend (Node.js). Dùng để xây dựng website động, ứng dụng web, SPA, v.v."
  },
  {
    keywords: ["html", "css", "web", "thiết kế web", "giao diện web"],
    answer: "HTML (HyperText Markup Language) là ngôn ngữ đánh dấu cấu trúc trang web. CSS (Cascading Style Sheets) dùng để định dạng, tạo giao diện cho website."
  },
  {
    keywords: ["react", "reactjs", "framework react"],
    answer: "ReactJS là thư viện JavaScript phát triển bởi Facebook, dùng để xây dựng giao diện người dùng (UI) hiện đại, hiệu năng cao cho web."
  },
  {
    keywords: ["angular", "framework angular"],
    answer: "Angular là framework JavaScript mạnh mẽ của Google, dùng để xây dựng ứng dụng web lớn, SPA, hỗ trợ TypeScript."
  },
  {
    keywords: ["vue", "vuejs", "framework vue"],
    answer: "Vue.js là framework JavaScript nhẹ, dễ học, dùng để xây dựng giao diện web hiện đại, tương tác cao."
  },
  {
    keywords: ["android", "lập trình android", "ứng dụng android"],
    answer: "Lập trình Android thường dùng Java hoặc Kotlin để phát triển ứng dụng di động cho hệ điều hành Android."
  },
  {
    keywords: ["ios", "swift", "lập trình ios", "ứng dụng ios"],
    answer: "Lập trình iOS sử dụng ngôn ngữ Swift hoặc Objective-C để phát triển ứng dụng cho iPhone, iPad."
  },
  {
    keywords: ["docker", "container", "devops"],
    answer: "Docker là nền tảng container hóa, giúp đóng gói ứng dụng và môi trường chạy thành các container, thuận tiện cho triển khai, DevOps."
  },
  {
    keywords: ["git", "github", "quản lý mã nguồn", "version control"],
    answer: "Git là hệ thống quản lý phiên bản phân tán phổ biến nhất hiện nay. GitHub là nền tảng lưu trữ mã nguồn, hỗ trợ cộng tác và quản lý dự án phần mềm."
  },
  {
    keywords: ["linux", "lệnh linux", "ubuntu", "terminal", "shell"],
    answer: "Linux là hệ điều hành mã nguồn mở, phổ biến cho server, lập trình, nghiên cứu. Một số lệnh cơ bản: ls, cd, cp, mv, rm, chmod, chown, grep, cat, nano, vi, top, ps, kill."
  },
  {
    keywords: ["bảo mật", "security", "an toàn thông tin", "mã hóa", "xss", "sql injection"],
    answer: "Bảo mật thông tin là lĩnh vực bảo vệ hệ thống, dữ liệu khỏi truy cập trái phép, tấn công mạng. Các kỹ thuật: mã hóa, xác thực, kiểm thử bảo mật, phòng chống XSS, SQL Injection, v.v."
  },
  {
    keywords: ["iot", "internet of things", "thiết bị thông minh"],
    answer: "IoT (Internet of Things) là mạng lưới các thiết bị thông minh kết nối internet, có thể thu thập, trao đổi dữ liệu và điều khiển từ xa."
  },
  {
    keywords: ["cloud", "điện toán đám mây", "aws", "azure", "google cloud"],
    answer: "Điện toán đám mây (Cloud Computing) cung cấp tài nguyên máy chủ, lưu trữ, dịch vụ qua internet. Các nền tảng phổ biến: AWS, Azure, Google Cloud."
  },
  {
    keywords: ["noSQL", "mongodb", "firebase", "cơ sở dữ liệu phi quan hệ"],
    answer: "NoSQL là các hệ quản trị cơ sở dữ liệu phi quan hệ, phù hợp lưu trữ dữ liệu lớn, linh hoạt. Ví dụ: MongoDB, Firebase, Redis, Cassandra."
  },
  {
    keywords: ["cấu trúc dữ liệu", "data structure", "stack", "queue", "linked list", "tree", "graph"],
    answer: "Cấu trúc dữ liệu là cách tổ chức, lưu trữ dữ liệu để xử lý hiệu quả. Các cấu trúc phổ biến: mảng, danh sách liên kết, ngăn xếp (stack), hàng đợi (queue), cây (tree), đồ thị (graph)."
  },
  {
    keywords: ["oop", "lập trình hướng đối tượng", "object oriented programming", "class", "object", "kế thừa", "đa hình"],
    answer: "Lập trình hướng đối tượng (OOP) là mô hình lập trình dựa trên các đối tượng (object), lớp (class), tính kế thừa, đa hình, đóng gói và trừu tượng hóa."
  },
  {
    keywords: ["devops", "ci/cd", "tích hợp liên tục", "triển khai liên tục"],
    answer: "DevOps là phương pháp kết hợp phát triển phần mềm (Dev) và vận hành hệ thống (Ops), nhấn mạnh tự động hóa, CI/CD (Continuous Integration/Continuous Deployment)."
  },
  {
    keywords: ["scrum", "agile", "quản lý dự án phần mềm", "kanban"],
    answer: "Scrum và Agile là các phương pháp quản lý dự án phần mềm linh hoạt, tập trung vào cộng tác, phản hồi nhanh, chia nhỏ công việc, cải tiến liên tục."
  },
  // ...bạn có thể bổ sung thêm nữa nếu muốn...
];

export const defaultAnswer =
`Tôi là trợ lý ảo của Bộ môn CNTT. Bạn có thể hỏi tôi về mọi kiến thức chuyên ngành Công nghệ Thông tin như:
- Lập trình (C/C++, Java, Python, Web, Mobile, v.v.)
- Cơ sở dữ liệu, SQL, NoSQL
- Mạng máy tính, bảo mật, IoT, AI, Machine Learning
- Hệ điều hành, phần cứng, thuật toán, cấu trúc dữ liệu
- Các vấn đề học tập, thực tập, nghiên cứu khoa học, tài liệu, hướng nghiệp, kỹ năng mềm, v.v.
Hãy đặt câu hỏi cụ thể về lĩnh vực CNTT bạn quan tâm, tôi sẽ cố gắng hỗ trợ hoặc hướng dẫn bạn tìm kiếm tài liệu phù hợp!`;

// Hàm tìm câu trả lời phù hợp
export function findAnswer(message) {
  const msg = message.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.keywords.some((kw) => msg.includes(kw))) {
      return item.answer;
    }
  }
  return defaultAnswer;
}
