'use client'
import { useEffect, useState } from 'react'
import mqtt from 'mqtt'

type SensorData = {
  temperature?: number
  ph?: number
  tds?: number
  do_virtual?: number
  do_real?: number
  aerator?: boolean
  timestamp?: string
}

export default function Dashboard() {
  const [data, setData] = useState<SensorData | null>(null)
  const [history, setHistory] = useState<SensorData[]>([])

  useEffect(() => {
    const client = mqtt.connect('ws://localhost:9001')

    client.on('connect', () => {
      client.subscribe('tambak/sensor')
    })

    client.on('message', (_, message) => {
      try {
        const raw = JSON.parse(message.toString())

        const payload: SensorData = {
          ...raw,
          do_virtual: undefined,              // kosongkan
          aerator: raw.aerator === 1          // convert ke boolean
        }

        payload.timestamp = new Date().toLocaleString('id-ID')

        setData(payload)
        setHistory(prev => [payload, ...prev.slice(0, 6)])
      } catch {}
    })

    return () => {
      void client.end(true)
    }
  }, [])

  const latest = data || {}

  return (
    <div className="w-full px-6 py-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-300 tracking-tight">
        Dashboard Monitoring
      </h1>

      {/* SENSOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card
          title="Temperature"
          value={latest.temperature !== undefined
            ? `${latest.temperature.toFixed(1)}°C`
            : '-'}
          bg="bg-orange-200 dark:bg-orange-900/40"
          text="text-orange-800 dark:text-orange-200"
        />

        <Card
          title="pH"
          value={latest.ph !== undefined
            ? `${latest.ph.toFixed(1)}`
            : '-'}
          bg="bg-sky-200 dark:bg-sky-900/40"
          text="text-sky-800 dark:text-sky-200"
        />

        <Card
          title="TDS"
          value={latest.tds !== undefined
            ? `${latest.tds} PPM`
            : '-'}
          bg="bg-emerald-200 dark:bg-emerald-900/40"
          text="text-emerald-800 dark:text-emerald-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* DO VIRTUAL (KOSONG) */}
        <Card
          title="DO Virtual"
          value={latest.do_virtual !== undefined
            ? `${latest.do_virtual.toFixed(1)} mg/L`
            : '-'}
          bg="bg-purple-200 dark:bg-purple-900/40"
          text="text-purple-800 dark:text-purple-200"
        />

        {/* DO REAL */}
        <Card
          title="DO Real-time"
          value={latest.do_real !== undefined
            ? `${latest.do_real.toFixed(1)} mg/L`
            : '-'}
          bg="bg-rose-200 dark:bg-rose-900/40"
          text="text-rose-800 dark:text-rose-200"
        />

        {/* AERATOR */}
        <div className={`rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center transition-all
          ${latest.aerator
            ? 'bg-teal-200 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
          <div className="text-sm opacity-70 mb-2">Aerator</div>
          <div className="text-3xl font-bold">
            {latest.aerator ? 'ON' : 'OFF'}
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="rounded-2xl shadow-xl overflow-hidden
        bg-white dark:bg-[#1e2028] transition-colors">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-300 tracking-tight">
            Riwayat Data Sensor
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <Th>Timestamp</Th>
                <Th>Temp</Th>
                <Th>pH</Th>
                <Th>TDS</Th>
                <Th>DO Real</Th>
                <Th>DO Virtual</Th>
                <Th>Aerator</Th>
              </tr>
            </thead>
            <tbody>
              {history.map((d, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <Td mono>{d.timestamp}</Td>
                  <Td>{d.temperature !== undefined ? `${d.temperature.toFixed(1)}°C` : '-'}</Td>
                  <Td>{d.ph !== undefined ? d.ph.toFixed(1) : '-'}</Td>
                  <Td>{d.tds !== undefined ? `${d.tds} PPM` : '-'}</Td>
                  <Td>{d.do_real !== undefined ? `${d.do_real.toFixed(1)} mg/L` : '-'}</Td>
                  <Td>{d.do_virtual !== undefined ? `${d.do_virtual.toFixed(1)} mg/L` : '-'}</Td>
                  <Td>
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold
                      ${d.aerator
                        ? 'bg-teal-200 dark:bg-teal-900 text-teal-800 dark:text-teal-200'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                      {d.aerator ? 'ON' : 'OFF'}
                    </span>
                  </Td>
                </tr>
              ))}

              {!history.length && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    📡 Menunggu data ESP32...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ================= COMPONENT ================= */

function Card({ title, value, bg, text }: {
  title: string
  value: string
  bg: string
  text: string
}) {
  return (
    <div className={`rounded-2xl shadow-lg p-6 flex flex-col justify-center transition ${bg} ${text}`}>
      <div className="text-sm opacity-70 mb-2">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">
      {children}
    </th>
  )
}

function Td({ children, mono }: { children: React.ReactNode, mono?: boolean }) {
  return (
    <td className={`p-4 ${mono ? 'font-mono text-gray-500 dark:text-gray-400' : ''}`}>
      {children}
    </td>
  )
}