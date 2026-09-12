import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Navbar({ user }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          Orgelverein Ferschnitz
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/ueber-uns" className={({ isActive }) => isActive ? 'active' : ''}>Sinn &amp; Zweck</NavLink>
          <NavLink to="/vorstand" className={({ isActive }) => isActive ? 'active' : ''}>Vorstand</NavLink>
          <NavLink to="/aktivitaeten" className={({ isActive }) => isActive ? 'active' : ''}>Aktivitäten</NavLink>
          <NavLink to="/mitglied-werden" className={({ isActive }) => isActive ? 'active' : ''}>Mitglied werden</NavLink>
          <NavLink to="/kontakt" className={({ isActive }) => isActive ? 'active' : ''}>Kontakt</NavLink>
          {user && (
            <>
              <NavLink to="/admin/aktivitaeten" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink>
              <button onClick={handleLogout}>Abmelden</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
