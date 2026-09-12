import { Link } from 'react-router-dom'

export default function MitgliedWerden() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Mitglied werden</h1>
          <p>Es gibt zwei Wege, den Orgelverein Ferschnitz zu unterstützen.</p>
        </div>

        <div className="grid grid-2" style={{ maxWidth: 900, margin: '0 auto 3rem' }}>
          <div className="card">
            <h3>Aktives Mitglied</h3>
            <p>
              Du packst gerne selbst mit an — bei der Organisation von Konzerten, bei der
              Pflege der Orgel, als musikalisch Mitwirkende:r oder bei der Vereinsarbeit im
              Hintergrund. Aktive Mitglieder gestalten das Vereinsleben aktiv mit.
            </p>
          </div>
          <div className="card">
            <h3>Unterstützendes Mitglied</h3>
            <p>
              Du möchtest unsere Arbeit fördern, ohne selbst aktiv mitzuarbeiten? Als
              förderndes Mitglied trägst du mit deinem Beitrag dazu bei, dass die Orgel- und
              Kirchenmusik in Ferschnitz erhalten bleibt.
            </p>
          </div>
        </div>

        <div className="card" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h3>Interesse geweckt?</h3>
          <p>
            Melde dich einfach bei uns — wir erzählen dir gerne mehr über den Verein und wie
            du mitmachen kannst.
          </p>
          <Link to="/kontakt" className="btn btn-primary">Jetzt Kontakt aufnehmen</Link>
        </div>
      </div>
    </div>
  )
}
