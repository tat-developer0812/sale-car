'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/layout/Container'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator } from 'lucide-react'

const formatVND = (amount: number) => {
  const formatted = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formatted} VNĐ`
}

export function InstallmentCalculator() {
  const [carPrice, setCarPrice] = useState(500000000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(30)
  const [loanYears, setLoanYears] = useState(7)
  const [interestRate, setInterestRate] = useState(7.5)

  const result = useMemo(() => {
    const downPayment = carPrice * (downPaymentPercent / 100)
    const loanAmount = carPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const totalMonths = loanYears * 12

    if (monthlyRate === 0) {
      return {
        monthlyPayment: loanAmount / totalMonths,
        totalInterest: 0,
        totalPayment: carPrice,
        downPayment,
        loanAmount,
      }
    }

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)

    const totalPayment = monthlyPayment * totalMonths + downPayment
    const totalInterest = totalPayment - carPrice

    return {
      monthlyPayment,
      totalInterest,
      totalPayment,
      downPayment,
      loanAmount,
    }
  }, [carPrice, downPaymentPercent, loanYears, interestRate])

  return (
    <section className="py-16 bg-secondary/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Tính Trả Góp Xe Ô Tô
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Công cụ tính trả góp giúp bạn lên kế hoạch tài chính khi mua xe ô tô tại VuKia.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Thông tin khoản vay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Giá xe (VNĐ)
                </label>
                <Input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  min={100000000}
                  max={10000000000}
                  step={50000000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formatVND(carPrice)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Trả trước (%)
                </label>
                <Input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  min={10}
                  max={90}
                  step={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Trả trước: {formatVND(result.downPayment)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Thời gian vay (năm)
                </label>
                <div className="flex gap-2">
                  {[3, 5, 7, 8].map((year) => (
                    <Button
                      key={year}
                      variant={loanYears === year ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoanYears(year)}
                      className="flex-1"
                    >
                      {year} năm
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Lãi suất (%/năm)
                </label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min={0}
                  max={20}
                  step={0.5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Kết quả tính toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl bg-primary/5 p-6 text-center">
                <p className="text-sm text-muted-foreground">Số tiền trả hàng tháng</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  {formatVND(result.monthlyPayment)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Giá xe</span>
                  <span className="font-medium">{formatVND(carPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Trả trước ({downPaymentPercent}%)</span>
                  <span className="font-medium">{formatVND(result.downPayment)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Số tiền vay</span>
                  <span className="font-medium">{formatVND(result.loanAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tổng lãi phải trả</span>
                  <span className="font-medium text-accent">{formatVND(result.totalInterest)}</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Tổng thanh toán</span>
                  <span className="text-primary">{formatVND(result.totalPayment)}</span>
                </div>
              </div>

              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="/lien-he">Đăng ký tư vấn trả góp</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
