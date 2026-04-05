import { Container } from '@/components/layout/Container'
import {
  ShieldCheck,
  CreditCard,
  Award,
  Truck,
  BadgeCheck,
  Headphones,
} from 'lucide-react'

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Xe Chính Hãng 100%',
    description: 'Cam kết xe mới 100% chính hãng, đầy đủ giấy tờ pháp lý.',
  },
  {
    icon: CreditCard,
    title: 'Trả Góp Đến 80%',
    description: 'Hỗ trợ vay trả góp lãi suất ưu đãi với thủ tục đơn giản.',
  },
  {
    icon: Award,
    title: 'Bảo Hành Chính Hãng',
    description: 'Bảo hành theo tiêu chuẩn nhà sản xuất trên toàn quốc.',
  },
  {
    icon: Truck,
    title: 'Giao Xe Tận Nơi',
    description: 'Giao xe miễn phí tận nhà trên toàn quốc, nhanh chóng.',
  },
  {
    icon: BadgeCheck,
    title: 'Giá Tốt Nhất',
    description: 'Cam kết giá tốt nhất thị trường, nhiều ưu đãi hấp dẫn.',
  },
  {
    icon: Headphones,
    title: 'Hỗ Trợ 24/7',
    description: 'Đội ngũ tư vấn chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc.',
  },
]

export function WhyVuKia() {
  return (
    <section className="py-16 bg-secondary/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Vì Sao Chọn VuKia?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            VuKia tự hào là đại lý ô tô uy tín hàng đầu với cam kết mang đến trải nghiệm mua xe tốt nhất cho khách hàng.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center rounded-xl bg-background p-8 shadow-sm border border-border/50 transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
