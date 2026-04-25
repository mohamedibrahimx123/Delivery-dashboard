import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useOrders from "../hooks/useOrders"

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"

const AddOrderPage = () => {
  const { handleAddOrder } = useOrders()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newError = {}
    if (!title.trim()) newError.title = "Title is required"
    if (!description.trim()) newError.description = "Description is required"
    if (!price) newError.price = "Price is required"
    else if (price <= 0) newError.price = "Price must be greater than 0"
    return newError
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const vadlidateErrors = validate()
    if (Object.keys(vadlidateErrors).length > 0) {
      setErrors(vadlidateErrors)
      return
    }

    setLoading(true)
    try {
      await new Promise((res) => setTimeout(res, 1000))

      if (!title || !description || !price) return

      const newOrder = {
        id: Date.now(),
        title,
        description,
        price,
      }
      handleAddOrder(newOrder)
      setTitle("")
      setDescription("")
      setPrice("")
      navigate("/orders")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Add order
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Fill in the details below. All fields are required.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="add-title"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Title
            </label>
            <input
              id="add-title"
              type="text"
              placeholder="Order title"
              className={fieldClass}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setErrors((prev) => ({ ...prev, title: "" }))
              }}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="add-price"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Price
            </label>
            <input
              id="add-price"
              type="number"
              placeholder="0"
              className={fieldClass}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
                setErrors((prev) => ({ ...prev, price: "" }))
              }}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="add-description"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="add-description"
              rows={4}
              placeholder="Delivery notes, address..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setErrors((prev) => ({ ...prev, description: "" }))
              }}
              className={`${fieldClass} resize-y min-h-[100px]`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              disabled={loading}
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    aria-hidden
                  />
                  Adding…
                </span>
              ) : (
                "Add order"
              )}
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

export default AddOrderPage
