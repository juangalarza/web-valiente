"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Car, 
  Edit2, 
  Trash2, 
  Eye,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function VehiculosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const vehiculos = [
    { 
      id: 1, 
      modelo: "Haval H6 2024", 
      marca: "HAVAL", 
      precio: "$45,000", 
      stock: 5, 
      estado: "Disponible",
      img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=100&q=80"
    },
    { 
      id: 2, 
      modelo: "JMC Vigus 6", 
      marca: "JMC", 
      precio: "$38,000", 
      stock: 2, 
      estado: "Bajo Stock",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80"
    },
    { 
      id: 3, 
      modelo: "Shineray X30", 
      marca: "SHINERAY", 
      precio: "$18,500", 
      stock: 0, 
      estado: "Agotado",
      img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&q=80"
    },
    { 
      id: 4, 
      modelo: "Domy X5 SUV", 
      marca: "DOMY", 
      precio: "$29,000", 
      stock: 8, 
      estado: "Disponible",
      img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100&q=80"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible": return "#4CAF50";
      case "Bajo Stock": return "#FB8C00";
      case "Agotado": return "#F44336";
      default: return "#7b809a";
    }
  };

  return (
    <div className="vehiculos-page">
      <style dangerouslySetInnerHTML={{ __html: `
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
          box-shadow: 0 4px 14px 0 rgba(0, 188, 212, 0.39);
          transition: all 0.2s;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px 0 rgba(0, 188, 212, 0.23);
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
          width: 48px;
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
          background: #f0f2f5;
        }

        .vehiculo-name {
          display: flex;
          flex-direction: column;
        }

        .name-main { font-weight: 700; color: #344767; }
        .name-sub { font-size: 12px; color: #7b809a; }

        .status-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
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
      ` }} />

      <div className="header-actions">
        <h2 className="table-title">Gestión de Inventario</h2>
        <button className="add-btn">
          <Plus size={18} />
          Agregar Vehículo
        </button>
      </div>

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
              />
            </div>
            <button className="action-btn" title="Filtrar">
              <Filter size={16} />
            </button>
          </div>
          <div style={{ color: '#7b809a', fontSize: '14px' }}>
            Mostrando <b>{vehiculos.length}</b> unidades
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v) => (
              <tr key={v.id}>
                <td>
                  <div className="vehiculo-info">
                    <img src={v.img} alt={v.modelo} className="vehiculo-img" />
                    <div className="vehiculo-name">
                      <span className="name-main">{v.modelo}</span>
                      <span className="name-sub">ID: #{v.id.toString().padStart(4, '0')}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{v.marca}</span>
                </td>
                <td style={{ fontWeight: 700, color: '#344767' }}>
                  {v.precio}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <b>{v.stock}</b> unidades
                  </div>
                </td>
                <td>
                  <span className="status-badge" style={{ background: getStatusColor(v.estado) }}>
                    {v.estado}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn" title="Ver detalle">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn" title="Editar">
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn delete" title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
