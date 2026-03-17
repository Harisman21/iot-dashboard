'use client'
import { useEffect, useState } from "react"
import mqtt from "mqtt"

type DeviceData = {
  temperature: number
  tds: number
  do: number
  ph: number
  aerator: boolean
}

/* ================= 3D SVG ICONS ================= */

function Temp3D({ danger }: { danger: boolean }) {
  return (
    <div className={`transition-all duration-300 ${danger ? "animate-pulse scale-110" : ""}`}>
      <svg width="70" height="70" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffb347"/>
            <stop offset="100%" stopColor="#ff2d00"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="70" r="18" fill="url(#tempGrad)" />
        <rect x="44" y="20" width="12" height="45" rx="6" fill="url(#tempGrad)" />
      </svg>
    </div>
  )
}

function Ph3D({ danger }: { danger: boolean }) {
  return (
    <div className={`${danger ? "animate-pulse scale-110" : ""}`}>
      <svg width="70" height="70" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="phGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e0ff"/>
            <stop offset="100%" stopColor="#0066ff"/>
          </linearGradient>
        </defs>
        <path d="M40 20 L60 20 L55 50 Q50 75 45 50 Z" fill="url(#phGrad)" />
        <circle cx="50" cy="45" r="4" fill="white">
          <animate attributeName="cy" values="45;35;45" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  )
}

function Tds3D({ danger }: { danger: boolean }) {
  return (
    <div className={`${danger ? "animate-pulse scale-110" : ""}`}>
      <svg width="70" height="70" viewBox="0 0 100 100">
        <path
          d="M10 50 Q25 40 40 50 T70 50 T100 50"
          stroke="#00d4ff"
          strokeWidth="6"
          fill="none">
          <animate attributeName="d"
            values="
            M10 50 Q25 40 40 50 T70 50 T100 50;
            M10 50 Q25 60 40 50 T70 50 T100 50;
            M10 50 Q25 40 40 50 T70 50 T100 50"
            dur="2s"
            repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  )
}

function Do3D({ danger }: { danger: boolean }) {
  return (
    <div className={`${danger ? "animate-pulse scale-110" : ""}`}>
      <svg width="70" height="70" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="doGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </linearGradient>
        </defs>
        <path d="M40 20 L60 20 L55 50 Q50 75 45 50 Z" fill="url(#doGrad)" />
        <circle cx="50" cy="40" r="5" fill="white">
          <animate attributeName="cy" values="40;30;40" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  )
}

function Aerator3D({ active }: { active: boolean }) {
  return (
    <div className={`${active ? "animate-spin" : ""}`}>
      <svg width="70" height="70" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="25" fill="#14b8a6" />
        <path d="M50 25 L55 45 L50 40 L45 45 Z" fill="white" />
        <path d="M75 50 L55 55 L60 50 L55 45 Z" fill="white" />
        <path d="M50 75 L45 55 L50 60 L55 55 Z" fill="white" />
        <path d="M25 50 L45 45 L40 50 L45 55 Z" fill="white" />
      </svg>
    </div>
  )
}

/* ================= SENSOR CARD ================= */

function SensorCard({
  icon,
  title,
  safe,
}: {
  icon: React.ReactNode
  title: string
  safe: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between p-6 rounded-2xl
      bg-white/80 dark:bg-[#1e2028]/80
      shadow-lg transition-all duration-300
      ${!safe ? "ring-2 ring-red-500 shadow-red-400/30" : ""}`}
    >
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 flex items-center justify-center rounded-xl
          bg-gradient-to-br from-white/90 to-white/40
          dark:from-slate-700 dark:to-slate-800 shadow-inner">
          {icon}
        </div>
        <span className="text-lg font-semibold">{title}</span>
      </div>

      <div className="flex items-center gap-8 text-sm">
        <span className={safe ? "text-green-500 font-bold" : "text-gray-400"}>
          Safe
        </span>
        <span className={!safe ? "text-red-500 font-bold" : "text-gray-400"}>
          Danger
        </span>
      </div>
    </div>
  )
}

/* ================= MAIN ================= */

export default function DeviceVisualizer() {
  const [device, setDevice] = useState<DeviceData | null>(null)
  useEffect(() => {
  const client = mqtt.connect("ws://localhost:9001")

  client.on("connect", () => {
    client.subscribe("tambak/sensor")
  })

  client.on("message", (_, msg) => {
    try {
      setDevice(JSON.parse(msg.toString()))
    } catch (err) {
      console.error("Parse error", err)
    }
  })

  return () => {
    client.end(true)
  }

}, [])

  if (!device)
    return <div className="text-gray-400 mt-6">Menunggu data perangkat...</div>

  const tempSafe = device.temperature >= 25 && device.temperature <= 30
  const tdsSafe = device.tds <= 500
  const doSafe = device.do >= 5
  const phSafe = device.ph >= 6.5 && device.ph <= 8.5

  return (
    <div className="w-full px-1 py-1">
      <h2 className="text-3xl font-bold mb-6">
        
      </h2>

      <div className="grid grid-cols-3 xl:grid-cols-2 gap-8">

        <SensorCard icon={<Temp3D danger={!tempSafe} />} title="Temperature Sensor" safe={tempSafe} />
        <SensorCard icon={<Tds3D danger={!tdsSafe} />} title="TDS Sensor" safe={tdsSafe} />
        <SensorCard icon={<Do3D danger={!doSafe} />} title="DO Sensor" safe={doSafe} />
        <SensorCard icon={<Ph3D danger={!phSafe} />} title="pH Sensor" safe={phSafe} />

        <div className="flex items-center justify-between p-6 rounded-2xl
          bg-white/80 dark:bg-[#1e2028]/80 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-xl
              bg-gradient-to-br from-white/90 to-white/40
              dark:from-slate-700 dark:to-slate-800 shadow-inner">
              <Aerator3D active={device.aerator} />
            </div>
            <span className="text-lg font-semibold">
              Aerator
            </span>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-bold
            ${device.aerator
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-600"}`}
          >
            {device.aerator ? "ON" : "OFF"}
          </span>
        </div>

      </div>
    </div>
  )
}