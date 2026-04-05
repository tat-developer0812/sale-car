import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng - VuKia',
  description:
    'Điều khoản sử dụng website VuKia. Vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.',
  alternates: {
    canonical: `${siteConfig.url}/dieu-khoan-su-dung`,
  },
}

const sections = [
  {
    id: '1',
    title: '1. Chấp Nhận Điều Khoản',
    paragraphs: [
      'Bằng việc truy cập và sử dụng website ' + siteConfig.url + ' (sau đây gọi là "Website"), bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều Khoản Sử Dụng này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng Website.',
      'Các điều khoản này áp dụng cho tất cả người dùng Website, bao gồm người dùng thông thường, khách hàng đăng ký thành viên và bất kỳ người nào tương tác với nội dung trên Website.',
    ],
  },
  {
    id: '2',
    title: '2. Mô Tả Dịch Vụ',
    paragraphs: [
      siteConfig.company.name + ' (gọi tắt là "VuKia") cung cấp nền tảng thông tin và thương mại điện tử cho phép người dùng tìm kiếm, tra cứu thông tin xe ô tô, liên hệ tư vấn, đặt lịch hẹn và thực hiện các giao dịch mua bán xe.',
      'VuKia có quyền thay đổi, tạm ngừng hoặc chấm dứt bất kỳ dịch vụ nào trên Website mà không cần thông báo trước. Chúng tôi sẽ không chịu trách nhiệm đối với người dùng hoặc bên thứ ba về những thay đổi này.',
    ],
  },
  {
    id: '3',
    title: '3. Quyền Và Nghĩa Vụ Của Người Dùng',
    paragraphs: [
      'Người dùng có quyền tra cứu thông tin xe, liên hệ tư vấn miễn phí, đăng ký nhận thông báo khuyến mãi và sử dụng các tiện ích trên Website theo đúng mục đích.',
      'Người dùng cam kết: (a) Cung cấp thông tin chính xác, đầy đủ khi đăng ký hoặc liên hệ; (b) Không sử dụng Website cho mục đích bất hợp pháp; (c) Không can thiệp vào hoạt động bình thường của Website; (d) Không thu thập thông tin của người dùng khác mà không có sự cho phép.',
      'Người dùng hoàn toàn chịu trách nhiệm về mọi hoạt động phát sinh từ tài khoản của mình. Trường hợp phát hiện truy cập trái phép, hãy thông báo ngay cho VuKia qua email ' + siteConfig.contact.email + '.',
    ],
  },
  {
    id: '4',
    title: '4. Sở Hữu Trí Tuệ',
    paragraphs: [
      'Toàn bộ nội dung trên Website bao gồm văn bản, hình ảnh, logo, biểu tượng, âm thanh, đoạn mã phần mềm và thiết kế giao diện đều là tài sản của VuKia hoặc các đối tác cấp phép, được bảo hộ theo luật sở hữu trí tuệ Việt Nam và quốc tế.',
      'Người dùng không được sao chép, phân phối, xuất bản, bán lại hay tạo ra các sản phẩm phái sinh từ nội dung Website mà không có văn bản cho phép của VuKia. Sử dụng cho mục đích cá nhân, phi thương mại và có trích dẫn nguồn rõ ràng được cho phép trong giới hạn hợp lý.',
    ],
  },
  {
    id: '5',
    title: '5. Thông Tin Sản Phẩm Và Giá Cả',
    paragraphs: [
      'VuKia nỗ lực đảm bảo tính chính xác của thông tin xe, giá cả và tình trạng hàng trên Website. Tuy nhiên, thông tin có thể thay đổi mà không cần thông báo trước do biến động thị trường, chính sách hãng xe hoặc các yếu tố khách quan khác.',
      'Giá niêm yết trên Website chỉ mang tính chất tham khảo. Giá bán chính thức sẽ được xác nhận qua hợp đồng mua bán sau khi hai bên thỏa thuận. VuKia không chịu trách nhiệm về chênh lệch giá do biến động thị trường trong thời gian chờ giao xe.',
    ],
  },
  {
    id: '6',
    title: '6. Liên Kết Bên Thứ Ba',
    paragraphs: [
      'Website có thể chứa các liên kết đến trang web của bên thứ ba. Các liên kết này chỉ nhằm mục đích cung cấp thêm thông tin tham khảo cho người dùng. VuKia không kiểm soát nội dung của các trang web bên ngoài và không chịu trách nhiệm về nội dung, chính sách bảo mật hay hoạt động của các trang đó.',
    ],
  },
  {
    id: '7',
    title: '7. Giới Hạn Trách Nhiệm',
    paragraphs: [
      'Website được cung cấp "nguyên trạng" và "theo khả năng sẵn có". VuKia không đảm bảo Website hoạt động liên tục, không bị gián đoạn hoặc không có lỗi kỹ thuật.',
      'Trong phạm vi tối đa được pháp luật cho phép, VuKia không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hay hệ quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng Website.',
    ],
  },
  {
    id: '8',
    title: '8. Chính Sách Bình Luận Và Đánh Giá',
    paragraphs: [
      'Người dùng có thể để lại đánh giá và bình luận về xe trên Website. Nội dung đăng tải phải trung thực, không vi phạm pháp luật, không chứa ngôn từ thù địch, phân biệt đối xử, thông tin cá nhân của người khác hoặc nội dung quảng cáo trái phép.',
      'VuKia có quyền xóa, chỉnh sửa hoặc từ chối đăng bất kỳ nội dung nào vi phạm các tiêu chuẩn trên mà không cần thông báo trước.',
    ],
  },
  {
    id: '9',
    title: '9. Thay Đổi Điều Khoản',
    paragraphs: [
      'VuKia có quyền cập nhật, sửa đổi Điều Khoản Sử Dụng này bất kỳ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay sau khi đăng tải trên Website. Việc tiếp tục sử dụng Website sau khi thay đổi được công bố đồng nghĩa với việc bạn chấp nhận Điều Khoản mới.',
    ],
  },
  {
    id: '10',
    title: '10. Luật Áp Dụng Và Giải Quyết Tranh Chấp',
    paragraphs: [
      'Điều Khoản Sử Dụng này được điều chỉnh bởi pháp luật Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp phát sinh từ hoặc liên quan đến các điều khoản này sẽ được giải quyết trước tiên bằng thương lượng thiện chí giữa hai bên.',
      'Nếu không đạt được thỏa thuận, tranh chấp sẽ được đưa ra Tòa án nhân dân có thẩm quyền tại TP. Hồ Chí Minh để giải quyết theo quy định của pháp luật.',
    ],
  },
  {
    id: '11',
    title: '11. Liên Hệ',
    paragraphs: [
      'Nếu bạn có câu hỏi về Điều Khoản Sử Dụng này, vui lòng liên hệ với chúng tôi:',
    ],
    contact: true,
  },
]

export default function DieuKhoanSuDungPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold text-primary md:text-5xl">
                Điều Khoản Sử Dụng
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Vui lòng đọc kỹ các điều khoản này trước khi sử dụng website và dịch vụ của VuKia.
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
                        <p><strong className="text-foreground">Địa chỉ:</strong> {siteConfig.contact.address}</p>
                        <p>
                          <strong className="text-foreground">Email:</strong>{' '}
                          <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                            {siteConfig.contact.email}
                          </a>
                        </p>
                        <p>
                          <strong className="text-foreground">Điện thoại:</strong>{' '}
                          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
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
