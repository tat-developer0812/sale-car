import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { siteConfig } from '@/config/site'
import { Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật - VuKia',
  description:
    'Chính sách bảo mật thông tin cá nhân tại VuKia. Chúng tôi cam kết bảo vệ dữ liệu của bạn theo tiêu chuẩn cao nhất.',
  alternates: {
    canonical: `${siteConfig.url}/chinh-sach-bao-mat`,
  },
}

const sections = [
  {
    id: '1',
    title: '1. Giới Thiệu',
    paragraphs: [
      siteConfig.company.name +
        ' (mã số thuế: ' +
        siteConfig.company.taxCode +
        ') cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách Bảo Mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin khi bạn sử dụng website ' +
        siteConfig.url +
        '.',
      'Chính sách này tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân của Việt Nam và các quy định pháp luật liên quan. Bằng việc sử dụng Website, bạn đồng ý với nội dung Chính sách Bảo Mật này.',
    ],
  },
  {
    id: '2',
    title: '2. Thông Tin Chúng Tôi Thu Thập',
    paragraphs: [
      'Thông tin bạn chủ động cung cấp: Họ và tên, số điện thoại, địa chỉ email, địa chỉ liên hệ khi bạn điền vào biểu mẫu tư vấn, đặt lịch hẹn hoặc đăng ký nhận tin trên Website.',
      'Thông tin giao dịch: Thông tin liên quan đến hợp đồng mua bán xe, phương thức thanh toán (không bao gồm số thẻ hay mật khẩu), lịch sử giao dịch với VuKia.',
      'Thông tin tự động: Địa chỉ IP, loại thiết bị, trình duyệt, trang đã truy cập, thời gian sử dụng và dữ liệu cookie nhằm cải thiện trải nghiệm người dùng.',
      'Thông tin từ bên thứ ba: VuKia có thể nhận thông tin từ các nền tảng mạng xã hội (Facebook, Zalo) khi bạn đồng ý chia sẻ khi đăng nhập qua các nền tảng đó.',
    ],
  },
  {
    id: '3',
    title: '3. Mục Đích Sử Dụng Thông Tin',
    paragraphs: [
      'Cung cấp dịch vụ: Xử lý yêu cầu tư vấn, hỗ trợ mua xe, đặt lịch hẹn và thực hiện hợp đồng mua bán.',
      'Chăm sóc khách hàng: Liên hệ sau bán hàng, hỗ trợ bảo hành, gửi thông báo về dịch vụ và khuyến mãi liên quan.',
      'Cải thiện dịch vụ: Phân tích hành vi người dùng để tối ưu hóa Website, cá nhân hóa nội dung hiển thị và nâng cao chất lượng dịch vụ.',
      'Tuân thủ pháp luật: Lưu trữ hồ sơ giao dịch theo yêu cầu của cơ quan nhà nước có thẩm quyền.',
      'Tiếp thị và quảng cáo: Gửi thông tin về xe mới, chương trình khuyến mãi và sự kiện (bạn có thể hủy đăng ký bất kỳ lúc nào).',
    ],
  },
  {
    id: '4',
    title: '4. Chia Sẻ Thông Tin',
    paragraphs: [
      'VuKia không bán, cho thuê hay trao đổi thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại.',
      'Chúng tôi có thể chia sẻ thông tin trong các trường hợp: (a) Đối tác cung cấp dịch vụ cho VuKia (công ty bảo hiểm, tổ chức tài chính hỗ trợ vay mua xe) với cam kết bảo mật tương đương; (b) Cơ quan nhà nước khi có yêu cầu hợp pháp; (c) Trong trường hợp sáp nhập, mua lại doanh nghiệp, thông tin sẽ được chuyển giao với thông báo trước cho người dùng.',
    ],
  },
  {
    id: '5',
    title: '5. Bảo Mật Thông Tin',
    paragraphs: [
      'VuKia áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát, tiết lộ hoặc phá hủy, bao gồm:',
      'Mã hóa SSL/TLS cho toàn bộ dữ liệu truyền tải. Hạn chế quyền truy cập nội bộ theo nguyên tắc tối thiểu đặc quyền. Sao lưu dữ liệu định kỳ. Kiểm tra bảo mật định kỳ. Đào tạo nhân viên về bảo mật thông tin.',
      'Tuy nhiên, không có hệ thống bảo mật nào là hoàn toàn tuyệt đối. Nếu phát hiện sự cố bảo mật ảnh hưởng đến dữ liệu của bạn, VuKia sẽ thông báo trong vòng 72 giờ theo quy định pháp luật.',
    ],
  },
  {
    id: '6',
    title: '6. Cookie Và Công Nghệ Theo Dõi',
    paragraphs: [
      'Website sử dụng cookie và các công nghệ tương tự để ghi nhớ sở thích của bạn, phân tích lưu lượng truy cập và cải thiện trải nghiệm. Chúng tôi sử dụng Google Analytics, Facebook Pixel và các công cụ phân tích tương tự.',
      'Bạn có thể kiểm soát cookie thông qua cài đặt trình duyệt. Việc tắt cookie có thể ảnh hưởng đến một số chức năng của Website.',
    ],
  },
  {
    id: '7',
    title: '7. Thời Gian Lưu Trữ',
    paragraphs: [
      'Thông tin khách hàng tiềm năng (chưa phát sinh giao dịch): Lưu trữ tối đa 24 tháng từ lần tương tác cuối.',
      'Thông tin giao dịch mua bán xe: Lưu trữ tối thiểu 10 năm theo quy định pháp luật về kế toán và thuế.',
      'Dữ liệu phân tích ẩn danh: Có thể lưu trữ vô thời hạn phục vụ mục đích nghiên cứu thống kê.',
    ],
  },
  {
    id: '8',
    title: '8. Quyền Của Bạn',
    paragraphs: [
      'Theo pháp luật Việt Nam, bạn có các quyền sau đối với thông tin cá nhân của mình: Quyền biết; Quyền đồng ý hoặc không đồng ý; Quyền truy cập; Quyền rút lại sự đồng ý; Quyền xóa dữ liệu; Quyền hạn chế xử lý; Quyền phản đối; Quyền khiếu nại.',
      'Để thực hiện các quyền trên, vui lòng liên hệ với chúng tôi qua email ' +
        siteConfig.contact.email +
        '. Chúng tôi sẽ phản hồi trong vòng 30 ngày làm việc.',
    ],
  },
  {
    id: '9',
    title: '9. Thông Tin Trẻ Em',
    paragraphs: [
      'Website VuKia không hướng đến người dùng dưới 18 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân của trẻ em. Nếu bạn là phụ huynh và biết rằng con mình đã cung cấp thông tin cho chúng tôi, vui lòng liên hệ để chúng tôi xóa thông tin đó.',
    ],
  },
  {
    id: '10',
    title: '10. Thay Đổi Chính Sách',
    paragraphs: [
      'VuKia có thể cập nhật Chính sách Bảo Mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về những thay đổi quan trọng qua email hoặc thông báo nổi bật trên Website. Ngày cập nhật mới nhất sẽ luôn hiển thị đầu trang.',
    ],
  },
  {
    id: '11',
    title: '11. Liên Hệ Về Bảo Mật',
    paragraphs: ['Nếu bạn có câu hỏi, khiếu nại hoặc yêu cầu liên quan đến Chính sách Bảo Mật, hãy liên hệ:'],
    contact: true,
  },
]

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Lock className="mx-auto mb-5 h-12 w-12 text-primary" />
              <h1 className="text-3xl font-bold text-primary md:text-5xl">
                Chính Sách Bảo Mật
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                VuKia cam kết bảo vệ thông tin cá nhân của bạn theo tiêu chuẩn bảo mật cao nhất
                và tuân thủ pháp luật bảo vệ dữ liệu cá nhân Việt Nam.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Cập nhật lần cuối: Tháng 01, 2025
              </p>
            </div>
          </Container>
        </section>

        {/* Content */}
        <section className="py-14">
          <Container>
            <div className="mx-auto max-w-3xl space-y-10">
              {sections.map((section) => (
                <div key={section.id} id={`section-${section.id}`}>
                  <h2 className="text-lg font-bold text-primary mb-3">{section.title}</h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((para, i) => (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                    {section.contact && (
                      <div className="mt-4 rounded-lg border bg-secondary/30 p-4 text-sm text-muted-foreground space-y-1">
                        <p><strong className="text-foreground">Công ty:</strong> {siteConfig.company.name}</p>
                        <p><strong className="text-foreground">Mã số thuế:</strong> {siteConfig.company.taxCode}</p>
                        <p><strong className="text-foreground">Địa chỉ:</strong> {siteConfig.contact.address}</p>
                        <p>
                          <strong className="text-foreground">Email bảo mật:</strong>{' '}
                          <a
                            href={`mailto:privacy@vukia.vn`}
                            className="text-primary hover:underline"
                          >
                            privacy@vukia.vn
                          </a>
                        </p>
                        <p>
                          <strong className="text-foreground">Điện thoại:</strong>{' '}
                          <a
                            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                            className="text-primary hover:underline"
                          >
                            {siteConfig.contact.phone}
                          </a>
                        </p>
                        <p><strong className="text-foreground">Giờ làm việc:</strong> {siteConfig.contact.workingHours}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
