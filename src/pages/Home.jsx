import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Home() {
  const [naechste, setNaechste] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const heute = new Date().toISOString().slice(0, 10)
      const { data } = await supabase
        .from('aktivitaeten')
        .select('*')
        .gte('datum', heute)
        .order('datum', { ascending: true })
        .limit(3)
      setNaechste(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Orgelverein Ferschnitz</h1>
          <p>„Gott ist ein Organist, wir sind sein Orgelwerk; sein Geist bläst jedem ein.“</p>
          <p className="hero-cite">— Angelus Silesius</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/mitglied-werden" className="btn btn-primary">Mitglied werden</Link>
            <Link to="/ueber-uns" className="btn btn-outline">Über uns</Link>
          </div>
          <img src="/orgel-hero.webp" alt="Orgel der Pfarrkirche Ferschnitz" className="hero-organ-img" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Nächste Aktivitäten</h2>
            <p>Konzerte, Führungen und Termine rund um die Orgel in Ferschnitz.</p>
          </div>

          {!loading && naechste.length === 0 && (
            <div className="empty-state">
              Derzeit sind keine Termine eingetragen. Schau bald wieder vorbei!
            </div>
          )}

          {naechste.length > 0 && (
            <div className="grid grid-3">
              {naechste.map(a => (
                <div key={a.id} className="card aktivitaet-card">
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
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/aktivitaeten" className="btn btn-secondary">Alle Aktivitäten ansehen</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Werde Teil des Orgelvereins</h2>
          <p style={{ maxWidth: 620, margin: '0 auto 1.5rem' }}>
            Ob als aktives Mitglied, das mitarbeitet, oder als unterstützendes Mitglied,
            das unsere Arbeit fördert — wir freuen uns über jede und jeden, der uns hilft,
            die Orgel- und Kirchenmusik in Ferschnitz lebendig zu halten.
          </p>
          <Link to="/mitglied-werden" className="btn btn-primary">Mehr erfahren</Link>
        </div>
      </section>
    </>
  )
}
