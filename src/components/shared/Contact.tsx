import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  budget: string;
  date: string;
  availability: string;
  additional: string;
  references: FileList;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <section
      id="contacto"
      className="relative z-10 w-full bg-[#E8E8E8] px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="section-name">
              Contacto
            </p>
            <h2 className="section-title-secondary">
              ¿Tienes una idea <br /> en mente?
            </h2>
            <p className="section-paragraph-primary">
              Si tienes una idea para un tatuaje, quieres personalizar un diseño
              o simplemente quieres contarme lo que tienes en mente, escríbeme.
              Cuéntame tu idea y nos ponemos en contacto para hablar sobre tu
              proyecto.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8]"
            >
              WhatsApp
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* Contact Details */}
            <div className="space-y-3 text-sm text-neutral-700">
              <p>
                <span className="text-neutral-400">Teléfono</span>
                <br />
                +34 600 000 000
              </p>
              <p>
                <span className="text-neutral-400">Instagram</span>
                <br />
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-500"
                >
                  @sophiearttattoo
                </a>
              </p>
              <p>
                <span className="text-neutral-400">Ubicación</span>
                <br />
                Barcelona, España
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          {/* Nombre + Email */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
              />
              {errors.name && (
                <span className="text-xs text-red-700">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Introduce un email válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* WhatsApp / Teléfono */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-xs uppercase tracking-[0.15em] text-neutral-500"
            >
              WhatsApp / Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+34 600 000 000"
              className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
              {...register("phone")}
            />
          </div>

          {/* Idea */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="idea"
              className="text-xs uppercase tracking-[0.15em] text-neutral-500"
            >
              Cuéntame tu idea
            </label>
            <textarea
              id="idea"
              rows={5}
              placeholder="Cuéntame qué tatuaje tienes en mente, qué significa para ti y cualquier detalle que quieras compartir..."
              className="resize-none border-b border-neutral-400 bg-transparent px-0 py-3 text-sm leading-7 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
              {...register("idea", {
                required: "Cuéntame un poco sobre tu idea",
              })}
            />
            {errors.idea && (
              <span className="text-xs text-red-700">
                {errors.idea.message}
              </span>
            )}
          </div>

          {/* Zona + Tamaño */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="placement"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Zona del cuerpo
              </label>
              <input
                id="placement"
                type="text"
                placeholder="Brazo, espalda, pierna..."
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                {...register("placement")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="size"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Tamaño aproximado
              </label>
              <input
                id="size"
                type="text"
                placeholder="Ej. 10 cm"
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                {...register("size")}
              />
            </div>
          </div>

          {/* Estilo + Presupuesto */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="style"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Estilo
              </label>
              <select
                id="style"
                defaultValue=""
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none focus:border-neutral-900"
                {...register("style")}
              >
                <option value="" disabled>
                  Selecciona un estilo
                </option>
                <option value="fine-line">Fine Line</option>
                <option value="blackwork">Blackwork</option>
                <option value="ornamental">Ornamental</option>
                <option value="dotwork">Dotwork</option>
                <option value="microrealism">Microrealismo</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="budget"
                className="text-xs uppercase tracking-[0.15em] text-neutral-500"
              >
                Presupuesto aproximado
              </label>
              <select
                id="budget"
                defaultValue=""
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none focus:border-neutral-900"
                {...register("budget")}
              >
                <option value="" disabled>
                  Selecciona un rango
                </option>
                <option value="under-150">Menos de 150 €</option>
                <option value="150-300">150 € – 300 €</option>
                <option value="300-500">300 € – 500 €</option>
                <option value="500-plus">Más de 500 €</option>
              </select>
            </div>
          </div>

          {/* Referencias */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="references"
              className="text-xs uppercase tracking-[0.15em] text-neutral-500"
            >
              Imágenes de referencia
            </label>
            <label
              htmlFor="references"
              className="flex min-h-32 cursor-pointer items-center justify-center border border-dashed border-neutral-400 px-6 py-8 text-center transition-colors hover:border-neutral-900"
            >
              <div>
                <p className="text-sm text-neutral-700">Añadir imágenes</p>
                <p className="mt-2 text-xs text-neutral-500">
                  Puedes subir referencias, bocetos o imágenes de inspiración.
                </p>
              </div>
              <input
                id="references"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                {...register("references")}
              />
            </label>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-6 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-xs leading-5 text-neutral-500">
              Te responderé lo antes posible para hablar sobre tu idea y
              disponibilidad.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}