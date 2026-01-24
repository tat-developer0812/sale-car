'use client'

import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export function StickyContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

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
          source: 'floating-widget',
        }),
      })

      if (!response.ok) throw new Error('Failed')

      toast.success('Gửi thành công!', {
        description: 'Chúng tôi sẽ gọi lại trong 5 phút.',
      })

      setPhone('')
      setName('')
      setIsOpen(false)
    } catch {
      toast.error('Có lỗi xảy ra', {
        description: 'Vui lòng thử lại hoặc gọi trực tiếp.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-50 h-14 w-14 rounded-full bg-primary shadow-2xl transition-transform hover:scale-110 md:bottom-6"
        size="lg"
        aria-label="Liên hệ tư vấn"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Nhận tư vấn miễn phí
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Để lại số điện thoại, chúng tôi sẽ gọi lại trong 5 phút!
            </p>

            <div className="space-y-2">
              <Label htmlFor="quick-phone">Số điện thoại *</Label>
              <Input
                id="quick-phone"
                type="tel"
                placeholder="0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-name">Họ tên (không bắt buộc)</Label>
              <Input
                id="quick-name"
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Đóng
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gọi lại cho tôi'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
