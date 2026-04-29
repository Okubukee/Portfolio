import { useApp } from '../../context/AppContext'

const FOREST = `    *       *          *      *
   /|\\     /|\\        /|\\    /|\\
  / | \\   / | \\      / | \\  / | \\
 /  |  \\ /  |  \\    /  |  \\/  |  \\
/___|___X/___|___\\__/___|___\\/__|___\\
    |   |    |        |       |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

export default function Contact() {
  const { t } = useApp()

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const name    = data.get('name')    ?? ''
    const email   = data.get('email')   ?? ''
    const message = data.get('message') ?? ''
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)
    window.location.href = `mailto:cardenasdcg@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="section">
      <div className="section-header">{t['contact-header']}</div>
      <h2 className="section-title">{t['contact-title']}</h2>
      <div className="contact-content">
        <p className="contact-text">{t['contact-text']}</p>
        <a href="mailto:cardenasdcg@gmail.com" className="contact-email-link">cardenasdcg@gmail.com</a>
        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="formName">{t['form-name']}</label>
              <input type="text" id="formName" name="name" required autoComplete="name" placeholder={t['form-ph-name']} />
            </div>
            <div className="form-field">
              <label htmlFor="formEmail">Email</label>
              <input type="email" id="formEmail" name="email" required autoComplete="email" placeholder={t['form-ph-email']} />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="formMsg">{t['form-message']}</label>
            <textarea id="formMsg" name="message" required placeholder={t['form-ph-msg']} />
          </div>
          <button type="submit" className="form-submit">{t['form-send']}</button>
        </form>
        <a href={`${import.meta.env.BASE_URL}cv.pdf`} download="Daniel_Cardenas_CV.pdf" className="contact-btn">{t['contact-cv']}</a>
      </div>
    </div>
  )
}
