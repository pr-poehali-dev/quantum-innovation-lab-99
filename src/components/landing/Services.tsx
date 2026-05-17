import Icon from "@/components/ui/icon"

const services = [
  {
    id: 1,
    title: "Загрузите модель",
    description: "Отправьте нам STL или STEP файл — или опишите идею, и мы поможем подготовить модель к печати.",
    iconName: "Upload",
    color: "bg-[#7A7FEE]",
  },
  {
    id: 2,
    title: "Печать и обработка",
    description: "Печатаем на профессиональных принтерах с точностью до 0.1 мм. Постобработка: шлифовка, окраска, сборка.",
    iconName: "Layers",
    color: "bg-[#7A7FEE]",
  },
  {
    id: 3,
    title: "Доставка заказа",
    description: "Упакуем и доставим готовые изделия в любую точку. Срочные заказы — в течение 24 часов.",
    iconName: "PackageCheck",
    color: "bg-[#7A7FEE]",
  },
]

export default function Services() {
  return (
    <section id="services" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Как мы работаем
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">с вашим заказом</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Весь процесс — от файла до готового изделия — занимает минимум времени. Мы работаем с пластиком, смолой и
        металлическими порошками для любых задач.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
              <Icon name={service.iconName} size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
