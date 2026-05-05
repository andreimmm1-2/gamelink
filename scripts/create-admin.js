#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    const email = 'andrei@gamelink.admin'
    const password = 'AndreiDenis20111@'

    console.log(`Creating admin user: ${email}`)

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    let result
    if (existingUser) {
      console.log('User already exists, updating password...')
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({ 
          password: hashedPassword
        })
        .eq('id', existingUser.id)
        .select()
        .single()

      if (error) throw error
      result = data
    } else {
      console.log('Creating new admin user...')
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert({
          email,
          username: 'andrei',
          password: hashedPassword,
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      result = data
    }

    console.log('✅ Admin user created successfully!')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log(`Login at: /admin/login`)
    console.log(result)
  } catch (err) {
    console.error('❌ Error creating admin user:', err.message)
    process.exit(1)
  }
}

createAdminUser()
