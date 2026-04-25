import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import OrdersPages from "./pages/OrdersPages"
import AddOrderPage from "./pages/AddOrderPage"
import EditOrderPage from "./pages/EditOrderPage"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 pb-16 sm:px-6">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPages />
            </ProtectedRoute>
          }></Route>
        <Route path="/add" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AddOrderPage />
          </ProtectedRoute>

        }></Route>
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <EditOrderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
