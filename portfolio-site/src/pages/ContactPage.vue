<template>
  <main class="contact-page">
    <header class="hero">
      <h1>Contact</h1>
      <p class="subtitle">If you'd like to talk about a project, hire me, or collaborate — reach out.</p>
    </header>

    <section class="contact-cards">
      <div class="card">
        <div class="label">Phone</div>
        <!-- tel: uses an international-style URI; keeps the displayed formatting you provided -->
        <a class="value" :href="telHref" aria-label="Call phone number">{{ phoneDisplay }}</a>
      </div>

      <div class="card">
        <div class="label">Email</div>
        <a class="value" :href="`mailto:${email}`" aria-label="Send email">{{ email }}</a>
      </div>

      <div class="card">
        <div class="label">LinkedIn</div>
        <a class="value" :href="linkedin" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile">
          {{ linkedinLabel }}
        </a>
      </div>

      <div class="card">
        <div class="label">WhatsApp</div>
        <a class="value" :href="waHref" target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp chat">
          {{ whatsappDisplay }}
        </a>
      </div>
    </section>

    <section class="contact-form">
      <h2>Send a quick message</h2>
      <form @submit.prevent="openMailto">
        <label>
          Your name
          <input v-model="form.name" type="text" placeholder="Your name" required />
        </label>

        <label>
          Subject
          <input v-model="form.subject" type="text" placeholder="Subject" required />
        </label>

        <label>
          Message
          <textarea v-model="form.message" rows="6" placeholder="Write your message..." required></textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="btn">Open email client</button>
          <button type="button" class="btn secondary" @click="clearForm">Clear</button>
        </div>

        <p class="form-note">
          This will open the visitor's email client with a pre-filled message (mailto). For a server-handled contact form,
          implement a backend endpoint to receive and send messages.
        </p>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

/* Contact info exactly as you provided */
const phoneDisplay = '(226) - 724 - 7626'
const phonePlain = '+12267247626' // used for tel: link (canonical)
const telHref = `tel:${phonePlain}`

const email = 'huzeir2k@gmail.com'

const linkedin = 'https://www.linkedin.com/in/huzeir-kurpejovic-0ba057192/'
const linkedinLabel = 'Huzeir Kurpejovic — LinkedIn'

/*
  WhatsApp: convert provided number into the wa.me canonical format.
  Provided: (313) 817-1510 -> +1 313 817 1510 -> wa.me/13138171510
*/
const whatsappDisplay = '(313) 817-1510'
const whatsappPlain = '13138171510'
const waHref = `https://wa.me/${whatsappPlain}`

/* Simple mailto form composition (client-side only) */
const form = ref({ name: '', subject: '', message: '' })

function openMailto() {
  const to = encodeURIComponent(email)
  const subject = encodeURIComponent(form.value.subject || '')
  const bodyParts = []
  if (form.value.name) bodyParts.push(`From: ${form.value.name}`)
  if (form.value.message) bodyParts.push('', form.value.message)
  bodyParts.push('', `— Sent via portfolio contact form`)
  const body = encodeURIComponent(bodyParts.join('\n'))
  // open mailto in new window/tab to avoid navigation on some browsers
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
}

function clearForm() {
  form.value = { name: '', subject: '', message: '' }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 2rem 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* Header */
.hero h1 { color: #ff0000; margin: 0 0 .25rem; font-size: 2rem; }
.subtitle { color: #ddd; margin: 0 0 1.25rem; }

/* Contact cards */
.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.card {
  background: #0b0b0b;
  border: 1px solid rgba(255,0,0,0.06);
  padding: 1rem;
  border-radius: 8px;
}
.label { color: #ff4d4d; font-weight: 700; margin-bottom: .5rem; }
.value {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  word-break: break-word;
}
.value:hover { color: #ff0000; text-decoration: underline; }

/* Contact form */
.contact-form {
  max-width: 900px;
  margin: 0 auto 3rem;
  background: #070707;
  border: 1px solid rgba(255,0,0,0.05);
  padding: 1.25rem;
  border-radius: 8px;
}
.contact-form h2 { color: #ff0000; margin-top: 0; }
.contact-form label {
  display: block;
  color: #ddd;
  font-weight: 600;
  margin: .5rem 0 .25rem;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: .6rem .75rem;
  background: #0b0b0b;
  border: 1px solid rgba(255,255,255,0.04);
  color: #fff;
  border-radius: 6px;
  margin-bottom: .75rem;
  box-sizing: border-box;
}
.form-actions { display:flex; gap:.5rem; margin-top:.5rem; align-items:center; }
.btn {
  padding:.55rem .85rem;
  border-radius:6px;
  border:1px solid rgba(255,0,0,0.12);
  background: transparent;
  color:#fff;
  cursor:pointer;
  font-weight:700;
}
.btn:hover { background: #ff0000; color: #000; }
.btn.secondary { border:1px solid rgba(255,255,255,0.06); }
.form-note { margin-top:.75rem; color:#aaa; font-size: .9rem; }

/* small screens */
@media (max-width:640px) {
  .contact-cards { grid-template-columns: 1fr; }
}
</style>
