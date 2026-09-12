export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p><strong>Orgelverein Ferschnitz</strong></p>
        <p>Ferschnitz, Niederösterreich</p>
        <p><a href="/kontakt">Kontakt</a> · <a href="/mitglied-werden">Mitglied werden</a></p>
        <p>&copy; {new Date().getFullYear()} Orgelverein Ferschnitz</p>
      </div>
    </footer>
  )
}
