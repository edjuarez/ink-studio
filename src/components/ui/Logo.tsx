export default function Logo({
  imageSrc = "logo.webp", // Ruta de la imagen del logo
  name = "NOMBRE ARTISTA",
  subtitle = "TATTOO"
}) {
  return (
    <a href="#" className="group inline-flex items-center gap-3.5">
      {/* Imagen a la izquierda */}
      <div className="h-10 w-100 shrink-0 overflow-hidden sm:h-12 sm:w-12">
        <img
          src={imageSrc}
          alt={`${name} Logo`}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenedor de texto a la derecha */}
      <div className="flex flex-col justify-center leading-none">
        <span className="font-serif text-xl font-normal uppercase tracking-wider text-neutral-900 sm:text-2xl">
          {name}
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
          {subtitle}
        </span>
      </div>
    </a>
  );
}