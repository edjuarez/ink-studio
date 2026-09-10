import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// Datos por defecto (se pueden pasar dinámicamente mediante props)
const defaultFaqs = [
  {
    id: '1',
    question: '¿Cómo pido un presupuesto o reservo un turno?',
    answer: 'Puedes completar el formulario de contacto al final de la página o enviarme un mensaje por Instagram. Para darte un presupuesto exacto necesito saber la idea, tamaño aproximado en centímetros y la zona del cuerpo.',
  },
  {
    id: '2',
    question: '¿Haces diseños personalizados o puedo llevar mi propia idea?',
    answer: 'El 100% de mis trabajos son diseños autorales y personalizados. Podemos usar referencias que te gusten como punto de partida, pero adaptaré la pieza para que sea única y encaje con la anatomía de tu cuerpo.',
  },
  {
    id: '3',
    question: '¿Cuáles son las indicaciones antes de la sesión?',
    answer: 'Es importante descansar bien la noche anterior, mantenerse bien hidratado, comer bien antes de asistir y evitar el consumo de alcohol o medicamentos anticoagulantes 24 horas antes.',
  },
  {
    id: '4',
    question: '¿Cómo debo cuidar el tatuaje una vez terminado?',
    answer: 'Al finalizar la sesión te entregaré una guía impresa/digital con los cuidados específicos: uso del parche protector o film, jabón neutro, crema cicatrizante recomendada y precauciones con el sol y el agua.',
  },
  {
    id: '5',
    question: '¿Trabajas en Córdoba o en Barcelona?',
    answer: 'Divido mi agenda entre ambas ciudades a lo largo del año. En mis redes sociales y en la cabecera de esta web voy actualizando las fechas exactas de apertura de agenda para cada ubicación.',
  },
];

export default function FAQ({ items = defaultFaqs }) {
  // Permite controlar qué pregunta está abierta. Si pasas null, todas inician cerradas.
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[#f4f1eb] px-6 py-24 text-neutral-900">
      <div className="mx-auto max-w-3xl">
        
        {/* Cabecera de la sección */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-500 sm:text-xs">
            Resolviendo dudas
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-5xl">
            Preguntas Frecuentes
          </h2>
        </div>

        {/* Lista en formato Acordeón */}
        <div className="divide-y divide-neutral-300/70 border-y border-neutral-300/70">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.id || index} className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="group flex w-full items-center justify-between gap-4 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-normal text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-xl">
                    {item.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-300/80 transition-all duration-300 group-hover:border-neutral-900">
                    {isOpen ? (
                      <Minus size={14} className="text-neutral-900" />
                    ) : (
                      <Plus size={14} className="text-neutral-900" />
                    )}
                  </span>
                </button>

                {/* Respuesta desplegable */}
                {isOpen && (
                  <div className="mt-4 pr-8 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}