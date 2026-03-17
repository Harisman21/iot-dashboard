'use client';

import { useState } from 'react';

type FontSize = "normal" | "large" | "xlarge";

export default function Settings() {
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [fontSize, setFontSize] = useState<FontSize>("normal");

  const fontClass: Record<FontSize, string> = {
    normal: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  return (
    <div className={`max-w-3xl mx-auto p-8 bg-white/90 dark:bg-[#20222c] rounded-2xl shadow-2xl mt-12 ${fontClass[fontSize]}`}>
      <h1 className="text-3xl font-extrabold text-blue-800 dark:text-blue-300 mb-6">
        {language === "id" ? "Pengaturan" : "Settings"}
      </h1>

      <div className="space-y-6 text-sm sm:text-base">

        {/* Toggle Theme Info */}
        <p>
          (toggle) Dark / Light Theme:
          <span className="font-semibold text-blue-600 dark:text-blue-300">
            {language === "id" ? " Gunakan toggle di sidebar" : " Use the toggle in the sidebar"}
          </span>
        </p>

        {/* Preferensi Tampilan */}
        <div>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-200 mb-2">
            {language === "id" ? "Preferensi Tampilan" : "Display Preferences"}
          </h2>

          <label className="block mb-2">
            <span className="font-bold text-gray-900 dark:text-white">
              {language === "id" ? "Bahasa Aplikasi:" : "App Language:"}
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "id" | "en")}
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white bg-white"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </label>

          <label className="block">
            <span className="font-bold text-gray-900 dark:text-white">
              {language === "id" ? "Ukuran Font:" : "Font Size:"}
            </span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as FontSize)}
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white bg-white"
            >
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="xlarge">Extra Large</option>
            </select>
          </label>
        </div>

        {/* Koneksi IoT */}
        <div>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-200 mb-2">
            {language === "id" ? "Koneksi IoT" : "IoT Connection"}
          </h2>

          <label className="block mb-2">
            <span className="font-bold text-gray-900 dark:text-white">
              {language === "id" ? "Mode Koneksi:" : "Connection Mode:"}
            </span>
            <select className="w-full mt-1 px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white bg-white">
              <option>Wi-Fi</option>
              <option>Ethernet</option>
              <option>LTE</option>
            </select>
          </label>

          <label className="block mb-2">
            <span className="font-bold text-gray-900 dark:text-white">
              IP Address Default:
            </span>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white bg-white"
              placeholder="192.168.1.100"
            />
          </label>

          <label className="block">
            <span className="font-bold text-gray-900 dark:text-white">
              MQTT Broker:
            </span>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 rounded-lg border dark:bg-gray-800 dark:text-white bg-white"
              placeholder="broker.iot.local atau IP broker kamu"
            />
          </label>
        </div>
        
      </div>
    </div>
  );
}
