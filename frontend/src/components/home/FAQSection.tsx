import { Container } from '@/components/layout/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const homeFAQs = [
  {
    question: 'VuKia có hỗ trợ mua xe trả góp không?',
    answer:
      'Có, VuKia hỗ trợ mua xe trả góp lên đến 80% giá trị xe với lãi suất ưu đãi từ các ngân hàng đối tác. Thủ tục đơn giản, duyệt hồ sơ nhanh trong 24h.',
  },
  {
    question: 'Thời gian bảo hành xe tại VuKia là bao lâu?',
    answer:
      'Tất cả xe mới tại VuKia đều được bảo hành theo tiêu chuẩn chính hãng, thường từ 3-5 năm hoặc 100.000-150.000 km tùy hãng xe. Bảo hành được áp dụng tại tất cả các đại lý ủy quyền trên toàn quốc.',
  },
  {
    question: 'VuKia có giao xe tận nơi không?',
    answer:
      'VuKia hỗ trợ giao xe miễn phí tận nơi trên toàn quốc. Xe được vận chuyển bằng xe chuyên dụng, đảm bảo an toàn tuyệt đối.',
  },
  {
    question: 'Giá xe tại VuKia có tốt hơn đại lý khác không?',
    answer:
      'VuKia cam kết mang đến giá tốt nhất thị trường. Ngoài ra, khách hàng còn được tặng kèm nhiều phụ kiện và ưu đãi hấp dẫn khi mua xe tại VuKia.',
  },
  {
    question: 'Tôi cần chuẩn bị gì khi mua xe trả góp?',
    answer:
      'Để mua xe trả góp, bạn cần: CMND/CCCD, Hộ khẩu (hoặc KT3), Giấy xác nhận thu nhập hoặc sao kê ngân hàng 3 tháng gần nhất. VuKia sẽ hỗ trợ tư vấn chi tiết hồ sơ cho từng trường hợp.',
  },
  {
    question: 'VuKia có nhận đổi xe cũ lấy xe mới không?',
    answer:
      'Có, VuKia hỗ trợ chương trình đổi xe cũ lấy xe mới (Trade-in). Xe cũ của bạn sẽ được định giá minh bạch, hỗ trợ chênh lệch trả góp.',
  },
]

export function FAQSection() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-16 bg-secondary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến khi mua xe ô tô tại VuKia.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {homeFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
