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
            Orbitkey Key Organizer: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Everyday Carry
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/7E1hZ0pKcVM" 
              title="Orbitkey Key Organizer Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Son las 8 de la mañana. Llegas a casa de tu carrera matutina o de sacar al perro. Tiras las llaves en la mesilla de noche. Suena un estrépito metálico que despierta a tu pareja. O peor aún, metes la mano en el bolsillo del abrigo y las llaves han hecho un ocho con los AirPods, rayándolos. El Orbitkey es la solución a ese caos sonoro y visual.
          </p>
          <p>
            Es una tira de cuero o tejido técnico que envuelve tus llaves como un libro. Las aprieta con un tornillo de rosca, eliminando el tintineo. Pero su magia está en los extras. Tiene un módulo para una llave de coche y, sobre todo, un clip para dinero o una tarjeta. No es una cartera, pero te saca de un apuro si solo necesitas llevar el DNI para un trámite rápido sin la cartera grande. En el escritorio, queda como un pisapapeles elegante; no como un montón de hierros oxidados.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Cuántas veces has maldecido el ruido de tus llaves al sacarlas en una biblioteca o en una reunión silenciosa? Porque este invento convierte ese momento de estrés acústico en un gesto silencioso y elegante."
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              La pega es que cambiar el orden de las llaves o añadir una nueva es un poco tedioso. Tienes que desenroscar todo, alinear los agujeros y volver a apretar. No es algo que hagas cada día, pero si en tu casa cambian la cerradura a menudo, puede ser un pequeño suplicio. Además, con el cuero, si lo mojas mucho, se mancha.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para los que llevan las llaves sueltas en el bolsillo con el móvil y quieren proteger las pantallas de los arañazos. No es para el manitas que tiene un llavero con 15 llaves de almacenes y trasteros distintos.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B075VJG4Y5" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://www.orbitkey.com/products/orbitkey-key-organizer-2-0" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}