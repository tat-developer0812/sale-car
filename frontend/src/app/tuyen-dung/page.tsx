import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { MapPin, Phone, Mail, Clock, Users, Award, TrendingUp, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tuyển Dụng - VuKia',
  description:
    'VuKia đang tuyển dụng các vị trí: Chuyên viên tư vấn bán hàng xe ô tô KIA, Mazda tại Gò Vấp TP.HCM. Môi trường làm việc chuyên nghiệp, thu nhập hấp dẫn.',
  alternates: {
    canonical: `${siteConfig.url}/tuyen-dung`,
  },
}

const benefits = [
  {
    icon: TrendingUp,
    title: 'Thu nhập hấp dẫn',
    description: 'Lương cơ bản + hoa hồng không giới hạn. Thu nhập 15–40 triệu/tháng.',
  },
  {
    icon: Award,
    title: 'Đào tạo chuyên sâu',
    description: 'Được đào tạo bài bản về sản phẩm, kỹ năng bán hàng và tư vấn khách hàng.',
  },
  {
    icon: Users,
    title: 'Môi trường thân thiện',
    description: 'Văn hóa làm việc cởi mở, đồng nghiệp nhiệt tình, sếp hỗ trợ.',
  },
  {
    icon: Heart,
    title: 'Phúc lợi đầy đủ',
    description: 'BHXH, BHYT, thưởng lễ tết, du lịch hằng năm, phụ cấp ăn trưa.',
  },
]

const positions = [
  {
    title: 'Chuyên Viên Tư Vấn Bán Hàng Xe Ô Tô',
    type: 'Toàn thời gian',
    location: 'KIA - MAZDA Gò Vấp, TP.HCM',
    salary: '15 - 40 triệu VNĐ/tháng',
    requirements: [
      'Tốt nghiệp THPT trở lên, ưu tiên ngành Kinh tế, Kinh doanh',
      'Ngoại hình ưa nhìn, giao tiếp tốt, nhiệt huyết',
      'Có kinh nghiệm bán hàng là lợi thế (không bắt buộc)',
      'Có xe máy và điện thoại di động',
      'Yêu thích xe hơi, chăm chỉ và trung thực',
    ],
    responsibilities: [
      'Tư vấn, giới thiệu sản phẩm xe ô tô KIA, Mazda cho khách hàng',
      'Hỗ trợ khách hàng hoàn tất thủ tục mua xe, trả góp',
      'Chăm sóc và duy trì quan hệ khách hàng sau bán hàng',
      'Phối hợp cùng đội nhóm hoàn thành mục tiêu doanh số',
    ],
  },
  {
    title: 'Nhân Viên Hỗ Trợ Kinh Doanh',
    type: 'Toàn thời gian / Bán thời gian',
    location: 'KIA - MAZDA Gò Vấp, TP.HCM',
    salary: '8 - 15 triệu VNĐ/tháng',
    requirements: [
      'Tốt nghiệp THPT trở lên',
      'Thành thạo vi tính văn phòng',
      'Cẩn thận, tỉ mỉ, có trách nhiệm trong công việc',
      'Ưu tiên ứng viên có kinh nghiệm làm việc tại showroom xe',
    ],
    responsibilities: [
      'Hỗ trợ xử lý hồ sơ mua xe, đăng ký xe',
      'Quản lý thông tin khách hàng trên hệ thống',
      'Hỗ trợ các chương trình marketing và sự kiện',
      'Phụ trách các công việc văn phòng khác theo yêu cầu',
    ],
  },
]

export default function TuyenDungPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-10 md:py-16">
          <Container>
            <div className="mb-4">
              <Breadcrumbs items={[{ title: 'Tuyển Dụng' }]} />
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-primary md:text-4xl">
                Tuyển Dụng Tại VuKia
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Gia nhập đội ngũ VuKia – nơi bạn được phát triển sự nghiệp trong ngành ô tô
                với thu nhập hấp dẫn và môi trường làm việc chuyên nghiệp.
              </p>
            </div>
          </Container>
        </section>

        {/* Benefits */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Tại Sao Nên Gia Nhập VuKia?
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-xl border border-border/50 bg-background p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground md:text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Job Positions */}
        <section className="py-12 bg-secondary/30 md:py-16">
          <Container>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Vị Trí Đang Tuyển
              </h2>
              <p className="mt-3 text-muted-foreground">
                Chúng tôi đang tìm kiếm những ứng viên tiềm năng và nhiệt huyết.
              </p>
            </div>

            <div className="space-y-6">
              {positions.map((pos) => (
                <Card key={pos.title} className="overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <CardTitle className="text-lg text-primary md:text-xl">{pos.title}</CardTitle>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <Clock className="h-3 w-3" />
                            {pos.type}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                            <MapPin className="h-3 w-3" />
                            {pos.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-muted-foreground">Mức lương</p>
                        <p className="font-semibold text-accent">{pos.salary}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold text-sm mb-3">Yêu cầu ứng viên</h4>
                        <ul className="space-y-2">
                          {pos.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-3">Mô tả công việc</h4>
                        <ul className="space-y-2">
                          {pos.responsibilities.map((res) => (
                            <li key={res} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-muted-foreground">
                        Gửi CV + thông tin qua điện thoại hoặc email bên dưới
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto" asChild>
                          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            Gọi ngay
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                          <a href={`mailto:${siteConfig.contact.email}?subject=Ứng tuyển: ${pos.title}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Gửi CV qua email
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Application CTA */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">Sẵn Sàng Ứng Tuyển?</h2>
              <p className="mt-4 opacity-90">
                Liên hệ trực tiếp để được hỗ trợ nộp hồ sơ và trao đổi thêm về cơ hội nghề nghiệp tại VuKia.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto" asChild>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {siteConfig.contact.phone}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-white/40 text-white hover:bg-white/10 sm:w-auto" asChild>
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    {siteConfig.contact.email}
                  </a>
                </Button>
              </div>
              <div className="mt-6 flex flex-col items-center gap-2 text-sm opacity-80 sm:flex-row sm:justify-center sm:gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {siteConfig.contact.address}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {siteConfig.contact.workingHours}
                </span>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
