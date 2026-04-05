/**
 * HTTP-based Seed Script
 * Run this while Strapi is running: node scripts/seed-http.js
 *
 * Prerequisites:
 * 1. Strapi must be running (npm run develop)
 * 2. You need an API token from Strapi Admin:
 *    - Go to Settings -> API Tokens -> Create new API Token
 *    - Set permissions to Full access
 *    - Copy the token and set STRAPI_TOKEN environment variable
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

const brands = [
  { name: 'Toyota', slug: 'toyota', description: 'Thương hiệu xe hàng đầu Nhật Bản' },
  { name: 'Honda', slug: 'honda', description: 'Thương hiệu xe Nhật Bản chất lượng cao' },
  { name: 'Mercedes-Benz', slug: 'mercedes-benz', description: 'Thương hiệu xe sang Đức' },
  { name: 'BMW', slug: 'bmw', description: 'Thương hiệu xe thể thao Đức' },
  { name: 'Hyundai', slug: 'hyundai', description: 'Thương hiệu xe Hàn Quốc' },
  { name: 'Kia', slug: 'kia', description: 'Thương hiệu xe Hàn Quốc hiện đại' },
  { name: 'Ford', slug: 'ford', description: 'Thương hiệu xe Mỹ' },
  { name: 'Mazda', slug: 'mazda', description: 'Thương hiệu xe Nhật Bản thiết kế đẹp' },
  { name: 'VinFast', slug: 'vinfast', description: 'Thương hiệu xe Việt Nam' },
  { name: 'Mitsubishi', slug: 'mitsubishi', description: 'Thương hiệu xe Nhật Bản bền bỉ' },
];

const cars = [
  {
    name: 'Toyota Camry 2.5Q',
    slug: 'toyota-camry-25q',
    price: 1405000000,
    pricePromo: 1380000000,
    year: 2024,
    status: 'available',
    stockCount: 5,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Toyota Camry 2024 - Sedan hạng D cao cấp với động cơ 2.5L mạnh mẽ, tiết kiệm nhiên liệu.',
    fullDescription: '<p>Toyota Camry 2024 là mẫu sedan hạng D được yêu thích nhất tại Việt Nam với thiết kế sang trọng, nội thất rộng rãi và động cơ 2.5L tiết kiệm nhiên liệu.</p>',
    views: 1250,
    brandSlug: 'toyota',
    specs: { engine: '2.5L 4 xi-lanh', power: '207 mã lực', torque: '250 Nm', seats: 5 },
    highlights: ['Dynamic Force Engine 2.5L', 'Toyota Safety Sense', 'Nội thất da cao cấp'],
    pros: ['Tiết kiệm nhiên liệu', 'Độ bền cao', 'Giá trị bán lại tốt'],
    cons: ['Thiết kế bảo thủ', 'Giá cao hơn đối thủ'],
  },
  {
    name: 'Honda CR-V L',
    slug: 'honda-crv-l',
    price: 1138000000,
    year: 2024,
    status: 'available',
    stockCount: 8,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'Honda CR-V 2024 - SUV 5+2 chỗ ngồi với không gian rộng rãi và tính năng an toàn Honda Sensing.',
    fullDescription: '<p>Honda CR-V thế hệ mới với thiết kế hiện đại, nội thất rộng rãi 5+2 chỗ ngồi.</p>',
    views: 980,
    brandSlug: 'honda',
    specs: { engine: '1.5L Turbo VTEC', power: '188 mã lực', torque: '240 Nm', seats: 7 },
    highlights: ['Honda Sensing', 'Động cơ 1.5L Turbo', '5+2 chỗ ngồi'],
    pros: ['Không gian rộng', 'An toàn cao'],
    cons: ['Hộp số CVT không thích hợp off-road'],
  },
  {
    name: 'Hyundai Tucson 2.0 Đặc biệt',
    slug: 'hyundai-tucson-20-dac-biet',
    price: 979000000,
    pricePromo: 949000000,
    year: 2024,
    status: 'available',
    stockCount: 12,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Hyundai Tucson 2024 - SUV thiết kế tương lai với công nghệ Smartstream.',
    fullDescription: '<p>Hyundai Tucson với ngôn ngữ thiết kế Sensuous Sportiness hoàn toàn mới.</p>',
    views: 856,
    brandSlug: 'hyundai',
    specs: { engine: '2.0L Smartstream', power: '156 mã lực', torque: '192 Nm', seats: 5 },
    highlights: ['Thiết kế Parametric Hidden Lights', 'SmartSense'],
    pros: ['Thiết kế đẹp', 'Giá hợp lý', 'Bảo hành 5 năm'],
    cons: ['Động cơ hơi yếu'],
  },
  {
    name: 'Mazda CX-5 2.0 Premium',
    slug: 'mazda-cx5-20-premium',
    price: 929000000,
    year: 2024,
    status: 'available',
    stockCount: 6,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Mazda CX-5 2024 - SUV với thiết kế KODO và công nghệ Skyactiv.',
    fullDescription: '<p>Mazda CX-5 nổi bật với thiết kế KODO tinh tế, động cơ Skyactiv hiệu quả.</p>',
    views: 723,
    brandSlug: 'mazda',
    specs: { engine: '2.0L Skyactiv-G', power: '154 mã lực', torque: '200 Nm', seats: 5 },
    highlights: ['Thiết kế KODO', 'Skyactiv Technology'],
    pros: ['Thiết kế đẹp', 'Vận hành tốt'],
    cons: ['Không gian hàng ghế sau hơi chật'],
  },
  {
    name: 'Kia Seltos 1.6 Premium',
    slug: 'kia-seltos-16-premium',
    price: 729000000,
    year: 2024,
    status: 'available',
    stockCount: 15,
    category: 'suv',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'Kia Seltos 2024 - SUV đô thị cỡ nhỏ với trang bị đầy đủ.',
    fullDescription: '<p>Kia Seltos là lựa chọn hoàn hảo cho khách hàng trẻ.</p>',
    views: 654,
    brandSlug: 'kia',
    specs: { engine: '1.6L Gamma', power: '123 mã lực', torque: '151 Nm', seats: 5 },
    highlights: ['Đèn LED toàn bộ', 'Camera 360'],
    pros: ['Giá tốt', 'Trang bị nhiều'],
    cons: ['Động cơ yếu khi đầy tải'],
  },
  {
    name: 'Ford Ranger Wildtrak',
    slug: 'ford-ranger-wildtrak',
    price: 965000000,
    year: 2024,
    status: 'available',
    stockCount: 7,
    category: 'pickup',
    fuelType: 'diesel',
    transmission: 'automatic',
    shortDescription: 'Ford Ranger Wildtrak 2024 - Bán tải mạnh mẽ với động cơ Bi-Turbo.',
    fullDescription: '<p>Ford Ranger Wildtrak với động cơ Bi-Turbo mạnh mẽ.</p>',
    views: 892,
    brandSlug: 'ford',
    specs: { engine: '2.0L Bi-Turbo Diesel', power: '210 mã lực', torque: '500 Nm', seats: 5 },
    highlights: ['Bi-Turbo Diesel', 'Hệ thống 4x4'],
    pros: ['Mạnh mẽ', 'Off-road tốt'],
    cons: ['Tiêu hao nhiên liệu cao'],
  },
  {
    name: 'Mercedes-Benz C200 AMG',
    slug: 'mercedes-c200-amg',
    price: 1929000000,
    year: 2024,
    status: 'available',
    stockCount: 3,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Mercedes C200 AMG 2024 - Sedan hạng sang với gói ngoại thất thể thao AMG Line.',
    fullDescription: '<p>Mercedes-Benz C200 AMG với thiết kế sang trọng.</p>',
    views: 567,
    brandSlug: 'mercedes-benz',
    specs: { engine: '1.5L Turbo + EQ Boost', power: '204 mã lực', torque: '300 Nm', seats: 5 },
    highlights: ['MBUX', 'AMG Line'],
    pros: ['Thương hiệu đẳng cấp', 'Công nghệ hiện đại'],
    cons: ['Giá cao', 'Chi phí bảo dưỡng đắt'],
  },
  {
    name: 'BMW 320i Sport Line',
    slug: 'bmw-320i-sport-line',
    price: 1749000000,
    year: 2024,
    status: 'available',
    stockCount: 4,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'BMW 320i 2024 - Sedan thể thao với cảm giác lái tuyệt vời.',
    fullDescription: '<p>BMW 320i Sport Line mang đến trải nghiệm lái thể thao.</p>',
    views: 489,
    brandSlug: 'bmw',
    specs: { engine: '2.0L TwinPower Turbo', power: '184 mã lực', torque: '300 Nm', seats: 5 },
    highlights: ['TwinPower Turbo', 'Sport Line'],
    pros: ['Cảm giác lái tốt', 'Thiết kế thể thao'],
    cons: ['Không gian hẹp', 'Giá phụ tùng cao'],
  },
  {
    name: 'VinFast VF8 Plus',
    slug: 'vinfast-vf8-plus',
    price: 1359000000,
    year: 2024,
    status: 'available',
    stockCount: 10,
    category: 'suv',
    fuelType: 'electric',
    transmission: 'automatic',
    shortDescription: 'VinFast VF8 Plus 2024 - SUV điện thông minh với công nghệ tự lái.',
    fullDescription: '<p>VinFast VF8 Plus là mẫu SUV điện cao cấp.</p>',
    views: 1102,
    brandSlug: 'vinfast',
    specs: { engine: 'Động cơ điện kép', power: '402 mã lực', torque: '620 Nm', seats: 5 },
    highlights: ['100% điện', 'ADAS tự lái', 'Phạm vi 420km'],
    pros: ['Không khí thải', 'Công nghệ cao'],
    cons: ['Trạm sạc còn ít'],
  },
  {
    name: 'Mitsubishi Xpander AT',
    slug: 'mitsubishi-xpander-at',
    price: 598000000,
    year: 2024,
    status: 'available',
    stockCount: 20,
    category: 'mpv',
    fuelType: 'gasoline',
    transmission: 'automatic',
    shortDescription: 'Mitsubishi Xpander 2024 - MPV 7 chỗ bán chạy nhất Việt Nam.',
    fullDescription: '<p>Mitsubishi Xpander với thiết kế Dynamic Shield đặc trưng.</p>',
    views: 1456,
    brandSlug: 'mitsubishi',
    specs: { engine: '1.5L MIVEC', power: '105 mã lực', torque: '141 Nm', seats: 7 },
    highlights: ['7 chỗ ngồi', 'Dynamic Shield'],
    pros: ['Giá rẻ', 'Rộng rãi', 'Bền bỉ'],
    cons: ['Động cơ yếu', 'Nội thất đơn giản'],
  },
  {
    name: 'Toyota Vios G CVT',
    slug: 'toyota-vios-g-cvt',
    price: 581000000,
    year: 2024,
    status: 'available',
    stockCount: 25,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'Toyota Vios 2024 - Sedan hạng B phổ biến nhất với độ bền cao.',
    fullDescription: '<p>Toyota Vios G CVT với thiết kế mới, nội thất tiện nghi.</p>',
    views: 1823,
    brandSlug: 'toyota',
    specs: { engine: '1.5L Dual VVT-i', power: '107 mã lực', torque: '140 Nm', seats: 5 },
    highlights: ['Toyota Safety Sense', 'CVT mới'],
    pros: ['Bền bỉ', 'Tiết kiệm'],
    cons: ['Thiết kế đơn giản'],
  },
  {
    name: 'Honda City RS',
    slug: 'honda-city-rs',
    price: 599000000,
    year: 2024,
    status: 'available',
    stockCount: 18,
    category: 'sedan',
    fuelType: 'gasoline',
    transmission: 'cvt',
    shortDescription: 'Honda City RS 2024 - Sedan hạng B thể thao với Honda Sensing.',
    fullDescription: '<p>Honda City RS với gói ngoại thất RS thể thao.</p>',
    views: 1234,
    brandSlug: 'honda',
    specs: { engine: '1.5L i-VTEC', power: '119 mã lực', torque: '145 Nm', seats: 5 },
    highlights: ['Honda Sensing', 'Gói RS'],
    pros: ['Động cơ mạnh', 'An toàn cao'],
    cons: ['Hệ thống giải trí hơi cũ'],
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
  console.log('=== HTTP Seed Script ===\n');
  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`Token: ${STRAPI_TOKEN ? 'Provided' : 'Not provided (using public access)'}\n`);

  try {
    // Test connection
    console.log('Testing connection...');
    await fetch(`${STRAPI_URL}/api/brands`);
    console.log('Connection OK\n');
  } catch (error) {
    console.error('Cannot connect to Strapi. Make sure it is running at', STRAPI_URL);
    process.exit(1);
  }

  const brandMap = {};

  // Create brands
  console.log('Creating brands...');
  for (const brand of brands) {
    try {
      // Check if exists
      const existing = await fetchAPI(`/api/brands?filters[slug][$eq]=${brand.slug}`);

      if (existing.data && existing.data.length > 0) {
        console.log(`  Brand "${brand.name}" already exists`);
        brandMap[brand.slug] = existing.data[0].id;
        continue;
      }

      const created = await fetchAPI('/api/brands', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            name: brand.name,
            slug: brand.slug,
            description: brand.description,
          },
        }),
      });

      brandMap[brand.slug] = created.data.id;
      console.log(`  Created brand: ${brand.name}`);
    } catch (error) {
      console.error(`  Error creating brand ${brand.name}:`, error.message);
    }
  }

  // Create cars
  console.log('\nCreating cars...');
  for (const car of cars) {
    try {
      // Check if exists
      const existing = await fetchAPI(`/api/cars?filters[slug][$eq]=${car.slug}`);

      if (existing.data && existing.data.length > 0) {
        console.log(`  Car "${car.name}" already exists`);
        continue;
      }

      const brandId = brandMap[car.brandSlug];
      const { brandSlug, ...carData } = car;

      const created = await fetchAPI('/api/cars', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            ...carData,
            brand: brandId || null,
          },
        }),
      });

      console.log(`  Created car: ${car.name}`);
    } catch (error) {
      console.error(`  Error creating car ${car.name}:`, error.message);
    }
  }

  console.log('\n=== Seeding Complete ===');
  console.log('\nView your cars at:');
  console.log(`  - Admin: ${STRAPI_URL}/admin`);
  console.log('  - Frontend: http://localhost:3000/xe-o-to');
}

seed().catch(console.error);
