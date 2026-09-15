import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
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
          <label
            htmlFor="email"
            className="section-form-label"
          >
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
        <label
          htmlFor="phone"
          className="section-form-label"
        >
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
        <label
          htmlFor="idea"
          className="section-form-label"
        >
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
          <label
            htmlFor="placement"
            className="section-form-label"
          >
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
          <label
            htmlFor="size"
            className="section-form-label"
          >
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
          <label
            htmlFor="style"
            className="section-form-label"
          >
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
          <label
            htmlFor="budget"
            className="section-form-label"
          >
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
        <label
          htmlFor="references"
          className="section-form-label"
        >
          {contentData.form.fields.references.title}
        </label>
        <label
          htmlFor="references"
          className="flex min-h-32 cursor-pointer items-center justify-center border border-dashed border-neutral-400 px-6 py-8 text-center transition-colors hover:border-neutral-900"
        >
          <div>
            <p className="text-sm text-neutral-700">{contentData.form.fields.references.addText}</p>
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
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-6 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-5 text-neutral-500">
          {contentData.form.helperText}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer group flex items-center gap-3 border border-neutral-900 px-6 py-3.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? contentData.buttons.sending : contentData.buttons.send}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </form>
  );
}