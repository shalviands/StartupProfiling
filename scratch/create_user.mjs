// Node.js script to register a user using fetch
const SUPABASE_URL = 'https://fenuycrkiyvdysoqiyin.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_7S2jlb-YHkQKfBImivrcXQ_6T_39fP_'

async function createUser() {
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    })

    const data = await response.json()
    if (response.ok) {
      console.log('✅ User created successfully!')
      console.log('ID: test@example.com')
      console.log('Password: password123')
    } else {
      console.log('❌ Failed to create user:', data.msg || data.message || JSON.stringify(data))
    }
  } catch (err) {
    console.log('❌ Error:', err.message)
  }
}

createUser()
