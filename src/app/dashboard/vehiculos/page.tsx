"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Car,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Vehiculo = {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: "nuevo" | "usado";
  precio: string;
  km: number | null;
  descripcion: string;
  imagen_url: string;
  activo: boolean;
  created_at?: string;
};

export default function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchVehiculos = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: dbError } = await supabase
        .from("vehiculos_otros")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbError) throw dbError;
      if (data) {
        setVehiculos(data as Vehiculo[]);
      }
    } catch (err: any) {
      console.error("Error fetching vehicles:", err);
      setError("No se pudieron cargar los vehículos de la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const handleToggleActivo = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const { error: patchError } = await supabase
        .from("vehiculos_otros")
        .update({ activo: !currentStatus })
        .eq("id", id);

      if (patchError) throw patchError;

      setVehiculos((prev) =>
        prev.map((v) => (v.id === id ? { ...v, activo: !currentStatus } : v))
      );
    } catch (err: any) {
      console.error("Error toggling status:", err);
      alert("Error al actualizar el estado del vehículo.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string, modelName: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente el vehículo "${modelName}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const { error: deleteError } = await supabase
        .from("vehiculos_otros")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setVehiculos((prev) => prev.filter((v) => v.id !== id));
    } catch (err: any) {
      console.error("Error deleting vehicle:", err);
      alert("Ocurrió un error al intentar eliminar el vehículo.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredVehiculos = vehiculos.filter(
    (v) =>
      v.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vehiculos-page">
      <style dangerouslySetInnerHTML={{
        __html: `
        .vehiculos-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .add-btn {
          background: linear-gradient(195deg, #49a3f1, #1A73E8);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 14px 0 rgba(26, 115, 232, 0.35);
          transition: all 0.2s;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px 0 rgba(26, 115, 232, 0.45);
        }

        /* TABLE CARD */
        .table-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .table-header {
          padding: 24px;
          border-bottom: 1px solid #f0f2f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title { margin: 0; font-size: 18px; color: #344767; }

        .search-filter {
          display: flex;
          gap: 12px;
        }

        .search-input {
          position: relative;
        }

        .search-input input {
          border: 1px solid #d2d6da;
          border-radius: 8px;
          padding: 8px 12px 8px 36px;
          font-size: 14px;
          outline: none;
          width: 250px;
          transition: border-color 0.2s;
        }

        .search-input input:focus {
          border-color: #1A73E8;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #7b809a;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          padding: 12px 24px;
          text-align: left;
          font-size: 10px;
          text-transform: uppercase;
          color: #7b809a;
          border-bottom: 1px solid #f0f2f5;
        }

        td {
          padding: 16px 24px;
          font-size: 14px;
          color: #7b809a;
          border-bottom: 1px solid #f0f2f5;
        }

        .vehiculo-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .vehiculo-img {
          width: 54px;
          height: 54px;
          border-radius: 8px;
          object-fit: cover;
          background: #f0f2f5;
          border: 1px solid #e9ecef;
        }

        .vehiculo-name {
          display: flex;
          flex-direction: column;
        }

        .name-main { font-weight: 700; color: #344767; }
        .name-sub { font-size: 11px; color: #7b809a; margin-top: 2px; }

        .status-badge {
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge.activo {
          background: #4CAF50;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
        }

        .status-badge.activo:hover {
          background: #43A047;
          transform: translateY(-1px);
        }

        .status-badge.inactivo {
          background: #7b809a;
          box-shadow: 0 2px 8px rgba(123, 128, 154, 0.3);
        }

        .status-badge.inactivo:hover {
          background: #6c7188;
          transform: translateY(-1px);
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid #f0f2f5;
          background: white;
          color: #7b809a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .action-btn:hover {
          background: #f0f2f5;
          color: #344767;
        }

        .action-btn.delete:hover {
          background: #ffebee;
          color: #F44336;
          border-color: #ffcdd2;
        }

        .error-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFEBEE;
          color: #C62828;
          padding: 16px 20px;
          border-radius: 10px;
          font-weight: 500;
        }

        /* SKELETON LOADERS */
        .skeleton-row td {
          padding: 20px 24px;
        }
        .skeleton-bar {
          background: linear-gradient(90deg, #eef2f7 25%, #e0e6ed 50%, #eef2f7 75%);
          background-size: 200% 100%;
          animation: loading-shimmer 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes loading-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` }} />

      <div className="header-actions">
        <h2 className="table-title">Gestión de Inventario</h2>
        <Link href="/dashboard/vehiculos/nuevo" className="add-btn" style={{ textDecoration: 'none' }}>
          <Plus size={18} />
          Nuevo vehículo
        </Link>
      </div>

      {error && (
        <div className="error-alert">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <div className="search-filter">
            <div className="search-input">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar vehículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>
            <button className="action-btn" title="Recargar lista" onClick={fetchVehiculos} disabled={loading}>
              <Filter size={16} />
            </button>
          </div>
          <div style={{ color: '#7b809a', fontSize: '14px' }}>
            {loading ? (
              "Cargando..."
            ) : (
              <>Mostrando <b>{filteredVehiculos.length}</b> de <b>{vehiculos.length}</b> unidades</>
            )}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Tipo / Kilómetros</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="skeleton-row">
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div className="skeleton-bar" style={{ width: '54px', height: '54px', borderRadius: '8px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div className="skeleton-bar" style={{ width: '120px', height: '16px' }} />
                        <div className="skeleton-bar" style={{ width: '60px', height: '12px' }} />
                      </div>
                    </div>
                  </td>
                  <td><div className="skeleton-bar" style={{ width: '70px', height: '16px' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '80px', height: '16px' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '100px', height: '16px' }} /></td>
                  <td><div className="skeleton-bar" style={{ width: '70px', height: '24px', borderRadius: '6px' }} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div className="skeleton-bar" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                      <div className="skeleton-bar" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : filteredVehiculos.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#7b809a' }}>
                  <Car size={36} style={{ margin: '0 auto 12px', opacity: 0.4, display: 'block' }} />
                  {searchTerm ? "No se encontraron vehículos que coincidan con la búsqueda." : "No hay vehículos cargados en el inventario."}
                </td>
              </tr>
            ) : (
              filteredVehiculos.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div className="vehiculo-info">
                      <img
                        src={v.imagen_url || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100&q=80"}
                        alt={`${v.marca} ${v.modelo}`}
                        className="vehiculo-img"
                      />
                      <div className="vehiculo-name">
                        <span className="name-main">{v.modelo}</span>
                        <span className="name-sub">Año: {v.anio}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#344767' }}>{v.marca.toUpperCase()}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#1A73E8' }}>
                    {typeof v.precio === 'number'
                      ? `$ ${Number(v.precio).toLocaleString('es-AR')}`
                      : v.precio}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#344767' }}>
                        {v.tipo === 'nuevo' ? '0 KM' : 'Usado'}
                      </span>
                      {v.tipo === 'usado' && v.km != null && (
                        <span style={{ fontSize: '12px', color: '#7b809a', marginTop: '2px' }}>
                          {v.km.toLocaleString('es-AR')} km
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {togglingId === v.id ? (
                      <button className="status-badge" style={{ background: '#e0e0e0', color: '#7b809a', cursor: 'not-allowed' }} disabled>
                        <Loader2 className="animate-spin" size={12} />
                        Guardando...
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleActivo(v.id, v.activo)}
                        className={`status-badge ${v.activo ? 'activo' : 'inactivo'}`}
                        title={v.activo ? "Clic para desactivar publicación" : "Clic para activar publicación"}
                      >
                        {v.activo ? "Publicado" : "Borrador"}
                      </button>
                    )}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <a
                        href={v.tipo === 'nuevo' ? '/vehiculos/0km' : '/vehiculos/usados'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn"
                        title="Ver en el sitio público"
                      >
                        <Eye size={16} />
                      </a>
                      <Link
                        href={`/dashboard/vehiculos/editar/${v.id}`}
                        className="action-btn"
                        title="Editar vehículo"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id, `${v.marca} ${v.modelo}`)}
                        className="action-btn delete"
                        title="Eliminar vehículo"
                        disabled={deletingId === v.id}
                      >
                        {deletingId === v.id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
