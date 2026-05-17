import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    slug: "engineering-parts",
    title: "Инженерные детали",
    shortDescription: "Прецизионные детали для промышленного оборудования с допуском 0.05 мм",
    mainImage: "https://cdn.poehali.dev/projects/3d8b1e70-6c79-481a-b2b0-693787006712/files/ed26f5c3-d2f7-43e4-a412-42a93906b903.jpg",
  },
  {
    id: 2,
    slug: "prototyping",
    title: "Прототипирование",
    shortDescription: "Быстрое создание прототипов для стартапов и продуктовых команд",
    mainImage: "https://cdn.poehali.dev/projects/3d8b1e70-6c79-481a-b2b0-693787006712/files/ffe81ff2-51dc-4504-a80f-a721f7f2eed3.jpg",
  },
  {
    id: 3,
    slug: "creative-models",
    title: "Сувениры и декор",
    shortDescription: "Уникальные фигурки, сувениры и декоративные изделия под заказ",
    mainImage: "https://cdn.poehali.dev/projects/3d8b1e70-6c79-481a-b2b0-693787006712/files/313af075-f960-45c9-9a07-6ea781c86e37.jpg",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Примеры наших
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">работ</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Мы работаем с самыми разными задачами — от промышленных деталей до авторских сувениров. Вот несколько
        направлений, в которых мы уже помогли клиентам.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">{project.shortDescription}</p>
              <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                Подробнее{" "}
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a href="#contact" className="btn-primary">
          Заказать печать
        </a>
      </div>
    </section>
  )
}