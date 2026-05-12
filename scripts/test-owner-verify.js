;(async () => {
  try {
    const tryUrl = async (port, path, opts) => {
      const url = `http://localhost:${port}${path}`
      try {
        const r = await fetch(url, opts)
        return { ok: true, res: r }
      } catch (e) {
        return { ok: false, err: e }
      }
    }

    let loginResult = await tryUrl(3000, '/api/admin/owner-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'andrei@gamelink.admin', password: 'AndreiDenis20111@' }) })
    if (!loginResult.ok) loginResult = await tryUrl(3001, '/api/admin/owner-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'andrei@gamelink.admin', password: 'AndreiDenis20111@' }) })
    if (!loginResult.ok) throw loginResult.err

    const loginRes = loginResult.res
    console.log('login status', loginRes.status)
    const setCookie = loginRes.headers.get('set-cookie')
    console.log('set-cookie:', setCookie)

    const tokenMatch = setCookie ? setCookie.match(/admin_token=([^;]+)/) : null
    const token = tokenMatch ? tokenMatch[1] : ''
    if (!token) {
      console.error('No admin_token found in Set-Cookie')
      process.exitCode = 1
      return
    }

    // Call verify with cookie (try 3000 then 3001)
    let verifyResult = await tryUrl(3000, `/api/admin/verify`, { method: 'GET', headers: { Cookie: `admin_token=${token}` } })
    if (!verifyResult.ok) verifyResult = await tryUrl(3001, `/api/admin/verify`, { method: 'GET', headers: { Cookie: `admin_token=${token}` } })
    if (!verifyResult.ok) throw verifyResult.err

    const verifyRes = verifyResult.res
    console.log('verify status', verifyRes.status)
    console.log(await verifyRes.text())
  } catch (err) {
    console.error('error', err)
    process.exitCode = 1
  }
})()
