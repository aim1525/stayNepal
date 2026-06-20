import { useState } from 'react'
import axios from 'axios'

function Register({ setPage, setUser }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('tourist')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name, email, password, role
      })
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token)
      setPage('home')
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div style={{maxWidth:'400px', margin:'80px auto', padding:'32px', border:'1px solid #e5e7eb', borderRadius:'12px'}}>
      <h2 style={{textAlign:'center', marginBottom:'24px', color:'#1e3a5f'}}>Join StayNepal</h2>
      {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
      <div style={{marginBottom:'16px'}}>
        <label style={{display:'block', marginBottom:'6px', fontWeight:'500'}}>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your full name"
          style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px'}}
        />
      </div>
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
      <div style={{marginBottom:'16px'}}>
        <label style={{display:'block', marginBottom:'6px', fontWeight:'500'}}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Create password"
          style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px'}}
        />
      </div>
      <div style={{marginBottom:'24px'}}>
        <label style={{display:'block', marginBottom:'6px', fontWeight:'500'}}>I am a</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px'}}
        >
          <option value="tourist">Tourist</option>
          <option value="host">Homestay Host</option>
        </select>
      </div>
      <button
        onClick={handleRegister}
        style={{width:'100%', padding:'12px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', fontSize:'16px', cursor:'pointer'}}
      >
        Create Account
      </button>
      <p style={{textAlign:'center', marginTop:'16px'}}>
        Have account? <span onClick={() => setPage('login')} style={{color:'#2563eb', cursor:'pointer'}}>Login here</span>
      </p>
    </div>
  )
}

export default Register