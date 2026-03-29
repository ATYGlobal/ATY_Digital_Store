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
            Bellroy Note Sleeve: La Review Real
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
              src="https://www.youtube.com/embed/5gFCxlC2NKA" 
              title="Bellroy Note Sleeve Review" 
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 italic">Análisis visual cortesía de creadores independientes</p>
        </section>

        {/* Contenido de DeepSeek */}
        <section className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-2xl font-bold">La experiencia real</h2>
          <p>
            Estás en una cena. Llega la cuenta. Todos hacen ese baile incómodo—sacar las tarjetas, pasárselas a la persona más cercana al camarero. Tú deslizas tu Bellroy del bolsillo. Es delgada. Vergonzosamente delgada. Alguien bromea "¿estás sin blanca?". Entonces tiras de la lengüeta y la cartera se despliega como un origami, las tarjetas se abren en abanico perfectamente, y coges la tuya en un solo movimiento. La broma muere.
          </p>
          <p>
            Esto es cuero bien hecho. No el grueso y voluminoso que necesita dos manos para abrirse. Bellroy usa un cuero increíblemente fino, de tacto suave desde el primer día. La Note Sleeve tiene capacidad para 4-11 tarjetas (4 cómodamente, 11 si eres un acumulador) y los billetes van en ese bolsillo central. La lengüeta en el lateral es la estrella—un tirón con el pulgar y tu tarjeta de uso frecuente aparece lista para pagar. No es un truco de fiesta; es genuinamente más rápido que rebuscar entre ranuras. En el bolsillo delantero, desaparece. Te palparás la pierna para comprobar si sigue ahí.
          </p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-8">
            "¿Realmente necesitas una cartera que haga las veces de asiento de repuesto para tus tarjetas, o solo algo que guarde lo esencial y se aparte de tu camino?"
          </blockquote>

          <h2 className="text-2xl font-bold">El Hándicap</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4 my-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <p className="text-sm text-red-800 m-0">
              La contrapartida es durabilidad vs. delgadez. Ese cuero suave muestra el desgaste más rápido. Las esquinas se aclaran. Aparecen roces. Bellroy lo llama carácter, y lo es, pero si eres del tipo que guarda las cosas en fundas de plástico, esta cartera te va a estresar. Además, el acceso al efectivo no es instantáneo. Los billetes van en ese bolsillo central y requieren un poco de pesca para sacarlos. Está bien para efectivo ocasional, pero es molesto si usas efectivo a diario.
            </p>
          </div>

          <h2 className="text-2xl font-bold">Veredicto y ¿Para quién es?</h2>
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 my-6">
            <CheckCircle2 className="text-indigo-500 shrink-0" />
            <p className="text-sm text-indigo-900 m-0">
              Para el que lleva la cartera en el bolsillo delantero, busca un perfil ultrafino y aprecia cómo envejecen los materiales nobles. No es para usuarios frecuentes de efectivo ni para quienes quieren que su cartera luzca como nueva después de dos años.
            </p>
          </div>
        </section>

        {/* BOTONES DE COMPRA */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <h3 className="text-center font-bold mb-8">Consíguelo al mejor precio</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.amazon.com/dp/B00I6B3V8M" className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
              Ver en Amazon
            </a>
            <a href="https://bellroy.com/products/note-sleeve-wallet" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
              Sitio Oficial
            </a>
          </div>
        </section>
      </article>
    </div>
  );
}