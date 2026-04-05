/**
 * HTTP-based Post Seed Script
 * Run this while Strapi is running: node scripts/seed-posts.js
 *
 * Prerequisites:
 * 1. Strapi must be running (npm run develop)
 * 2. Set STRAPI_TOKEN env variable with a Full Access API token
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

const posts = [
  {
    title: 'Top 10 xe ô tô bán chạy nhất Việt Nam 2024',
    slug: 'top-10-xe-o-to-ban-chay-nhat-viet-nam-2024',
    excerpt: 'Tổng hợp danh sách 10 mẫu xe ô tô bán chạy nhất thị trường Việt Nam năm 2024, bao gồm phân tích chi tiết từng dòng xe.',
    content: `<h2>Thị trường ô tô Việt Nam 2024</h2>
<p>Năm 2024 là một năm sôi động của thị trường ô tô Việt Nam với nhiều mẫu xe mới ra mắt và sự cạnh tranh khốc liệt giữa các thương hiệu.</p>

<h3>1. Mitsubishi Xpander</h3>
<p>Mitsubishi Xpander tiếp tục giữ vững ngôi vương với doanh số ấn tượng nhờ giá bán hợp lý, không gian rộng rãi cho 7 người và chi phí vận hành thấp. Đây là lựa chọn hàng đầu cho các gia đình Việt.</p>

<h3>2. Toyota Vios</h3>
<p>Toyota Vios vẫn là sedan hạng B được ưa chuộng nhất với độ bền cao, giá trị bán lại tốt và mạng lưới dịch vụ rộng khắp. Phiên bản 2024 được nâng cấp Toyota Safety Sense.</p>

<h3>3. Hyundai Tucson</h3>
<p>Hyundai Tucson gây ấn tượng với thiết kế Parametric Hidden Lights độc đáo và gói trang bị SmartSense. Chương trình bảo hành 5 năm cũng là điểm cộng lớn.</p>

<h3>4. Honda CR-V</h3>
<p>Honda CR-V thế hệ mới với không gian 5+2 chỗ ngồi và gói an toàn Honda Sensing tiên tiến. Động cơ 1.5L Turbo VTEC mang lại hiệu suất vận hành tốt.</p>

<h3>5. Toyota Camry</h3>
<p>Toyota Camry 2.5Q là lựa chọn sedan hạng D cao cấp với động cơ Dynamic Force tiết kiệm nhiên liệu và nội thất sang trọng.</p>

<h3>6. Mazda CX-5</h3>
<p>Mazda CX-5 nổi bật với thiết kế KODO và công nghệ Skyactiv, mang lại cảm giác lái sportiv trong phân khúc SUV tầm trung.</p>

<h3>7. Honda City</h3>
<p>Honda City RS với gói ngoại thất thể thao và Honda Sensing là đối thủ đáng gờm của Toyota Vios trong phân khúc sedan hạng B.</p>

<h3>8. Kia Seltos</h3>
<p>Kia Seltos với trang bị đầy đủ camera 360, đèn LED toàn bộ và bảo hành dài hạn là lựa chọn tuyệt vời cho khách hàng trẻ.</p>

<h3>9. Ford Ranger</h3>
<p>Ford Ranger Wildtrak với động cơ Bi-Turbo Diesel mạnh mẽ và hệ thống 4x4 là vua phân khúc bán tải tại Việt Nam.</p>

<h3>10. VinFast VF8</h3>
<p>VinFast VF8 Plus đánh dấu bước tiến của xe điện Việt Nam với công nghệ ADAS tự lái và phạm vi hoạt động 420km.</p>

<h2>Kết luận</h2>
<p>Thị trường ô tô Việt Nam 2024 ngày càng đa dạng với sự tham gia của xe điện và công nghệ an toàn tiên tiến. Người tiêu dùng có nhiều lựa chọn hơn bao giờ hết.</p>`,
    category: 'news',
    tags: ['top xe bán chạy', 'thị trường ô tô', 'xe 2024', 'Việt Nam'],
    author: 'Admin',
    views: 2450,
    readTime: 8,
  },
  {
    title: 'So sánh Toyota Camry vs Mercedes C200: Sedan nào đáng mua?',
    slug: 'so-sanh-toyota-camry-vs-mercedes-c200',
    excerpt: 'Đánh giá chi tiết so sánh Toyota Camry 2.5Q và Mercedes-Benz C200 AMG về thiết kế, vận hành, trang bị và giá trị sử dụng.',
    content: `<h2>Giới thiệu</h2>
<p>Toyota Camry 2.5Q và Mercedes-Benz C200 AMG là hai mẫu sedan hạng D được nhiều người quan tâm tại Việt Nam. Mặc dù ở hai phân khúc giá khác nhau, cả hai đều hướng đến khách hàng tìm kiếm sự sang trọng và tiện nghi.</p>

<h3>Giá bán</h3>
<p><strong>Toyota Camry 2.5Q:</strong> 1.405 tỷ VNĐ (Khuyến mãi: 1.380 tỷ)</p>
<p><strong>Mercedes C200 AMG:</strong> 1.929 tỷ VNĐ</p>
<p>Chênh lệch khoảng 500 triệu đồng - một khoản tiền không nhỏ.</p>

<h3>Thiết kế ngoại thất</h3>
<p>Camry 2024 mang phong cách thiết kế bảo thủ nhưng sang trọng, phù hợp với đa dạng đối tượng. C200 AMG nổi bật hơn với gói AMG Line thể thao, đèn Digital Light và logo ngôi sao ba cánh đặc trưng.</p>

<h3>Động cơ & Vận hành</h3>
<p><strong>Camry:</strong> 2.5L Dynamic Force, 207 mã lực, 250 Nm. Tiêu hao 7.8L/100km.</p>
<p><strong>C200:</strong> 1.5L Turbo + EQ Boost, 204 mã lực, 300 Nm. Tiêu hao 7.3L/100km.</p>
<p>C200 có mô-men xoắn cao hơn nhờ hệ thống mild-hybrid EQ Boost, mang lại cảm giác tăng tốc mượt mà hơn.</p>

<h3>Nội thất & Tiện nghi</h3>
<p>Mercedes C200 vượt trội với hệ thống MBUX, màn hình dọc 11.9 inch và Air Balance tạo hương thơm. Camry có nội thất da cao cấp và màn hình 9 inch với giao diện dễ sử dụng hơn.</p>

<h3>An toàn</h3>
<p>Cả hai đều được trang bị đầy đủ túi khí và hệ thống hỗ trợ lái nâng cao. Toyota có Toyota Safety Sense, Mercedes có Driving Assistant.</p>

<h3>Chi phí sở hữu</h3>
<p>Camry thắng áp đảo về chi phí bảo dưỡng và sửa chữa. Phụ tùng Toyota dễ tìm và rẻ hơn nhiều so với Mercedes. Giá trị bán lại của Camry cũng tốt hơn.</p>

<h2>Kết luận</h2>
<p><strong>Chọn Toyota Camry nếu:</strong> Bạn ưu tiên độ bền, chi phí vận hành thấp và giá trị bán lại.</p>
<p><strong>Chọn Mercedes C200 nếu:</strong> Bạn muốn thương hiệu sang trọng, công nghệ hiện đại và sẵn sàng chi trả chi phí bảo dưỡng cao hơn.</p>`,
    category: 'comparison',
    tags: ['so sánh xe', 'Toyota Camry', 'Mercedes C200', 'sedan hạng D'],
    author: 'Admin',
    views: 1890,
    readTime: 6,
  },
  {
    title: 'Đánh giá chi tiết Honda CR-V 2024: SUV đáng mua nhất?',
    slug: 'danh-gia-honda-crv-2024-suv-dang-mua-nhat',
    excerpt: 'Review toàn diện Honda CR-V L 2024 từ thiết kế, vận hành, tiện nghi đến giá bán. Liệu CR-V có xứng đáng với mức giá hơn 1.1 tỷ?',
    content: `<h2>Tổng quan Honda CR-V 2024</h2>
<p>Honda CR-V thế hệ thứ 6 đã ra mắt tại Việt Nam với nhiều cải tiến đáng chú ý. Với giá bán 1.138 tỷ VNĐ cho bản L, CR-V hướng đến phân khúc SUV hạng C cao cấp.</p>

<h3>Thiết kế ngoại thất</h3>
<p>CR-V 2024 sở hữu ngôn ngữ thiết kế hoàn toàn mới, vuông vức và nam tính hơn. Kích thước tổng thể 4703 x 1866 x 1680 mm mang lại sự hiện diện mạnh mẽ trên đường phố.</p>
<p>Đèn pha LED mỏng kết hợp với lưới tản nhiệt thanh ngang tạo nên vẻ hiện đại. Đuôi xe thiết kế đơn giản với cụm đèn LED hình chữ L.</p>

<h3>Nội thất & Không gian</h3>
<p>Điểm mạnh lớn nhất của CR-V là không gian nội thất rộng rãi với cấu hình 5+2 chỗ ngồi. Hàng ghế thứ 2 có thể gập phẳng, tạo khoang hành lý khổng lồ.</p>
<p>Bảng taplo thiết kế theo phong cách tối giản với màn hình cảm ứng 9 inch và cụm đồng hồ kỹ thuật số 7 inch. Vật liệu nội thất chủ yếu là nhựa mềm và da.</p>

<h3>Động cơ 1.5L Turbo VTEC</h3>
<p>CR-V L sử dụng động cơ 1.5L Turbo VTEC cho công suất 188 mã lực và mô-men xoắn 240 Nm, kết hợp hộp số CVT. Mức tiêu hao nhiên liệu trung bình khoảng 7.5L/100km.</p>
<p>Khả năng tăng tốc khá tốt trong phân khúc, CVT hoạt động mượt mà trong đô thị. Tuy nhiên, khi tải nặng hoặc leo dốc, động cơ cần phải làm việc nhiều hơn.</p>

<h3>Honda Sensing</h3>
<p>Gói an toàn Honda Sensing bao gồm:</p>
<ul>
<li>Phanh giảm thiểu va chạm CMBS</li>
<li>Kiểm soát hành trình thích ứng ACC</li>
<li>Hỗ trợ giữ làn đường LKAS</li>
<li>Đèn pha tự động</li>
<li>Nhận diện biển báo giao thông</li>
</ul>

<h3>Ưu điểm</h3>
<ul>
<li>Không gian nội thất rộng rãi, 5+2 chỗ</li>
<li>Honda Sensing tiên tiến</li>
<li>Cửa sổ trời panorama</li>
<li>Động cơ 1.5L Turbo mạnh mẽ</li>
</ul>

<h3>Nhược điểm</h3>
<ul>
<li>Giá bán cao trong phân khúc</li>
<li>Hộp số CVT không phù hợp off-road</li>
<li>Hàng ghế thứ 3 chật cho người lớn</li>
</ul>

<h2>Kết luận</h2>
<p>Honda CR-V 2024 là một sản phẩm hoàn thiện với không gian rộng, an toàn cao và vận hành êm ái. Nếu bạn cần một chiếc SUV gia đình với công nghệ hiện đại, CR-V xứng đáng nằm trong danh sách cân nhắc.</p>

<p><strong>Điểm đánh giá: 8.5/10</strong></p>`,
    category: 'review',
    tags: ['Honda CR-V', 'review xe', 'SUV 2024', 'Honda Sensing'],
    author: 'Admin',
    views: 1567,
    readTime: 7,
  },
  {
    title: 'Hướng dẫn mua xe ô tô trả góp 2024: Thủ tục, lãi suất và lưu ý',
    slug: 'huong-dan-mua-xe-o-to-tra-gop-2024',
    excerpt: 'Hướng dẫn chi tiết cách mua xe ô tô trả góp năm 2024, bao gồm thủ tục, giấy tờ cần thiết, lãi suất các ngân hàng và những lưu ý quan trọng.',
    content: `<h2>Tại sao nên mua xe trả góp?</h2>
<p>Mua xe trả góp giúp bạn sở hữu ô tô mà không cần thanh toán toàn bộ số tiền ngay lập tức. Thông thường, bạn chỉ cần trả trước 20-30% giá trị xe và phần còn lại được ngân hàng hỗ trợ.</p>

<h3>Điều kiện vay mua xe ô tô</h3>
<ul>
<li>Công dân Việt Nam, tuổi từ 21-60</li>
<li>Có thu nhập ổn định (tối thiểu 10 triệu/tháng)</li>
<li>Không có nợ xấu tại các tổ chức tín dụng</li>
<li>Có tài sản đảm bảo (chính chiếc xe mua)</li>
</ul>

<h3>Giấy tờ cần chuẩn bị</h3>
<ul>
<li>CMND/CCCD bản gốc</li>
<li>Sổ hộ khẩu hoặc KT3</li>
<li>Hợp đồng lao động hoặc giấy phép kinh doanh</li>
<li>Sao kê lương 3-6 tháng gần nhất</li>
<li>Hóa đơn điện/nước (chứng minh nơi cư trú)</li>
</ul>

<h3>Lãi suất vay mua xe 2024</h3>
<p>Lãi suất vay mua xe ô tô dao động từ <strong>7-10%/năm</strong> tùy ngân hàng và thời hạn vay:</p>
<ul>
<li><strong>Vietcombank:</strong> 7.5-8.5%/năm</li>
<li><strong>Techcombank:</strong> 7.8-9.0%/năm</li>
<li><strong>VPBank:</strong> 8.0-9.5%/năm</li>
<li><strong>TPBank:</strong> 7.5-8.8%/năm</li>
</ul>
<p><em>Lưu ý: Lãi suất trên là tham khảo và có thể thay đổi.</em></p>

<h3>Ví dụ tính trả góp</h3>
<p>Mua xe Toyota Camry giá 1.4 tỷ, trả trước 30%:</p>
<ul>
<li>Trả trước: 420 triệu</li>
<li>Số tiền vay: 980 triệu</li>
<li>Lãi suất: 8%/năm</li>
<li>Thời hạn: 7 năm (84 tháng)</li>
<li>Trả góp hàng tháng: ~15.2 triệu/tháng</li>
</ul>

<h3>Quy trình mua xe trả góp</h3>
<ol>
<li><strong>Bước 1:</strong> Chọn xe và thương lượng giá tại showroom</li>
<li><strong>Bước 2:</strong> Nộp hồ sơ vay tại ngân hàng</li>
<li><strong>Bước 3:</strong> Ngân hàng thẩm định (3-5 ngày làm việc)</li>
<li><strong>Bước 4:</strong> Ký hợp đồng mua bán và hợp đồng vay</li>
<li><strong>Bước 5:</strong> Thanh toán trả trước và nhận xe</li>
<li><strong>Bước 6:</strong> Đăng ký biển số và mua bảo hiểm</li>
</ol>

<h3>Những lưu ý quan trọng</h3>
<ul>
<li><strong>So sánh lãi suất:</strong> Đừng chỉ nhìn lãi suất năm đầu, hãy hỏi lãi suất các năm tiếp theo</li>
<li><strong>Phí phát sinh:</strong> Phí thẩm định, phí trả trước hạn, phí quản lý tài sản</li>
<li><strong>Bảo hiểm:</strong> Ngân hàng thường yêu cầu mua bảo hiểm vật chất xe trong suốt thời gian vay</li>
<li><strong>Khả năng trả nợ:</strong> Khoản trả góp không nên vượt quá 40% thu nhập hàng tháng</li>
</ul>

<h2>Kết luận</h2>
<p>Mua xe trả góp là giải pháp tài chính thông minh nếu bạn có kế hoạch tài chính rõ ràng. Hãy cân nhắc kỹ khả năng trả nợ và so sánh nhiều ngân hàng trước khi quyết định.</p>

<p><em>Liên hệ showroom để được tư vấn gói trả góp tốt nhất!</em></p>`,
    category: 'guide',
    tags: ['mua xe trả góp', 'vay mua xe', 'lãi suất', 'hướng dẫn'],
    author: 'Admin',
    views: 3210,
    readTime: 10,
  },
  {
    title: 'VinFast VF8 2024: Xe điện Việt Nam có gì đặc biệt?',
    slug: 'vinfast-vf8-2024-xe-dien-viet-nam-co-gi-dac-biet',
    excerpt: 'Tìm hiểu chi tiết VinFast VF8 Plus 2024 - mẫu SUV điện đầu tiên của Việt Nam với công nghệ tự lái ADAS và pin 87.7 kWh.',
    content: `<h2>VinFast VF8 - Bước tiến xe điện Việt Nam</h2>
<p>VinFast VF8 Plus là niềm tự hào của ngành ô tô Việt Nam khi đưa xe điện đến gần hơn với người tiêu dùng. Với mức giá 1.359 tỷ VNĐ, VF8 cạnh tranh trực tiếp với các SUV truyền thống cùng phân khúc.</p>

<h3>Thiết kế hiện đại</h3>
<p>VF8 sở hữu thiết kế do studio Pininfarina (Ý) thực hiện, với kích thước 4750 x 1934 x 1667 mm. Ngoại thất mang phong cách tương lai với đường nét sắc sảo và logo V mới của VinFast.</p>

<h3>Động cơ điện kép</h3>
<p>VF8 Plus trang bị hai động cơ điện với tổng công suất <strong>402 mã lực</strong> và mô-men xoắn <strong>620 Nm</strong> - con số ấn tượng hơn nhiều so với các đối thủ chạy xăng cùng tầm giá.</p>
<p>Khả năng tăng tốc 0-100 km/h chỉ trong khoảng 5.5 giây, mang lại cảm giác lái thể thao đích thực.</p>

<h3>Pin và phạm vi hoạt động</h3>
<p>Pin lithium-ion 87.7 kWh cho phạm vi hoạt động lên đến <strong>420 km</strong> theo chu trình WLTP. Hỗ trợ sạc nhanh DC, sạc từ 10% lên 70% trong khoảng 31 phút.</p>

<h3>Công nghệ ADAS tự lái</h3>
<p>VF8 Plus được trang bị hệ thống hỗ trợ lái nâng cao ADAS với:</p>
<ul>
<li>Tự động giữ làn đường</li>
<li>Kiểm soát hành trình thích ứng</li>
<li>Phanh khẩn cấp tự động</li>
<li>Cảnh báo điểm mù</li>
<li>Hỗ trợ đỗ xe tự động</li>
<li>Camera 360 độ</li>
</ul>

<h3>Nội thất thông minh</h3>
<p>Nội thất VF8 tối giản với màn hình trung tâm 15.6 inch điều khiển hầu hết các tính năng. Hệ thống giải trí hỗ trợ Apple CarPlay/Android Auto không dây.</p>

<h3>Chi phí vận hành</h3>
<p>Ưu điểm lớn nhất của xe điện là chi phí vận hành thấp:</p>
<ul>
<li><strong>Sạc điện:</strong> ~300.000 VNĐ/100km (so với ~1.200.000 VNĐ xăng)</li>
<li><strong>Bảo dưỡng:</strong> Ít chi phí hơn do không có động cơ đốt trong</li>
<li><strong>Thuế:</strong> Được miễn/giảm thuế trước bạ, phí đường bộ</li>
</ul>

<h3>Thách thức</h3>
<ul>
<li>Hạ tầng trạm sạc còn hạn chế</li>
<li>Thời gian sạc lâu hơn đổ xăng</li>
<li>Giá trị bán lại chưa rõ ràng</li>
</ul>

<h2>Kết luận</h2>
<p>VinFast VF8 là một sản phẩm đáng tự hào với công nghệ hiện đại và chi phí vận hành thấp. Nếu bạn chủ yếu di chuyển trong thành phố và có điều kiện sạc tại nhà, VF8 là lựa chọn thông minh cho tương lai.</p>`,
    category: 'review',
    tags: ['VinFast VF8', 'xe điện', 'review xe', 'xe Việt Nam'],
    author: 'Admin',
    views: 2100,
    readTime: 7,
  },
  {
    title: 'Chương trình khuyến mãi tháng 1/2025: Giảm giá lên đến 50 triệu',
    slug: 'chuong-trinh-khuyen-mai-thang-1-2025',
    excerpt: 'Chương trình ưu đãi đặc biệt tháng 1/2025 tại showroom - giảm giá trực tiếp, tặng phụ kiện và hỗ trợ trả góp 0% lãi suất.',
    content: `<h2>Ưu đãi đặc biệt tháng 1/2025</h2>
<p>Nhân dịp đầu năm mới 2025, showroom triển khai chương trình khuyến mãi đặc biệt cho tất cả các dòng xe. Đây là cơ hội tuyệt vời để sở hữu xe mơ ước với mức giá ưu đãi nhất.</p>

<h3>Ưu đãi 1: Giảm giá trực tiếp</h3>
<table>
<thead><tr><th>Dòng xe</th><th>Giảm giá</th></tr></thead>
<tbody>
<tr><td>Toyota Camry 2.5Q</td><td>25 triệu</td></tr>
<tr><td>Hyundai Tucson</td><td>30 triệu</td></tr>
<tr><td>Honda CR-V L</td><td>20 triệu</td></tr>
<tr><td>Mazda CX-5</td><td>35 triệu</td></tr>
<tr><td>Kia Seltos</td><td>25 triệu</td></tr>
<tr><td>Ford Ranger Wildtrak</td><td>50 triệu</td></tr>
<tr><td>Mitsubishi Xpander</td><td>15 triệu</td></tr>
</tbody>
</table>

<h3>Ưu đãi 2: Tặng gói phụ kiện chính hãng</h3>
<p>Khách hàng mua xe trong tháng 1 sẽ được tặng gói phụ kiện trị giá <strong>20 triệu đồng</strong> bao gồm:</p>
<ul>
<li>Film cách nhiệt 3M cao cấp</li>
<li>Camera hành trình trước/sau</li>
<li>Thảm lót sàn 5D</li>
<li>Bọc ghế da cao cấp</li>
</ul>

<h3>Ưu đãi 3: Hỗ trợ tài chính</h3>
<ul>
<li>Trả góp <strong>0% lãi suất</strong> trong 6 tháng đầu</li>
<li>Hỗ trợ vay lên đến <strong>80% giá trị xe</strong></li>
<li>Thời hạn vay lên đến <strong>8 năm</strong></li>
<li>Duyệt hồ sơ trong <strong>24 giờ</strong></li>
</ul>

<h3>Ưu đãi 4: Bảo hiểm & Bảo hành</h3>
<ul>
<li>Tặng 1 năm bảo hiểm vật chất xe</li>
<li>Bảo hành mở rộng thêm 1 năm</li>
<li>Miễn phí bảo dưỡng 2 lần đầu</li>
</ul>

<h3>Điều kiện áp dụng</h3>
<ul>
<li>Áp dụng cho khách hàng ký hợp đồng từ 01/01 - 31/01/2025</li>
<li>Không áp dụng đồng thời với các chương trình khuyến mãi khác</li>
<li>Số lượng xe khuyến mãi có hạn</li>
</ul>

<h2>Liên hệ ngay!</h2>
<p>Đặt lịch lái thử và nhận tư vấn chi tiết tại showroom. Hotline: <strong>0123 456 789</strong></p>
<p><em>Chương trình có thể kết thúc sớm khi hết xe khuyến mãi!</em></p>`,
    category: 'promotion',
    tags: ['khuyến mãi', 'giảm giá xe', 'ưu đãi', 'tháng 1 2025'],
    author: 'Admin',
    views: 4500,
    readTime: 5,
  },
  {
    title: 'Xe SUV hay Sedan: Nên chọn dòng xe nào phù hợp?',
    slug: 'xe-suv-hay-sedan-nen-chon-dong-xe-nao',
    excerpt: 'Phân tích ưu nhược điểm của xe SUV và Sedan để giúp bạn chọn dòng xe phù hợp nhất với nhu cầu sử dụng và điều kiện tại Việt Nam.',
    content: `<h2>SUV vs Sedan: Cuộc tranh luận không hồi kết</h2>
<p>Đây là câu hỏi mà nhiều người mua xe lần đầu đặt ra. Mỗi dòng xe có những ưu điểm riêng, và lựa chọn phụ thuộc vào nhu cầu cụ thể của bạn.</p>

<h3>Xe Sedan là gì?</h3>
<p>Sedan là dòng xe có thân xe 3 khoang riêng biệt (động cơ, hành khách, cốp). Ví dụ: Toyota Camry, Honda City, Toyota Vios, Mercedes C-Class.</p>

<h3>Xe SUV là gì?</h3>
<p>SUV (Sport Utility Vehicle) là xe thể thao đa dụng với gầm cao và thân xe liền. Ví dụ: Honda CR-V, Mazda CX-5, Hyundai Tucson, Kia Seltos.</p>

<h3>So sánh chi tiết</h3>

<h4>1. Không gian</h4>
<p><strong>SUV thắng:</strong> SUV thường có không gian rộng hơn, đặc biệt cho hàng ghế sau và khoang hành lý. Nhiều mẫu SUV còn có 7 chỗ ngồi.</p>

<h4>2. Vận hành đô thị</h4>
<p><strong>Sedan thắng:</strong> Sedan có trọng tâm thấp hơn, ổn định hơn trên đường cao tốc. Bán kính quay vòng nhỏ hơn, dễ đỗ xe trong phố.</p>

<h4>3. Tiêu hao nhiên liệu</h4>
<p><strong>Sedan thắng:</strong> Do nhẹ hơn và có hệ số cản gió thấp hơn, sedan thường tiết kiệm xăng hơn SUV cùng phân khúc.</p>

<h4>4. Đường xấu & Ngập nước</h4>
<p><strong>SUV thắng:</strong> Gầm cao (180-220mm) giúp SUV vượt qua đường ngập và đường xấu dễ dàng hơn sedan (gầm 130-150mm). Đây là yếu tố quan trọng tại Việt Nam.</p>

<h4>5. An toàn</h4>
<p><strong>Hòa:</strong> Cả hai đều an toàn nếu được trang bị đầy đủ. SUV có lợi thế tầm nhìn cao hơn, nhưng Sedan ổn định hơn khi phanh gấp.</p>

<h4>6. Giá bán</h4>
<p><strong>Sedan thắng:</strong> Với cùng mức trang bị, sedan thường rẻ hơn SUV 100-200 triệu.</p>

<h3>Nên chọn Sedan khi:</h3>
<ul>
<li>Chủ yếu đi trong thành phố</li>
<li>Ưu tiên tiết kiệm nhiên liệu</li>
<li>Ngân sách hạn chế</li>
<li>Gia đình 4 người trở xuống</li>
<li>Thích cảm giác lái êm ái, ổn định</li>
</ul>

<h3>Nên chọn SUV khi:</h3>
<ul>
<li>Thường xuyên đi đường dài, đường xấu</li>
<li>Gia đình đông (5-7 người)</li>
<li>Khu vực hay ngập nước</li>
<li>Cần không gian chở đồ lớn</li>
<li>Thích tầm nhìn cao, cảm giác an toàn</li>
</ul>

<h2>Kết luận</h2>
<p>Tại Việt Nam, với điều kiện đường sá và thời tiết, SUV đang ngày càng được ưa chuộng hơn. Tuy nhiên, sedan vẫn là lựa chọn tốt cho người đi đô thị với ngân sách hợp lý. Hãy cân nhắc nhu cầu thực tế của bạn trước khi quyết định!</p>`,
    category: 'guide',
    tags: ['SUV vs Sedan', 'tư vấn mua xe', 'hướng dẫn', 'dòng xe'],
    author: 'Admin',
    views: 2780,
    readTime: 8,
  },
  {
    title: 'Ford Ranger Wildtrak 2024: Vua bán tải có gì mới?',
    slug: 'ford-ranger-wildtrak-2024-vua-ban-tai',
    excerpt: 'Đánh giá Ford Ranger Wildtrak 2024 với động cơ Bi-Turbo Diesel 2.0L, hệ thống 4x4 và công nghệ SYNC 4A.',
    content: `<h2>Ford Ranger Wildtrak 2024 - Ông hoàng bán tải</h2>
<p>Ford Ranger tiếp tục thống trị phân khúc bán tải tại Việt Nam nhờ khả năng vận hành mạnh mẽ, thiết kế nam tính và trang bị công nghệ hiện đại.</p>

<h3>Động cơ Bi-Turbo Diesel</h3>
<p>Trái tim của Ranger Wildtrak là động cơ <strong>2.0L Bi-Turbo Diesel</strong> với hai bộ tăng áp hoạt động tuần tự, sản sinh:</p>
<ul>
<li>Công suất: <strong>210 mã lực</strong></li>
<li>Mô-men xoắn: <strong>500 Nm</strong></li>
<li>Hộp số tự động 10 cấp</li>
</ul>
<p>Mô-men xoắn 500 Nm là con số ấn tượng, giúp Ranger kéo tải lên đến 3.5 tấn và vượt địa hình dễ dàng.</p>

<h3>Hệ thống 4x4</h3>
<p>Ranger Wildtrak trang bị hệ thống dẫn động 4 bánh bán thời gian với các chế độ:</p>
<ul>
<li>2H: Cầu sau cho đường thường</li>
<li>4H: 4 bánh cho đường trơn/xấu</li>
<li>4L: 4 bánh tỉ số thấp cho off-road nặng</li>
</ul>

<h3>Công nghệ SYNC 4A</h3>
<p>Màn hình cảm ứng 12 inch với hệ thống SYNC 4A hỗ trợ Apple CarPlay/Android Auto không dây, điều khiển giọng nói và cập nhật OTA.</p>

<h3>Thùng xe đa dụng</h3>
<p>Thùng xe Ranger có kích thước lớn nhất phân khúc với tải trọng <strong>1 tấn</strong>. Tùy chọn nắp thùng cuộn, nắp thùng cứng hoặc canopy.</p>

<h3>Giá bán: 965 triệu VNĐ</h3>
<p>Với mức giá này, Ranger Wildtrak mang lại giá trị tốt nhất trong phân khúc bán tải cao cấp tại Việt Nam.</p>

<h2>Kết luận</h2>
<p>Ford Ranger Wildtrak 2024 xứng đáng là vua bán tải với sự kết hợp hoàn hảo giữa sức mạnh, công nghệ và tính thực dụng. Đây là lựa chọn hàng đầu cho những ai cần một chiếc xe đa năng.</p>`,
    category: 'review',
    tags: ['Ford Ranger', 'bán tải', 'review xe', 'Wildtrak 2024'],
    author: 'Admin',
    views: 1340,
    readTime: 5,
  },
];

async function fetchAPI(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `API error: ${response.status}`);
  }

  return data;
}

async function seed() {
  console.log('=== Post Seed Script ===\n');
  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`Token: ${STRAPI_TOKEN ? 'Provided' : 'Not provided (using public access)'}\n`);

  try {
    console.log('Testing connection...');
    await fetch(`${STRAPI_URL}/api/posts`);
    console.log('Connection OK\n');
  } catch (error) {
    console.error('Cannot connect to Strapi. Make sure it is running at', STRAPI_URL);
    process.exit(1);
  }

  console.log('Creating posts...');
  let created = 0;

  for (const post of posts) {
    try {
      // Check if exists
      const existing = await fetchAPI(`/api/posts?filters[slug][$eq]=${post.slug}`);

      if (existing.data && existing.data.length > 0) {
        console.log(`  Post "${post.title}" already exists`);
        continue;
      }

      await fetchAPI('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ data: post }),
      });

      created++;
      console.log(`  Created post: ${post.title}`);
    } catch (error) {
      console.error(`  Error creating post "${post.title}":`, error.message);
    }
  }

  console.log(`\n=== Seeding Complete ===`);
  console.log(`Created ${created} posts (${posts.length - created} already existed)`);
  console.log('\nView your posts at:');
  console.log(`  - Admin: ${STRAPI_URL}/admin`);
  console.log('  - Frontend: http://localhost:3000/tin-tuc');
}

seed().catch(console.error);
