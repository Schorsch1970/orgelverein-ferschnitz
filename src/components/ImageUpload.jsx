import { useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'

export default function ImageUpload({ label, existingUrl, onFileChange }) {
  const [preview, setPreview] = useState(existingUrl || null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setPreview(URL.createObjectURL(file))
    onFileChange(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onFileChange(null)
  }

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        style={{
          border: `2px dashed ${dragging ? 'var(--gold)' : 'var(--border)'}`,
          borderRadius: 8,
          padding: '1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? 'var(--cream-dark)' : 'var(--cream)',
        }}
      >
        {preview ? (
          <img src={preview} alt="Vorschau" style={{ maxHeight: 180, maxWidth: '100%', borderRadius: 6 }} />
        ) : (
          <>
            <ImagePlus size={32} color="var(--gold)" style={{ marginBottom: '0.5rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Bild hierher ziehen oder klicken zum Auswählen
            </p>
          </>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])} />
      </div>
      {preview && (
        <button type="button" onClick={handleRemove}
          style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>
          ✕ Bild entfernen
        </button>
      )}
    </div>
  )
}
