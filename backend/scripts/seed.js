const { createStrapi } = require('@strapi/strapi');

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
    fullDescription: '<p>Toyota Camry 2024 là mẫu sedan hạng D được yêu thích nhất tại Việt Nam với thiết kế sang trọng, nội thất rộng rãi và động cơ 2.5L tiết kiệm nhiên liệu.</p><p>Xe được trang bị đầy đủ các tính năng an toàn hiện đại như Toyota Safety Sense, 7 túi khí, hỗ trợ đỗ xe tự động.</p>',
    views: 1250,
    brandSlug: 'toyota',
    specs: {
      engine: '2.5L 4 xi-lanh',
      power: '207 mã lực',
      torque: '250 Nm',
      fuelConsumption: '7.8L/100km',
      seats: 5,
      length: 4885,
      width: 1840,
      height: 1445,
    },
    highlights: ['Dynamic Force Engine 2.5L', 'Toyota Safety Sense', 'Nội thất da cao cấp', 'Màn hình 9 inch'],
    pros: ['Tiết kiệm nhiên liệu', 'Độ bền cao', 'Giá trị bán lại tốt', 'Dịch vụ hậu mãi tốt'],
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
    fullDescription: '<p>Honda CR-V thế hệ mới với thiết kế hiện đại, nội thất rộng rãi 5+2 chỗ ngồi. Được trang bị gói an toàn Honda Sensing tiên tiến.</p>',
    views: 980,
    brandSlug: 'honda',
    specs: {
      engine: '1.5L Turbo VTEC',
      power: '188 mã lực',
      torque: '240 Nm',
      fuelConsumption: '7.5L/100km',
      seats: 7,
      length: 4703,
      width: 1866,
      height: 1680,
    },
    highlights: ['Honda Sensing', 'Động cơ 1.5L Turbo', 'Cửa sổ trời panorama', '5+2 chỗ ngồi'],
    pros: ['Không gian rộng', 'An toàn cao', 'Vận hành êm ái'],
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
    fullDescription: '<p>Hyundai Tucson với ngôn ngữ thiết kế Sensuous Sportiness hoàn toàn mới, nội thất hiện đại và nhiều tính năng tiện nghi.</p>',
    views: 856,
    brandSlug: 'hyundai',
    specs: {
      engine: '2.0L Smartstream',
      power: '156 mã lực',
      torque: '192 Nm',
      fuelConsumption: '8.0L/100km',
      seats: 5,
      length: 4630,
      width: 1865,
      height: 1665,
    },
    highlights: ['Thiết kế Parametric Hidden Lights', 'Màn hình 10.25 inch', 'SmartSense', 'Sạc không dây'],
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
    fullDescription: '<p>Mazda CX-5 nổi bật với thiết kế KODO tinh tế, động cơ Skyactiv hiệu quả và nội thất chất lượng cao.</p>',
    views: 723,
    brandSlug: 'mazda',
    specs: {
      engine: '2.0L Skyactiv-G',
      power: '154 mã lực',
      torque: '200 Nm',
      fuelConsumption: '7.1L/100km',
      seats: 5,
      length: 4575,
      width: 1845,
      height: 1680,
    },
    highlights: ['Thiết kế KODO', 'Skyactiv Technology', 'i-Activsense', 'Nội thất Nappa'],
    pros: ['Thiết kế đẹp', 'Vận hành tốt', 'Nội thất cao cấp'],
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
    fullDescription: '<p>Kia Seltos là lựa chọn hoàn hảo cho khách hàng trẻ với thiết kế năng động và nhiều tính năng tiện nghi.</p>',
    views: 654,
    brandSlug: 'kia',
    specs: {
      engine: '1.6L Gamma',
      power: '123 mã lực',
      torque: '151 Nm',
      fuelConsumption: '6.8L/100km',
      seats: 5,
      length: 4370,
      width: 1800,
      height: 1620,
    },
    highlights: ['Đèn LED toàn bộ', 'Màn hình 10.25 inch', 'Cửa sổ trời', 'Camera 360'],
    pros: ['Giá tốt', 'Trang bị nhiều', 'Bảo hành dài'],
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
    fullDescription: '<p>Ford Ranger Wildtrak với động cơ Bi-Turbo mạnh mẽ, khả năng off-road vượt trội và nhiều tính năng an toàn.</p>',
    views: 892,
    brandSlug: 'ford',
    specs: {
      engine: '2.0L Bi-Turbo Diesel',
      power: '210 mã lực',
      torque: '500 Nm',
      fuelConsumption: '8.9L/100km',
      seats: 5,
      length: 5370,
      width: 1918,
      height: 1884,
    },
    highlights: ['Bi-Turbo Diesel', 'Hệ thống 4x4', 'SYNC 4A', 'Tải trọng 1 tấn'],
    pros: ['Mạnh mẽ', 'Off-road tốt', 'Thùng xe lớn'],
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
    fullDescription: '<p>Mercedes-Benz C200 AMG với thiết kế sang trọng, nội thất MBUX thế hệ mới và nhiều tính năng an toàn tiên tiến.</p>',
    views: 567,
    brandSlug: 'mercedes-benz',
    specs: {
      engine: '1.5L Turbo + EQ Boost',
      power: '204 mã lực',
      torque: '300 Nm',
      fuelConsumption: '7.3L/100km',
      seats: 5,
      length: 4751,
      width: 1820,
      height: 1438,
    },
    highlights: ['MBUX', 'AMG Line', 'Digital Light', 'Air Balance'],
    pros: ['Thương hiệu đẳng cấp', 'Công nghệ hiện đại', 'Thiết kế sang trọng'],
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
    fullDescription: '<p>BMW 320i Sport Line mang đến trải nghiệm lái thể thao đích thực với động cơ TwinPower Turbo và hệ thống treo thể thao.</p>',
    views: 489,
    brandSlug: 'bmw',
    specs: {
      engine: '2.0L TwinPower Turbo',
      power: '184 mã lực',
      torque: '300 Nm',
      fuelConsumption: '6.8L/100km',
      seats: 5,
      length: 4713,
      width: 1827,
      height: 1440,
    },
    highlights: ['TwinPower Turbo', 'iDrive 7', 'Sport Line', 'Driving Assistant'],
    pros: ['Cảm giác lái tốt', 'Thiết kế thể thao', 'Động cơ mạnh'],
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
    fullDescription: '<p>VinFast VF8 Plus là mẫu SUV điện cao cấp với khả năng vận hành mạnh mẽ, công nghệ tự lái ADAS và nội thất thông minh.</p>',
    views: 1102,
    brandSlug: 'vinfast',
    specs: {
      engine: 'Động cơ điện kép',
      power: '402 mã lực',
      torque: '620 Nm',
      fuelConsumption: '0L/100km',
      seats: 5,
      length: 4750,
      width: 1934,
      height: 1667,
    },
    highlights: ['100% điện', 'ADAS tự lái', 'Pin 87.7 kWh', 'Phạm vi 420km'],
    pros: ['Không khí thải', 'Công nghệ cao', 'Chi phí vận hành thấp'],
    cons: ['Trạm sạc còn ít', 'Thời gian sạc lâu'],
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
    fullDescription: '<p>Mitsubishi Xpander với thiết kế Dynamic Shield đặc trưng, không gian rộng rãi cho 7 người và khả năng vận hành linh hoạt.</p>',
    views: 1456,
    brandSlug: 'mitsubishi',
    specs: {
      engine: '1.5L MIVEC',
      power: '105 mã lực',
      torque: '141 Nm',
      fuelConsumption: '6.6L/100km',
      seats: 7,
      length: 4595,
      width: 1750,
      height: 1730,
    },
    highlights: ['7 chỗ ngồi', 'Dynamic Shield', 'Gầm cao 225mm', 'Tiết kiệm nhiên liệu'],
    pros: ['Giá rẻ', 'Rộng rãi', 'Bền bỉ', 'Chi phí nuôi xe thấp'],
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
    fullDescription: '<p>Toyota Vios G CVT với thiết kế mới, nội thất tiện nghi và độ bền vượt trội, phù hợp cho gia đình và chạy dịch vụ.</p>',
    views: 1823,
    brandSlug: 'toyota',
    specs: {
      engine: '1.5L Dual VVT-i',
      power: '107 mã lực',
      torque: '140 Nm',
      fuelConsumption: '5.8L/100km',
      seats: 5,
      length: 4425,
      width: 1730,
      height: 1475,
    },
    highlights: ['Toyota Safety Sense', 'CVT mới', 'Tiết kiệm xăng', '7 túi khí'],
    pros: ['Bền bỉ', 'Tiết kiệm', 'Giá trị bán lại tốt'],
    cons: ['Thiết kế đơn giản', 'Động cơ ồn'],
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
    fullDescription: '<p>Honda City RS với gói ngoại thất RS thể thao, động cơ 1.5L i-VTEC và gói an toàn Honda Sensing tiên tiến.</p>',
    views: 1234,
    brandSlug: 'honda',
    specs: {
      engine: '1.5L i-VTEC',
      power: '119 mã lực',
      torque: '145 Nm',
      fuelConsumption: '5.7L/100km',
      seats: 5,
      length: 4553,
      width: 1748,
      height: 1467,
    },
    highlights: ['Honda Sensing', 'Gói RS', 'LaneWatch', 'Cốp 519L'],
    pros: ['Động cơ mạnh', 'An toàn cao', 'Cốp rộng'],
    cons: ['Hệ thống giải trí hơi cũ'],
  },
];

async function seed() {
  let strapi;

  try {
    console.log('Starting Strapi...');
    strapi = await createStrapi().load();

    console.log('\n=== Seeding Database ===\n');

    // Create brands
    console.log('Creating brands...');
    const brandMap = {};

    for (const brand of brands) {
      const existing = await strapi.documents('api::brand.brand').findMany({
        filters: { slug: brand.slug },
      });

      if (existing.length > 0) {
        console.log(`  Brand "${brand.name}" already exists, skipping...`);
        brandMap[brand.slug] = existing[0].documentId;
      } else {
        const created = await strapi.documents('api::brand.brand').create({
          data: {
            name: brand.name,
            slug: brand.slug,
            description: brand.description,
            publishedAt: new Date(),
          },
        });
        console.log(`  Created brand: ${brand.name}`);
        brandMap[brand.slug] = created.documentId;
      }
    }

    // Create cars
    console.log('\nCreating cars...');

    for (const car of cars) {
      const existing = await strapi.documents('api::car.car').findMany({
        filters: { slug: car.slug },
      });

      if (existing.length > 0) {
        console.log(`  Car "${car.name}" already exists, skipping...`);
        continue;
      }

      const brandDocumentId = brandMap[car.brandSlug];

      const carData = {
        name: car.name,
        slug: car.slug,
        price: car.price,
        pricePromo: car.pricePromo || null,
        year: car.year,
        status: car.status,
        stockCount: car.stockCount,
        category: car.category,
        fuelType: car.fuelType,
        transmission: car.transmission,
        shortDescription: car.shortDescription,
        fullDescription: car.fullDescription,
        views: car.views,
        specs: car.specs,
        highlights: car.highlights,
        pros: car.pros,
        cons: car.cons,
        publishedAt: new Date(),
      };

      if (brandDocumentId) {
        carData.brand = {
          connect: [brandDocumentId],
        };
      }

      await strapi.documents('api::car.car').create({
        data: carData,
      });

      console.log(`  Created car: ${car.name}`);
    }

    console.log('\n=== Seeding Complete ===');
    console.log(`Created ${brands.length} brands and ${cars.length} cars`);
    console.log('\nYou can now view the cars at:');
    console.log('  - Admin: http://localhost:1337/admin');
    console.log('  - Frontend: http://localhost:3000/xe-o-to');

  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    if (strapi) {
      await strapi.destroy();
    }
    process.exit(0);
  }
}

seed();
