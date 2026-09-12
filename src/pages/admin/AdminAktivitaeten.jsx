import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'
import AdminNav from '../../components/AdminNav'

export default function AdminAktivitaeten() {
  const [liste, setListe] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase.from('aktivitaeten').select('*').order('datum', { ascending: false })
    setListe(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Diese Aktivität wirklich löschen?')) return
    await supabase.from('aktivitaeten').delete().eq('id', id)
    load()
  }

  return (
    <div className="container section">
      <AdminNav />
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>Aktivitäten verwalten</h2>
        <Link to="/admin/aktivitaeten/neu" className="btn btn-primary">+ Neue Aktivität</Link>
      </div>

      {!loading && liste.length === 0 && <div className="empty-state">Noch keine Aktivitäten angelegt.</div>}

      {liste.map(a => (
        <div key={a.id} className="admin-list-item">
          <div>
            <strong>{a.titel}</strong>
            {a.datum && <span style={{ color: 'var(--text-muted)', marginLeft: '0.6rem' }}>
              {new Date(a.datum).toLocaleDateString('de-AT')}
            </span>}
          </div>
          <div className="admin-actions">
            <Link to={`/admin/aktivitaeten/${a.id}/bearbeiten`} className="btn btn-secondary">Bearbeiten</Link>
            <button className="btn btn-danger" onClick={() => handleDelete(a.id)}>Löschen</button>
          </div>
        </div>
      ))}
    </div>
  )
}
