import { useState } from "react";
import { ArrowUpRight, Check, FileImage, X } from "lucide-react";
import { useForm } from "react-hook-form";
import FadeIn from "../ui/FadeIn";

import { contentData } from "../../data/data";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  budget: string;
  references: FileList;
};

export default function ContactForm() {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const references = watch("references");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitMessage(null);
    setSubmitError(null);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("idea", data.idea);
      formData.append("placement", data.placement);
      formData.append("size", data.size);
      formData.append("style", data.style);
      formData.append("budget", data.budget);

      if (data.references?.length) {
        Array.from(data.references).forEach((file) => {
          formData.append("references", file);
        });
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result: {
        message?: string;
        error?: unknown;
      } = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "No se pudo enviar el formulario."
        );
      }

      setSubmitMessage(
        "Tu consulta fue enviada correctamente. ¡Gracias por contactar!"
      );

      reset();
    } catch (error) {
      console.error(error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al enviar el formulario."
      );
    }
  };

  const removeSelectedFiles = () => {
    reset({
      references: undefined,
    });
  };

  return (
    <FadeIn>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="section-form-label">
            {contentData.form.fields.name.label}
          </label>

          <input
            id="name"
            type="text"
            placeholder={contentData.form.fields.name.placeholder}
            className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            {...register("name", {
              required: contentData.form.fields.name.required,
            })}
          />

          {errors.name && (
            <span className="text-xs text-red-700">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="section-form-label">
            {contentData.form.fields.email.label}
          </label>

          <input
            id="email"
            type="email"
            placeholder={contentData.form.fields.email.placeholder}
            className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            {...register("email", {
              required: contentData.form.fields.email.required,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: contentData.form.fields.email.invalid,
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
        <label htmlFor="phone" className="section-form-label">
          {contentData.form.fields.phone.label}
        </label>

        <input
          id="phone"
          type="tel"
          placeholder={contentData.form.fields.phone.placeholder}
          className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
          {...register("phone")}
        />
      </div>

      {/* Idea */}
      <div className="flex flex-col gap-2">
        <label htmlFor="idea" className="section-form-label">
          {contentData.form.fields.idea.label}
        </label>

        <textarea
          id="idea"
          rows={5}
          placeholder={contentData.form.fields.idea.placeholder}
          className="resize-none border-b border-neutral-400 bg-transparent px-0 py-3 text-sm leading-7 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
          {...register("idea", {
            required: contentData.form.fields.idea.required,
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
          <label htmlFor="placement" className="section-form-label">
            {contentData.form.fields.placement.label}
          </label>

          <input
            id="placement"
            type="text"
            placeholder={contentData.form.fields.placement.placeholder}
            className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            {...register("placement")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="size" className="section-form-label">
            {contentData.form.fields.size.label}
          </label>

          <input
            id="size"
            type="text"
            placeholder={contentData.form.fields.size.placeholder}
            className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
            {...register("size")}
          />
        </div>
      </div>

      {/* Estilo + Presupuesto */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="style" className="section-form-label">
            {contentData.form.fields.style.label}
          </label>

          <select
            id="style"
            defaultValue=""
            className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none focus:border-neutral-900"
            {...register("style")}
          >
            {contentData.form.options.style.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="section-form-label">
            {contentData.form.fields.budget.label}
          </label>

          <select
            id="budget"
            defaultValue=""
            className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none focus:border-neutral-900"
            {...register("budget")}
          >
            {contentData.form.options.budget.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Referencias */}
      <div className="flex flex-col gap-3">
        <label htmlFor="references" className="section-form-label">
          {contentData.form.fields.references.title}
        </label>

        <label
          htmlFor="references"
          className="flex min-h-32 cursor-pointer items-center justify-center border border-dashed border-neutral-400 px-6 py-8 text-center transition-colors hover:border-neutral-900"
        >
          <div>
            <p className="text-sm text-neutral-700">
              {contentData.form.fields.references.addText}
            </p>

            <p className="mt-2 text-xs text-neutral-500">
              {contentData.form.fields.references.helper}
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

        {/* Archivos seleccionados */}
        {references?.length > 0 && (
          <div className="flex flex-col gap-2">
            {Array.from(references).map((file) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center gap-3 border border-neutral-300 px-4 py-3"
              >
                <FileImage size={16} />

                <span className="min-w-0 flex-1 truncate text-xs text-neutral-700">
                  {file.name}
                </span>

                <span className="text-xs text-neutral-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}

            <button
              type="button"
              onClick={removeSelectedFiles}
              className="flex w-fit cursor-pointer items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <X size={14} />
              Quitar archivos
            </button>
          </div>
        )}
      </div>

      {/* Success */}
      {submitMessage && (
        <div className="flex items-center gap-3 border border-neutral-300 px-4 py-4 text-sm text-neutral-700">
          <Check size={18} />
          <p>{submitMessage}</p>
        </div>
      )}

      {/* Error */}
      {submitError && (
        <div className="border border-red-300 px-4 py-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col gap-6 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-5 text-neutral-500">
          {contentData.form.helperText}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex cursor-pointer items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? contentData.buttons.sending
            : contentData.buttons.send}

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </form>
    </FadeIn>
  );
}