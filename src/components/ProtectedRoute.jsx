import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      toast.warn("Please Login First 🔒")
    }
  }, [user])

  if (!user) return <Navigate to="/" />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 px-6 py-10 text-center">
        <p className="text-2xl" aria-hidden>
          🚫
        </p>
        <h1 className="mt-3 text-lg font-semibold text-amber-900">
          Access denied
        </h1>
        <p className="mt-2 text-sm text-amber-800/90">
          You don&apos;t have permission to view this page.
        </p>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
