"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Save, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const MARCAS = ["PEUGEOT", "TOYOTA", "VOLKSWAGEN", "FORD", "CHEVROLET", "RENAULT", "HONDA", "OTRAS"];

type FormState = {
  marca: string;
  modelo: string;
  anio: string;
  tipo: string;
  km: string;
  precio: string;
  descripcion: string;
  imagen_url: string;
  activo: boolean;
};

type FormErrors = {
  marca?: string;
  modelo?: string;
  anio?: string;
  tipo?: string;
};

const EMPTY_FORM: FormState = {
  marca: "",
  modelo: "",
  anio: "",
  tipo: "",
  km: "",
  precio: "",
  descripcion: "",
  imagen_url: "",
  activo: true,
};

export default function EditarVehiculoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loadingVehicle, setLoadingVehicle] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoadingVehicle(true);
      try {
        const { data, error } = await supabase
          .from("vehiculos_otros")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setForm({
            marca: data.marca || "",
            modelo: data.modelo || "",
            anio: String(data.anio || ""),
            tipo: data.tipo || "",
            km: data.km !== null && data.km !== undefined ? String(data.km) : "",
            precio: data.precio || "",
            descripcion: data.descripcion || "",
            imagen_url: data.imagen_url || "",
            activo: !!data.activo,
          });
        }
      } catch (err: any) {
        console.error("Error loading vehicle details:", err);
        setFeedback({ type: "error", message: "No se pudieron recuperar los detalles de este vehículo." });
      } finally {
        setLoadingVehicle(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.marca) newErrors.marca = "Seleccioná una marca";
    if (!form.modelo.trim()) newErrors.modelo = "Ingresá el modelo";
    if (!form.anio) newErrors.anio = "Ingresá el año";
    else if (Number(form.anio) < 2000 || Number(form.anio) > 2026) newErrors.anio = "Año entre 2000 y 2026";
    if (!form.tipo) newErrors.tipo = "Seleccioná el tipo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setFeedback(null);

    try {
      const payload = {
        marca: form.marca,
        modelo: form.modelo.trim(),
        anio: Number(form.anio),
        tipo: form.tipo === "nuevo" ? "nuevo" : "usado",
        km: form.tipo === "usado" && form.km ? Number(form.km) : null,
        precio: form.precio.trim() || "Consultar",
        descripcion: form.descripcion.trim(),
        imagen_url: form.imagen_url.trim(),
        activo: form.activo,
      };

      const { error } = await supabase
        .from("vehiculos_otros")
        .update(payload)
        .eq("id", id);

      if (error) throw error;

      setFeedback({ type: "success", message: "¡Vehículo actualizado correctamente!" });
      setTimeout(() => router.push("/dashboard/vehiculos"), 1500);
    } catch (err: any) {
      setFeedback({ type: "error", message: err?.message || "Ocurrió un error al guardar los cambios." });
    } finally {
      setSaving(false);
    }
  };

  if (loadingVehicle) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
        <Loader2 className="animate-spin" size={32} style={{ color: '#1A73E8' }} />
        <span style={{ color: '#7b809a', fontSize: '15px' }}>Cargando datos del vehículo...</span>
      </div>
    );
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: `
        .nv-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .nv-title {
          font-size: 22px;
          font-weight: 700;
          color: #344767;
          margin: 0;
        }
        .nv-subtitle {
          font-size: 14px;
          color: #7b809a;
          margin: 4px 0 0;
        }
        .nv-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04);
          padding: 36px 40px;
        }
        .nv-section-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7b809a;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0f2f5;
          margin: 0 0 24px;
        }
        .nv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .nv-grid.full {
          grid-template-columns: 1fr;
        }
        .nv-grid.three {
          grid-template-columns: 1fr 1fr 1fr;
        }
        .nv-fg {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .nv-fg label {
          font-size: 12px;
          font-weight: 600;
          color: #344767;
          font-family: 'Barlow Condensed', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .nv-fg input,
        .nv-fg select,
        .nv-fg textarea {
          border: 1.5px solid #d2d6da;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: #344767;
          background: #fafafa;
          transition: border-color 0.2s;
          outline: none;
          font-family: inherit;
        }
        .nv-fg input:focus,
        .nv-fg select:focus,
        .nv-fg textarea:focus {
          border-color: #1A73E8;
          background: white;
        }
        .nv-fg.error input,
        .nv-fg.error select,
        .nv-fg.error textarea {
          border-color: #F44336;
        }
        .nv-error-msg {
          font-size: 12px;
          color: #F44336;
          margin-top: 2px;
        }
        .nv-fg textarea {
          resize: vertical;
          min-height: 100px;
        }
        .radio-group {
          display: flex;
          gap: 16px;
          margin-top: 4px;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 10px 20px;
          border: 1.5px solid #d2d6da;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #344767;
          transition: all 0.2s;
          background: #fafafa;
          flex: 1;
          justify-content: center;
        }
        .radio-option:hover { border-color: #1A73E8; }
        .radio-option.selected {
          border-color: #1A73E8;
          background: #e8f0fe;
          color: #1A73E8;
        }
        .radio-option input { display: none; }
        .toggle-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1.5px solid #e9ecef;
        }
        .toggle-label {
          font-size: 14px;
          font-weight: 600;
          color: #344767;
          flex: 1;
        }
        .toggle-sub {
          font-size: 12px;
          color: #7b809a;
          font-weight: 400;
        }
        .toggle-switch {
          position: relative;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }
        .toggle-switch input { display: none; }
        .toggle-track {
          position: absolute;
          inset: 0;
          border-radius: 13px;
          background: #d2d6da;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-track.on { background: #4CAF50; }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .toggle-thumb.on { transform: translateX(22px); }
        .nv-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 28px;
          border-top: 1px solid #f0f2f5;
          margin-top: 28px;
        }
        .btn-cancel {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 24px;
          border: 1.5px solid #d2d6da;
          background: white;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #7b809a;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-cancel:hover { background: #f0f2f5; color: #344767; }
        .btn-save {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 28px;
          background: linear-gradient(195deg, #49a3f1, #1A73E8);
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(26,115,232,0.35);
        }
        .btn-save:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,115,232,0.4); }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .nv-feedback {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
        }
        .nv-feedback.success { background: #E8F5E9; color: #2E7D32; }
        .nv-feedback.error { background: #FFEBEE; color: #C62828; }
        .divider { height: 28px; }

        @media (max-width: 768px) {
          .nv-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            text-align: center;
          }
          .nv-card {
            padding: 24px 16px;
          }
          .nv-grid {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
          .radio-group {
            flex-direction: column;
            gap: 10px;
          }
          .nv-footer {
            flex-direction: column-reverse;
            gap: 12px;
          }
          .btn-cancel, .btn-save {
            width: 100%;
            justify-content: center;
          }
        }
      ` }} />

      <div className="nv-header">
        <div>
          <h2 className="nv-title">Editar vehículo</h2>
          <p className="nv-subtitle">Actualizá los datos de la publicación #{id}</p>
        </div>
      </div>

      {feedback && (
        <div className={`nv-feedback ${feedback.type}`}>
          {feedback.type === "success"
            ? <CheckCircle size={18} />
            : <AlertCircle size={18} />}
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="nv-card">
          <p className="nv-section-title">Información del vehículo</p>

          <div className="nv-grid">
            <div className={`nv-fg${errors.marca ? " error" : ""}`}>
              <label htmlFor="marca">Marca *</label>
              <select id="marca" value={form.marca} onChange={e => set("marca", e.target.value)}>
                <option value="">Seleccioná una marca</option>
                {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              {errors.marca && <span className="nv-error-msg">{errors.marca}</span>}
            </div>

            <div className={`nv-fg${errors.modelo ? " error" : ""}`}>
              <label htmlFor="modelo">Modelo *</label>
              <input
                id="modelo"
                type="text"
                placeholder="ej: 208 GT, Hilux SRX"
                value={form.modelo}
                onChange={e => set("modelo", e.target.value)}
              />
              {errors.modelo && <span className="nv-error-msg">{errors.modelo}</span>}
            </div>
          </div>

          <div className="nv-grid" style={{ gridTemplateColumns: '1fr 1fr 2fr', marginBottom: '20px' }}>
            <div className={`nv-fg${errors.anio ? " error" : ""}`}>
              <label htmlFor="anio">Año *</label>
              <input
                id="anio"
                type="number"
                min={2000}
                max={2026}
                placeholder="ej: 2023"
                value={form.anio}
                onChange={e => set("anio", e.target.value)}
              />
              {errors.anio && <span className="nv-error-msg">{errors.anio}</span>}
            </div>

            <div className="nv-fg">
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                type="text"
                placeholder='ej: "Consultar" o "$25.000.000"'
                value={form.precio}
                onChange={e => set("precio", e.target.value)}
              />
            </div>

            <div className={`nv-fg${errors.tipo ? " error" : ""}`}>
              <label>Tipo *</label>
              <div className="radio-group" style={{ marginTop: 0 }}>
                {[{ val: "nuevo", label: "0 KM" }, { val: "usado", label: "USADO" }].map(({ val, label }) => (
                  <label key={val} className={`radio-option${form.tipo === val ? " selected" : ""}`}>
                    <input type="radio" name="tipo" value={val} checked={form.tipo === val} onChange={() => set("tipo", val)} />
                    {label}
                  </label>
                ))}
              </div>
              {errors.tipo && <span className="nv-error-msg">{errors.tipo}</span>}
            </div>

            {form.tipo === "usado" ? (
              <div className="nv-fg">
                <label htmlFor="km">Kilometraje</label>
                <input
                  id="km"
                  type="number"
                  min={0}
                  placeholder="ej: 45000"
                  value={form.km}
                  onChange={e => set("km", e.target.value)}
                />
              </div>
            ) : <div />}
          </div>

          <div className="divider" />
          <p className="nv-section-title">Descripción e imagen</p>

          <div className="nv-grid full" style={{ marginBottom: '20px' }}>
            <div className="nv-fg">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                placeholder="Versión, equipamiento, color, extras destacados..."
                value={form.descripcion}
                onChange={e => set("descripcion", e.target.value)}
              />
            </div>
          </div>

          <div className="nv-grid full" style={{ marginBottom: '20px' }}>
            <div className="nv-fg">
              <label htmlFor="imagen_url">URL de imagen</label>
              <input
                id="imagen_url"
                type="text"
                placeholder="https://... (URL directa de la foto del vehículo)"
                value={form.imagen_url}
                onChange={e => set("imagen_url", e.target.value)}
              />
            </div>
          </div>

          {form.imagen_url && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#7b809a', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Vista previa de la imagen</label>
              <img
                src={form.imagen_url}
                alt="Vista previa"
                style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #d2d6da' }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="divider" />
          <p className="nv-section-title">Publicación</p>

          <div className="toggle-row">
            <div>
              <div className="toggle-label">Publicar en el sitio</div>
              <div className="toggle-sub">Cuando está activo, el vehículo se muestra en /vehiculos</div>
            </div>
            <div
              className="toggle-switch"
              onClick={() => set("activo", !form.activo)}
              title={form.activo ? "Clic para desactivar" : "Clic para activar"}
            >
              <div className={`toggle-track${form.activo ? " on" : ""}`}>
                <div className={`toggle-thumb${form.activo ? " on" : ""}`} />
              </div>
            </div>
          </div>

          <div className="nv-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => router.push("/dashboard/vehiculos")}
            >
              <X size={16} />
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
