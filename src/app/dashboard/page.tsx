"use client";

import React from "react";
import { 
  TrendingUp, 
  Users, 
  Car, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  MoreVertical,
  Store
} from "lucide-react";

export default function DashboardPage() {
  const projects = [
    { name: "Haval H6 Delivery", brand: "Haval", budget: "$45,000", status: 60, color: "#1A73E8" },
    { name: "Stock Update", brand: "Valiente", budget: "N/A", status: 100, color: "#4CAF50" },
    { name: "Shineray Campaign", brand: "Shineray", budget: "$12,500", status: 30, color: "#FB8C00" },
    { name: "JMC Vigus Launch", brand: "JMC", budget: "$58,000", status: 80, color: "#E91E63" },
  ];

  return (
    <div className="dashboard-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* STATS CARDS */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .stats-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          position: relative;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }

        .stats-icon {
          position: absolute;
          top: -24px;
          left: 16px;
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(0,0,0,0.2);
        }

        .stats-content {
          text-align: right;
        }

        .stats-title {
          font-size: 14px;
          color: #7b809a;
          margin: 0;
        }

        .stats-value {
          font-size: 24px;
          font-weight: 700;
          color: #344767;
          margin: 4px 0 0 0;
        }

        .stats-footer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #f0f2f5;
          font-size: 14px;
        }

        .trend-up { color: #4CAF50; font-weight: 700; }
        .trend-down { color: #F44336; font-weight: 700; }

        /* CHARTS */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .chart-viz {
          margin-top: -40px;
          height: 180px;
          border-radius: 8px;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          padding: 16px;
          box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(0,0,0,0.2);
        }

        .chart-bar {
          width: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          position: relative;
        }

        .chart-bar-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-radius: 10px;
          transition: height 1s ease-out;
        }

        /* TABLES */
        .table-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .table-header {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title { margin: 0; font-size: 16px; color: #344767; }
        .table-subtitle { margin: 4px 0 0 0; font-size: 14px; color: #7b809a; display: flex; align-items: center; gap: 4px; }

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

        .project-info { display: flex; align-items: center; gap: 12px; }
        .project-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 12px;
        }

        .progress-bar {
          width: 100px;
          height: 4px;
          background: #f0f2f5;
          border-radius: 4px;
          margin-top: 4px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }
      ` }} />

      {/* Stats */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon" style={{ background: 'linear-gradient(195deg, #42424a, #191919)' }}>
            <Store size={24} />
          </div>
          <div className="stats-content">
            <p className="stats-title">Reservas</p>
            <h3 className="stats-value">281</h3>
          </div>
          <div className="stats-footer">
            <span className="trend-up">+55%</span> que la semana pasada
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon" style={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>
            <Users size={24} />
          </div>
          <div className="stats-content">
            <p className="stats-title">Consultas Hoy</p>
            <h3 className="stats-value">2,300</h3>
          </div>
          <div className="stats-footer">
            <span className="trend-up">+3%</span> que ayer
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon" style={{ background: 'linear-gradient(195deg, #66BB6A, #43A047)' }}>
            <Car size={24} />
          </div>
          <div className="stats-content">
            <p className="stats-title">Ventas</p>
            <h3 className="stats-value">34k</h3>
          </div>
          <div className="stats-footer">
            <span className="trend-up">+1%</span> que el mes pasado
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon" style={{ background: 'linear-gradient(195deg, #EC407A, #D81B60)' }}>
            <Users size={24} />
          </div>
          <div className="stats-content">
            <p className="stats-title">Nuevos Clientes</p>
            <h3 className="stats-value">+91</h3>
          </div>
          <div className="stats-footer">
            Justo ahora
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid" style={{ marginTop: '48px', marginBottom: '40px' }}>
        <div className="chart-card">
          <div className="chart-viz" style={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)' }}>
            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
              <div key={i} className="chart-bar" style={{ height: '100px' }}>
                <div className="chart-bar-fill" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <h4 className="table-title">Vistas del Sitio</h4>
          <p className="table-subtitle">Rendimiento de la última campaña</p>
          <div className="stats-footer" style={{ border: 'none' }}>
            <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> actualizado hace 2 días
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-viz" style={{ background: 'linear-gradient(195deg, #66BB6A, #43A047)' }}>
             <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 35 Q 20 10 40 25 T 80 5 T 100 20" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h4 className="table-title">Ventas Diarias</h4>
          <p className="table-subtitle">(<span className="trend-up">+15%</span>) incremento hoy</p>
          <div className="stats-footer" style={{ border: 'none' }}>
            <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> actualizado hace 4 min
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-viz" style={{ background: 'linear-gradient(195deg, #42424a, #191919)' }}>
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 30 L 20 15 L 40 25 L 60 10 L 80 20 L 100 5" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h4 className="table-title">Tareas Completadas</h4>
          <p className="table-subtitle">Rendimiento semanal</p>
          <div className="stats-footer" style={{ border: 'none' }}>
            <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> recién actualizado
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h3 className="table-title">Proyectos</h3>
            <p className="table-subtitle"><CheckCircle2 size={16} style={{ color: '#1A73E8' }} /> <strong>30 realizados</strong> este mes</p>
          </div>
          <button className="icon-btn"><MoreVertical size={20} /></button>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Compañía / Proyecto</th>
              <th>Presupuesto</th>
              <th>Progreso</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={i}>
                <td>
                  <div className="project-info">
                    <div className="project-logo" style={{ background: p.color }}>{p.brand[0]}</div>
                    <span style={{ fontWeight: 700, color: '#344767' }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>{p.budget}</td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{p.status}%</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${p.status}%`, background: p.color }} />
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
