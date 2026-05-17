import { useState } from "react"
import type { ReactNode } from "react"
import Icon from "@/components/ui/icon"

interface ContactFormButtonProps {
  className?: string
  children?: ReactNode
}

const SUBMIT_URL = "https://functions.poehali.dev/d9655a37-f248-4744-b684-94d9e86f3913"

export default function ContactFormButton({ className = "", children }: ContactFormButtonProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", email: "", description: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      <button onClick={() => { setOpen(true); setStatus("idle") }} className={className || "btn-primary"}>
        {children || "Оставить заявку"}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Icon name="X" size={20} />
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#7A7FEE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Заявка принята!</h3>
                <p className="text-gray-600 dark:text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
                <button onClick={() => setOpen(false)} className="btn-primary mt-6">Закрыть</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">Оставить заявку</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Заполните форму — рассчитаем стоимость и свяжемся с вами
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Имя <span className="text-[#7A7FEE]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A7FEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Телефон <span className="text-[#7A7FEE]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 900 123-45-67"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A7FEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email <span className="text-[#7A7FEE]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ivan@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A7FEE]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Описание заказа
                    </label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Опишите что нужно напечатать: материал, размер, количество..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A7FEE] resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Icon name="Loader2" size={18} className="animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      "Отправить заявку"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
