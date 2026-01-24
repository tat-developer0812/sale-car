import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { FileText, ArrowLeft } from 'lucide-react'

export default function PostNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container className="flex flex-col items-center justify-center py-24 text-center">
          <FileText className="h-24 w-24 text-muted-foreground" />
          <h1 className="mt-6 text-3xl font-bold">Không tìm thấy bài viết</h1>
          <p className="mt-2 text-muted-foreground">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/tin-tuc">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Xem tất cả bài viết
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Về trang chủ</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
