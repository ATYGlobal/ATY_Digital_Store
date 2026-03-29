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
            Ridge Wallet: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Wallets
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/OhfENYNl4NQ" 
              title="Ridge Wallet Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Estás usando esos jeans que te quedan perfectos, ni muy apretados ni muy holgados. Te sientas y sientes esa presión familiar. Una cartera de cuero tradicional clavándose en tu cadera, arruinando tu postura, quizás incluso causando esa molestia en el nervio ciático que has estado ignorando. La Ridge Wallet se desliza en el bolsillo y, literalmente, olvidas que está ahí.
          </p>
          <p>
            Es un sándwich de aluminio o fibra de carbono sujeto por una banda elástica resistente. El concepto es simple: placas en el exterior, tarjetas en el medio. ¿El botón en la parte trasera? Lo presionas y las tarjetas se abren en abanico como una baraja, facilitando agarrar exactamente la que necesitas. Se siente frío al tacto al principio, pero es el metal. El bloqueo RFID es un buen extra si eres de los que temen a los carteristas en el metro. ¿Y la banda elástica? Aguanta fuerte durante años, pero cuando finalmente se afloja, te envían reemplazos gratis.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Realmente necesitas una cartera que se amolde a tu trasero con el tiempo, o prefieres algo que se mantenga rígido y proteja tus tarjetas para que no se doblen?"
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              La honestidad aquí está en el manejo del efectivo. Hay una opción de clip para dinero, y funciona, pero sacar un billete se siente menos elegante que con cuero. Terminas doblando el dinero de forma extraña o metiéndolo debajo de la banda elástica, lo que contradice el propósito minimalista. Además, si eres brusco con tus cosas, el aluminio anodizado mostrará desgaste—unos lo llaman pátina, otros lo llaman rayones.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Es para el que usa jeans ajustados, lleva entre 4 y 6 tarjetas y quiere sentarse cómodamente sin un ladrillo en el bolsillo. No es para quienes usan efectivo a diario ni para los que extrañan esa sensación de cuero gastado.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B07K1V5Y2X" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://ridge.com/products/ridge-wallet" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}