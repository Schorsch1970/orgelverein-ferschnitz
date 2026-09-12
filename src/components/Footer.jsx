import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import Newsletter from './Newsletter'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <img src="/logo.png" alt="Orgelverein Ferschnitz" className="footer-logo" />
          <h3 className="footer-heading">Kontakt</h3>
          <p className="footer-text">Orgelverein Ferschnitz<br />Ferschnitz, Niederösterreich</p>
          <p className="footer-text">
            <MapPin size={16} /> 3325 Ferschnitz
          </p>
          <p className="footer-text">
            <Mail size={16} /> <a href="mailto:info@orgelverein-ferschnitz.at">info@orgelverein-ferschnitz.at</a>
          </p>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="footer-text">Nichts mehr verpassen — melde dich für Neuigkeiten des Orgelvereins an.</p>
          <Newsletter />
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Verein</h3>
          <p className="footer-text"><Link to="/ueber-uns">Sinn &amp; Zweck</Link></p>
          <p className="footer-text"><Link to="/vorstand">Vorstand</Link></p>
          <p className="footer-text"><Link to="/mitglied-werden">Mitglied werden</Link></p>
          <p className="footer-text"><Link to="/kontakt">Kontakt</Link></p>
          <p className="footer-text"><Link to="/impressum">Impressum</Link></p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Orgelverein Ferschnitz
      </div>
    </footer>
  )
}
