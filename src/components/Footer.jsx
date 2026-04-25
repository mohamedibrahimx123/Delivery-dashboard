import { Link } from "react-router-dom"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <div className="text-center text-sm sm:text-left">
          <p className="font-medium text-slate-300">
            Delivery <span aria-hidden>🚚</span> Dashboard
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Demo project for learning  © {year}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            to="/"
            className="text-slate-400 transition hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/orders"
            className="text-slate-400 transition hover:text-white"
          >
            Orders
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
