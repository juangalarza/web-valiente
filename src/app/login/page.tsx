"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await (supabase.auth as any).getSession();
        if (session) {
          localStorage.setItem("isLoggedIn", "true");
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Session check error:", err);
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await (supabase.auth as any).signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      if (data.user) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        .login-container {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background-color: #0A0E17;
          font-family: 'Barlow', sans-serif;
        }

        .login-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .login-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .login-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 14, 23, 0.25);
          backdrop-filter: blur(2px);
          z-index: 1;
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 640px;
          background: rgba(17, 24, 39, 0.75);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 32px;
          padding: 48px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.6);
          text-align: center;
        }

        .login-title {
          color: white;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 40px;
          letter-spacing: -0.02em;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
          text-align: left;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #FBBF24;
          display: flex;
          align-items: center;
        }

        .login-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          padding: 16px 16px 16px 48px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }

        .login-input:focus {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .login-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .login-btn {
          width: 100%;
          background: #3B82F6;
          color: white;
          border: none;
          border-radius: 14px;
          padding: 16px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 10px;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-btn:hover:not(:disabled) {
          background: #2563EB;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.5);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .error-msg {
          background: rgba(239, 68, 68, 0.15);
          color: #FCA5A5;
          padding: 12px;
          border-radius: 12px;
          font-size: 12px;
          text-align: left;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .login-footer {
          margin-top: 40px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .login-footer a {
          color: white;
          font-weight: 700;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .pass-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .pass-toggle:hover {
          color: white;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
            border-radius: 24px;
          }
          .login-title {
            font-size: 26px;
            margin-bottom: 28px;
          }
        }
      ` }} />

      <div className="login-bg">
        <img src="/bg-login.jpg" alt="Background" />
        <div className="login-overlay"></div>
      </div>

      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="input-group">
            <div className="input-icon"><User size={20} /></div>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon"><Lock size={20} /></div>
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="pass-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}
