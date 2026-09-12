import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../supabase'
import { uploadImage } from '../../lib/uploadImage'
import ImageUpload from '../../components/ImageUpload'

export default function EditAktivitaet() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('aktivitaeten').select('*').eq('id', id).single()
      setForm(data)
    }
    load()
  }, [id])

  if (!form) return null

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let bild_url = form.bild_url
    if (file) {
      try {
        bild_url = await uploadImage('aktivitaeten-bilder', file)
      } catch (err) {
        setError('Bild-Upload fehlgeschlagen: ' + err.message)
        setLoading(false)
        return
      }
    }

    const { titel, datum, ort, beschreibung } = form
    const { error: updateError } = await supabase
      .from('aktivitaeten')
      .update({ titel, datum, ort, beschreibung, bild_url })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }
    navigate('/admin/aktivitaeten')
  }

  return (
    <div className="container section">
      <h2>Aktivität bearbeiten</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>Titel *</label>
          <input value={form.titel || ''} onChange={set('titel')} required />
        </div>
        <div className="form-group">
          <label>Datum</label>
          <input type="date" value={form.datum || ''} onChange={set('datum')} />
        </div>
        <div className="form-group">
          <label>Ort</label>
          <input value={form.ort || ''} onChange={set('ort')} />
        </div>
        <div className="form-group">
          <label>Beschreibung</label>
          <textarea value={form.beschreibung || ''} onChange={set('beschreibung')} rows={5} />
        </div>
        <ImageUpload label="Bild" existingUrl={form.bild_url} onFileChange={setFile} />
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
