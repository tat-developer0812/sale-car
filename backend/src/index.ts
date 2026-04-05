import type { Core } from '@strapi/strapi';

// Sample brands data
const brandsData = [
  {
    name: 'Toyota',
    slug: 'toyota',
    description: 'Toyota là thương hiệu ô tô hàng đầu Nhật Bản, nổi tiếng với độ bền bỉ và tiết kiệm nhiên liệu.',
  },
  {
    name: 'Honda',
    slug: 'honda',
    description: 'Honda - thương hiệu ô tô Nhật Bản với công nghệ động cơ tiên tiến và thiết kế thể thao.',
  },
  {
    name: 'Mazda',
    slug: 'mazda',
    description: 'Mazda nổi tiếng với triết lý thiết kế KODO và công nghệ SkyActiv độc quyền.',
  },
  {
    name: 'Hyundai',
    slug: 'hyundai',
    description: 'Hyundai - thương hiệu ô tô Hàn Quốc với thiết kế hiện đại và giá cả cạnh tranh.',
  },
  {
    name: 'KIA',
    slug: 'kia',
    description: 'KIA - thương hiệu ô tô Hàn Quốc với thiết kế táo bạo và công nghệ tiên tiến.',
  },
  {
    name: 'Ford',
    slug: 'ford',
    description: 'Ford - thương hiệu ô tô Mỹ với dòng xe bán tải và SUV mạnh mẽ.',
  },
  {
    name: 'VinFast',
    slug: 'vinfast',
    description: 'VinFast - thương hiệu ô tô Việt Nam đầu tiên với xe điện hiện đại.',
  },
];

// Sample cars data
const carsData = [
  {
    name: 'Toyota Camry 2.5Q',
    slug: 'toyota-camry-2-5q',
    brandSlug: 'toyota',
    price: 1370000000,
    pricePromo: 1320000000,
    year: 2024,
    status: 'available',
    stockCount: 5,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Toyota Camry 2024 - Sedan hạng D cao cấp nhập khẩu Thái Lan, động cơ 2.5L Dynamic Force mạnh mẽ.',
    fullDescription: `## Toyota Camry 2.5Q 2024

Toyota Camry thế hệ mới mang đến thiết kế sang trọng, hiện đại với nhiều trang bị tiện nghi cao cấp. Được mệnh danh là "Vua sedan" tại Việt Nam.

### Điểm nổi bật
- Động cơ 2.5L Dynamic Force mạnh mẽ, tiết kiệm nhiên liệu
- Hộp số tự động 8 cấp độc quyền bản 2.5Q
- Hệ thống an toàn Toyota Safety Sense 2.0
- Nội thất bọc da cao cấp, ghế sau điều chỉnh độ ngả
- Màn hình giải trí 9 inch hỗ trợ Apple CarPlay/Android Auto

### Thiết kế ngoại thất
Camry 2024 sở hữu ngôn ngữ thiết kế mới với lưới tản nhiệt hình thang viền mạ chrome chữ C, đèn pha Bi-LED tự động, lazang đúc hợp kim phay xước 18 inch và ống xả kép thể thao.

### Nội thất
Vô lăng 3 chấu bọc da tích hợp lẫy chuyển số, ghi nhớ 2 vị trí. Cụm đồng hồ kỹ thuật số 7 inch. Hàng ghế sau rộng rãi với bệ tỳ tay trung tâm điều chỉnh độ ngả ghế, rèm che nắng và cửa gió điều hòa. 3 chế độ lái: Eco, Normal, Sport.`,
    features: [
      'Cửa sổ trời toàn cảnh',
      'Ghế lái chỉnh điện 10 hướng',
      'Điều hòa tự động 3 vùng',
      'Sạc không dây',
      'Camera 360 độ',
      'Cảm biến đỗ xe',
      'Đèn pha LED tự động',
      'Gương chiếu hậu chống chói tự động',
    ],
    colors: [
      { name: 'Trắng ngọc trai', code: '#F5F5F5' },
      { name: 'Đen', code: '#1A1A1A' },
      { name: 'Xanh đen', code: '#1B2A3D' },
      { name: 'Đỏ', code: '#8B0000' },
    ],
    specs: {
      engine: '2.5L 4 xi-lanh Dynamic Force',
      power: '209 mã lực @ 6600 vòng/phút',
      torque: '250 Nm @ 4400-5000 vòng/phút',
      fuelConsumption: '6.9L/100km',
      topSpeed: '210 km/h',
      acceleration: '9.3 giây (0-100km/h)',
      length: 4885,
      width: 1840,
      height: 1445,
      wheelbase: 2825,
      groundClearance: 155,
      curbWeight: 1575,
      seats: 5,
      fuelTankCapacity: 60,
      trunkCapacity: 493,
      driveType: 'FWD (Cầu trước)',
      suspension: 'Trước: MacPherson độc lập / Sau: Đa liên kết',
      brakes: 'Đĩa thông gió 4 bánh',
      tires: '235/45R18',
      airbags: 9,
      safetyFeatures: ['ABS', 'EBD', 'BA', 'VSC', 'TRC', 'HSA', 'PCS', 'LDA', 'DRCC', 'AHB'],
      infotainment: 'Màn hình cảm ứng 9 inch',
      speakers: 9,
      climateControl: 'Điều hòa tự động 3 vùng',
    },
    highlights: [
      'Động cơ 2.5L Dynamic Force mạnh nhất phân khúc',
      'Hộp số tự động 8 cấp mượt mà',
      'Gói an toàn Toyota Safety Sense 2.0',
      'Nội thất cao cấp với ghế da, rèm che nắng điều khiển từ ghế sau',
    ],
    pros: [
      'Động cơ mạnh mẽ, tiết kiệm nhiên liệu',
      'Không gian rộng rãi, thoải mái cho hành khách sau',
      'Hệ thống an toàn Toyota Safety Sense 2.0 tiên tiến',
      'Giá trị bán lại cao nhất phân khúc',
      'Nhập khẩu Thái Lan, chất lượng ổn định',
    ],
    cons: [
      'Giá cao hơn đối thủ cùng phân khúc',
      'Cốp xe vẫn mở cơ, không có cốp điện hoặc đá cốp',
      'Ghế sau không gập phẳng hoàn toàn',
    ],
    seo: {
      metaTitle: 'Toyota Camry 2.5Q 2024 - Giá 1.370 tỷ, Thông số kỹ thuật',
      metaDescription: 'Toyota Camry 2.5Q 2024 giá 1.370 tỷ đồng. Sedan hạng D cao cấp nhập Thái Lan. Xem thông số kỹ thuật, đánh giá chi tiết.',
      keywords: 'Toyota Camry, Camry 2024, xe sedan, ô tô Toyota',
    },
    views: 1250,
    leadCount: 45,
  },
  {
    name: 'Honda CR-V L',
    slug: 'honda-cr-v-l',
    brandSlug: 'honda',
    price: 1099000000,
    year: 2024,
    status: 'available',
    stockCount: 8,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'Honda CR-V L 2024 - SUV 5+2 chỗ thế hệ thứ 6, lắp ráp trong nước với Honda Sensing tiên tiến.',
    fullDescription: `## Honda CR-V L 2024

Honda CR-V thế hệ thứ 6 hoàn toàn mới, ra mắt tại Việt Nam ngày 25/10/2023 với thiết kế hiện đại và không gian nội thất rộng rãi nhất phân khúc.

### Điểm nổi bật
- Động cơ 1.5L VTEC Turbo
- Hệ thống an toàn Honda Sensing đầy đủ
- Không gian 5+2 chỗ linh hoạt
- Cốp điện thông minh chống kẹt, đá cốp rảnh tay
- Camera 360 độ

### Công nghệ
CR-V L 2024 được trang bị đầy đủ Honda Sensing, camera LaneWatch quan sát điểm mù, camera 360, cảnh báo áp suất lốp và cảnh báo buồn ngủ.`,
    features: [
      'Honda Sensing đầy đủ',
      'Camera 360 độ',
      'Camera LaneWatch quan sát điểm mù',
      'Ghế lái chỉnh điện 12 hướng',
      'Điều hòa tự động 2 vùng với MaxCool',
      'Màn hình giải trí 9 inch',
      'Apple CarPlay/Android Auto không dây',
      'Cốp điện chống kẹt, đá cốp',
      'Sạc không dây Qi',
      'Đèn pha LED tự động',
    ],
    colors: [
      { name: 'Đỏ', code: '#8B0000' },
      { name: 'Trắng ngà', code: '#F8F8F0' },
      { name: 'Xanh', code: '#1E3A5F' },
      { name: 'Xám', code: '#696969' },
      { name: 'Titan', code: '#8C7853' },
      { name: 'Đen', code: '#0F0F0F' },
    ],
    specs: {
      engine: '1.5L 4 xi-lanh VTEC Turbo',
      power: '140 mã lực @ 6000 vòng/phút',
      torque: '240 Nm @ 1700-5000 vòng/phút',
      fuelConsumption: '7.5L/100km',
      topSpeed: '190 km/h',
      acceleration: '10.5 giây (0-100km/h)',
      length: 4691,
      width: 1866,
      height: 1681,
      wheelbase: 2700,
      groundClearance: 198,
      curbWeight: 1667,
      seats: 7,
      fuelTankCapacity: 57,
      trunkCapacity: 587,
      driveType: 'FWD (Cầu trước)',
      suspension: 'Trước: MacPherson / Sau: Đa liên kết',
      brakes: 'Đĩa thông gió 4 bánh',
      tires: '235/60R18',
      airbags: 6,
      safetyFeatures: ['ABS', 'EBD', 'VSA', 'HSA', 'CMBS', 'LKAS', 'ACC', 'RDM', 'LaneWatch', 'RCTA'],
      infotainment: 'Màn hình cảm ứng 9 inch',
      speakers: 8,
      climateControl: 'Điều hòa tự động 2 vùng',
    },
    highlights: [
      'Không gian nội thất rộng nhất phân khúc SUV cỡ C',
      'Hệ thống an toàn Honda Sensing đầy đủ',
      'Camera 360 độ và LaneWatch quan sát điểm mù',
      'Cốp điện thông minh đá cốp, tự đóng khi cách xa 1m',
    ],
    pros: [
      'Không gian rộng rãi nhất phân khúc',
      'Hệ thống an toàn Honda Sensing tiên tiến',
      'Cốp điện thông minh chống kẹt, đá cốp',
      'Sạc không dây Qi tiện lợi',
      'Lắp ráp trong nước, giá hợp lý',
    ],
    cons: [
      'Hàng ghế thứ 3 hơi chật cho người lớn',
      'Hộp số CVT không phù hợp người thích cảm giác lái',
      'Không có màn hình HUD như bản cao hơn',
      'Công suất 140 mã lực khiêm tốn so với đối thủ',
    ],
    seo: {
      metaTitle: 'Honda CR-V L 2024 - Giá 1.099 tỷ, Thông số kỹ thuật',
      metaDescription: 'Honda CR-V L 2024 giá 1.099 tỷ đồng. SUV 5+2 chỗ thế hệ 6, Honda Sensing, camera 360.',
      keywords: 'Honda CR-V, CR-V 2024, xe SUV Honda, Honda Sensing, SUV 7 chỗ',
    },
    views: 2100,
    leadCount: 78,
  },
  {
    name: 'Mazda CX-5 2.0 Premium',
    slug: 'mazda-cx-5-2-0-premium',
    brandSlug: 'mazda',
    price: 789000000,
    pricePromo: 769000000,
    year: 2024,
    status: 'available',
    stockCount: 12,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Mazda CX-5 2024 - SUV cỡ C dẫn đầu doanh số 4 năm liên tiếp, thiết kế Artful Design và SkyActiv.',
    fullDescription: `## Mazda CX-5 2.0 Premium 2024

Mazda CX-5 là mẫu SUV cỡ C dẫn đầu doanh số phân khúc CUV 4 năm liên tiếp (2021-2024) với ngôn ngữ thiết kế Artful Design hoàn toàn mới.

### Điểm nổi bật
- Ngôn ngữ thiết kế Artful Design mới, lưới tản nhiệt xếp tầng 3D
- Động cơ SkyActiv-G 2.0L phun xăng trực tiếp
- Nội thất cao cấp với ghế sưởi/làm mát, sưởi vô lăng
- Hệ thống i-Activsense, camera 360 độ
- Màn hình HUD hiển thị trên kính chắn gió

### Vận hành
CX-5 mang đến cảm giác lái thể thao với hộp số tự động 6 cấp, hệ thống kiểm soát gia tốc GVC Plus thế hệ 2 và khung gầm chắc chắn.`,
    features: [
      'i-Activsense đầy đủ',
      'Camera 360 độ',
      'Màn hình HUD',
      'Cửa sổ trời hàng ghế trước',
      'Ghế lái/phụ chỉnh điện có sưởi và làm mát',
      'Sưởi vô lăng',
      'Cửa kính hàng ghế trước 2 lớp chống ồn',
      'Điều hòa tự động 2 vùng',
      'Hệ thống âm thanh Bose 10 loa',
      'Đá cốp rảnh tay',
      'Đèn pha LED Adaptive',
    ],
    colors: [
      { name: 'Đỏ Crystal Soul', code: '#7B0323' },
      { name: 'Xám Machine', code: '#5A5A5A' },
      { name: 'Trắng Snowflake', code: '#FFFAFA' },
      { name: 'Xanh Eternal Blue', code: '#1B3D6D' },
      { name: 'Đen Jet', code: '#0A0A0A' },
      { name: 'Vàng ánh kim', code: '#B8860B' },
    ],
    specs: {
      engine: '2.0L 4 xi-lanh SkyActiv-G phun xăng trực tiếp',
      power: '154 mã lực',
      torque: '200 Nm',
      fuelConsumption: '6.8L/100km',
      topSpeed: '195 km/h',
      acceleration: '10.5 giây (0-100km/h)',
      length: 4590,
      width: 1845,
      height: 1680,
      wheelbase: 2700,
      groundClearance: 200,
      curbWeight: 1540,
      seats: 5,
      fuelTankCapacity: 56,
      trunkCapacity: 442,
      driveType: 'FWD (Cầu trước)',
      suspension: 'Trước: MacPherson / Sau: Đa liên kết',
      brakes: 'Trước đĩa thông gió / Sau đĩa đặc',
      tires: '225/55R19',
      airbags: 6,
      safetyFeatures: ['ABS', 'EBD', 'DSC', 'TCS', 'HLA', 'MRCC', 'LAS', 'BSM', 'RCTA', 'SBS'],
      infotainment: 'Màn hình 8 inch + HUD',
      speakers: 10,
      climateControl: 'Điều hòa tự động 2 vùng',
    },
    highlights: [
      'Dẫn đầu doanh số CUV 4 năm liên tiếp (2021-2024)',
      'Thiết kế Artful Design mới với lưới tản nhiệt 3D',
      'Nội thất cao cấp: ghế sưởi/làm mát, sưởi vô lăng, HUD',
      'Hệ thống âm thanh Bose 10 loa',
      'Bảo hành 5 năm / 150.000 km',
    ],
    pros: [
      'Thiết kế đẹp, sang trọng nhất phân khúc',
      'Cảm giác lái thể thao với GVC Plus',
      'Nội thất cao cấp: sưởi/làm mát ghế, HUD, Bose',
      'Tiết kiệm nhiên liệu với SkyActiv',
      'Bảo hành 5 năm dài hạn',
    ],
    cons: [
      'Không gian hàng ghế sau hạn chế so với đối thủ',
      'Công suất 154 mã lực hơi khiêm tốn',
      'Màn hình giải trí 8 inch nhỏ hơn đối thủ',
    ],
    seo: {
      metaTitle: 'Mazda CX-5 2.0 Premium 2024 - Giá 789 triệu, Thông số',
      metaDescription: 'Mazda CX-5 2.0 Premium 2024 giá 789 triệu. SUV cỡ C dẫn đầu doanh số, thiết kế Artful Design, Bose 10 loa.',
      keywords: 'Mazda CX-5, CX-5 2024, xe SUV Mazda, SkyActiv, Artful Design',
    },
    views: 1850,
    leadCount: 62,
  },
  {
    name: 'Hyundai Tucson 2.0 Đặc biệt',
    slug: 'hyundai-tucson-2-0-dac-biet',
    brandSlug: 'hyundai',
    price: 839000000,
    year: 2024,
    status: 'available',
    stockCount: 6,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Hyundai Tucson 2024 - SUV cỡ C nâng cấp giữa vòng đời với thiết kế Sensuous Sportiness và SmartSense.',
    fullDescription: `## Hyundai Tucson 2.0 Đặc biệt 2024

Hyundai Tucson 2024 là bản nâng cấp giữa vòng đời (facelift) với ngôn ngữ thiết kế Sensuous Sportiness được cải tiến mạnh mẽ và khoẻ khoắn hơn.

### Điểm nổi bật
- Cụm màn hình cong kết hợp 12.3 inch kỹ thuật số + 12.3 inch giải trí
- Vô lăng thiết kế mới kiểu Ioniq 5
- Hệ thống SmartSense nâng cấp với PCA phòng chống va chạm khi lùi
- Đèn LED nội thất 64 màu
- Cốp điện thông minh

### Công nghệ
Tucson 2024 là mẫu SUV cỡ C đầu tiên tại Việt Nam trang bị PCA (Reverse Parking Collision Avoidance Assist) - hệ thống phòng chống va chạm khi lùi/đỗ.`,
    features: [
      'Hyundai SmartSense nâng cấp',
      'PCA phòng chống va chạm khi lùi',
      'Cửa sổ trời toàn cảnh',
      'Ghế lái chỉnh điện có nhớ 2 vị trí',
      'Ghế phụ chỉnh điện',
      'Sưởi và làm mát ghế trước',
      'Điều hòa tự động 2 vùng',
      'Màn hình cong 12.3 inch kép',
      'Apple CarPlay/Android Auto không dây',
      'Dàn loa Bose 8 loa',
      'Sạc không dây',
      'Cốp điện thông minh',
      'Đèn LED nội thất 64 màu',
    ],
    colors: [
      { name: 'Trắng', code: '#FFFFFF' },
      { name: 'Đen', code: '#1C1C1C' },
      { name: 'Đỏ đô', code: '#6B1C23' },
      { name: 'Bạc', code: '#C0C0C0' },
      { name: 'Vàng cát', code: '#C2B280' },
      { name: 'Xanh dương', code: '#1E3A5F' },
      { name: 'Xanh lục bảo', code: '#2F5D62' },
    ],
    specs: {
      engine: '2.0L 4 xi-lanh Smartstream MPI',
      power: '156 mã lực @ 6200 vòng/phút',
      torque: '192 Nm @ 4500 vòng/phút',
      fuelConsumption: '8.1L/100km',
      topSpeed: '185 km/h',
      acceleration: '11.5 giây (0-100km/h)',
      length: 4640,
      width: 1865,
      height: 1665,
      wheelbase: 2755,
      groundClearance: 181,
      curbWeight: 1545,
      seats: 5,
      fuelTankCapacity: 54,
      trunkCapacity: 539,
      driveType: 'FWD (Cầu trước)',
      suspension: 'Trước: MacPherson / Sau: Đa liên kết',
      brakes: 'Đĩa thông gió 4 bánh',
      tires: '235/60R18',
      airbags: 6,
      safetyFeatures: ['ABS', 'EBD', 'VSM', 'HAC', 'FCA', 'LKA', 'LFA', 'BCA', 'RCCA', 'PCA', 'DAW'],
      infotainment: 'Màn hình cong 12.3 inch kép',
      speakers: 8,
      climateControl: 'Điều hòa tự động 2 vùng',
    },
    highlights: [
      'Facelift 2024 với màn hình cong 12.3 inch kép',
      'Hệ thống SmartSense với PCA độc nhất phân khúc',
      'Đèn LED nội thất 64 màu',
      'Vô lăng thiết kế mới kiểu Ioniq 5',
      'Dàn loa Bose 8 loa cao cấp',
    ],
    pros: [
      'Thiết kế ngoại thất ấn tượng',
      'Màn hình cong kép 12.3 inch hiện đại',
      'Hệ thống an toàn SmartSense đầy đủ nhất phân khúc',
      'Không gian nội thất rộng rãi',
      'Bảo hành 5 năm không giới hạn km',
    ],
    cons: [
      'Động cơ 2.0 NA 156 mã lực hơi yếu',
      'Mức tiêu hao nhiên liệu 8.1L/100km khá cao',
      'Lốp 235/60R18 nhỏ hơn đối thủ',
    ],
    seo: {
      metaTitle: 'Hyundai Tucson 2.0 Đặc biệt 2024 - Giá 839 triệu, Thông số',
      metaDescription: 'Hyundai Tucson 2.0 Đặc biệt 2024 giá 839 triệu. Facelift mới với màn hình cong kép, SmartSense nâng cấp.',
      keywords: 'Hyundai Tucson, Tucson 2024, xe SUV Hyundai, SmartSense',
    },
    views: 1450,
    leadCount: 38,
  },
  {
    name: 'KIA Seltos 1.6 Premium',
    slug: 'kia-seltos-1-6-premium',
    brandSlug: 'kia',
    price: 729000000,
    pricePromo: 699000000,
    year: 2024,
    status: 'available',
    stockCount: 15,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'KIA Seltos 2024 - SUV cỡ B với thiết kế trẻ trung và trang bị hiện đại.',
    fullDescription: `## KIA Seltos 1.6 Premium 2024

KIA Seltos là mẫu SUV cỡ B bán chạy nhất phân khúc với thiết kế trẻ trung và nhiều trang bị tiện nghi.

### Điểm nổi bật
- Thiết kế trẻ trung, cá tính
- Động cơ 1.6L Gamma tiết kiệm
- Hệ thống âm thanh Bose 8 loa
- Giá cả cạnh tranh

### Phong cách
Seltos hướng đến khách hàng trẻ với thiết kế năng động và nhiều màu sắc bắt mắt.`,
    features: [
      'Đèn LED toàn phần',
      'Cửa sổ trời',
      'Ghế lái chỉnh điện',
      'Điều hòa tự động',
      'Màn hình 10.25 inch',
      'Bose 8 loa',
      'Camera lùi',
      'Cảm biến đỗ xe',
    ],
    colors: [
      { name: 'Trắng Snow', code: '#FAFAFA' },
      { name: 'Đen Aurora', code: '#202020' },
      { name: 'Xám Steel', code: '#71797E' },
      { name: 'Cam Fusion', code: '#FF6B35' },
    ],
    specs: {
      engine: '1.6L 4 xi-lanh Gamma',
      power: '123 mã lực @ 6300 vòng/phút',
      torque: '151 Nm @ 4500 vòng/phút',
      fuelConsumption: '6.5L/100km',
      topSpeed: '170 km/h',
      acceleration: '12.5 giây (0-100km/h)',
      length: 4365,
      width: 1800,
      height: 1645,
      wheelbase: 2610,
      groundClearance: 190,
      curbWeight: 1310,
      seats: 5,
      fuelTankCapacity: 50,
      trunkCapacity: 433,
      driveType: 'FWD (Cầu trước)',
      suspension: 'Trước: MacPherson / Sau: Thanh xoắn',
      brakes: 'Trước đĩa / Sau tang trống',
      tires: '215/55R17',
      airbags: 6,
      safetyFeatures: ['ABS', 'EBD', 'VSM', 'HAC', 'ESC', 'BA'],
      infotainment: 'Màn hình 10.25 inch',
      speakers: 8,
      climateControl: 'Điều hòa tự động',
    },
    highlights: [
      'Thiết kế trẻ trung, năng động',
      'Hệ thống âm thanh Bose 8 loa',
      'Giá cả cạnh tranh',
    ],
    pros: [
      'Giá hợp lý cho phân khúc',
      'Thiết kế đẹp mắt',
      'Trang bị phong phú',
      'Tiết kiệm nhiên liệu',
    ],
    cons: [
      'Động cơ hơi yếu khi đầy tải',
      'Hộp số CVT không thể thao',
      'Phanh sau tang trống',
    ],
    seo: {
      metaTitle: 'KIA Seltos 1.6 Premium 2024 - Giá xe, Thông số kỹ thuật',
      metaDescription: 'KIA Seltos 1.6 Premium 2024 giá 729 triệu đồng. SUV cỡ B trẻ trung, tiện nghi.',
      keywords: 'KIA Seltos, Seltos 2024, xe SUV KIA, SUV cỡ B',
    },
    views: 2500,
    leadCount: 95,
  },
  {
    name: 'Ford Ranger Wildtrak',
    slug: 'ford-ranger-wildtrak',
    brandSlug: 'ford',
    price: 965000000,
    year: 2024,
    status: 'available',
    stockCount: 4,
    category: 'pickup',
    fuelType: 'diesel',
    transmission: 'automatic',
    shortDescription: 'Ford Ranger Wildtrak 2024 - Bán tải mạnh mẽ với công nghệ off-road tiên tiến.',
    fullDescription: `## Ford Ranger Wildtrak 2024

Ford Ranger thế hệ mới với thiết kế mạnh mẽ và khả năng vượt địa hình vượt trội.

### Điểm nổi bật
- Động cơ Bi-Turbo 2.0L diesel mạnh mẽ
- Hộp số tự động 10 cấp
- Hệ thống hỗ trợ off-road
- Khả năng kéo tải vượt trội

### Off-road
Ranger Wildtrak với hệ thống 4WD, khóa vi sai cầu sau và nhiều chế độ lái giúp vượt mọi địa hình.`,
    features: [
      '4WD với khóa vi sai cầu sau',
      'Đèn Matrix LED',
      'Ghế lái chỉnh điện 10 hướng',
      'Điều hòa tự động 2 vùng',
      'Màn hình SYNC 4 12 inch',
      'B&O 10 loa',
      'Cruise Control thích ứng',
      'Hỗ trợ đỗ xe tự động',
    ],
    colors: [
      { name: 'Cam Sedona', code: '#CC5500' },
      { name: 'Trắng Arctic', code: '#F0F0F0' },
      { name: 'Đen Absolute', code: '#0C0C0C' },
      { name: 'Xanh Blue Lightning', code: '#0047AB' },
    ],
    specs: {
      engine: '2.0L Bi-Turbo Diesel',
      power: '210 mã lực @ 3750 vòng/phút',
      torque: '500 Nm @ 1750-2000 vòng/phút',
      fuelConsumption: '8.9L/100km',
      topSpeed: '180 km/h',
      acceleration: '9.8 giây (0-100km/h)',
      length: 5370,
      width: 1918,
      height: 1884,
      wheelbase: 3270,
      groundClearance: 235,
      curbWeight: 2209,
      seats: 5,
      fuelTankCapacity: 80,
      trunkCapacity: 0,
      driveType: '4WD (4 bánh)',
      suspension: 'Trước: Tay đòn kép / Sau: Lá nhíp',
      brakes: 'Đĩa thông gió 4 bánh',
      tires: '265/60R18',
      airbags: 8,
      safetyFeatures: ['ABS', 'EBD', 'RSC', 'TCS', 'HSA', 'AEB', 'LKA', 'BLIS', 'Rear camera'],
      infotainment: 'SYNC 4 màn hình 12 inch',
      speakers: 10,
      climateControl: 'Điều hòa tự động 2 vùng',
    },
    highlights: [
      'Động cơ Bi-Turbo mạnh mẽ với 500Nm mô-men xoắn',
      'Hộp số tự động 10 cấp',
      'Khả năng off-road vượt trội',
    ],
    pros: [
      'Động cơ mạnh mẽ, êm ái',
      'Khả năng vượt địa hình tốt',
      'Nội thất cao cấp',
      'Công nghệ tiên tiến',
    ],
    cons: [
      'Giá cao nhất phân khúc',
      'Tiêu thụ nhiên liệu khá cao',
      'Kích thước lớn khó di chuyển trong phố',
    ],
    seo: {
      metaTitle: 'Ford Ranger Wildtrak 2024 - Giá xe, Thông số kỹ thuật',
      metaDescription: 'Ford Ranger Wildtrak 2024 giá 965 triệu đồng. Bán tải mạnh mẽ với Bi-Turbo diesel.',
      keywords: 'Ford Ranger, Ranger Wildtrak, xe bán tải, pickup',
    },
    views: 1680,
    leadCount: 42,
  },
  {
    name: 'VinFast VF 8 Plus',
    slug: 'vinfast-vf-8-plus',
    brandSlug: 'vinfast',
    price: 1129000000,
    year: 2024,
    status: 'available',
    stockCount: 10,
    category: 'suv',
    fuelType: 'electric',
    transmission: 'automatic',
    shortDescription: 'VinFast VF 8 Plus 2024 - SUV điện thông minh với công nghệ tự lái.',
    fullDescription: `## VinFast VF 8 Plus 2024

VinFast VF 8 là mẫu SUV thuần điện đầu tiên của Việt Nam với thiết kế hiện đại và công nghệ tiên tiến.

### Điểm nổi bật
- 100% động cơ điện không phát thải
- Công nghệ tự lái cấp độ 2+
- Pin đi được 400km/lần sạc
- Sạc nhanh 70% trong 31 phút

### Công nghệ
VF 8 được trang bị hệ thống ADAS tiên tiến với khả năng tự lái cấp độ 2+, camera 360, cảnh báo điểm mù và nhiều tính năng an toàn khác.`,
    features: [
      'Công nghệ tự lái ADAS',
      'Cửa sổ trời toàn cảnh',
      'Ghế chỉnh điện có sưởi/làm mát',
      'Điều hòa tự động 2 vùng',
      'Màn hình 15.6 inch',
      'Hệ thống âm thanh 11 loa',
      'Sạc không dây',
      'Cốp điện chống kẹt',
    ],
    colors: [
      { name: 'Xanh Neptune', code: '#0D4D4D' },
      { name: 'Trắng Delanex', code: '#F5F5F5' },
      { name: 'Đen Brahminy', code: '#151515' },
      { name: 'Đỏ Crimson', code: '#A50000' },
    ],
    specs: {
      engine: 'Dual Motor điện',
      power: '402 mã lực',
      torque: '620 Nm',
      fuelConsumption: '18.4kWh/100km',
      topSpeed: '200 km/h',
      acceleration: '5.5 giây (0-100km/h)',
      length: 4750,
      width: 1900,
      height: 1660,
      wheelbase: 2950,
      groundClearance: 175,
      curbWeight: 2455,
      seats: 5,
      fuelTankCapacity: 0,
      trunkCapacity: 508,
      driveType: 'AWD (4 bánh)',
      suspension: 'Trước và sau: Đa liên kết',
      brakes: 'Đĩa thông gió 4 bánh',
      tires: '255/50R20',
      airbags: 11,
      safetyFeatures: ['ABS', 'EBD', 'ESP', 'ADAS', 'Highway Assist', 'LKA', 'AEB', 'FCW', 'BSW', '360 Camera'],
      infotainment: 'Màn hình 15.6 inch',
      speakers: 11,
      climateControl: 'Điều hòa tự động 2 vùng',
      other: {
        batteryCapacity: '87.7 kWh',
        range: '400 km (WLTP)',
        chargingTime: '70% trong 31 phút (DC fast charge)',
      },
    },
    highlights: [
      'SUV thuần điện thương hiệu Việt',
      'Công nghệ tự lái ADAS tiên tiến',
      'Pin lớn đi được 400km/lần sạc',
    ],
    pros: [
      'Không phát thải, thân thiện môi trường',
      'Tăng tốc mạnh mẽ',
      'Công nghệ hiện đại',
      'Bảo dưỡng ít chi phí',
    ],
    cons: [
      'Hạ tầng trạm sạc còn hạn chế',
      'Thời gian sạc lâu hơn đổ xăng',
      'Giá cao hơn xe xăng cùng phân khúc',
    ],
    seo: {
      metaTitle: 'VinFast VF 8 Plus 2024 - Giá xe điện, Thông số kỹ thuật',
      metaDescription: 'VinFast VF 8 Plus 2024 giá 1.129 tỷ đồng. SUV thuần điện với công nghệ tự lái.',
      keywords: 'VinFast VF 8, xe điện VinFast, SUV điện, EV',
    },
    views: 3200,
    leadCount: 125,
  },
  {
    name: 'Toyota Vios 1.5G',
    slug: 'toyota-vios-1-5g',
    brandSlug: 'toyota',
    price: 560000000,
    pricePromo: 540000000,
    year: 2024,
    status: 'available',
    stockCount: 20,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'Toyota Vios 2024 - Sedan hạng B bán chạy nhất Việt Nam với độ tin cậy cao.',
    fullDescription: `## Toyota Vios 1.5G 2024

Toyota Vios là mẫu sedan hạng B bán chạy nhất Việt Nam, được tin dùng bởi độ bền bỉ và chi phí sử dụng thấp.

### Điểm nổi bật
- Động cơ 1.5L Dual VVT-i tiết kiệm
- Hệ thống an toàn Toyota Safety Sense
- Chi phí bảo dưỡng thấp
- Giá trị bán lại cao

### Thực dụng
Vios phù hợp cho gia đình nhỏ hoặc kinh doanh dịch vụ với chi phí vận hành tối ưu.`,
    features: [
      'Toyota Safety Sense',
      'Đèn pha LED',
      'Ghế nỉ cao cấp',
      'Điều hòa tự động',
      'Màn hình 9 inch',
      'Apple CarPlay/Android Auto',
      'Camera lùi',
      '7 túi khí',
    ],
    colors: [
      { name: 'Trắng', code: '#FFFFFF' },
      { name: 'Đen', code: '#000000' },
      { name: 'Bạc', code: '#C0C0C0' },
      { name: 'Đỏ', code: '#B22222' },
    ],
    specs: {
      engine: '1.5L 4 xi-lanh Dual VVT-i',
      power: '107 mã lực @ 6000 vòng/phút',
      torque: '140 Nm @ 4200 vòng/phút',
      fuelConsumption: '5.5L/100km',
      topSpeed: '180 km/h',
      acceleration: '11.8 giây (0-100km/h)',
      length: 4425,
      width: 1730,
      height: 1475,
      wheelbase: 2550,
      groundClearance: 133,
      curbWeight: 1075,
      seats: 5,
      fuelTankCapacity: 42,
      trunkCapacity: 506,
      driveType: 'FWD (Cầu trước)',
      suspension: 'Trước: MacPherson / Sau: Thanh xoắn',
      brakes: 'Trước đĩa / Sau tang trống',
      tires: '185/60R15',
      airbags: 7,
      safetyFeatures: ['ABS', 'EBD', 'BA', 'VSC', 'TRC', 'PCS', 'LDA'],
      infotainment: 'Màn hình 9 inch',
      speakers: 6,
      climateControl: 'Điều hòa tự động',
    },
    highlights: [
      'Sedan bán chạy nhất Việt Nam',
      'Chi phí sử dụng thấp',
      'Toyota Safety Sense tiêu chuẩn',
    ],
    pros: [
      'Giá hợp lý',
      'Bền bỉ, ít hỏng vặt',
      'Tiết kiệm nhiên liệu',
      'Giá trị bán lại cao',
      'Mạng lưới bảo hành rộng',
    ],
    cons: [
      'Thiết kế không nổi bật',
      'Nội thất đơn giản',
      'Cách âm chưa tốt',
    ],
    seo: {
      metaTitle: 'Toyota Vios 1.5G 2024 - Giá xe, Thông số kỹ thuật',
      metaDescription: 'Toyota Vios 1.5G 2024 giá 560 triệu đồng. Sedan hạng B bền bỉ, tiết kiệm.',
      keywords: 'Toyota Vios, Vios 2024, sedan hạng B, xe gia đình',
    },
    views: 5600,
    leadCount: 210,
  },
];

async function seedData(strapi: Core.Strapi) {
  // Check if data already exists
  const existingBrands = await strapi.documents('api::brand.brand').findMany({ limit: 1 });
  if (existingBrands.length > 0) {
    strapi.log.info('Seed data already exists. Skipping...');
    return;
  }

  strapi.log.info('Seeding example data...');

  // Create brands
  const brandMap: Record<string, string> = {};
  for (const brand of brandsData) {
    const created = await strapi.documents('api::brand.brand').create({
      data: {
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        publishedAt: new Date(),
      },
    });
    brandMap[brand.slug] = created.documentId;
    strapi.log.info(`Created brand: ${brand.name}`);
  }

  // Create cars
  for (const car of carsData) {
    const { brandSlug, ...carData } = car;
    await strapi.documents('api::car.car').create({
      data: {
        ...carData,
        brand: brandMap[brandSlug],
        publishedAt: new Date(),
      } as any,
    });
    strapi.log.info(`Created car: ${car.name}`);
  }

  strapi.log.info('Seed data completed!');
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedData(strapi);
  },
};
