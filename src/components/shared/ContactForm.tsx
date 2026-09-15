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

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="section-form-label"
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
            className="section-form-label"
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
          className="section-form-label"
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
          className="section-form-label"
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
            className="section-form-label"
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
            className="section-form-label"
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
            className="section-form-label"
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
            className="section-form-label"
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
          className="section-form-label"
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
          className="cursor-pointer group flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </form>
  );
}