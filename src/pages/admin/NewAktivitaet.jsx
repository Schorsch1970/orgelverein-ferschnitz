import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import { uploadImage } from '../../lib/uploadImage'
import ImageUpload from '../../components/ImageUpload'

export default function NewAktivitaet() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ titel: '', datum: '', ort: '', beschreibung: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let bild_url = null
    if (file) {
      try {
        bild_url = await uploadImage('aktivitaeten-bilder', file)
      } catch (err) {
        setError('Bild-Upload fehlgeschlagen: ' + err.message)
        setLoading(false)
        return
      }
    }

    const { error: insertError } = await supabase.from('aktivitaeten').insert({ ...form, bild_url })
    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }
    navigate('/admin/aktivitaeten')
  }

  return (
    <div className="container section">
      <h2>Neue Aktivität</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>Titel *</label>
          <input value={form.titel} onChange={set('titel')} placeholder="z.B. Orgelkonzert zum Herbstfest" required />
        </div>
        <div className="form-group">
          <label>Datum</label>
          <input type="date" value={form.datum} onChange={set('datum')} />
        </div>
        <div className="form-group">
          <label>Ort</label>
          <input value={form.ort} onChange={set('ort')} placeholder="z.B. Pfarrkirche Ferschnitz" />
        </div>
        <div className="form-group">
          <label>Beschreibung</label>
          <textarea value={form.beschreibung} onChange={set('beschreibung')} rows={5} />
        </div>
        <ImageUpload label="Bild" onFileChange={setFile} />
        {error && <p className="error-msg">{error}</p>}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Speichern...' : 'Speichern'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/aktivitaeten')}>Abbrechen</button>
        </div>
      </form>
    </div>
  )
}
