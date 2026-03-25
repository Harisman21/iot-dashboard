'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchData()

    const channel = supabase
      .channel('sensor')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Udang Vaname',
        },
        () => {
          fetchData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchData() {
    const { data, error } = await supabase
      .from('Udang Vaname')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(5)

    if (!error && data) setData(data)
  }

  return (
    <main
      className="
        min-h-screen
        flex flex-col items-center justify-center
        bg-gradient-to-br
        from-slate-200 via-blue-100 to-slate-300
        dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]
        transition-colors duration-500
        px-6
      "
    >
      <div
        className="
          text-center
          bg-white/80 dark:bg-[#1e293b]/80
          backdrop-blur-xl
          p-12
          rounded-3xl
          shadow-2xl
          border border-blue-200 dark:border-slate-700
          max-w-3xl w-full
        "
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300">
          Monitoring & Control System
        </h1>

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Sistem monitoring kualitas air tambak udang dengan sensor virtual DO
        </p>

        {/* 🔥 DATA SENSOR */}
        <div className="mt-8 text-left">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">
            Data Sensor Terbaru
          </h2>

          {data.length === 0 && (
            <p className="text-slate-500">Menunggu data...</p>
          )}

          {data.map((item) => (
            <div
              key={item.id}
              className="mb-3 p-4 rounded-xl bg-blue-50 dark:bg-slate-800 shadow"
            >
              <p>🌡 Temp: {item.temp}</p>
              <p>🧪 pH: {item.ph}</p>
              <p>💧 TDS: {item.tds}</p>
              <p>🫧 DO: {item.do_real}</p>
              <p>⚙ Aerator: {item.aerator ? "ON" : "OFF"}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/menu/profile"
            className="
              inline-block
              bg-blue-600 hover:bg-blue-700
              text-white
              px-8 py-4
              rounded-xl
              font-semibold
              shadow-lg
              transition-all
              hover:scale-105
            "
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  )
}