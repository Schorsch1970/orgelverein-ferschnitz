import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import { uploadImage } from '../../lib/uploadImage'
import ImageUpload from '../../components/ImageUpload'

export default function NewVorstand() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', funktion: '', beschreibung: '', reihenfolge: 0 })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let foto_url = null
    if (file) {
      try {
        foto_url = await uploadImage('vorstand-fotos', file)
      } catch (err) {
        setError('Foto-Upload fehlgeschlagen: ' + err.message)
        setLoading(false)
        return
      }
    }

    const { error: insertError } = await supabase.from('vorstand').insert({
      ...form,
      reihenfolge: Number(form.reihenfolge) || 0,
      foto_url,
    })
    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }
    navigate('/admin/vorstand')
  }

  return (
    <div className="container section">
      <h2>Neues Vorstandsmitglied</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>Name *</label>
          <input value={form.name} onChange={set('name')} placeholder="Vorname Nachname" required />
        </div>
        <div className="form-group">
          <label>Funktion</label>
          <input value={form.funktion} onChange={set('funktion')} placeholder="z.B. Obmann, Kassier, Schriftführerin" />
        </div>
        <div className="form-group">
          <label>Beschreibung</label>
          <textarea value={form.beschreibung} onChange={set('beschreibung')} rows={4} />
        </div>
        <div className="form-group">
          <label>Reihenfolge</label>
          <input type="number" value={form.reihenfolge} onChange={set('reihenfolge')} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Bestimmt die Anzeigereihenfolge auf der Vorstand-Seite (kleinere Zahl zuerst).
          </p>
        </div>
        <ImageUpload label="Foto" onFileChange={setFile} />
        {error && <p className="error-msg">{error}</p>}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Speichern...' : 'Speichern'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/vorstand')}>Abbrechen</button>
        </div>
      </form>
    </div>
  )
}
