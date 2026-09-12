import { Mail, MapPin } from 'lucide-react'

export default function Kontakt() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Kontakt</h1>
          <p>Wir freuen uns von dir zu hören.</p>
        </div>

        <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MapPin size={20} color="var(--bordeaux)" />
            Orgelverein Ferschnitz, 3325 Ferschnitz, Niederösterreich
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={20} color="var(--bordeaux)" />
            <a href="mailto:info@orgelverein-ferschnitz.at">info@orgelverein-ferschnitz.at</a>
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
            Adresse und E-Mail sind Platzhalter — bitte in <code>src/pages/Kontakt.jsx</code> durch die echten Kontaktdaten ersetzen.
          </p>
        </div>
      </div>
    </div>
  )
}
