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
            Grovemade Walnut Desk Mat: La Review Real
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
              src="https://www.youtube.com/embed/PLCt5hPCcAs" 
              title="Grovemade Walnut Desk Mat Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Te sientas a trabajar. Lo primero que tocan tus manos no es vidrio frío ni madera barata de IKEA. Es cuero. Cuero auténtico, grueso, curtido vegetalmente, reposando sobre nogal sólido. Tu taza de café cae sobre él con un golpe sordo en lugar de un chirrido cerámico. Esta alfombrilla no solo protege tu escritorio—marca el tono de toda tu sesión de trabajo.
          </p>
          <p>
            La construcción es casi obsesiva. El nogal está cortado con láser y acabado a mano. El cuero está cosido a la madera con una precisión que te hace preguntarte si deberías siquiera poner un teclado encima. Con los meses, el cuero se oscurece donde descansan tus muñecas, moldeándose ligeramente a tus costumbres. El ratón se desliza bien—no tan rápido como una alfombrilla dura, pero con suficiente control para trabajos de precisión. Y lo mejor: los cables desaparecen debajo. Ese caos de cables que va a tu monitor queda oculto.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Alguna vez has notado cómo un instrumento de madera se siente más cálido que uno de plástico? Porque tu escritorio merece ese mismo respeto."
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              La verdad incómoda es el precio y el mantenimiento. Esto es un artículo de lujo. Estás pagando 3 o 4 veces más de lo que cuesta una alfombrilla genérica de fieltro. Y el nogal se expande y contrae con la humedad. En inviernos secos, las uniones pueden moverse ligeramente. No es un defecto, es la madera siendo madera, pero si eres perfeccionista, te molestará.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para el escritor, diseñador o teletrabajador que pasa 8 o más horas al día en un escritorio y quiere que su espacio de trabajo se sienta como un santuario. No es para el pragmático del "es solo un escritorio" ni para alguien con un flujo de trabajo desordenado que derrama café a menudo.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B07P5L5V9J" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://grovemade.com/product/walnut-desk-mat/" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}