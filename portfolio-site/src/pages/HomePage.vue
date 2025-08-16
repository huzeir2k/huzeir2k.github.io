<template>
  <main class="home-page">
    <!-- HERO -->
    <section class="hero" :style="heroStyle">
      <div class="hero-overlay">
        <div class="hero-inner">
          <h1 class="hero-title">Huzeir Kurpejovic</h1>
          <p class="hero-sub">Mobile & web developer — Java, Vue, Laravel, Flutter</p>
          <router-link to="/projects" class="cta">See my work</router-link>
        </div>
      </div>
    </section>

    <!-- RECENT WORK -->
    <section class="recent-work">
      <h2>Recent work</h2>
      <div class="commits">
        <template v-if="loadingCommits">
          <p>Loading latest commits...</p>
        </template>

        <template v-else-if="commits.length === 0">
          <p>No recent commits found via GitHub events (or rate-limited).</p>
        </template>

        <ul v-else class="commit-list">
          <li v-for="(c, idx) in commits" :key="idx" class="commit">
            <div class="commit-info">
              <a :href="c.commitUrl" target="_blank" rel="noopener noreferrer" class="repo-name">
                {{ c.repoName }}
              </a>
              <p class="commit-msg">{{ c.message }}</p>
              <div class="meta">
                <span class="author">{{ c.author }}</span>
                <span class="date">{{ c.date }}</span>
                <a :href="c.commitUrl" target="_blank" rel="noopener noreferrer" class="commit-link">view</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- CURRENTLY WORKING FOR -->
    <section class="current-work">
      <h2>Currently working for:</h2>
      <p class="current-role">Board member - marketing and technology for Bosnian American Professionals Association</p>
    </section>

    <!-- AWARDS -->
    <!-- <section class="awards">
      <h2>Awards</h2>
      <div class="awards-grid">
        <template v-if="awardImages.length === 0">
          <p>Add images into <code>src/assets/awards/</code> named e.g. <code>award1.jpg</code>, <code>award2.png</code> to display here.</p>
        </template>

        <template v-else>
          <div v-for="(img, i) in awardImages" :key="i" class="award-item">
            <img :src="img" :alt="`award-${i+1}`" />
          </div>
        </template>
      </div>
    </section> -->
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/*
  HERO IMAGE: chosen from Pexels search results (see citation).
  [Unverified] The direct CDN path used below follows the common Pexels image URL pattern (images.pexels.com/photos/ID/pexels-photo-ID.jpeg).
  For production replace with the exact file URL you download or Pexels-provided image link.
*/
const heroImageId = 7988080 // the Pexels photo id I selected; replace if you prefer another.
const heroStyle = {
  backgroundImage: `url('https://images.pexels.com/photos/${heroImageId}/pexels-photo-${heroImageId}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
}

/*
  RECENT WORK: fetch GitHub public events for your user and extract PushEvent commits
  - endpoint: https://api.github.com/users/{username}/events/public
  - unauthenticated requests are rate-limited; consider server-side caching or a GitHub token for higher limits.
  - This client-side fetch should work in most cases, but be prepared for CORS/rate limits in production.
*/
const commits = ref([])
const loadingCommits = ref(true)
const username = 'huzeir2k'

async function loadGitHubCommits() {
  loadingCommits.value = true
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`)
    if (!res.ok) {
      // non-2xx (rate limit or other); stop and show message
      console.warn('GitHub API returned non-OK:', res.status)
      commits.value = []
      loadingCommits.value = false
      return
    }
    const events = await res.json()
    // Find PushEvent entries and map their commits
    const pushEvents = events.filter(e => e.type === 'PushEvent')
    const extracted = []
    for (const ev of pushEvents) {
      const repoName = ev.repo?.name || 'unknown/repo'
      const pusher = ev.actor?.login || ev.actor?.display_login || 'author'
      const pushedAt = ev.created_at
      // each push event can contain multiple commits; we'll take up to 3 per event
      const evCommits = (ev.payload && ev.payload.commits) ? ev.payload.commits.slice(0, 3) : []
      for (const cm of evCommits) {
        extracted.push({
          repoName,
          message: cm.message,
          author: cm.author?.name || cm.author?.email || pusher,
          date: pushedAt,
          commitUrl: `https://github.com/${repoName}/commit/${cm.sha}`,
        })
        if (extracted.length >= 6) break
      }
      if (extracted.length >= 6) break
    }
    commits.value = extracted
  } catch (err) {
    console.error('Error fetching GitHub events:', err)
    commits.value = []
  } finally {
    loadingCommits.value = false
  }
}

/*
  AWARDS: load local files from src/assets/awards.
  If you're using Vite, you can use import.meta.globEager. For Vue CLI (webpack), use require.context.
  - Vite approach shown first; fallback code is commented below.
*/
const awardImages = ref([])

function loadLocalAwardsVite() {
  // Vite-only: import all files from /src/assets/awards
  try {
    const files = import.meta.globEager('../../assets/awards/*.{png,jpg,jpeg,svg}')
    awardImages.value = Object.values(files).map(m => m.default || m)
  } catch (e) {
    // Not Vite or no files
    awardImages.value = []
  }
}

/* Webpack / Vue CLI fallback (uncomment when using Vue CLI)
function loadLocalAwardsWebpack() {
  try {
    const req = require.context('../../assets/awards', false, /\.(png|jpe?g|svg)$/)
    awardImages.value = req.keys().map(k => req(k))
  } catch (e) {
    awardImages.value = []
  }
}
*/

onMounted(() => {
  loadGitHubCommits()
  loadLocalAwardsVite()
  // If you're on Vue CLI (webpack), call loadLocalAwardsWebpack() instead.
})
</script>

<style scoped>
.home-page {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  color: white;
  background: #000;
}

/* HERO */
.hero {
  height: 75vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-overlay {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-inner {
  text-align: center;
  padding: 2rem;
  max-width: 1000px;
}
.hero-title {
  font-size: 3rem;
  margin: 0 0 0.5rem;
  color: #fff;
  letter-spacing: 1px;
}
.hero-sub {
  margin: 0 0 1.25rem;
  color: #ddd;
}
.cta {
  display: inline-block;
  padding: 0.65rem 1.05rem;
  border: 2px solid #ff0000;
  color: #ff0000;
  text-decoration: none;
  font-weight: 600;
  background: transparent;
}
.cta:hover { color: #fff; background: #ff0000; }

/* RECENT WORK */
.recent-work {
  padding: 3rem 1.5rem;
  border-top: 3px solid #ff0000;
  background: #060606;
}
.recent-work h2 { color: #ff0000; margin-bottom: 1rem; }
.commit-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; }
.commit { background: #0b0b0b; padding: 1rem; border-radius: 6px; border: 1px solid rgba(255,0,0,0.06); }
.repo-name { color: #fff; font-weight: 700; text-decoration: none; }
.commit-msg { color: #ddd; margin: .5rem 0; }
.meta { font-size: 0.85rem; color: #aaa; display:flex; gap: .75rem; align-items:center; }

/* CURRENT WORK */
.current-work {
  padding: 2.5rem 1.5rem;
  background: #070707;
  border-top: 1px solid rgba(255,0,0,0.06);
}
.current-role { color: #fff; font-weight: 600; background: rgba(255,255,255,0.03); padding: .75rem; border-radius: 6px; display:inline-block; }

/* AWARDS */
.awards {
  padding: 2.5rem 1.5rem 4rem;
  background: #000;
  border-top: 1px solid rgba(255,0,0,0.06);
}
.awards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-top: 1rem; }
.award-item img { width: 100%; height: 160px; object-fit: contain; background: #111; padding: 8px; border-radius: 6px; }
</style>
