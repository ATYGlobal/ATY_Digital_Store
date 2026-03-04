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
            Nomad MagSafe Minimalist Wallet: La Review Real
          </h1>
          <div className="bg-slate-100 rounded-2xl p-1 text-center text-sm font-medium text-slate-500 w-fit px-4">
            Phone Accessories
          </div>
        </header>

        {/* Video / Imagen Principal */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
            {/* Aquí pegas el iframe de YouTube que vimos antes */}
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/HFDIMCJEMQA" 
              title="Nomad MagSafe Wallet Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Estás a punto de salir de casa. Llevas pantalones de vestir o quizás unos chinos ajustados. 
            Metes la mano en el bolsillo y lo único que notas es el peso del iPhone. Nada más. 
            Sin ese incómodo bulto del tamaño de un ladrillo que suele formar la cartera tradicional. 
            Para el trayecto, solo necesitas la tarjeta de metro, el DNI y quizás una de crédito para el café.
          </p>
          <p>
            La Nomad Wallet es, básicamente, un imán con personalidad. Su piel de origen europea (cuero de curtición vegetal) 
            envejece de forma brutal. Al principio es rígida y parece de calidad, pero tras un mes rozándose con llaves y monedas, 
            empieza a ceder y a adquirir ese brillo característico que los amantes del cuero llamamos pátina. 
            Se sujeta al iPhone con una fuerza magnética que te hace confiar en ella; he sacado el teléfono del bolsillo 
            decenas de veces y la billetera no se ha despegado ni una sola vez. Eso sí, no esperes llevar 5 tarjetas. 
            Con 2 o 3 va justa, pero es ese justo lo que te obliga a simplificar.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Realmente necesitas llevar 8 tarjetas de fidelización de tiendas que apenas visitas? 
            Porque este accesorio te obliga a hacer esa purga semanal."
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              El hándicap aquí no es el producto, es el usuario. Si tienes un teléfono que no sea iPhone 12 o superior 
              con MagSafe nativo, necesitarás un adhesivo metálico que queda feo y le resta puntos. 
              Además, si eres de los que todavía usan efectivo a diario, esta billetera no es para ti.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Es para el usuario de iPhone que ya paga todo con el reloj o el móvil y solo necesita el soporte físico por si acaso. 
              No es para coleccionistas de cupones o los que aún usan billetes.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA (Vinculados a tu products.csv) */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B0C5R7V9Z2" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://nomadgoods.com/products/modern-leather-wallet-for-magsafe" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}