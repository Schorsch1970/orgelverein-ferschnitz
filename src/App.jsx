import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { supabase } from './supabase'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import UeberUns from './pages/UeberUns'
import Vorstand from './pages/Vorstand'
import Aktivitaeten from './pages/Aktivitaeten'
import MitgliedWerden from './pages/MitgliedWerden'
import Kontakt from './pages/Kontakt'
import Login from './pages/Login'
import AdminAktivitaeten from './pages/admin/AdminAktivitaeten'
import NewAktivitaet from './pages/admin/NewAktivitaet'
import EditAktivitaet from './pages/admin/EditAktivitaet'
import AdminVorstand from './pages/admin/AdminVorstand'
import NewVorstand from './pages/admin/NewVorstand'
import EditVorstand from './pages/admin/EditVorstand'

function PrivateRoute({ user, children }) {
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ueber-uns" element={<UeberUns />} />
        <Route path="/vorstand" element={<Vorstand />} />
        <Route path="/aktivitaeten" element={<Aktivitaeten />} />
        <Route path="/mitglied-werden" element={<MitgliedWerden />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/aktivitaeten" element={<PrivateRoute user={user}><AdminAktivitaeten /></PrivateRoute>} />
        <Route path="/admin/aktivitaeten/neu" element={<PrivateRoute user={user}><NewAktivitaet /></PrivateRoute>} />
        <Route path="/admin/aktivitaeten/:id/bearbeiten" element={<PrivateRoute user={user}><EditAktivitaet /></PrivateRoute>} />

        <Route path="/admin/vorstand" element={<PrivateRoute user={user}><AdminVorstand /></PrivateRoute>} />
        <Route path="/admin/vorstand/neu" element={<PrivateRoute user={user}><NewVorstand /></PrivateRoute>} />
        <Route path="/admin/vorstand/:id/bearbeiten" element={<PrivateRoute user={user}><EditVorstand /></PrivateRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
