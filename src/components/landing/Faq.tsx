import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Какие форматы файлов вы принимаете?",
    answer:
      "Мы работаем с STL, STEP, OBJ и 3MF файлами. Если у вас нет готовой модели — опишите задачу, и мы поможем подготовить файл или порекомендуем дизайнера.",
  },
  {
    id: 2,
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартный заказ — 2–5 рабочих дней. Срочное изготовление доступно в течение 24 часов за дополнительную плату. Точные сроки зависят от размера и сложности изделия.",
  },
  {
    id: 3,
    question: "Из каких материалов вы печатаете?",
    answer:
      "Используем PLA, ABS, PETG, TPU, фотополимерную смолу и нейлон. Для каждой задачи подбираем оптимальный материал — по прочности, гибкости, внешнему виду и бюджету.",
  },
  {
    id: 4,
    question: "Какова точность печати?",
    answer:
      "Точность наших принтеров — от 0.05 до 0.2 мм в зависимости от технологии. FDM — для крупных и прочных изделий, SLA/MSLA — для деталей с высокой детализацией.",
  },
  {
    id: 5,
    question: "Сколько стоит 3D печать?",
    answer:
      "Стоимость зависит от объёма, материала и сложности изделия. Простые детали — от 300 рублей. Отправьте файл или опишите задачу — рассчитаем стоимость бесплатно.",
  },
  {
    id: 6,
    question: "Вы делаете большие партии?",
    answer:
      "Да, принимаем заказы от 1 до нескольких тысяч единиц. На крупные партии действуют скидки. Уточните объём при оформлении — предложим оптимальные условия.",
  },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faq" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          Частые
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">вопросы</span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Отвечаем на самые популярные вопросы о 3D печати, сроках, материалах и ценах.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
