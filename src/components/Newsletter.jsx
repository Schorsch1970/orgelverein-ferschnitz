import { useState } from 'react'
import { supabase } from '../supabase'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [einwilligung, setEinwilligung] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setStatus('loading')

    const { error: insertError } = await supabase.from('newsletter_abos').insert({ email })

    if (insertError) {
      if (insertError.code === '23505') {
        setError('Diese E-Mail-Adresse ist bereits angemeldet.')
      } else {
        setError(insertError.message)
      }
      setStatus('idle')
      return
    }

    setStatus('done')
  }

  if (status === 'done') {
    return <p className="newsletter-success">Danke! Du bekommst ab jetzt Neuigkeiten vom Orgelverein.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        type="email"
        required
        placeholder="deine@email.at"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <label className="newsletter-consent">
        <input
          type="checkbox"
          required
          checked={einwilligung}
          onChange={e => setEinwilligung(e.target.checked)}
        />
        Ich bin einverstanden, dass meine E-Mail-Adresse für den Newsletter des Orgelvereins Ferschnitz gespeichert wird.
      </label>
      {error && <p className="error-msg">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Wird angemeldet...' : 'Anmelden'}
      </button>
    </form>
  )
}
