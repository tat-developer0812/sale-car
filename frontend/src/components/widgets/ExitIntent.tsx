'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Gift, X } from 'lucide-react'

export function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('exitIntentShown')) {
        setHasShown(true)
        return
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves through the top of the page
      if (e.clientY <= 0 && !hasShown) {
        showPopup()
      }
    }

    // Also show after 45 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasShown) {
        showPopup()
      }
    }, 45000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [hasShown])

  const showPopup = () => {
    setIsVisible(true)
    setHasShown(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('exitIntentShown', 'true')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phone || phone.length < 10) {
      toast.error('Vui lòng nhập số điện thoại hợp lệ')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          name: name || undefined,
          type: 'quick-contact',
          source: 'exit-intent',
          message: 'Khách hàng quan tâm ưu đãi đặc biệt',
        }),
      })

      if (!response.ok) throw new Error('Failed')

      toast.success('Đăng ký thành công!', {
        description: 'Chúng tôi sẽ liên hệ bạn sớm nhất.',
      })

      setPhone('')
      setName('')
      setIsVisible(false)
    } catch {
      toast.error('Có lỗi xảy ra', {
        description: 'Vui lòng thử lại.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="sr-only">Ưu đãi đặc biệt</DialogTitle>
        </DialogHeader>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Gift className="h-10 w-10 text-red-600" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-red-600">
            Khoan đã! Đừng bỏ lỡ!
          </h2>

          <p className="mb-4 text-lg text-muted-foreground">
            Nhận ngay ưu đãi <strong className="text-foreground">giảm đến 50 triệu</strong> + Bảo hiểm 1 năm miễn phí
          </p>

          <div className="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
            ⏰ Ưu đãi chỉ áp dụng cho 10 khách hàng đầu tiên trong tháng
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exit-phone">Số điện thoại *</Label>
            <Input
              id="exit-phone"
              type="tel"
              placeholder="0912 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="text-center text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exit-name">Họ tên</Label>
            <Input
              id="exit-name"
              type="text"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi...' : 'Nhận ưu đãi ngay'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => setIsVisible(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Để sau, tôi không cần ưu đãi
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
