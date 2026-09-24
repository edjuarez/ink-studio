type LoadingProps = {
  variant?: "fullscreen" | "section";
};

export default function Loading({
  variant = "section",
}: LoadingProps) {
  const containerClasses =
    variant === "fullscreen"
      ? "fixed inset-0 z-10 flex items-center justify-center bg-[#E8E8E8]"
      : "flex min-h-40 items-center justify-center";

  return (
    <div
      className={containerClasses}
      role="status"
      aria-label="Cargando"
    >
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
    </div>
  );
}