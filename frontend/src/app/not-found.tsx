import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Large decorative 404 */}
      <p className="text-[120px] font-extrabold leading-none text-primary/10 select-none md:text-[180px]">
        404
      </p>

      {/* Branding & message */}
      <div className="-mt-6 md:-mt-8">
        <h1 className="text-2xl font-bold text-primary md:text-3xl">
          Trang Không Tồn Tại
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Trang bạn đang tìm kiếm không tồn tại, đã bị di chuyển hoặc địa chỉ URL
          không chính xác. Hãy thử một trong các liên kết bên dưới.
        </p>
      </div>

      {/* Primary action buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Về Trang Chủ</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/xe-o-to">Tìm Kiếm Xe</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/lien-he">Liên Hệ Hỗ Trợ</Link>
        </Button>
      </div>

      {/* Helpful quick links */}
      <div className="mt-12 border-t pt-8">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          Có thể bạn đang tìm:
        </p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/xe-o-to" className="text-primary hover:underline">
            Danh sách xe ô tô
          </Link>
          <Link href="/mua-xe-o-to" className="text-primary hover:underline">
            Hướng dẫn mua xe
          </Link>
          <Link href="/tra-gop" className="text-primary hover:underline">
            Vay mua xe trả góp
          </Link>
          <Link href="/khuyen-mai" className="text-primary hover:underline">
            Khuyến mãi
          </Link>
          <Link href="/tin-tuc" className="text-primary hover:underline">
            Tin tức xe hơi
          </Link>
          <Link href="/gioi-thieu" className="text-primary hover:underline">
            Về VuKia
          </Link>
        </nav>
      </div>

      {/* Footer note */}
      <p className="mt-10 text-xs text-muted-foreground">
        &copy; 2026 VuKia &mdash; Đại Lý Xe Ô Tô Uy Tín
      </p>
    </main>
  )
}
