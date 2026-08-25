import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStorefront } from '../context/StorefrontContext'

const initialForm = { name: '', email: '', password: '', confirmPassword: '' }

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login, register } = useStorefront()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setForm(initialForm)
    setErrors({})
    setMessage('')
    setStatus('idle')
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (mode === 'register' && !form.name.trim()) nextErrors.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password) nextErrors.password = 'Enter your password.'
    if (mode === 'register' && form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (mode === 'register' && form.password && !/[A-Za-z]/.test(form.password)) nextErrors.password = 'Password must include a letter and a number.'
    if (mode === 'register' && form.password && !/[0-9]/.test(form.password)) nextErrors.password = 'Password must include a letter and a number.'
    if (mode === 'register' && form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    setStatus('processing')
    setMessage('')
    window.setTimeout(() => {
      const result = mode === 'login' ? login(form.email, form.password) : register(form)
      if (!result.success) {
        setStatus('error')
        setMessage(result.error)
        return
      }

      if (mode === 'login') {
        setStatus('success')
        setMessage('Signed in successfully.')
        window.setTimeout(() => navigate(location.state?.returnTo || '/account'), 450)
      } else {
        navigate(location.state?.returnTo || '/account')
      }
    }, 650)
  }

  const isRegistering = mode === 'register'
  const title = isRegistering ? 'Create your account.' : 'Welcome back.'
  const intro = isRegistering ? 'Make the collection yours.' : 'Return to your edit and continue where you left off.'

  return (
    <section className="page-section auth-page">
      <div className="auth-page__intro">
        <p className="eyebrow">North &amp; Wick / {isRegistering ? 'Create account' : 'Login'}</p>
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {isRegistering && <AuthField label="Name" name="name" value={form.name} onChange={updateField} error={errors.name} autoComplete="name" />}
        <AuthField label="Email address" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} autoComplete="email" />
        <AuthField label="Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateField} error={errors.password} autoComplete={isRegistering ? 'new-password' : 'current-password'} showPassword={showPassword} onTogglePassword={() => setShowPassword((visible) => !visible)} />
        {isRegistering && <AuthField label="Confirm password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={updateField} error={errors.confirmPassword} autoComplete="new-password" />}
        {message && <p className={`auth-form__message auth-form__message--${status}`} role="alert" aria-live="polite">{message}</p>}
        <button className="btn btn--primary auth-form__submit" type="submit" disabled={status === 'processing'}>
          {status === 'processing' ? (isRegistering ? 'Creating account...' : 'Signing in...') : (isRegistering ? 'Create account' : 'Log in')}
        </button>
      </form>
      <div className="auth-page__secondary-actions">
        <p className="auth-page__switch">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => switchMode(isRegistering ? 'login' : 'register')}>{isRegistering ? 'Log in' : 'Create one'}</button>
        </p>
        <p className="auth-page__admin-link">
          <Link to="/admin/login">Log in as admin?</Link>
        </p>
      </div>
    </section>
  )
}

function AuthField({ label, name, type = 'text', value, onChange, error, autoComplete, showPassword, onTogglePassword }) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <span className="auth-field__control">
        <input className="input" name={name} type={type} value={value} onChange={onChange} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
        {onTogglePassword && <button type="button" className="auth-field__toggle" onClick={onTogglePassword} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>}
      </span>
      {error && <span className="auth-field__error" id={`${name}-error`}>{error}</span>}
    </label>
  )
}