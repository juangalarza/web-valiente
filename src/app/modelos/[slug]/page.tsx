"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Star, Shield, Settings, Zap, Send, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const ProductPage = () => {
  const { slug } = useParams();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For now, we only have Haval H6 content
  const product = {
    name: "Haval H6",
    edition: "Premium",
    tagline: "Performance.",
    category: "SUV DE LUJO",
    price: "$58.900.000",
    description: "Líder mundial en ventas de SUVs inteligentes. El nuevo Haval H6 combina una estética minimalista sofisticada con lo último en seguridad autónoma nivel 2.",
    mainImg: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=85",
    specs: [
      { icon: <Zap size={24} />, val: "201 CV", label: "Potencia Máxima" },
      { icon: <Star size={24} />, val: "4WD", label: "Tracción Total" },
      { icon: <Settings size={24} />, val: "7 DCT", label: "Transmisión Doble Embrague" },
      { icon: <Shield size={24} />, val: "ADAS", label: "Seguridad Nivel 2" },
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="section-container">
          <div className="flex gap-2 text-xs text-gray-400 mb-12">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link> / 
            <Link href="/#modelos" className="hover:text-primary transition-colors">Modelos</Link> / 
            <span className="text-gray-600 font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <div className="eyebrow">{product.category}</div>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="s-title text-[clamp(2.5rem,6vw,4.5rem)] mb-6">
                  {product.name} <em>{product.edition}</em><br /><strong>{product.tagline}</strong>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-baseline gap-3 font-barlow-condensed text-3xl font-bold mb-8">
                  <span className="text-gray-400 text-sm tracking-widest uppercase">Desde</span> {product.price}
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-gray-500 leading-loose mb-10 max-w-lg">
                  {product.description}
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <Link href="#contacto" className="btn-primary px-12">
                  Reservar unidad ahora
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.4} width="100%">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src={product.mainImg} alt={product.name} fill className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPECS BAR */}
      <div className="bg-crema py-12 border-y border-black/5">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {product.specs.map((spec, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-black/5 mb-2">
                    {spec.icon}
                  </div>
                  <span className="font-bebas text-2xl tracking-wider text-dark">{spec.val}</span>
                  <span className="font-barlow-condensed text-[0.65rem] tracking-[0.2em] uppercase text-gray-400 font-bold">{spec.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <section className="py-32">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Reveal>
                <div className="eyebrow">DISEÑO FUTURISTA</div>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="s-title">El arte de la<br /><em>perfección visual.</em></h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Cada línea del nuevo Haval H6 ha sido trazada para ofrecer una aerodinámica eficiente y una presencia imponente. Su parrilla delantera "Star Matrix" y sus luces LED integradas definen el nuevo estándar del lujo contemporáneo.
                </p>
                <ul className="flex flex-col gap-4">
                  {["Llantas de aleación de 19\" bitono.", "Faros matriciales LED con sensor de luz.", "Techo solar panorámico con apertura eléctrica."].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-500">
                      <b className="text-dark">·</b> {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.4} width="100%">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="H6 Design" fill className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-crema">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center lg:flex-row-reverse">
            <div className="lg:order-2">
              <Reveal>
                <div className="eyebrow">INTERIOR ELITE</div>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="s-title">Conectividad<br /><strong>sin límites.</strong></h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-gray-500 leading-relaxed mb-10">
                  Sumergite en un habitáculo diseñado para el confort absoluto. Materiales de tacto suave, acabados en piano black y un sistema de infoentretenimiento de 12.3" que te mantiene conectado con tu mundo.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Apple CarPlay", "Android Auto", "Carga Inalámbrica"].map((pill, i) => (
                    <span key={i} className="bg-white px-6 py-2.5 rounded-full text-xs font-medium border border-black/5 shadow-sm">
                      {pill}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.4} width="100%" className="lg:order-1">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80" alt="H6 Interior" fill className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-32">
        <div className="section-container">
          <div className="text-center mb-16">
            <Reveal>
              <div className="eyebrow mx-auto">Galería de Detalle</div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="s-title text-center text-[clamp(2.5rem,4vw,3.5rem)]">Vistas de <em>Alta Definición</em></h2>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
              "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
              "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
              "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1000&q=80",
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
            ].map((img, i) => (
              <Reveal key={i} delay={i * 0.1} width="100%">
                <div className={cn("relative overflow-hidden rounded-xl aspect-[4/3] shadow-md", i === 3 && "lg:col-span-2 aspect-video")}>
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (DARK) */}
      <section id="contacto" className="bg-dark py-32 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <Reveal>
                <div className="eyebrow text-primary">¿Listo para el cambio?</div>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="s-title text-white">Solicitá tu<br /><em>prueba de</em><br /><strong>manejo.</strong></h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-white/60 leading-loose mb-10">
                  Un asesor experto se pondrá en contacto para brindarte toda la información sobre financiación y toma de vehículos usados.
                </p>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10">
                    <Phone size={20} strokeWidth={2.5} />
                  </div>
                  <span>264 427 7092</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} width="100%">
              <div className="bg-white/5 p-10 md:p-14 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="font-cormorant text-2xl font-bold text-white mb-10">{product.name} Inquiry</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 font-bold ml-1">Nombre</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre" 
                      className="bg-black/20 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-primary text-white text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 font-bold ml-1">WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="264..." 
                      className="bg-black/20 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-primary text-white text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 font-bold ml-1">Modelo / Versión</label>
                    <select className="bg-black/20 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-primary text-white text-sm appearance-none cursor-pointer">
                      <option>Haval H6 Premium 4WD</option>
                      <option>Haval H6 Luxury 2WD</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 font-bold ml-1">Mensaje</label>
                    <textarea 
                      placeholder="Tu consulta..." 
                      rows={4}
                      className="bg-black/20 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-primary text-white text-sm resize-none"
                    />
                  </div>
                  <button className="md:col-span-2 btn-primary justify-center mt-4">
                    Enviar consulta técnica
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />

      {/* STICKY CTA */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-black/5 z-[160] py-4 px-6 md:px-14 flex items-center justify-between transition-all duration-500",
        showSticky ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="flex flex-col">
          <div className="font-bebas text-xl tracking-wider text-dark">{product.name.toUpperCase()} 2024</div>
          <div className="font-barlow font-bold text-primary text-sm">{product.price}</div>
        </div>
        <Link href="#contacto" className="btn-primary py-3 px-8 text-[0.75rem]">
          Solicitar Cotización
        </Link>
      </div>

      {/* WHATSAPP FLOAT */}
      <a 
        href="https://wa.me/5492645561467" 
        target="_blank" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[150]"
      >
        <MessageSquare size={32} fill="white" />
      </a>
    </main>
  );
};

export default ProductPage;
