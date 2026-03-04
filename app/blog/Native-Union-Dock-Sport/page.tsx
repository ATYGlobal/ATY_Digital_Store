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
            Native Union Dock Sport: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Phone Stands
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/ZKvZZvmRdeQ" 
              title="Native Union Dock Sport Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Tu teléfono está al 8% de batería. Necesitas cargarlo, pero también necesitas ver las notificaciones. Y estás a punto de quedarte dormido. El Native Union Dock Sport resuelve ese momento específico mejor que casi cualquier otro accesorio.
          </p>
          <p>
            Es una base con peso y un cable tejido que parece de yate. El soporte sostiene tu teléfono en vertical u horizontal, y aquí está la genialidad: el cable es desmontable. Si viajas, solo desconectas el cable Lightning o USB-C y te lo llevas. La base se queda en casa. Adiós a los cables enredados en la mesilla de noche. El ángulo es perfecto para el modo noche: ves la hora sin sentarte, y en horizontal es ideal para ver YouTube antes de dormir sin tener que apoyar el teléfono contra una botella de agua.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Cuántas veces te has despertado con el teléfono sin carga porque el cable estaba suelto o porque se cayó de la mesilla?"
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              El problema es el material. Ese cable tejido es bonito y no se enreda, pero es más rígido que el de goma. No se amolda tan naturalmente, así que tienes que ayudarlo un poco para que quede pegado a la mesilla. Y la base, aunque tiene peso, es lo bastante ligera como para que si tiras del cable de forma brusca, todo el conjunto se mueva. Es estable para un uso normal, no para tirones accidentales.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para la persona organizada que quiere una mesilla de noche limpia, sin cables visibles, y que viaja con frecuencia. No es para los que se mueven mucho mientras duermen y podrían tirar cosas al suelo.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B08M3FQJ4V" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://www.nativeunion.com/products/dock-sport-for-iphone" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}