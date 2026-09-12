export default function Impressum() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h1>Impressum</h1>
          <p>Angaben gemäß Mediengesetz und E-Commerce-Gesetz</p>
        </div>

        <div className="card" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h3>Medieninhaber &amp; Herausgeber</h3>
          <p>
            Orgelverein Ferschnitz<br />
            3325 Ferschnitz, Niederösterreich
          </p>

          <h3>Vertretungsbefugtes Organ</h3>
          <p>Georg Berger, Obmann</p>

          <h3>Vereinsregisterzahl (ZVR)</h3>
          <p>1134092736</p>

          <h3>Zuständige Vereinsbehörde</h3>
          <p>Bezirkshauptmannschaft Amstetten</p>

          <h3>Kontakt</h3>
          <p>
            E-Mail: <a href="mailto:info@orgelverein-ferschnitz.at">info@orgelverein-ferschnitz.at</a>
          </p>

          <h3>Vereinszweck</h3>
          <p>
            Erhaltung, Pflege und Förderung der Orgel- und Kirchenmusik in der Pfarre
            Ferschnitz (siehe <a href="/ueber-uns">Sinn &amp; Zweck</a>).
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
            Obmann und ZVR-Zahl stammen aus dem Zentralen Vereinsregister. Falls eine genaue
            Zustelladresse (Straße/Hausnummer) ergänzt werden soll, bitte in{' '}
            <code>src/pages/Impressum.jsx</code> eintragen.
          </p>
        </div>
      </div>
    </div>
  )
}
