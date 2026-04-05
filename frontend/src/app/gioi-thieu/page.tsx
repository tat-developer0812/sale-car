import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import {
  ShieldCheck,
  Users,
  Award,
  Target,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  Headphones,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Giới Thiệu VuKia - Chuyên Gia Tư Vấn Xe KIA & Mazda Gò Vấp',
  description:
    'VuKia – chuyên viên tư vấn xe KIA & Mazda chính hãng tại Gò Vấp, TP.HCM. Nhiều năm kinh nghiệm, hỗ trợ trả góp 80%, giao xe tận nơi, bảo hành chính hãng toàn quốc.',
  alternates: {
    canonical: `${siteConfig.url}/gioi-thieu`,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.consultant.name,
  jobTitle: siteConfig.consultant.title,
  telephone: siteConfig.consultant.phone,
  image: `${siteConfig.url}${siteConfig.consultant.photo}`,
  url: `${siteConfig.url}/gioi-thieu`,
  worksFor: {
    '@type': 'AutoDealer',
    name: siteConfig.company.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gò Vấp',
      addressRegion: 'Hồ Chí Minh',
      addressCountry: 'VN',
    },
  },
  knowsAbout: ['Xe KIA', 'Xe Mazda', 'Tư vấn mua xe', 'Trả góp xe ô tô'],
}

const stats = [
  { number: '10+', label: 'Năm kinh nghiệm', icon: TrendingUp },
  { number: '5000+', label: 'Xe đã tư vấn', icon: Award },
  { number: '98%', label: 'Khách hàng hài lòng', icon: Star },
  { number: '24/7', label: 'Hỗ trợ tư vấn', icon: Headphones },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Trung Thực & Minh Bạch',
    description:
      'Tư vấn trung thực về ưu và nhược điểm từng dòng xe. Báo giá rõ ràng, không phát sinh chi phí ẩn.',
  },
  {
    icon: Users,
    title: 'Khách Hàng Là Ưu Tiên',
    description:
      'Lắng nghe nhu cầu, ngân sách và sở thích để đề xuất dòng xe phù hợp nhất — không bán xe đắt tiền không cần thiết.',
  },
  {
    icon: Award,
    title: 'Chuyên Môn Sâu',
    description:
      'Am hiểu toàn bộ dải sản phẩm KIA & Mazda, từ thông số kỹ thuật đến chính sách bảo hành, hỗ trợ trả góp.',
  },
  {
    icon: Target,
    title: 'Đồng Hành Dài Lâu',
    description:
      'Hỗ trợ từ khi chọn xe đến sau khi nhận xe: làm hồ sơ, đăng ký, bảo dưỡng định kỳ và các chương trình ưu đãi.',
  },
]

const services = [
  'Tư vấn chọn xe phù hợp nhu cầu & ngân sách',
  'Báo giá chính xác, cập nhật khuyến mãi mới nhất',
  'Hỗ trợ hồ sơ vay trả góp tại nhiều ngân hàng',
  'Giao xe tận nơi toàn TP.HCM và các tỉnh lân cận',
  'Tư vấn bảo hiểm xe chính hãng giá tốt',
  'Hỗ trợ đăng ký biển số, đăng kiểm',
  'Chăm sóc sau bán hàng, nhắc lịch bảo dưỡng',
  'Kết nối dịch vụ sửa chữa, phụ kiện chính hãng',
]

export default function GioiThieuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-10 md:py-16">
          <Container>
            <div className="mb-4">
              <Breadcrumbs items={[{ title: 'Giới Thiệu' }]} />
            </div>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Chuyên viên tư vấn xe ô tô
                </p>
                <h1 className="mt-2 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
                  {siteConfig.consultant.name}
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  {siteConfig.consultant.title}
                </p>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  {siteConfig.consultant.experience} Với phương châm &ldquo;Khách hàng là trung tâm&rdquo;,
                  mỗi khách hàng đều được tư vấn tận tâm, trung thực — giúp bạn chọn được chiếc xe
                  phù hợp nhất với nhu cầu và ngân sách.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto" asChild>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      {siteConfig.contact.phone}
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                    <Link href="/lien-he">Đặt lịch tư vấn</Link>
                  </Button>
                </div>
              </div>

              {/* Photo */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-2xl w-72 md:w-80">
                    <Image
                      src={siteConfig.consultant.photo}
                      alt={`${siteConfig.consultant.name} - ${siteConfig.consultant.title}`}
                      width={320}
                      height={400}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-accent/30 -z-10" />
                  {/* Badge */}
                  <div className="absolute -bottom-4 left-4 rounded-xl bg-primary px-4 py-2 text-primary-foreground shadow-lg">
                    <p className="text-xs font-medium">KIA & MAZDA Gò Vấp</p>
                    <p className="text-sm font-bold">{siteConfig.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="bg-primary py-12 text-primary-foreground">
          <Container>
            <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <item.icon className="h-7 w-7 opacity-70 mb-2" />
                  <p className="text-3xl font-bold md:text-4xl">{item.number}</p>
                  <p className="mt-1 text-sm opacity-80">{item.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Story */}
        <section className="py-14 md:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Câu Chuyện Của Tôi
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Tôi bắt đầu với nghề tư vấn xe ô tô vì niềm đam mê với ngành công nghiệp
                  xe hơi và mong muốn giúp khách hàng Việt Nam có được chiếc xe phù hợp với
                  mức giá tốt nhất. Trải qua nhiều năm gắn bó với thương hiệu KIA và Mazda,
                  tôi đã tích lũy được kiến thức sâu rộng về từng dòng sản phẩm.
                </p>
                <p>
                  Điều tôi tự hào nhất không phải là số lượng xe bán được, mà là sự tin tưởng
                  mà khách hàng dành cho tôi. Nhiều khách hàng đã giới thiệu người thân, bạn bè
                  đến gặp tôi — đó là phần thưởng lớn nhất trong sự nghiệp.
                </p>
                <p>
                  Với tôi, mỗi giao dịch là một mối quan hệ lâu dài. Tôi không chỉ giúp bạn
                  mua xe — tôi đồng hành cùng bạn trong suốt hành trình sở hữu xe: từ lúc chọn
                  xe, ký hợp đồng, nhận xe cho đến bảo dưỡng định kỳ và đổi xe mới.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="py-14 bg-secondary/30 md:py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Cam Kết Của Tôi
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Những giá trị tôi luôn giữ vững trong từng lần tư vấn.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-background p-6 shadow-sm border border-border/50"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Services */}
        <section className="py-14 md:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div>
                <h2 className="text-2xl font-bold text-primary md:text-3xl">
                  Dịch Vụ Tôi Cung Cấp
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Hỗ trợ toàn diện từ trước đến sau khi mua xe — bạn chỉ cần an tâm
                  lái xe, phần còn lại để tôi lo.
                </p>
                <ul className="mt-6 space-y-3">
                  {services.map((service) => (
                    <li key={service} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact card */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <h3 className="text-xl font-bold text-primary">Thông Tin Liên Hệ</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Liên hệ ngay để được tư vấn miễn phí — không mất phí, không áp lực.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Điện thoại / Zalo</p>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-sm hover:text-primary"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Showroom</p>
                      <p className="text-sm">{siteConfig.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Giờ làm việc</p>
                      <p className="text-sm">{siteConfig.contact.workingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Gọi ngay: {siteConfig.contact.phone}
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/lien-he">Gửi yêu cầu tư vấn</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Company info */}
        <section className="py-12 bg-secondary/30">
          <Container>
            <div className="mx-auto max-w-2xl rounded-xl border bg-background p-8">
              <h2 className="text-lg font-bold text-primary">Thông Tin Doanh Nghiệp</h2>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  { label: 'Tên công ty', value: siteConfig.company.name },
                  { label: 'Mã số thuế', value: siteConfig.company.taxCode },
                  { label: 'Địa chỉ', value: siteConfig.contact.address },
                  { label: 'Điện thoại', value: siteConfig.contact.phone },
                  { label: 'Email', value: siteConfig.contact.email },
                  { label: 'Giờ làm việc', value: siteConfig.contact.workingHours },
                ].map((row) => (
                  <div key={row.label}>
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
