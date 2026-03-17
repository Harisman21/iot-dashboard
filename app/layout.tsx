// app/layout.tsx
import "@/lib/mqttSubscriber"
import './globals.css'
import { Providers } from '../components/Providers'
import ThemeToggle from '../components/ThemeToggle'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-[#111827] dark:text-white transition-colors duration-300">
        <Providers>
          <div className="flex min-h-screen">
            {/* SIDEBAR */}
            <aside className="
              bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300
              dark:from-[#1f2937] dark:via-[#111827] dark:to-black
              text-gray-800 dark:text-blue-200
              shadow-lg w-64 p-6 flex flex-col justify-between
              transition-colors duration-300
            ">
              <div>
                <h2 className="text-3xl font-extrabold mb-10 text-blue-700 dark:text-blue-300 tracking-tight">
                  Web Dashboard
                </h2>
                <nav className="flex flex-col gap-3">
                  {[
                    { label: 'Profile', href: '/menu/profile' },
                    { label: 'Dashboard', href: '/menu/dashboard' },
                    { label: 'Device', href: '/menu/device' },
                    { label: 'Settings', href: '/menu/settings' },
                  ].map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="group rounded px-5 py-3 font-semibold text-blue-900 dark:text-blue-200 relative overflow-hidden
                        before:absolute before:inset-0 before:bg-blue-700/70 dark:before:bg-blue-500/60
                        before:scale-x-0 before:origin-left before:transition-transform before:duration-300
                        group-hover:before:scale-x-100 before:rounded
                        hover:text-white z-10 transition-all hover:scale-105 active:scale-95"
                    >
                      <span className="relative z-10">{label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="mt-10">
                <ThemeToggle />
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="
              flex-1 min-h-screen p-8
              bg-gradient-to-br from-blue-50 via-blue-100 to-white
              dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827]
              text-gray-900 dark:text-white
              transition-colors duration-300
            ">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
