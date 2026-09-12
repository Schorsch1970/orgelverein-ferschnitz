import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate('/admin/aktivitaeten')
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 style={{ textAlign: 'center' }}>Vereins-Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>E-Mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.at" required />
          </div>
          <div className="form-group">
            <label>Passwort</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-primary w-full mt-2" type="submit" disabled={loading}>
            {loading ? 'Anmelden...' : 'Anmelden'}
          </button>
        </form>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem', textAlign: 'center' }}>
          Nur für Vorstandsmitglieder. Zugang wird über Supabase vergeben.
        </p>
      </div>
    </div>
  )
}
