import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)

  return (
    <div>
      <nav style={{background:'#2563eb', padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span onClick={() => setPage('home')} style={{color:'white', fontSize:'20px', fontWeight:'bold', cursor:'pointer'}}>
          StayNepal
        </span>
        <div style={{display:'flex', gap:'12px'}}>
          {user ? (
            <span style={{color:'white'}}>Hello, {user.name}</span>
          ) : (
            <>
              <button onClick={() => setPage('login')} style={{background:'white', color:'#2563eb', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer'}}>
                Login
              </button>
              <button onClick={() => setPage('register')} style={{background:'#1d4ed8', color:'white', border:'1px solid white', padding:'8px 16px', borderRadius:'6px', cursor:'pointer'}}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {page === 'home' && <Home setPage={setPage} />}
      {page === 'login' && <Login setPage={setPage} setUser={setUser} />}
      {page === 'register' && <Register setPage={setPage} setUser={setUser} />}
    </div>
  )
}

export default App