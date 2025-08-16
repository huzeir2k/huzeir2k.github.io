<template>
  <main class="about-page">
    <section class="intro">
      <h1>About</h1>
      <p class="lede">
        Based out of Windsor, Ontario, Canada. I graduated from St. Clair College with a
        three-year Advanced Diploma in Mobile Applications Development (June 2024).
      </p>

      <p class="site-note">
        This site is built in <strong>Vue.js</strong>.
      </p>
    </section>

    <section class="skills">
      <h2>Programming languages I work with</h2>
      <ul class="lang-list">
        <li><strong>Java</strong> (my favourite!)</li>
        <li>JavaScript</li>
        <li>PHP</li>
        <li>TypeScript</li>
        <li>C#</li>
        <li>Swift</li>
        <li>Kotlin</li>
        <li>Ruby</li>
      </ul>
    </section>

    <section class="frameworks">
      <h2>Frameworks & technologies I use</h2>
      <p class="framework-note">This project is made in <strong>Vue.JS</strong>.</p>
      <ul class="framework-list">
        <li>Spring (Java)</li>
        <li>React (JavaScript)</li>
        <li>Angular (TypeScript)</li>
        <li>Vue.JS (JavaScript)</li>
        <li>Laravel (PHP, also my favourite!)</li>
        <li>.NET (C#)</li>
      </ul>
    </section>

    <section class="work-ethic">
      <h2>Work ethic</h2>
      <p>
        I approach projects with a pragmatic, detail-oriented mindset. I value clear,
        maintainable code, thorough testing, and thoughtful UX. I work well independently
        and in small teams, and I prioritise shipping focused, well-documented features
        over premature complexity. I regularly refactor when necessary and prefer small,
        iterative improvements that maintain momentum while reducing long-term technical debt.
      </p>
      <p>
        If you'd like to talk about a project, collaboration, or a role, please visit the
        <router-link to="/contact">Contact</router-link> page to get in touch.
      </p>
    </section>
  </main>
</template>

<script setup>
// purely presentational; no reactive logic required
</script>

<style scoped>
.about-page {
  min-height: 100%;
  color: #fff;
  background: #000;
  padding: 2.5rem 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.intro {
  max-width: 1000px;
  margin: 0 auto 2rem;
  text-align: left;
}
.intro h1 {
  color: #ff0000;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}
.lede {
  color: #ddd;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
.site-note {
  color: #bbb;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

/* Skills */
.skills,
.frameworks,
.work-ethic {
  max-width: 1000px;
  margin: 1.75rem auto;
  padding: 1.25rem;
  background: #070707;
  border-radius: 8px;
  border: 1px solid rgba(255,0,0,0.06);
}
.skills h2,
.frameworks h2,
.work-ethic h2 {
  color: #ff0000;
  margin-bottom: 0.75rem;
}
.lang-list,
.framework-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem 1rem;
}
.lang-list li,
.framework-list li {
  background: rgba(255,255,255,0.02);
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  color: #eee;
  font-weight: 600;
}

/* Work ethic */
.work-ethic p {
  color: #ddd;
  line-height: 1.6;
  margin: 0 0 0.75rem;
}
.work-ethic .router-link-active,
.work-ethic a {
  color: #ff0000;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 640px) {
  .lang-list,
  .framework-list {
    grid-template-columns: 1fr;
  }
}
</style>
