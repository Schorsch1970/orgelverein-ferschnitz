import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'
import AdminNav from '../../components/AdminNav'

export default function AdminVorstand() {
  const [liste, setListe] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('vorstand').select('*').order('reihenfolge', { ascending: true })
    setListe(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Dieses Vorstandsmitglied wirklich löschen?')) return
    await supabase.from('vorstand').delete().eq('id', id)
    load()
  }

  return (
    <div className="container section">
      <AdminNav />
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Vorstand verwalten</h2>
        <Link to="/admin/vorstand/neu" className="btn btn-primary">+ Neues Mitglied</Link>
      </div>

      {!loading && liste.length === 0 && <div className="empty-state">Noch keine Vorstandsmitglieder angelegt.</div>}

      {liste.map(m => (
        <div key={m.id} className="admin-list-item">
          <div>
            <strong>{m.name}</strong>
            {m.funktion && <span style={{ color: 'var(--text-muted)', marginLeft: '0.6rem' }}>{m.funktion}</span>}
          </div>
          <div className="admin-actions">
            <Link to={`/admin/vorstand/${m.id}/bearbeiten`} className="btn btn-secondary">Bearbeiten</Link>
            <button className="btn btn-danger" onClick={() => handleDelete(m.id)}>Löschen</button>
          </div>
        </div>
      ))}
    </div>
  )
}
