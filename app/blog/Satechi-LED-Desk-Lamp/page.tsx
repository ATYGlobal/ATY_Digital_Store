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
            Satechi LED Desk Lamp: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Home Office
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/BVu6nVnNslw" 
              title="Satechi LED Desk Lamp Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Llevas 6 horas frente al ordenador y son las 5 de la tarde. En invierno, ya casi es de noche. Enciendes la luz del techo y el ambiente se vuelve frío y de oficina. Enciendes esta lámpara y la habitación cambia por completo. No es una luz, es una herramienta de concentración.
          </p>
          <p>
            El diseño es escandinavo puro: líneas rectas, base de metal cepillado y un brazo que esconde las conexiones a la perfección. Tocar el panel táctil para cambiar la temperatura de la luz (de un amarillo cálido a un blanco quirúrgico) es gratificante, como deslizar el dedo en un iPhone antiguo. Pero lo que realmente la hace especial es el puerto USB de carga rápida en la base. Tener el cable del iPhone justo ahí, sin buscar una regleta, ordena el caos de forma instantánea.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Te has dado cuenta de que una luz cálida por la noche te relaja y una luz fría por la mañana te activa tanto como un café? Porque esta lámpara entiende ese ciclo biológico mejor que muchas bombillas inteligentes."
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              El punto débil es la estabilidad. Al ser tan alta y con una base relativamente ligera, si tienes el escritorio en una superficie que vibra (como una mesa con pies metálicos sobre tarima flotante), la lámpara tiembla un poco. No se cae, pero el cabezal se mueve y es molesto si la estás usando para leer.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para el minimalista que busca una pieza decorativa con funcionalidad USB integrada. No es para quien tenga el escritorio en una zona con vibraciones o busque un brazo articulado que se mueva a 100 posiciones distintas.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B09H7R8M3N" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://satechi.net/products/led-desk-lamp" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}