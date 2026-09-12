import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../supabase'
import { uploadImage } from '../../lib/uploadImage'
import ImageUpload from '../../components/ImageUpload'

export default function EditVorstand() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('vorstand').select('*').eq('id', id).single()
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

    let foto_url = form.foto_url
    if (file) {
      try {
        foto_url = await uploadImage('vorstand-fotos', file)
      } catch (err) {
        setError('Foto-Upload fehlgeschlagen: ' + err.message)
        setLoading(false)
        return
      }
    }

    const { name, funktion, beschreibung, reihenfolge } = form
    const { error: updateError } = await supabase
      .from('vorstand')
      .update({ name, funktion, beschreibung, reihenfolge: Number(reihenfolge) || 0, foto_url })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }
    navigate('/admin/vorstand')
  }

  return (
    <div className="container section">
      <h2>Vorstandsmitglied bearbeiten</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label>Name *</label>
          <input value={form.name || ''} onChange={set('name')} required />
        </div>
        <div className="form-group">
          <label>Funktion</label>
          <input value={form.funktion || ''} onChange={set('funktion')} />
        </div>
        <div className="form-group">
          <label>Beschreibung</label>
          <textarea value={form.beschreibung || ''} onChange={set('beschreibung')} rows={4} />
        </div>
        <div className="form-group">
          <label>Reihenfolge</label>
          <input type="number" value={form.reihenfolge ?? 0} onChange={set('reihenfolge')} />
        </div>
        <ImageUpload label="Foto" existingUrl={form.foto_url} onFileChange={setFile} />
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
