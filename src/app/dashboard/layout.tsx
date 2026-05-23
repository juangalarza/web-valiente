"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  Search,
  UserCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await (supabase.auth as any).getSession();
      if (!session) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  if (!isAuthenticated) return null;

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "Vehículos", icon: <Car size={20} />, href: "/dashboard/vehiculos" },
    { name: "Clientes", icon: <Users size={20} />, href: "/dashboard/clients" },
    { name: "Reportes", icon: <BarChart3 size={20} />, href: "/dashboard/reports" },
    { name: "Configuración", icon: <Settings size={20} />, href: "/dashboard/settings" },
  ];

  return (
    <div className="dashboard-root">
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-root {
          min-height: 100vh;
          background-color: #F0F2F5;
          font-family: 'Roboto', 'Barlow', sans-serif;
          display: flex;
        }

        /* SIDEBAR */
        .sidebar {
          position: fixed;
          top: 16px;
          left: 16px;
          bottom: 16px;
          width: 250px;
          background: linear-gradient(195deg, #42424a, #191919);
          border-radius: 12px;
          z-index: 1000;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(64,64,64,0.4);
        }

        .sidebar.closed {
          transform: translateX(-280px);
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .sidebar-logo {
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          text-decoration: none;
        }

        .sidebar-nav {
          padding: 16px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          border-radius: 6px;
          margin-bottom: 4px;
          transition: all 0.2s;
          font-size: 14px;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .nav-item.active {
          background: linear-gradient(195deg, #49a3f1, #1A73E8);
          color: white;
          box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(0,188,212,0.4);
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* MAIN CONTENT */
        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 24px 24px 24px 12px;
          transition: margin-left 0.3s ease;
          width: calc(100% - 280px);
        }

        .main-content.wide {
          margin-left: 0;
          width: 100%;
        }

        /* NAVBAR */
        .dashboard-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          margin-bottom: 50px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
          position: sticky;
          top: 16px;
          z-index: 900;
        }

        .nav-left {
          display: flex;
          flex-direction: column;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #7b809a;
          margin-bottom: 4px;
        }

        .breadcrumb span {
          color: #344767;
          opacity: 0.6;
        }

        .page-title {
          font-size: 16px;
          font-weight: 700;
          color: #344767;
          margin: 0;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          position: relative;
        }

        .search-box input {
          background: transparent;
          border: 1px solid #d2d6da;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 14px;
          outline: none;
          width: 200px;
          color: #495057;
        }

        .search-box input::placeholder {
          color: #adb5bd;
        }

        .icon-group {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #7b809a;
        }

        .icon-btn {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .icon-btn:hover {
          color: #344767;
        }

        @media (max-width: 1199px) {
          .main-content {
            margin-left: 0;
            width: 100%;
            padding-left: 24px;
          }
          .sidebar {
            transform: translateX(-300px);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .dashboard-nav {
            margin-top: 16px;
          }
        }
      ` }} />

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/">
            <img src="/logo-valiente-white.png" alt="Valiente Logo" style={{ width: '150px', height: 'auto', display: 'block' }} />
          </Link>
        </div>
        
        <div className="sidebar-nav">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <button 
            onClick={async () => {
              await (supabase.auth as any).signOut();
              localStorage.removeItem("isLoggedIn");
              router.push("/login");
            }}
            className="nav-item" 
            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${!isSidebarOpen ? 'wide' : ''}`}>
        <nav className="dashboard-nav">
          <div className="nav-left">
            <div className="breadcrumb">
              <Link href="/dashboard" className="icon-btn"><LayoutDashboard size={14} /></Link>
              <span>/ Dashboard</span>
            </div>
            <h2 className="page-title">Dashboard</h2>
          </div>

          <div className="nav-right">
            <div className="search-box">
              <input type="text" placeholder="Search here" />
            </div>
            
            <div className="icon-group">
              <button className="icon-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button className="icon-btn">
                <UserCircle size={20} />
              </button>

              <button className="icon-btn">
                <Settings size={20} />
              </button>

              <button className="icon-btn">
                <Bell size={20} />
              </button>
            </div>
          </div>
        </nav>

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
