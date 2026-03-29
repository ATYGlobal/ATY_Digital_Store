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
            Keychron K3: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Keyboards
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/KuT--dfHExo" 
              title="Keychron K3 Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Estás en una oficina abierta o en un coworking. Quieres la sensación táctil de un teclado mecánico, ese "click" que te confirma que has pulsado la tecla, pero sabes que si usas un teclado normal con switches azules, tus compañeros te van a linchar. El Keychron K3 es el pacto de no agresión.
          </p>
          <p>
            Es sorprendentemente delgado. Parece un teclado de membrana de los de oficina, pero cuando pulsas, notas el recorrido corto pero contundente de los switches de perfil bajo (Gateron, en este caso). Se conecta por Bluetooth a tres dispositivos, lo que significa que con un botón paso del Mac de casa al iPad y al PC del trabajo. El perfil de teclas es bajo, lo que hace que la transición desde un MacBook sea instantánea; no tienes que levantar la muñeca como con los teclados mecánicos gordos.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Realmente necesitas un teclado que pese 2kg y tenga teclas macro o prefieres algo que puedas meter en la mochila y que te permita trabajar ergonómicamente en una cafetería?"
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              El gran pero es la duración de la batería con el RGB encendido. Si te gusta el efecto arcoíris, lo vas a cargar cada tres días. Si lo usas sin luces (o con la luz fija blanca), te dura semanas. Además, las teclas ABS de serie, aunque se sienten bien, acaban brillando con el uso intensivo. Tarde o temprano querrás comprar unas PBT de repuesto.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para el nómada digital o el oficinista que odia los teclados de oficina pero necesita paz laboral. No es para el gamer hardcore o el entusiasta que quiere un teclado con lubricantes personalizados y sonido de "thock" profundo.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B095WJ4F4V" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://www.keychron.com/products/keychron-k3-ultra-slim-wireless-mechanical-keyboard" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}