import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ArrowUpRight, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { contentData } from "../../data/data";
import { useAdminAuth } from "../../context/useAdminAuth";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { username, logout } = useAdminAuth();
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error(error);
      setLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#efecec]">
      <header className="border-b border-neutral-300 bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-name mb-1">
              {contentData.admin.layout.panelTitle}
            </p>

            {username && (
              <h1 className="font-display text-3xl uppercase tracking-normal text-text md:text-4xl">
                {username}
              </h1>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {contentData.admin.layout.backToSite}
              <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex cursor-pointer items-center gap-2 border border-neutral-900 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-300 hover:bg-neutral-900 hover:text-[#E8E8E8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={14} />
              {contentData.admin.layout.logOut}
            </button>
          </div>
        </div>
      </header>

      <nav className="border-b border-neutral-300 bg-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap gap-x-8 gap-y-2 px-6">
          {contentData.admin.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `cursor-pointer border-b-2 pb-3 pt-4 text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? "border-neutral-900 text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="mx-auto w-full max-w-7xl px-6 py-12">{children}</div>
    </main>
  );
}