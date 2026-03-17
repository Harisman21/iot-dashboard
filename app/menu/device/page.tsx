'use client'
import DeviceVisualizer from '@/components/DeviceVisualizer'

export default function Device() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-300 tracking-tight">Sensor Indicator</h1>
      <DeviceVisualizer />
    </div>
  )
}
