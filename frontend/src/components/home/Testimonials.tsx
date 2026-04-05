import { Container } from '@/components/layout/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Anh Nguyễn Văn A',
    car: 'Toyota Camry 2.5Q',
    rating: 5,
    content:
      'Rất hài lòng với dịch vụ tại VuKia. Nhân viên tư vấn nhiệt tình, thủ tục nhanh gọn, giá cả cạnh tranh. Sẽ giới thiệu cho bạn bè.',
    location: 'TP. Hồ Chí Minh',
  },
  {
    name: 'Chị Trần Thị B',
    car: 'Hyundai Tucson 2.0',
    rating: 5,
    content:
      'Mua xe tại VuKia rất yên tâm. Xe giao đúng hẹn, được hỗ trợ trả góp nhanh chóng. Cảm ơn đội ngũ VuKia.',
    location: 'Hà Nội',
  },
  {
    name: 'Anh Lê Minh C',
    car: 'Mazda CX-5 Premium',
    rating: 5,
    content:
      'Lần đầu mua xe nhưng được VuKia tư vấn rất chi tiết từ A-Z. Giá tốt hơn nhiều nơi khác, lại còn tặng phụ kiện.',
    location: 'Đà Nẵng',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Khách Hàng Nói Gì Về VuKia?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="relative">
              <CardContent className="pt-8 pb-6 px-6">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                <StarRating rating={item.rating} />
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div className="mt-6 border-t pt-4">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.car}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
