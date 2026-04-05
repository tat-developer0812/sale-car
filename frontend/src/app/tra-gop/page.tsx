import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { InstallmentCalculator } from '@/components/home/InstallmentCalculator'
import { FAQSection } from '@/components/home/FAQSection'
import { CTASection } from '@/components/home/CTASection'
import { siteConfig } from '@/config/site'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mua Xe Ô Tô Trả Góp - Lãi Suất Ưu Đãi Tại VuKia',
  description:
    'Mua xe ô tô trả góp lãi suất ưu đãi tại VuKia. Hỗ trợ vay đến 80% giá trị xe, thủ tục đơn giản, duyệt hồ sơ nhanh 24h. Tính trả góp ngay!',
  keywords: [
    'mua xe trả góp',
    'xe ô tô trả góp',
    'trả góp mua xe',
    'lãi suất mua xe trả góp',
    'vay mua xe ô tô',
    'tính trả góp xe ô tô',
    'mua xe trả góp VuKia',
  ],
  alternates: {
    canonical: `${siteConfig.url}/tra-gop`,
  },
}

const benefits = [
  'Vay tối đa 80% giá trị xe',
  'Lãi suất ưu đãi từ 6.5%/năm',
  'Thời hạn vay linh hoạt 1-8 năm',
  'Duyệt hồ sơ nhanh trong 24h',
  'Thủ tục đơn giản, tối thiểu giấy tờ',
  'Hỗ trợ nhiều ngân hàng đối tác',
  'Không phí trả nợ trước hạn',
  'Tư vấn miễn phí phương án tài chính',
]

const steps = [
  {
    step: 1,
    title: 'Chọn xe yêu thích',
    description: 'Tìm và chọn dòng xe phù hợp với nhu cầu và ngân sách của bạn tại VuKia.',
  },
  {
    step: 2,
    title: 'Tư vấn tài chính',
    description: 'Chuyên viên VuKia sẽ tư vấn phương án trả góp tối ưu nhất cho bạn.',
  },
  {
    step: 3,
    title: 'Nộp hồ sơ',
    description: 'Chuẩn bị CCCD, hộ khẩu, xác nhận thu nhập. VuKia hỗ trợ hoàn thiện hồ sơ.',
  },
  {
    step: 4,
    title: 'Nhận xe',
    description: 'Sau khi duyệt hồ sơ (24h), bạn ký hợp đồng và nhận xe ngay tại showroom hoặc giao tận nhà.',
  },
]

export default function TraGopPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-primary md:text-5xl">
                Mua Xe Ô Tô Trả Góp Tại VuKia
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Sở hữu xe ô tô trong mơ dễ dàng với chương trình trả góp lãi suất ưu đãi.
                VuKia hỗ trợ vay đến 80% giá trị xe, thủ tục đơn giản.
              </p>
            </div>
          </Container>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <Container>
            <h2 className="text-2xl font-bold text-primary text-center mb-10 md:text-3xl">
              Ưu Điểm Trả Góp Tại VuKia
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Calculator */}
        <InstallmentCalculator />

        {/* Steps */}
        <section className="py-16">
          <Container>
            <h2 className="text-2xl font-bold text-primary text-center mb-10 md:text-3xl">
              Quy Trình Mua Xe Trả Góp
            </h2>
            <div className="grid gap-8 md:grid-cols-4 max-w-4xl mx-auto">
              {steps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
