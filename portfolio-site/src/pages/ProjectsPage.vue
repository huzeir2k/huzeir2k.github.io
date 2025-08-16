<template>
  <main class="projects-page">
    <header class="projects-hero">
      <h1>Projects</h1>
      <p class="subtitle">A neat, sortable view of public repositories from my GitHub portfolio.</p>
    </header>

    <section class="controls">
      <div class="left">
        <label>
          Language
          <select v-model="filters.language">
            <option value="">All</option>
            <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
          </select>
        </label>

        <label>
          Framework (inferred)
          <select v-model="filters.framework">
            <option value="">All</option>
            <option v-for="fw in frameworks" :key="fw" :value="fw">{{ fw }}</option>
          </select>
        </label>
      </div>

      <div class="right">
        <label>
          Sort
          <select v-model="sortBy">
            <option value="updated">Recently updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name</option>
          </select>
        </label>
        <button @click="refresh" :disabled="loading" class="btn-refresh">Refresh</button>
      </div>
    </section>

    <section class="repo-list">
      <template v-if="loading">
        <p>Loading repositories…</p>
      </template>

      <template v-else-if="reposFiltered.length === 0">
        <p>No repositories found for the selected filters.</p>
      </template>

      <ul class="grid">
        <li v-for="repo in reposSorted" :key="repo.id" class="repo-card">
          <div class="repo-top">
            <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="repo-name">{{ repo.name }}</a>
            <div class="meta">
              <span v-if="repo.language" class="lang">{{ repo.language }}</span>
              <span v-if="repo.stargazers_count !== undefined" class="stars">★ {{ repo.stargazers_count }}</span>
              <span class="updated">Updated {{ timeAgo(repo.updated_at) }}</span>
            </div>
          </div>

          <p class="desc" v-if="repo.description">{{ repo.description }}</p>

          <div class="tags">
            <template v-if="inferredFrameworksMap[repo.id] && inferredFrameworksMap[repo.id].length">
              <span class="framework-label">[Inference] frameworks:</span>
              <span v-for="f in inferredFrameworksMap[repo.id]" :key="f" class="tag framework-tag">
                {{ f }}
              </span>
            </template>
            <template v-else>
              <span class="tag muted">No framework inferred</span>
            </template>
          </div>
        </li>
      </ul>
    </section>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const username = 'huzeir2k' // your GitHub username

const repos = ref([])
const loading = ref(false)
const error = ref(null)

// UI state
const filters = ref({
  language: '',
  framework: '',
})
const sortBy = ref('updated')

// sets of languages & frameworks (inferred)
const languages = ref([])
const frameworks = ref([])

// inferred frameworks per repo.id
const inferredFrameworksMap = ref({})

/*
  Framework inference:
  [Inference] We attempt to infer frameworks from repo.topics (if returned), then from
  repo.name and repo.description by keyword matching. These are heuristics and may be incorrect.
*/
function inferFrameworksForRepo(repo) {
  const found = new Set()
  // 1) repo.topics (may be available if GitHub returns topics)
  try {
    if (repo.topics && Array.isArray(repo.topics)) {
      repo.topics.forEach(t => {
        const norm = String(t).toLowerCase()
        if (fwKeywordsMap[norm]) found.add(fwKeywordsMap[norm])
      })
    }
  } catch (e) {
    // ignore
  }

  // 2) search name and description (heuristic)
  const text = `${repo.name || ''} ${(repo.description||'')}`.toLowerCase()
  for (const [keyword, fw] of Object.entries(fwKeywordsMap)) {
    if (text.includes(keyword)) found.add(fw)
  }

  return Array.from(found)
}

/* mapping of keywords -> normalized framework labels */
const fwKeywordsMap = {
  // Vue / React / Angular etc.
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',
  'react': 'React',
  'reactjs': 'React',
  'angular': 'Angular',
  'laravel': 'Laravel',
  'spring': 'Spring',
  'spring-boot': 'Spring',
  'dotnet': '.NET',
  '.net': '.NET',
  'asp.net': '.NET',
  'django': 'Django',
  'flask': 'Flask',
  'express': 'Express',
  'rails': 'Ruby on Rails',
  'ruby on rails': 'Ruby on Rails',
  'railsapp': 'Ruby on Rails',
  'next': 'Next.js',
  'nextjs': 'Next.js',
  'nuxt': 'Nuxt.js',
  'svelte': 'Svelte',
  'flutter': 'Flutter',
  'android': 'Android',
  'kotlin': 'Kotlin',
  'springboot': 'Spring'
}

/* Utility: human-readable relative time */
function timeAgo(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return `${diff}s`
  if (diff < 3600) return `${Math.floor(diff/60)}m`
  if (diff < 86400) return `${Math.floor(diff/3600)}h`
  return `${Math.floor(diff/86400)}d`
}

/* Fetch public repos for the username
   - Uses the GitHub REST endpoint: GET /users/:username/repos
   - Note: unauthenticated requests are rate-limited (60/hour per IP). Consider adding an Authorization header
     using a personal access token if you run into rate limits, or proxy this through your backend.
*/
async function loadRepos() {
  loading.value = true
  error.value = null
  try {
    // Attempt to fetch 100 repos (max per page). If you have >100, implement pagination.
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`)
    }
    const data = await res.json()
    repos.value = data

    // build languages set
    const langSet = new Set()
    // infer frameworks per repo and build framework set
    const fwSet = new Set()
    const map = {}
    for (const r of data) {
      if (r.language) langSet.add(r.language)
      const inf = inferFrameworksForRepo(r)
      map[r.id] = inf
      inf.forEach(f => fwSet.add(f))
    }
    languages.value = Array.from(langSet).sort()
    frameworks.value = Array.from(fwSet).sort()
    inferredFrameworksMap.value = map
  } catch (err) {
    error.value = err.message
    repos.value = []
    languages.value = []
    frameworks.value = []
    inferredFrameworksMap.value = {}
    console.error('Error loading repos:', err)
  } finally {
    loading.value = false
  }
}

/* Computed filtered list */
const reposFiltered = computed(() => {
  return repos.value.filter(r => {
    const byLang = !filters.value.language || (r.language === filters.value.language)
    const fwList = inferredFrameworksMap.value[r.id] || []
    const byFw = !filters.value.framework || fwList.includes(filters.value.framework)
    return byLang && byFw
  })
})

/* Sorted version */
const reposSorted = computed(() => {
  const copy = reposFiltered.value.slice()
  if (sortBy.value === 'updated') {
    copy.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at))
  } else if (sortBy.value === 'stars') {
    copy.sort((a,b) => (b.stargazers_count||0) - (a.stargazers_count||0))
  } else if (sortBy.value === 'name') {
    copy.sort((a,b) => a.name.localeCompare(b.name))
  }
  return copy
})

function refresh() {
  loadRepos()
}

onMounted(() => {
  loadRepos()
})
</script>

<style scoped>
.projects-page {
  color: #fff;
  background: #000;
  padding: 2rem 1.25rem;
  min-height: 100vh;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.projects-hero h1 { color: #ff0000; margin: 0 0 0.25rem; }
.subtitle { color: #ddd; margin: 0 0 1rem; }

.controls {
  display:flex;
  justify-content:space-between;
  gap: 1rem;
  align-items:center;
  margin-bottom: 1rem;
  flex-wrap:wrap;
}
.controls label { color: #ddd; font-weight:600; margin-right: .5rem; }
.controls select { margin-left:.5rem; padding:.25rem .5rem; background:#111; border:1px solid rgba(255,0,0,0.08); color:#fff; }
.btn-refresh { background:#111; border:1px solid rgba(255,0,0,0.12); color:#fff; padding:.4rem .6rem; cursor:pointer; }

.repo-list .grid {
  list-style:none;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  padding:0;
  margin:0;
}

.repo-card {
  background: #080808;
  border: 1px solid rgba(255,0,0,0.06);
  padding: 1rem;
  border-radius: 8px;
}
.repo-name { color: #fff; font-weight:700; text-decoration:none; font-size:1.05rem; }
.meta { display:flex; gap:.6rem; align-items:center; margin-top:.5rem; font-size:.85rem; color:#aaa; }
.lang { background: rgba(255,255,255,0.03); padding:.2rem .45rem; border-radius:4px; }
.stars { color:#ffd966; }

.desc { color:#ccc; margin: .75rem 0; min-height: 38px; }

.tags { margin-top:.5rem; display:flex; gap:.5rem; align-items:center; flex-wrap:wrap; }
.tag { font-size:.8rem; padding:.2rem .5rem; border-radius:6px; background: rgba(255,255,255,0.03); color:#ddd; }
.framework-label { color:#ff4d4d; font-weight:700; margin-right:.4rem; }
.muted { opacity:.6; }
.notes { margin-top:1.25rem; color:#bbb; font-size:.9rem; }
</style>
