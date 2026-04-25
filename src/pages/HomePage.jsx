import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const HomePage = () => {
  const { user, login } = useAuth()

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          Delivery dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Orders in one place
        </h1>
        <p className="mt-3 text-slate-600">
          Sign in to browse orders, filter, and manage deliveries (demo).
        </p>

        {user ? (
          <div className="mt-8 space-y-4">
            <p className="text-lg text-slate-800">
              Welcome back,{" "}
              <span className="font-semibold text-slate-900">{user.name}</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/orders"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View orders
              </Link>
              {user.role === "Admin" && (
                <Link
                  to="/add"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Add order
                </Link>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={login}
            className="mt-8 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:px-8"
          >
            Sign in (demo)
          </button>
        )}
      </div>
    </div>
  )
}

export default HomePage
