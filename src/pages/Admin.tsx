import { useEffect, useState, useCallback } from "react"
import Icon from "@/components/ui/icon"

const GET_ORDERS_URL = "https://functions.poehali.dev/d3df4087-2262-401e-aaaf-44e61fb854f6"
const ADMIN_PASSWORD = "2580"

interface Order {
  id: number
  name: string
  phone: string
  email: string
  description: string
  created_at: string
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1")
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(GET_ORDERS_URL)
      const data = await res.json()
      const parsed = typeof data === "string" ? JSON.parse(data) : data
      setOrders(parsed.orders || [])
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchOrders()
  }, [authed, fetchOrders])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1")
      setAuthed(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#111111] flex items-center justify-center p-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-[#7A7FEE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={24} className="text-[#7A7FEE]" />
            </div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Print<span className="text-[#7A7FEE]">3D</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Введите пароль для входа</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              autoFocus
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false) }}
              placeholder="Пароль"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A7FEE]"
            />
            {passwordError && (
              <p className="text-red-500 text-sm text-center">Неверный пароль</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#7A7FEE] text-white font-medium hover:bg-[#6a6fde] transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111111] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Print<span className="text-[#7A7FEE]">3D</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Заявки клиентов</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Всего: <span className="font-semibold text-black dark:text-white">{orders.length}</span>
            </span>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7A7FEE] text-white text-sm font-medium hover:bg-[#6a6fde] transition-colors"
            >
              <Icon name="RefreshCw" size={16} />
              Обновить
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false) }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
            <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Icon name="ArrowLeft" size={16} />
              На сайт
            </a>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Icon name="Loader2" size={32} className="animate-spin text-[#7A7FEE]" />
          </div>
        )}

        {error && (
          <div className="text-center py-24 text-gray-500 dark:text-gray-400">
            <Icon name="AlertCircle" size={40} className="mx-auto mb-3 text-red-400" />
            <p>Не удалось загрузить заявки</p>
            <button onClick={fetchOrders} className="mt-4 text-[#7A7FEE] underline text-sm">Попробовать снова</button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-24 text-gray-500 dark:text-gray-400">
            <Icon name="Inbox" size={40} className="mx-auto mb-3 opacity-40" />
            <p>Заявок пока нет</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#7A7FEE] font-bold text-sm">#{order.id}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-black dark:text-white">{order.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(order.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <a href={`tel:${order.phone}`} className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] transition-colors">
                      <Icon name="Phone" size={14} />
                      {order.phone}
                    </a>
                    <a href={`mailto:${order.email}`} className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] transition-colors">
                      <Icon name="Mail" size={14} />
                      {order.email}
                    </a>
                  </div>
                </div>

                {order.description && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Описание: </span>
                      {order.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
