import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/auth.hooks";

export default function Layout({ savedCount }: { savedCount: number }) {
  const { user, isLoggedIn, logout } = useAuth();
  const link = ({ isActive }: { isActive: boolean }) =>
    `btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"}`;

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <h1 className="text-xl font-bold flex-1">Recipe Manager</h1>
          <nav className="flex gap-2">
            <NavLink to="/" className={link} end>
              Search
            </NavLink>
            <NavLink to="/saved" className={link}>
              Saved
              {isLoggedIn && savedCount > 0 && (
                <span className="badge badge-sm ml-2">{savedCount}</span>
              )}
            </NavLink>
            {isLoggedIn ? (
              <>
                <span className="text-sm self-center px-2">{user}</span>
                <button className="btn btn-sm btn-ghost" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <NavLink to="/login" className={link}>
                Sign in
              </NavLink>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <Outlet />
      </main>
    </div>
  );
}