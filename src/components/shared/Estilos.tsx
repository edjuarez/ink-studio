const tattooStyles = [
  "Tradicional",
  "Ornamental",
  "Linework",
  "OpArt",
];

export default function Estilos() {
  const separators = ["✦", "◇", "✦"];
  return (
    <section id="estilos" className="section-bg-primary">
      <div className="mx-auto">
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="section-name">
            Tattoo Artist · Barcelona
          </p>

          <h2 className="section-title-secondary">
            Tatuajes & Prints
          </h2>

  {/*         <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            Artista de tatuaejes en Barcelona, espcializada e disntas tecnicas...
          </p> */}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-30 gap-y-4 border-y border-neutral-900/20 py-8">
          {tattooStyles.map((style, index) => (
            <div key={style} className="flex items-center gap-6">
              <span className="font-display text-2xl text-neutral-900 md:text-3xl">
                {style}
              </span>

              {index < tattooStyles.length - 1 && (
                <span className="text-sm text-neutral-500">
                  {separators[index]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
