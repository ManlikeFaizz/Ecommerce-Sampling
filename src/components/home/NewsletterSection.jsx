export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div>
        <p className="eyebrow">Stay connected</p>
        <h2>Receive the next edit before it lands.</h2>
      </div>

      <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          className="input"
          type="email"
          placeholder="Email address"
          aria-label="Email address"
        />
        <button className="btn btn--primary" type="submit">
          Join now
        </button>
      </form>
    </section>
  )
}
