import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function AktivitaetCard({ a }) {
  return (
    <div className="card aktivitaet-card">
      {a.bild_url && <img src={a.bild_url} alt={a.titel} className="aktivitaet-bild" />}
      {a.datum && (
        <span className="aktivitaet-datum">
          {new Date(a.datum).toLocaleDateString('de-AT', { day: '2-digit', month: 'long', year: 'numeric' })}
        </span>
      )}
      <h3>{a.titel}</h3>
      {a.ort && <p style={{ color: 'var(--text-muted)', marginBottom: '0.5em' }}>{a.ort}</p>}
      {a.beschreibung && <p>{a.beschreibung}</p>}
    </div>
  )
}

export default function Aktivitaeten() {
  const [kommend, setKommend] = useState([])
  const [vergangen, setVergangen] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const heute = new Date().toISOString().slice(0, 10)
      const [{ data: k }, { data: v }] = await Promise.all([
        supabase.from('aktivitaeten').select('*').gte('datum', heute).order('datum', { ascending: true }),
        supabase.from('aktivitaeten').select('*').lt('datum', heute).order('datum', { ascending: false }),
      ])
      setKommend(k || [])
      setVergangen(v || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Aktivitäten</h1>
          <p>Konzerte, Führungen und Termine des Orgelvereins Ferschnitz.</p>
        </div>

        <h2>Kommende Termine</h2>
        {!loading && kommend.length === 0 && (
          <div className="empty-state">Derzeit sind keine kommenden Termine eingetragen.</div>
        )}
        {kommend.length > 0 && (
          <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
            {kommend.map(a => <AktivitaetCard key={a.id} a={a} />)}
          </div>
        )}

        {vergangen.length > 0 && (
          <>
            <h2>Vergangene Aktivitäten</h2>
            <div className="grid grid-3">
              {vergangen.map(a => <AktivitaetCard key={a.id} a={a} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
