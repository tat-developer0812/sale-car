import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { siteConfig } from '@/config/site'
import { RefreshCw, CheckCircle, XCircle, ClipboardList } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chính Sách Đổi Trả - VuKia',
  description:
    'Chính sách đổi trả xe minh bạch, rõ ràng tại VuKia. Hỗ trợ đổi trả trong vòng 72 giờ nếu phát hiện lỗi kỹ thuật từ nhà sản xuất.',
  alternates: {
    canonical: `${siteConfig.url}/chinh-sach-doi-tra`,
  },
}

const acceptedReturns = [
  'Xe có lỗi kỹ thuật nghiêm trọng từ nhà sản xuất không thể khắc phục trong 3 lần sửa chữa.',
  'Số khung, số máy trên xe không khớp với thông tin trên hồ sơ đăng ký và hóa đơn.',
  'Xe không đúng màu sắc, phiên bản, hoặc tùy chọn trang bị so với hợp đồng mua bán.',
  'Xe bị hư hỏng nặng trong quá trình vận chuyển từ kho đến tay khách hàng.',
  'Xe thiếu trang bị theo hợp đồng mà VuKia không thể bổ sung trong thời gian 15 ngày.',
]

const rejectedReturns = [
  'Xe đã được sử dụng, có số kilomet vượt quá 200 km kể từ ngày giao xe.',
  'Khách hàng thay đổi ý định sau khi đã ký hợp đồng và nhận xe.',
  'Xe bị va đập, trầy xước, hoặc hư hỏng do lỗi của người dùng sau khi nhận xe.',
  'Yêu cầu đổi trả sau 72 giờ kể từ thời điểm giao xe mà không có biên bản ghi nhận lỗi.',
  'Các hư hỏng nhỏ thuộc phạm vi bảo hành thông thường (vẫn được xử lý theo chính sách bảo hành).',
]

const steps = [
  {
    step: '01',
    title: 'Liên Hệ Ngay Với VuKia',
    description:
      'Trong vòng 72 giờ kể từ khi nhận xe, nếu phát hiện bất kỳ vấn đề nào, hãy liên hệ ngay với chúng tôi qua hotline ' +
      siteConfig.contact.hotline +
      ' hoặc email ' +
      siteConfig.contact.email +
      '.',
  },
  {
    step: '02',
    title: 'Lập Biên Bản Xác Nhận',
    description:
      'Nhân viên kỹ thuật của VuKia sẽ đến kiểm tra trực tiếp và lập biên bản ghi nhận tình trạng xe, xác định nguyên nhân hư hỏng.',
  },
  {
    step: '03',
    title: 'Xét Duyệt Yêu Cầu',
    description:
      'Bộ phận kỹ thuật và ban lãnh đạo VuKia xem xét hồ sơ trong vòng 3 ngày làm việc. Kết quả sẽ được thông báo bằng văn bản cho khách hàng.',
  },
  {
    step: '04',
    title: 'Thực Hiện Đổi Xe',
    description:
      'Nếu yêu cầu được chấp thuận, VuKia hoàn thiện thủ tục đổi xe trong tối đa 15 ngày làm việc. Xe đổi cùng phiên bản, màu sắc và trang bị như hợp đồng gốc.',
  },
  {
    step: '05',
    title: 'Hoàn Tiền (Nếu Áp Dụng)',
    description:
      'Trường hợp không có xe cùng phiên bản để đổi, VuKia hoàn trả 100% giá trị hợp đồng trong vòng 7 ngày làm việc sau khi xác nhận đổi trả.',
  },
]

export default function ChinhSachDoiTraPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-primary md:text-5xl">
                Chính Sách Đổi Trả
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                VuKia đặt sự hài lòng của khách hàng lên hàng đầu. Chính sách đổi trả
                minh bạch, nhanh chóng giúp bạn mua xe hoàn toàn yên tâm.
              </p>
            </div>
          </Container>
        </section>

        {/* Commitment */}
        <section className="py-12">
          <Container>
            <div className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                VuKia hiểu rằng mua xe là khoản đầu tư lớn. Vì vậy, chúng tôi xây dựng chính sách
                đổi trả rõ ràng, công bằng để bảo vệ quyền lợi của khách hàng. Chính sách này áp dụng
                cho tất cả xe mua tại <strong className="text-foreground">VuKia</strong> và có hiệu lực
                kể từ ngày ký hợp đồng mua bán.
              </p>
            </div>
          </Container>
        </section>

        {/* Accepted / Rejected */}
        <section className="py-6 pb-12">
          <Container>
            <div className="mx-auto max-w-3xl grid gap-8 md:grid-cols-2">
              {/* Accepted */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Trường Hợp Được Đổi Trả</h2>
                </div>
                <ul className="space-y-3">
                  {acceptedReturns.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rejected */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Trường Hợp Không Được Đổi Trả</h2>
                </div>
                <ul className="space-y-3">
                  {rejectedReturns.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="py-14 bg-secondary/30">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Quy Trình Đổi Trả</h2>
              </div>
              <div className="space-y-6">
                {steps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Note */}
        <section className="py-10">
          <Container>
            <div className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-900">
              <p className="font-semibold mb-2">Lưu ý quan trọng:</p>
              <p>
                Chính sách đổi trả này không ảnh hưởng đến quyền bảo hành hợp pháp của khách hàng
                theo quy định pháp luật Việt Nam. Mọi tranh chấp phát sinh (nếu có) sẽ được giải quyết
                theo quy định của pháp luật Việt Nam hiện hành. VuKia bảo lưu quyền thay đổi chính sách
                này sau khi thông báo trước 30 ngày trên website chính thức.
              </p>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-14 bg-primary text-primary-foreground">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <RefreshCw className="mx-auto mb-4 h-10 w-10 opacity-80" />
              <h2 className="text-2xl font-bold md:text-3xl">Có Thắc Mắc Về Đổi Trả?</h2>
              <p className="mt-4 opacity-80">
                Đội ngũ chăm sóc khách hàng VuKia luôn sẵn sàng giải đáp mọi thắc mắc.
              </p>
              <div className="mt-6 flex flex-col items-center gap-2 text-sm opacity-90">
                <p>
                  <strong>Hotline:</strong>{' '}
                  <a href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`} className="underline">
                    {siteConfig.contact.hotline}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong> {siteConfig.contact.email}
                </p>
                <p>
                  <strong>Giờ làm việc:</strong> {siteConfig.contact.workingHours}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
