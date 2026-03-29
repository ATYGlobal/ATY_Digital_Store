import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ReviewPage() {
  // Nota: Más adelante conectaremos esto para que lea el CSV automáticamente
  // Por ahora, aquí es donde pegarás el contenido de DeepSeek
  
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navegación Superior */}
      <nav className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/trending" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm">
          <ArrowLeft size={16} /> Volver a la selección
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Encabezado */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Twelve South HoverBar 2S: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Desk Accessories
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/bBskkjPEYLI" 
              title="Twelve South HoverBar 2S Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Imagina que estás en una videollamada y te das cuenta de que tus compañeros llevan 10 minutos viendo directamente el interior de tus fosas nasales porque tienes el portátil encima de la mesa. O peor aún, estás siguiendo una receta en el iPad mientras cocinas y la pantalla se llena de harina. El HoverBar 2S nace para solucionar esos dos mundos.
          </p>
          <p>
            Es un brazo de aluminio robusto, con una pinza en la base que se atornilla a la mesa (no te preocupes, tiene protección de goma) y un peso que transmite solidez. Lo mejor es la versatilidad: puedes tener el iPad flotando justo al lado de tu monitor para usarlo como segunda pantalla, o bajarlo y ponerlo a la altura de los ojos para que la cámara frontal te favorezca. El mecanismo de ajuste es de rosca, no de gas, lo que significa que no se vencerá con el tiempo, pero requiere que aflojes un pomo para moverlo.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Cuánto tiempo pasas encorvado mirando una pantalla que está 20cm por debajo de tu línea de visión? Porque ese pequeño detalle es la diferencia entre terminar el día con el cuello destrozado o no."
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              Sin embargo, la pinza, aunque es fuerte, deja marcas si la usas en muebles de madera blanda. Además, no esperes poder moverlo con un iPad Pro de 13" con funda puesta si lo tienes en la posición más extendida; el brazo aguanta, pero el contrapeso de la base se queda justo.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para el teletrabajador que usa el iPad como herramienta secundaria o el cocinillas que sigue recetas sin ensuciar la tablet. No lo recomiendo si tu mesa es de cristal o si buscas un soporte que puedas mover a cada minuto sin esfuerzo.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B08T9T9V2F" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://www.twelvesouth.com/products/hoverbar-2s" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}