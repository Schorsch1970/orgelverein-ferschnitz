import { NavLink } from 'react-router-dom'

export default function AdminNav() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
      <NavLink to="/admin/aktivitaeten" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--bordeaux)' : 'var(--text-muted)' })}>
        Aktivitäten
      </NavLink>
      <NavLink to="/admin/vorstand" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--bordeaux)' : 'var(--text-muted)' })}>
        Vorstand
      </NavLink>
    </div>
  )
}
