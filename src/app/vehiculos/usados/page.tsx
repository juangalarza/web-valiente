"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type VehiculoOtro = {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: string;
  precio: string | number;
  km: number;
  descripcion: string;
  imagen_url: string;
  activo: boolean;
};

export default function VehiculosUsadosPage() {
  const [vehiculos, setVehiculos] = useState<VehiculoOtro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    const fetchVehiculos = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('vehiculos_otros')
          .select('*')
          .eq('activo', true)
          .eq('tipo', 'usado')
          .order('created_at', { ascending: false });

        if (data && !error) {
          setVehiculos(data as VehiculoOtro[]);
        }
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  const buttonStyle = (active: boolean) => ({
    padding: '8px 24px',
    borderRadius: '100px',
    border: '1px solid var(--gris-60)',
    backgroundColor: active ? 'var(--rojo-solid)' : 'transparent',
    color: active ? 'var(--blanco)' : 'var(--gris-20)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  });

  const renderCard = (v: VehiculoOtro) => (
    <div key={v.id} className="model-card reveal visible">
      <div className="model-img">
        <Image 
          src={v.imagen_url || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80"} 
          alt={`${v.marca} ${v.modelo}`} 
          fill 
          className="object-cover" 
        />
        <span className="model-badge">{v.marca}</span>
      </div>
      <div className="model-body">
        <div className="model-name">{v.modelo}</div>
        <div className="model-desc" style={{ marginBottom: '8px' }}>
          <span style={{ fontWeight: 600, color: 'var(--negro)' }}>{v.anio}</span>
          {v.km != null ? ` · ${v.km.toLocaleString('es-AR')} km` : ''}
        </div>
        <div className="model-desc" style={{ fontSize: '14px' }}>
          {v.descripcion}
        </div>
        <div className="model-foot" style={{ marginTop: 'auto' }}>
          <div>
            <div className="model-label">Usado</div>
            <div className="model-price">
              {typeof v.precio === 'number' 
                ? `$ ${v.precio.toLocaleString('es-AR')}` 
                : v.precio || "Consultar"}
            </div>
          </div>
          <a href="/#contacto" className="model-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <main>
      <nav id="nav" className="scrolled">
        <a href="/" className="nav-logo">
          <Image
            src="/logo-valiente.png"
            alt="Valiente Logo"
            width={230}
            height={50}
            style={{ height: '40px', width: 'auto', display: 'block' }}
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
            Otras Marcas
          </div>
          <h1 className="s-title" style={{ color: 'var(--blanco)', marginTop: '20px' }}>Vehículos <strong>disponibles</strong></h1>
          
          <div style={{ marginTop: '40px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/vehiculos" style={buttonStyle(false)}>TODOS</a>
            <a href="/vehiculos/0km" style={buttonStyle(false)}>0KM</a>
            <a href="/vehiculos/usados" style={buttonStyle(true)}>USADOS</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', backgroundColor: 'var(--blanco)', minHeight: '60vh' }}>
        <div className="section-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--gris-40)' }}>
              Cargando vehículos Usados...
            </div>
          ) : vehiculos.length > 0 ? (
            <div className="models-grid">
              {vehiculos.map(renderCard)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--gris-40)', maxWidth: '400px', margin: '0 auto' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '20px', opacity: 0.5 }}>
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2.1-2.4-3.4C13 5.9 11.9 5 10 5H7c-1.8 0-3 1.2-3 3v2H2v6c0 .6.4 1 1 1h2m14 0a3 3 0 11-6 0 3 3 0 016 0zm-10 0a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--negro)', marginBottom: '10px' }}>No hay Usados disponibles</h3>
              <p style={{ lineHeight: 1.6 }}>Pronto habrá unidades usadas disponibles.<br/>Consultanos por WhatsApp para más información sobre ingresos.</p>
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
                style={{ height: '40px', width: 'auto', display: 'block' }}
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
