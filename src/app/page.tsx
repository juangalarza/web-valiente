"use client";
import React, { useEffect } from "react";
import Image from "next/image";

export default function Home() {
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

    // Reveal animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nameInput = document.getElementById('nombre') as HTMLInputElement;
    const name = nameInput.value.trim();

    if (name) {
      const btn = e.currentTarget;
      const originalContent = btn.innerHTML;

      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="animate-spin"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg> Enviando...';
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.7';

      setTimeout(() => {
        alert(`¡Gracias ${name}! Tu solicitud de cotización ha sido recibida con éxito. Un asesor Elite se contactará con vos a la brevedad.`);
        btn.innerHTML = originalContent;
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
        document.querySelectorAll('input, select, textarea').forEach(el => {
          (el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value = '';
        });
      }, 1500);
    }
  };

  return (
    <main>
      <nav id="nav">
        <a href="#" className="nav-logo">
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
          <li><a href="#marcas">Marcas</a></li>
          <li><a href="#modelos">Modelos</a></li>
          <li><a href="/vehiculos">Vehículos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto" className="nav-cta">Cotizar ahora</a></li>
        </ul>
      </nav>

      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-eyebrow reveal"><span className="hero-eyebrow-line"></span>Concesionario oficial multimarca · San Juan</div>
          <h1 className="hero-title reveal">La nueva <br /><strong>generación llegó.</strong></h1>
          <p className="hero-brands reveal"><span>HAVAL</span> · <span>JMC</span> · <span>SHINERAY</span> · <span>DOMY</span></p>
          <div className="hero-actions reveal">
            <a href="#modelos" className="btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Explorar modelos
            </a>
            <a href="#contacto" className="btn-ghost">Solicitar cotización</a>
          </div>
          <div className="hero-stats reveal">
            <div className="hstat">
              <div className="hstat-num">500<sup>+</sup></div>
              <div className="hstat-label">Clientes Satisfechos</div>
            </div>
            <div className="hstat">
              <div className="hstat-num">4</div>
              <div className="hstat-label">Marcas Oficiales</div>
            </div>
            <div className="hstat">
              <div className="hstat-num">10<sup>+</sup></div>
              <div className="hstat-label">Años de Trayectoria</div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-bar"></div><span>Scroll</span>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          <span className="ticker-item">
            <b>HAVAL</b><span className="tdot"></span>
            <b>JMC</b><span className="tdot"></span>
            <b>SHINERAY</b><span className="tdot"></span>
            <b>DOMY</b><span className="tdot"></span>
            Concesionario Oficial San Juan<span className="tdot"></span>
            Financiación 48 cuotas<span className="tdot"></span>
            Entrega inmediata<span className="tdot"></span>
          </span>
          <span className="ticker-item">
            <b>HAVAL</b><span className="tdot"></span>
            <b>JMC</b><span className="tdot"></span>
            <b>SHINERAY</b><span className="tdot"></span>
            <b>DOMY</b><span className="tdot"></span>
            Concesionario Oficial San Juan<span className="tdot"></span>
            Financiación 48 cuotas<span className="tdot"></span>
            Entrega inmediata<span className="tdot"></span>
          </span>
        </div>
      </div>

      <section id="marcas">
        <div className="section-container">
          <div className="marcas-head">
            <div>
              <div className="eyebrow reveal">Distribuidores oficiales</div>
              <h2 className="s-title reveal">Muchas marcas,<br /><strong><em> una sola</em> experiencia.</strong></h2>
            </div>
            <a href="#contacto" className="btn-ghost reveal" style={{ whiteSpace: 'nowrap', alignSelf: 'flex-end' }}>Consultar stock disponible →</a>
          </div>
          <div className="brands-grid reveal">
            <div className="brand-card">
              <Image src="/2.png" alt="Shineray" fill className="object-cover" />
              <div className="brand-ov">
                <div className="brand-cat">Utilitarios · Furgones</div>
                <div className="brand-name">SHINERAY</div>
                <a href="#" className="brand-link">Ver catálogo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
              </div>
            </div>
            <div className="brand-card">
              <Image src="/3.png" alt="JMC" fill className="object-cover" />
              <div className="brand-ov">
                <div className="brand-cat">Pickups · Comerciales</div>
                <div className="brand-name">JMC</div>
                <a href="#" className="brand-link">Ver catálogo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
              </div>
            </div>
            <div className="brand-card">
              <Image src="/4.png" alt="Domy" fill className="object-cover" />
              <div className="brand-ov">
                <div className="brand-cat">Sedán · SUV</div>
                <div className="brand-name">DOMY</div>
                <a href="#" className="brand-link">Ver catálogo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modelos">
        <div className="section-container">
          <div className="models-intro">
            <div>
              <div className="eyebrow reveal">Catálogo Premium</div>
              <h2 className="s-title reveal">Modelos <strong><em>destacados</em></strong></h2>
            </div>
            <p className="reveal">Descubrí la combinación perfecta entre tecnología de vanguardia, seguridad avanzada y diseño sofisticado. Unidades con stock real para entrega inmediata.</p>
          </div>
          <div className="models-grid">
            {[
              { name: "H6 2024", brand: "HAVAL", desc: "SUV mediana con motor turbo 1.5T 169 CV, tracción 4×4 y asistentes de conducción inteligentes.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80" },
              { name: "Jolion HEV", brand: "HAVAL", desc: "Crossover urbano híbrido, diseño de vanguardia, pantalla 10.25\" y máxima eficiencia.", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&q=80" },
              { name: "Vigus 6", brand: "JMC", desc: "Pickup cabina doble 2.0T Diesel. Potencia y versatilidad extrema para el trabajo duro.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
              { name: "T32 CDAB", brand: "SHINERAY", desc: "La pickup más equilibrada. Motor 1.5T eficiente con el mejor equipamiento del mercado.", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80" },
              { name: "X30 Van", brand: "SHINERAY", desc: "Furgón multifunción hasta 9 plazas. Espacio inteligente para tu empresa o familia.", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80" },
              { name: "X5 SUV", brand: "DOMY", desc: "SUV de lujo con diseño europeo, cámara 360° y acabados interiores de primer nivel.", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80" }
            ].map((m, i) => (
              <div key={i} className="model-card reveal">
                <div className="model-img">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                  <span className="model-badge">{m.brand}</span>
                </div>
                <div className="model-body">
                  <div className="model-name">{m.name}</div>
                  <div className="model-desc">{m.desc}</div>
                  <div className="model-foot">
                    <div>
                      <div className="model-label">Desde</div>
                      <div className="model-price">Consultar</div>
                    </div>
                    <a href="#" className="model-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros">
        <div className="section-container">
          <div className="nost-wrap">
            <div className="nost-visual reveal">
              <div className="nost-frame"></div>
              <img className="nost-img" src="haval.png" alt="Showroom Valiente" />
              <div className="nost-chip">
                <div className="chip-num">+500</div>
                <div className="chip-text">Entregas Exitosas</div>
              </div>
            </div>
            <div>
              <div className="eyebrow reveal">Excelencia en Servicio</div>
              <h2 className="s-title reveal">Más de <strong><em>10 años</em></strong><br />respaldando <strong>cada camino.</strong></h2>
              <div className="features">
                <div className="feature reveal">
                  <div className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
                  <div>
                    <div className="feat-title">Respaldo Oficial</div>
                    <div className="feat-desc">Garantía oficial directa de fábrica para las 4 marcas. Seguridad y confianza en cada unidad.</div>
                  </div>
                </div>
                <div className="feature reveal">
                  <div className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg></div>
                  <div>
                    <div className="feat-title">Financiación a Medida</div>
                    <div className="feat-desc">Planes personalizados de hasta 48 cuotas. Trabajamos con los principales bancos del país.</div>
                  </div>
                </div>
                <div className="feature reveal">
                  <div className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg></div>
                  <div>
                    <div className="feat-title">Velocidad de Entrega</div>
                    <div className="feat-desc">Stock físico real en San Juan. El proceso de entrega más rápido del mercado local.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto">
        <div className="section-container">
          <div className="contacto-grid">
            <div>
              <div className="eyebrow reveal">Contacto Directo</div>
              <h2 className="s-title reveal">Tu próximo 0km<br /><strong><em>comienza </em>aquí.</strong></h2>
              <p className="c-intro reveal">Asesoramiento profesional y personalizado. Encontrá el vehículo que mejor se adapta a tu estilo de vida o negocio.</p>
              <div className="info-items reveal">
                <div className="info-item">
                  <div className="info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div><span>General Acha 1901 Sur esq. Larrain, <b>San Juan</b></span>
                </div>
                <div className="info-item">
                  <div className="info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.6 4.55 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div><span><b>264 427 7092</b> &nbsp;/&nbsp; +54 9 264 556-1467</span>
                </div>
              </div>
              <div className="divider reveal"></div>
              <div className="horario-grid reveal">
                <div className="horario-item">
                  <div className="h-dia">Lunes a Viernes</div>
                  <div className="h-hora">9 a 13 / 17 a 21</div>
                </div>
                <div className="horario-item">
                  <div className="h-dia">Sábados</div>
                  <div className="h-hora">9 a 13 hs</div>
                </div>
              </div>
            </div>
            <div className="form-card reveal">
              <div className="form-title">Solicitar Cotización</div>
              <div className="fgrid">
                <div className="fg"><label htmlFor="nombre">Nombre Completo</label><input type="text" id="nombre" placeholder="Escribí tu nombre" /></div>
                <div className="fg"><label htmlFor="telefono">WhatsApp / Teléfono</label><input type="tel" id="telefono" placeholder="264 000 0000" /></div>
                <div className="fg full"><label htmlFor="email">Email de contacto</label><input type="email" id="email" placeholder="ejemplo@correo.com" /></div>
                <div className="fg full">
                  <label htmlFor="marca">¿Qué marca te interesa?</label>
                  <select id="marca">
                    <option value="">Seleccioná una opción</option>
                    <option>HAVAL</option>
                    <option>JMC</option>
                    <option>SHINERAY</option>
                    <option>DOMY</option>
                    <option>Ver todas las opciones</option>
                  </select>
                </div>
                <div className="fg full"><label htmlFor="mensaje">Consulta o Mensaje</label><textarea id="mensaje" placeholder="Contanos qué modelo te interesa o si tenés un usado para entregar..."></textarea></div>
              </div>
              <button className="form-btn" onClick={handleFormSubmit}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Enviar solicitud ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div>
            <a href="#" className="f-logo">
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

      <a href="https://wa.me/5492645561467" className="wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}
