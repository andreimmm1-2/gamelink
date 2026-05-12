;(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/admin/owner-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'andrei@gamelink.admin', password: 'AndreiDenis20111@' })
    })

    const text = await res.text()
    console.log('status', res.status)
    console.log(text)
  } catch (err) {
    console.error('request error', err)
    process.exitCode = 1
  }
})()
