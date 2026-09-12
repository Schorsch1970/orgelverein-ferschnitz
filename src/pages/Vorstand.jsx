import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { supabase } from '../supabase'

export default function Vorstand() {
  const [mitglieder, setMitglieder] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('vorstand')
        .select('*')
        .order('reihenfolge', { ascending: true })
      setMitglieder(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Der Vorstand</h1>
          <p>Die Menschen, die den Orgelverein Ferschnitz ehrenamtlich leiten und tragen.</p>
        </div>

        {!loading && mitglieder.length === 0 && (
          <div className="empty-state">
            Die Vorstandsmitglieder werden hier in Kürze vorgestellt.
          </div>
        )}

        {mitglieder.length > 0 && (
          <div className="grid grid-3">
            {mitglieder.map(m => (
              <div key={m.id} className="card vorstand-card">
                {m.foto_url ? (
                  <img src={m.foto_url} alt={m.name} className="vorstand-photo" />
                ) : (
                  <div className="vorstand-photo-placeholder">
                    <Users size={40} />
                  </div>
                )}
                <div className="vorstand-funktion">{m.funktion}</div>
                <h3 style={{ margin: '0.3em 0' }}>{m.name}</h3>
                {m.beschreibung && <p style={{ fontSize: '0.95rem' }}>{m.beschreibung}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
