(async () => {
  try {
    const base = 'http://localhost:3001'
    const login = await fetch(`${base}/api/admin/owner-login-bypass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'andrei@gamelink.admin', password: 'AndreiDenis20111@' })
    })

    console.log('login status', login.status)
    console.log('set-cookie header:', login.headers.get('set-cookie'))
    console.log('body:', await login.text())

    const cookie = login.headers.get('set-cookie')
    const tokenMatch = cookie ? cookie.match(/admin_token=([^;]+)/) : null
    const token = tokenMatch ? tokenMatch[1] : ''
    if (!token) {
      console.error('No token extracted')
      process.exit(1)
    }

    const verify = await fetch(`${base}/api/admin/verify`, {
      method: 'GET',
      headers: { Cookie: `admin_token=${token}` }
    })

    console.log('verify status', verify.status)
    console.log(await verify.text())
  } catch (err) {
    console.error('error', err)
    process.exit(1)
  }
})()
