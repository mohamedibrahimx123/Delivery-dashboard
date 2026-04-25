import { useNavigate } from "react-router-dom"
import { memo, useState, useEffect, useMemo } from "react"
import useAuth from "../hooks/useAuth"
import useOrders from "../hooks/useOrders"
import { parsePriceNumber } from "../utils/parsePrice"

const itemsPerPage = 5

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"

const OrdersPages = () => {
  const navigate = useNavigate()
  const { orders, loading, error, handleDeleteOrder } = useOrders()
  const { user } = useAuth()

  const [search, setSearch] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesText = order.title
          .toLowerCase()
          .includes(search.toLowerCase().trim())

        if (minPrice === "") return matchesText

        const min = Number(minPrice)
        if (!Number.isFinite(min) || min < 0) return matchesText

        const orderPrice = parsePriceNumber(order.price)
        const numericOrderPrice = Number.isFinite(orderPrice) ? orderPrice : 0

        return matchesText && numericOrderPrice >= min
      }),
    [orders, search, minPrice]
  )

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / itemsPerPage)
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search, minPrice])

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-600">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
          aria-hidden
        />
        <p className="mt-4 text-sm">Loading orders…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-800">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Search, filter by minimum price, and browse pages.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="order-search"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Search title
            </label>
            <input
              id="order-search"
              type="text"
              placeholder="Type to filter…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={inputClass}
              aria-label="Search orders by title"
            />
          </div>
          <div>
            <label
              htmlFor="min-price"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Min price
            </label>
            <input
              id="min-price"
              type="number"
              min={0}
              step="any"
              placeholder="e.g. 10"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={inputClass}
              aria-label="Minimum price filter"
            />
          </div>
        </div>
      </div>

      {currentOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 py-12 text-center">
          <p className="font-medium text-slate-700">No orders match your filters</p>
          <p className="mt-1 text-sm text-slate-500">
            Try clearing the search or lowering the minimum price.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {currentOrders.map((order) => (
            <li
              key={order.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-5"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-lg font-semibold leading-snug text-slate-900">
                  {order.title}
                </h2>
                <span className="shrink-0 text-sm font-medium text-emerald-700">
                  {order.price}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {order.description}
              </p>

              {user?.role === "Admin" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/edit/${order.id}`)}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteOrder(order.id)}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage <= 1}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-slate-600">
          Page <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
          of <span className="font-semibold text-slate-900">{totalPages}</span>
          {filteredOrders.length > 0 && (
            <span className="text-slate-500">
              {" "}
              · {filteredOrders.length} result
              {filteredOrders.length !== 1 ? "s" : ""}
            </span>
          )}
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default memo(OrdersPages)
