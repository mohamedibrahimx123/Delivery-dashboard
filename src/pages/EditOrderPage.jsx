import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useOrders from "../hooks/useOrders"

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"

const EditOrderPage = () => {
  const { orders, loading, error, handleEditOrder } = useOrders()
  const navigate = useNavigate()
  const { id } = useParams()

  const orderToEdit = orders.find((order) => order.id == id)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    if (!orderToEdit) return
    setTitle(orderToEdit.title)
    setDescription(orderToEdit.description)
    setPrice(String(orderToEdit.price))
  }, [orderToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedOrder = {
      id: orderToEdit.id,
      title,
      description,
      price,
    }
    handleEditOrder(updatedOrder)
    navigate("/orders")
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-600">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
          aria-hidden
        />
        <p className="mt-4 text-sm">Loading order…</p>
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

  if (!orderToEdit) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Order not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          No order matches this link.
        </p>
        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Back to orders
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Edit order
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Update the fields and save your changes.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="edit-title"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Title
            </label>
            <input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="edit-price"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Price
            </label>
            <input
              id="edit-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="edit-description"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="edit-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${fieldClass} resize-y min-h-[100px]`}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditOrderPage
