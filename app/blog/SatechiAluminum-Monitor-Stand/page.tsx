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
            Satechi Aluminum Monitor Stand: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Desk Risers
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/eBwti72g4cM" 
              title="Satechi Aluminum Monitor Stand Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Has estado mirando una pantalla durante años. Ya ni lo notas—esa leve inclinación de la cabeza hacia abajo. La forma en que tus hombros se redondean hacia adelante. Entonces, un día te duele el cuello y no sabes por qué. El Satechi Monitor Stand eleva tu pantalla 2.5 pulgadas, y de repente tu columna recuerda lo que es estar neutral.
          </p>
          <p>
            Es simplemente un bloque de aluminio. Eso es todo. Pero es el bloque correcto. Lo suficientemente grueso para sentirse sustancial, con un hueco debajo que esconde tu teclado cuando no lo usas. El acabado combina perfectamente con el Space Gray de Apple—si tienes un setup de Mac, parece que viniera en la caja. Es lo bastante ancho para la mayoría de monitores e incluso algunos iMacs, y el diseño hueco amplifica ligeramente los graves de tus altavoces si los colocas debajo. Pero principalmente, se trata de la altura. Ahora tus ojos se encuentran con el tercio superior de la pantalla de forma natural.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Cuándo fue la última vez que terminaste un día de trabajo sin rodar el cuello y sentir ese crujido satisfactorio? Porque la ergonomía no va de sillas caras, sino de pulgadas."
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              La honestidad: es una caja de metal. Puedes encontrar soportes de madera más baratos o apilar libros. Esto es una elección estética. Además, el espacio hueco de abajo es útil, pero si tienes un teclado mecánico de tamaño completo, puede que sobresalga por los lados. Y si tu escritorio es blanco o de madera clara, el contraste con el aluminio oscuro puede que te moleste.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para el entusiasta de la estética Apple que quiere su monitor a la altura de los ojos y su escritorio con aspecto limpio. No es para quienes buscan el presupuesto más ajustado ni para los que prefieren un brazo articulado que flote sobre el escritorio.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B07YV8F4J2" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://satechi.net/products/aluminum-monitor-stand" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}