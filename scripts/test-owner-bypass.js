;(async () => {
  try {
    const tryUrl = async (port) => {
      const url = `http://localhost:${port}/api/admin/owner-login-bypass`
      try {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'andrei@gamelink.admin', password: 'AndreiDenis20111@' }) })
        return { ok: true, res: r }
      } catch (e) {
        return { ok: false, err: e }
      }
    }

    let result = await tryUrl(3000)
    if (!result.ok) result = await tryUrl(3001)
    if (!result.ok) throw result.err

    const res = result.res
    console.log('status', res.status)
    console.log(await res.text())
  } catch (err) {
    console.error('request error', err)
    process.exitCode = 1
  }
})()
