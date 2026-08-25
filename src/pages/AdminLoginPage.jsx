import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStorefront } from '../context/StorefrontContext'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { isAdminAuthenticated, adminLogin } = useStorefront()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAdminAuthenticated, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    if (!password) {
      setError('Enter your password.')
      return
    }

    setIsProcessing(true)
    window.setTimeout(() => {
      const result = adminLogin(email, password)
      if (!result.success) {
        setError(result.error)
        setIsProcessing(false)
        return
      }
      navigate('/admin')
    }, 650)
  }

  return (
    <section className="page-section auth-page admin-login-page">
      <div className="auth-page__intro">
        <p className="eyebrow">North &amp; Wick / Admin</p>
        <h1>Control the edit.</h1>
        <p className="lead">Private access to the North &amp; Wick storefront.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-field">
          <span>Email address</span>
          <input className="input" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} autoComplete="username" aria-invalid={Boolean(error)} />
        </label>
        <label className="auth-field">
          <span>Password</span>
          <span className="auth-field__control">
            <input className="input" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} autoComplete="current-password" aria-invalid={Boolean(error)} />
            <button className="auth-field__toggle" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
          </span>
        </label>
        {error && <p className="auth-form__message" role="alert" aria-live="polite">{error}</p>}
        <button className="btn btn--primary auth-form__submit" type="submit" disabled={isProcessing}>
          {isProcessing ? 'Entering admin...' : 'Enter admin'}
        </button>
      </form>
      <Link className="auth-page__return" to="/login">← Return to customer login</Link>
      <span className="sr-only">Demo admin credentials are configured for this frontend prototype.</span>
    </section>
  )
}
