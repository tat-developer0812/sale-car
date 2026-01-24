import { CarSpecs as CarSpecsType } from '@/types/car'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Car,
  Gauge,
  Ruler,
  Shield,
  Volume2,
} from 'lucide-react'

interface CarSpecsProps {
  specs?: CarSpecsType
}

interface SpecItemProps {
  label: string
  value: string | number | undefined
  unit?: string
}

function SpecItem({ label, value, unit }: SpecItemProps) {
  if (value === undefined || value === null || value === '') return null

  return (
    <div className="flex justify-between border-b py-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">
        {value}
        {unit && ` ${unit}`}
      </span>
    </div>
  )
}

export function CarSpecs({ specs }: CarSpecsProps) {
  if (!specs) {
    return null
  }

  const engineSpecs = [
    { label: 'Động cơ', value: specs.engine },
    { label: 'Công suất', value: specs.power },
    { label: 'Mô-men xoắn', value: specs.torque },
    { label: 'Tiêu hao nhiên liệu', value: specs.fuelConsumption },
    { label: 'Tốc độ tối đa', value: specs.topSpeed },
    { label: 'Tăng tốc 0-100km/h', value: specs.acceleration },
    { label: 'Hệ dẫn động', value: specs.driveType },
  ]

  const dimensionSpecs = [
    { label: 'Chiều dài', value: specs.length, unit: 'mm' },
    { label: 'Chiều rộng', value: specs.width, unit: 'mm' },
    { label: 'Chiều cao', value: specs.height, unit: 'mm' },
    { label: 'Chiều dài cơ sở', value: specs.wheelbase, unit: 'mm' },
    { label: 'Khoảng sáng gầm', value: specs.groundClearance, unit: 'mm' },
    { label: 'Trọng lượng', value: specs.curbWeight, unit: 'kg' },
    { label: 'Số chỗ ngồi', value: specs.seats },
    { label: 'Dung tích bình xăng', value: specs.fuelTankCapacity, unit: 'L' },
    { label: 'Dung tích cốp', value: specs.trunkCapacity, unit: 'L' },
  ]

  const chassisSpecs = [
    { label: 'Hệ thống treo', value: specs.suspension },
    { label: 'Phanh', value: specs.brakes },
    { label: 'Lốp xe', value: specs.tires },
  ]

  const safetySpecs = [
    { label: 'Số túi khí', value: specs.airbags },
  ]

  const comfortSpecs = [
    { label: 'Hệ thống giải trí', value: specs.infotainment },
    { label: 'Số loa', value: specs.speakers },
    { label: 'Điều hòa', value: specs.climateControl },
  ]

  const hasEngineSpecs = engineSpecs.some((s) => s.value)
  const hasDimensionSpecs = dimensionSpecs.some((s) => s.value)
  const hasChassisSpecs = chassisSpecs.some((s) => s.value)
  const hasSafetySpecs = safetySpecs.some((s) => s.value) || specs.safetyFeatures?.length
  const hasComfortSpecs = comfortSpecs.some((s) => s.value)

  if (!hasEngineSpecs && !hasDimensionSpecs && !hasChassisSpecs && !hasSafetySpecs && !hasComfortSpecs) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Thông số kỹ thuật
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engine" className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            {hasEngineSpecs && (
              <TabsTrigger value="engine" className="gap-1">
                <Car className="h-4 w-4" />
                Động cơ
              </TabsTrigger>
            )}
            {hasDimensionSpecs && (
              <TabsTrigger value="dimensions" className="gap-1">
                <Ruler className="h-4 w-4" />
                Kích thước
              </TabsTrigger>
            )}
            {hasChassisSpecs && (
              <TabsTrigger value="chassis" className="gap-1">
                <Gauge className="h-4 w-4" />
                Khung gầm
              </TabsTrigger>
            )}
            {hasSafetySpecs && (
              <TabsTrigger value="safety" className="gap-1">
                <Shield className="h-4 w-4" />
                An toàn
              </TabsTrigger>
            )}
            {hasComfortSpecs && (
              <TabsTrigger value="comfort" className="gap-1">
                <Volume2 className="h-4 w-4" />
                Tiện nghi
              </TabsTrigger>
            )}
          </TabsList>

          {hasEngineSpecs && (
            <TabsContent value="engine">
              {engineSpecs.map((spec) => (
                <SpecItem key={spec.label} {...spec} />
              ))}
            </TabsContent>
          )}

          {hasDimensionSpecs && (
            <TabsContent value="dimensions">
              {dimensionSpecs.map((spec) => (
                <SpecItem key={spec.label} {...spec} />
              ))}
            </TabsContent>
          )}

          {hasChassisSpecs && (
            <TabsContent value="chassis">
              {chassisSpecs.map((spec) => (
                <SpecItem key={spec.label} {...spec} />
              ))}
            </TabsContent>
          )}

          {hasSafetySpecs && (
            <TabsContent value="safety">
              {safetySpecs.map((spec) => (
                <SpecItem key={spec.label} {...spec} />
              ))}
              {specs.safetyFeatures && specs.safetyFeatures.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 font-medium">Tính năng an toàn:</p>
                  <ul className="grid gap-1 text-sm">
                    {specs.safetyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          )}

          {hasComfortSpecs && (
            <TabsContent value="comfort">
              {comfortSpecs.map((spec) => (
                <SpecItem key={spec.label} {...spec} />
              ))}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
