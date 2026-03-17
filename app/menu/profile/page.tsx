'use client'

import Link from "next/link"
import { FaWater, FaChartLine, FaFan } from "react-icons/fa"

export default function Welcome() {
  return (
    <main
      className="
        min-h-screen flex items-center justify-center px-6
        bg-gradient-to-br
        from-slate-100 via-blue-50 to-slate-200
        dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]
        transition-colors duration-500
      "
    >
      <div
        className="
          max-w-5xl w-full
          bg-white/80 dark:bg-[#1e293b]/80
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          border border-blue-100 dark:border-slate-700
          p-12
        "
      >
        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-300 leading-tight">
            Implementasi Sensor Virtual environmental monitoring berbasis Regresi Linear untuk Prediksi Oksigen Terlarut pada Sistem Kontrol Aerator Otomatis di Tambak Udang Vaname
          </h1>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
            Dissolved Oxygen
          </h2>

          <p className="mt-4 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium">
            Berbasis Regresi Linear pada Sistem Kontrol Aerator
          </p>

          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Tambak Udang Vaname (Litopenaeus vannamei)
          </p>
        </div>

        {/* DESKRIPSI */}
        <p className="mt-8 text-center text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
          Sistem ini mengimplementasikan model regresi linear untuk
          memprediksi kadar oksigen terlarut (DO) secara virtual berdasarkan
          parameter kualitas air. Pendekatan ini bertujuan meningkatkan
          efisiensi dan responsivitas kontrol aerator otomatis dalam menjaga
          kestabilan ekosistem budidaya udang vaname.
        </p>

        {/* FITUR UTAMA */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">

          <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-2xl">
            <FaWater className="text-3xl text-blue-600 dark:text-blue-300 mb-4" />
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
              Monitoring Real-Time
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Pemantauan suhu, pH, TDS, dan DO secara langsung melalui sistem IoT berbasis MQTT.
            </p>
          </div>

          <div className="bg-slate-200 dark:bg-slate-800 p-6 rounded-2xl">
            <FaChartLine className="text-3xl text-slate-700 dark:text-slate-300 mb-4" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
              Model Prediktif Linear
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Estimasi DO virtual menggunakan pendekatan regresi linear berbasis data lingkungan tambak.
            </p>
          </div>

          <div className="bg-blue-200 dark:bg-blue-900/30 p-6 rounded-2xl">
            <FaFan className="text-3xl text-blue-700 dark:text-blue-300 mb-4" />
            <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">
              Kontrol Aerator Otomatis
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Aktivasi aerator adaptif untuk menjaga kadar oksigen optimal dan meningkatkan produktivitas tambak.
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-12 text-center">
          <Link
            href="/menu/dashboard"
            className="
              inline-block
              bg-blue-600 hover:bg-blue-700
              text-white
              px-10 py-4
              rounded-xl
              font-bold
              shadow-lg
              transition-all
              hover:scale-105
            "
          >
            Masuk ke Sistem Monitoring 
          </Link>
        </div>
      </div>
    </main>
  )
}