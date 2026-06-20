import { useState } from 'react'
import axios from 'axios'

function Login({ setPage, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      })
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token)
      setPage('home')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={{maxWidth:'400px', margin:'80px auto', padding:'32px', border:'1px solid #e5e7eb', borderRadius:'12px'}}>
      <h2 style={{textAlign:'center', marginBottom:'24px', color:'#1e3a5f'}}>Login to StayNepal</h2>
      {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
      <div style={{marginBottom:'16px'}}>
        <label style={{display:'block', marginBottom:'6px', fontWeight:'500'}}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px'}}
        />
      </div>
      <div style={{marginBottom:'24px'}}>
        <label style={{display:'block', marginBottom:'6px', fontWeight:'500'}}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px'}}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{width:'100%', padding:'12px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', fontSize:'16px', cursor:'pointer'}}
      >
        Login
      </button>
      <p style={{textAlign:'center', marginTop:'16px'}}>
        No account? <span onClick={() => setPage('register')} style={{color:'#2563eb', cursor:'pointer'}}>Register here</span>
      </p>
    </div>
  )
}

export default Login