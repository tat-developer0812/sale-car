import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { siteConfig } from '@/config/site'
import { ShieldCheck, Clock, Wrench, FileText, AlertCircle, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Hành - VuKia',
  description:
    'Chính sách bảo hành chính hãng tại VuKia. Cam kết bảo hành toàn diện, hỗ trợ nhanh chóng trong suốt thời gian bảo hành.',
  alternates: {
    canonical: `${siteConfig.url}/chinh-sach-bao-hanh`,
  },
}

const warrantyItems = [
  {
    icon: Clock,
    title: 'Thời Gian Bảo Hành',
    content: [
      'Xe mới chính hãng: Bảo hành tối thiểu 3 năm hoặc 100.000 km (tùy điều kiện nào đến trước).',
      'Động cơ và hộp số: Bảo hành 5 năm hoặc 150.000 km theo chính sách hãng.',
      'Phụ kiện chính hãng đi kèm xe: Bảo hành 12 tháng kể từ ngày xuất hóa đơn.',
      'Sơn và chống rỉ thân vỏ: Bảo hành 5 năm theo tiêu chuẩn nhà sản xuất.',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Phạm Vi Bảo Hành',
    content: [
      'Các hư hỏng do lỗi kỹ thuật hoặc lỗi từ nhà sản xuất trong quá trình sản xuất.',
      'Các bộ phận cơ khí, điện tử bị hỏng trong điều kiện sử dụng bình thường theo hướng dẫn.',
      'Thay thế miễn phí linh kiện chính hãng theo yêu cầu của hãng xe trong thời gian bảo hành.',
      'Chi phí nhân công sửa chữa, kiểm tra và chạy thử xe sau bảo hành.',
    ],
  },
  {
    icon: AlertCircle,
    title: 'Các Trường Hợp Không Được Bảo Hành',
    content: [
      'Hư hỏng do tai nạn, va đập, ngập nước hoặc thiên tai (lũ lụt, cháy nổ, động đất).',
      'Xe bị sửa chữa, thay thế phụ tùng không chính hãng tại các cơ sở không được ủy quyền.',
      'Hư hỏng do không thực hiện đúng lịch bảo dưỡng định kỳ theo quy định của hãng.',
      'Mài mòn tự nhiên của các bộ phận hao mòn: lốp xe, má phanh, bóng đèn, ắc quy.',
      'Hư hỏng do sử dụng sai mục đích hoặc vượt tải trọng cho phép.',
      'Các vết xước, móp nhỏ trên thân vỏ do va chạm trong quá trình sử dụng.',
    ],
  },
  {
    icon: Wrench,
    title: 'Điều Kiện Để Được Bảo Hành',
    content: [
      'Xuất trình sổ bảo hành và hóa đơn mua xe gốc do VuKia cấp.',
      'Xe phải được bảo dưỡng định kỳ đúng hạn tại VuKia hoặc các trạm dịch vụ được ủy quyền.',
      'Không tự ý tháo dỡ, sửa chữa hoặc can thiệp vào hệ thống điện tử, động cơ khi chưa có sự cho phép.',
      'Thông báo cho VuKia trong vòng 7 ngày kể từ khi phát hiện hư hỏng.',
      'Số khung xe và số máy phải khớp với thông tin ghi trên giấy tờ xe.',
    ],
  },
  {
    icon: FileText,
    title: 'Thủ Tục Yêu Cầu Bảo Hành',
    content: [
      'Bước 1: Liên hệ hotline ' + siteConfig.contact.hotline + ' để đặt lịch hẹn bảo hành.',
      'Bước 2: Mang xe đến showroom VuKia tại ' + siteConfig.contact.address + '.',
      'Bước 3: Xuất trình sổ bảo hành, hóa đơn mua xe và CMND/CCCD của chủ xe.',
      'Bước 4: Kỹ thuật viên tiếp nhận và kiểm tra xe, xác nhận phạm vi bảo hành.',
      'Bước 5: VuKia thực hiện bảo hành và bàn giao xe trong thời gian cam kết.',
    ],
  },
]

export default function ChinhSachBaoHanhPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-primary md:text-5xl">
                Chính Sách Bảo Hành
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                VuKia cam kết bảo hành chính hãng toàn diện, mang đến sự an tâm tuyệt đối
                cho khách hàng trong suốt thời gian sở hữu xe.
              </p>
            </div>
          </Container>
        </section>

        {/* Intro */}
        <section className="py-12">
          <Container>
            <div className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-6 text-sm leading-relaxed text-muted-foreground">
              <p>
                Tại <strong className="text-foreground">VuKia</strong>, mỗi chiếc xe bán ra đều đi kèm
                chính sách bảo hành chính hãng đầy đủ. Chúng tôi hợp tác trực tiếp với các nhà sản xuất
                để đảm bảo khách hàng nhận được dịch vụ bảo hành chất lượng cao nhất. Dưới đây là toàn bộ
                chính sách bảo hành áp dụng cho tất cả xe mua tại VuKia.
              </p>
            </div>
          </Container>
        </section>

        {/* Policy sections */}
        <section className="py-6 pb-16">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10">
              {warrantyItems.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">{item.title}</h2>
                  </div>
                  <ul className="space-y-2 pl-4">
                    {item.content.map((line, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/50" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Contact CTA */}
        <section className="py-14 bg-secondary/30">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Phone className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Cần Hỗ Trợ Bảo Hành?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Đội ngũ kỹ thuật viên của VuKia luôn sẵn sàng hỗ trợ bạn.
                Liên hệ ngay để được tư vấn và đặt lịch bảo hành nhanh nhất.
              </p>
              <div className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <p>
                  <strong>Hotline:</strong>{' '}
                  <a href={`tel:${siteConfig.contact.hotline.replace(/\s/g, '')}`} className="text-primary font-semibold hover:underline">
                    {siteConfig.contact.hotline}
                  </a>
                </p>
                <p>
                  <strong>Điện thoại:</strong>{' '}
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                    {siteConfig.contact.phone}
                  </a>
                </p>
                <p><strong>Email:</strong> {siteConfig.contact.email}</p>
                <p><strong>Địa chỉ:</strong> {siteConfig.contact.address}</p>
                <p><strong>Giờ làm việc:</strong> {siteConfig.contact.workingHours}</p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
