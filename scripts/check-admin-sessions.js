import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

// Load .env.local if env vars are not present
const envPath = path.resolve(process.cwd(), '.env.local')
if ((!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) && fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/)
    if (m) {
      const k = m[1]
      let v = m[2] || ''
      // strip quotes
      if ((v.startsWith("\'") && v.endsWith("\'")) || (v.startsWith('"') && v.endsWith('"'))) {
        v = v.slice(1, -1)
      }
      if (!process.env[k]) process.env[k] = v
    }
  }
}

(async () => {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    const { data, error } = await supabase.from('admin_sessions').select('*').limit(5)
    if (error) {
      console.error('Supabase error:', error)
      process.exitCode = 1
      return
    }
    console.log('admin_sessions rows (up to 5):')
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('script error', err)
    process.exitCode = 1
  }
})()
