import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight transition hover:text-blue-300 sm:text-xl"
        >
          Delivery <span aria-hidden>🚚</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          {user && (
            <>
              <Link
                to="/orders"
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium transition hover:bg-blue-500"
              >
                Orders
              </Link>
              {user.role === "Admin" && (
                <Link
                  to="/add"
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium transition hover:bg-emerald-500"
                >
                  Add
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-medium transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
