"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Model = {
  id: string;
  marca: string;
  nombre: string;
  desc: string;
  img: string;
};

const ALL_MODELS: Model[] = [
  { id: "haval-jolion-pro-hev-deluxe", marca: "HAVAL", nombre: "Jolion Pro HEV Deluxe", desc: "SUV mediana híbrida. Máxima eficiencia y confort.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
  { id: "haval-jolion-pro-hev-supreme", marca: "HAVAL", nombre: "Jolion Pro HEV Supreme", desc: "SUV mediana híbrida premium con tecnología avanzada.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
  { id: "haval-h6-3g-2wd", marca: "HAVAL", nombre: "H6 3er Generación 2WD", desc: "SUV mediana con tracción simple y diseño vanguardista.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
  { id: "haval-h6-3g-4wd", marca: "HAVAL", nombre: "H6 3er Generación 4WD", desc: "SUV mediana con tracción integral y máximo control.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
  { id: "haval-h6-gt-4wd-3g", marca: "HAVAL", nombre: "H6 GT 4WD 3era Generación", desc: "SUV deportiva de tracción 4WD con estilo coupé.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
  { id: "haval-h6-hev-deluxe", marca: "HAVAL", nombre: "H6 HEV Deluxe", desc: "La evolución híbrida. Alto rendimiento y menor consumo.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
  { id: "haval-h6-hev-supreme", marca: "HAVAL", nombre: "H6 HEV Supreme", desc: "Versión tope de gama de la exitosa SUV híbrida.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },

  { id: "jmc-n900-2025", marca: "JMC", nombre: "N900 (2025)", desc: "Vehículo comercial liviano diseñado para la logística moderna.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-avenue-gl-mt-4x2", marca: "JMC", nombre: "Grand Avenue GL (MT, 4x2, Nafta)", desc: "Pickup de trabajo robusta con caja manual y tracción 4x2.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-avenue-gl-at-4x2", marca: "JMC", nombre: "Grand Avenue GL (AT, 4x2, Nafta)", desc: "Pickup automática y tracción 4x2 para mayor comodidad.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-avenue-gl-mt-4x4", marca: "JMC", nombre: "Grand Avenue GL (MT, 4x4, Nafta)", desc: "Máxima tracción y caja manual para terrenos exigentes.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-avenue-gl-at-4x4", marca: "JMC", nombre: "Grand Avenue GL (AT, 4x4, Nafta)", desc: "Versatilidad 4x4 con la practicidad de una caja automática.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-avenue-slx-241hp", marca: "JMC", nombre: "Grand Avenue SLX (AUT, 4x4, Nafta 241HP)", desc: "Potencia destacada de 241HP para uso intensivo y recreativo.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-avenue-dadao-252hp", marca: "JMC", nombre: "Grand Avenue Dadao OR (252HP)", desc: "Edición Off-Road de 252HP preparada para la aventura.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
  { id: "jmc-grand-ave-gl-diesel", marca: "JMC", nombre: "Grand Ave GL (AUT, 4x4, Diesel, 174HP)", desc: "Torque y rendimiento diésel, con tracción 4x4.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },

  { id: "shineray-t30-simple", marca: "SHINERAY", nombre: "T30 Cubierta Simple", desc: "Utilitario práctico para distribución y carga en la ciudad.", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80" },
  { id: "shineray-t30-duales", marca: "SHINERAY", nombre: "T30 Con Duales", desc: "Mayor capacidad y estabilidad de carga con ruedas duales.", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80" },

  { id: "domy-cd", marca: "DOMY", nombre: "C/D", desc: "Sedán ejecutivo de diseño moderno y amplio espacio interior.", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80" },
  { id: "domy-furgon", marca: "DOMY", nombre: "Furgón", desc: "Compañero ideal para entregas urbanas de última milla.", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80" }
];

export default function ModelosPage() {
  const router = useRouter();
  const [activeBrand, setActiveBrand] = useState("TODOS");
  const [displayModels, setDisplayModels] = useState<Model[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fisher-Yates shuffle
  const shuffleArray = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (window.scrollY > 40) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchAndSortModels = async () => {
      setLoading(true);
      try {
        const { data: clickData, error } = await supabase.from('modelo_clicks').select('modelo_id, clicks');
        
        let filteredModels = ALL_MODELS;
        if (activeBrand !== "TODOS") {
          filteredModels = ALL_MODELS.filter(m => m.marca === activeBrand);
        }

        let isPhase2 = false;
        const clickMap: Record<string, number> = {};

        if (clickData && !error) {
          clickData.forEach((row: any) => {
            clickMap[row.modelo_id] = row.clicks || 0;
            if (row.clicks >= 100) {
              isPhase2 = true;
            }
          });
        }

        let sorted = [...filteredModels];
        
        if (isPhase2) {
          // Fase 2: Order by clicks
          // If tie, shuffle tie-breakers
          sorted.sort((a, b) => {
            const clicksA = clickMap[a.id] || 0;
            const clicksB = clickMap[b.id] || 0;
            if (clicksB !== clicksA) {
              return clicksB - clicksA;
            }
            return Math.random() - 0.5; // Tie breaker
          });
        } else {
          // Fase 1: Shuffle everything
          sorted = shuffleArray(sorted);
        }

        setDisplayModels(sorted);
      } catch (err) {
        console.error("Error fetching clicks:", err);
        // Fallback to Phase 1 on error
        let filteredModels = activeBrand !== "TODOS" ? ALL_MODELS.filter(m => m.marca === activeBrand) : ALL_MODELS;
        setDisplayModels(shuffleArray([...filteredModels]));
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortModels();
  }, [activeBrand]);

  const handleBrandClick = (brand: string) => {
    setActiveBrand(brand);
    setShowAll(false);
  };

  const handleModelClick = (e: React.MouseEvent, m: Model) => {
    e.preventDefault();
    
    // Background tracking
    const track = async () => {
      try {
        const { data, error } = await supabase
          .from('modelo_clicks')
          .select('clicks')
          .eq('modelo_id', m.id)
          .single();
        
        if (data && !error) {
          await supabase.from('modelo_clicks').update({ clicks: data.clicks + 1 }).eq('modelo_id', m.id);
        } else {
          await supabase.from('modelo_clicks').insert({ modelo_id: m.id, marca: m.marca, nombre: m.nombre, clicks: 1 });
        }
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };
    track();

    // Navigate to contact
    router.push('/#contacto');
  };

  const visibleModels = showAll ? displayModels : displayModels.slice(0, 6);

  return (
    <main>
      <nav id="nav" className="scrolled">
        <a href="/" className="nav-logo">
          <Image
            src="/logo-valiente.png"
            alt="Valiente Logo"
            width={230}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </a>
        <ul className="nav-links">
          <li><a href="/#marcas">Marcas</a></li>
          <li><a href="/#modelos">Modelos</a></li>
          <li><a href="/vehiculos">Vehículos</a></li>
          <li><a href="/#nosotros">Nosotros</a></li>
          <li><a href="/#contacto" className="nav-cta">Cotizar ahora</a></li>
        </ul>
      </nav>

      {/* Hero Section Compacto */}
      <section style={{ backgroundColor: 'var(--negro)', paddingTop: '140px', paddingBottom: '60px', textAlign: 'center' }}>
        <div className="section-container">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="hero-eyebrow-line" style={{ display: 'inline-block', width: '30px', height: '2px', backgroundColor: 'var(--rojo-solid)', verticalAlign: 'middle', marginRight: '10px' }}></span>
            Catálogo Oficial
          </div>
          <h1 className="s-title" style={{ color: 'var(--blanco)', marginTop: '20px' }}>Modelos <strong>disponibles</strong></h1>
          
          {/* Filtros */}
          <div style={{ marginTop: '40px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {["TODOS", "HAVAL", "JMC", "SHINERAY", "DOMY"].map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandClick(brand)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '100px',
                  border: '1px solid var(--gris-60)',
                  backgroundColor: activeBrand === brand ? 'var(--rojo-solid)' : 'transparent',
                  color: activeBrand === brand ? 'var(--blanco)' : 'var(--gris-20)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Modelos */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--crema)' }}>
        <div className="section-container">
          {!loading ? (
            <div className="models-grid">
              {visibleModels.map((m, i) => (
                <div key={`${m.id}-${i}`} className="model-card reveal visible">
                  <div className="model-img">
                    <Image src={m.img} alt={m.nombre} fill className="object-cover" />
                    <span className="model-badge">{m.marca}</span>
                  </div>
                  <div className="model-body">
                    <div className="model-name">{m.nombre}</div>
                    <div className="model-desc">{m.desc}</div>
                    <div className="model-foot">
                      <div>
                        <div className="model-label">Desde</div>
                        <div className="model-price">Consultar</div>
                      </div>
                      <a href="/#contacto" onClick={(e) => handleModelClick(e, m)} className="model-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--gris-40)' }}>
              Cargando modelos...
            </div>
          )}

          {displayModels.length > 6 && !showAll && (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button 
                onClick={() => setShowAll(true)}
                className="btn-primary" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none', background: 'var(--rojo)' }}
              >
                Ver todos los modelos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer (igual al home) */}
      <footer>
        <div className="footer-top">
          <div>
            <a href="/" className="f-logo">
              <Image
                src="/logo-valiente-white.png"
                alt="Valiente Logo"
                width={230}
                height={50}
                className="h-10 w-auto"
                priority
              /></a>
            <p className="f-tag">Líderes en San Juan en la distribución oficial de marcas internacionales. Más de una década uniendo personas con sus vehículos ideales.</p>
            <div className="f-socials">
              <a href="#" className="fsoc"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
              <a href="#" className="fsoc"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
              <a href="https://wa.me/5492645561467" className="fsoc">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className="f-col-title">Unidades</div>
            <ul className="f-links">
              <li><a href="#">Haval H6 / Jolion</a></li>
              <li><a href="#">JMC Vigus / Comerciales</a></li>
              <li><a href="#">Shineray Utilitarios</a></li>
              <li><a href="#">Domy Premium SUV</a></li>
            </ul>
          </div>
          <div>
            <div className="f-col-title">Nuestra Empresa</div>
            <ul className="f-links">
              <li><a href="#">Historia y Valores</a></li>
              <li><a href="#">Testimonio de Clientes</a></li>
              <li><a href="#">Servicio de Post-venta</a></li>
              <li><a href="#">Trabajá con nosotros</a></li>
            </ul>
          </div>
          <div>
            <div className="f-col-title">Atención al Cliente</div>
            <ul className="f-links">
              <li><a href="#">Soporte vía WhatsApp</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Políticas de Garantía</a></li>
              <li><a href="#">Turnos para Taller</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Valiente. Todos los derechos reservados. San Juan, Argentina.</span>
          <span>Diseñado con pasión por <a href="#">Finda Studio</a></span>
        </div>
      </footer>
    </main>
  );
}
