import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Search from './pages/Search'
import HostDashboard from './pages/HostDashboard'

function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [selectedHomestay, setSelectedHomestay] = useState(null)

  return (
    <div>
      <nav style={{background:'#1e3a5f', padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span onClick={() => setPage('home')} style={{color:'white', fontSize:'20px', fontWeight:'bold', cursor:'pointer'}}>
          🏔️ StayNepal
        </span>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <span onClick={() => setPage('search')} style={{color:'white', cursor:'pointer', fontSize:'14px'}}>
            Search Homestays
          </span>
          {user && user.role === 'host' && (
            <span onClick={() => setPage('host')} style={{color:'white', cursor:'pointer', fontSize:'14px'}}>
              My Dashboard
            </span>
          )}
          {user ? (
            <>
              <span style={{color:'#93c5fd', fontSize:'14px'}}>Hello, {user.name}</span>
              <button
                onClick={() => { setUser(null); setPage('home') }}
                style={{background:'transparent', color:'white', border:'1px solid white', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'13px'}}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setPage('login')} style={{background:'white', color:'#1e3a5f', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', fontWeight:'500'}}>
                Login
              </button>
              <button onClick={() => setPage('register')} style={{background:'#2563eb', color:'white', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', fontWeight:'500'}}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {page === 'home' && <Home setPage={setPage} />}
      {page === 'login' && <Login setPage={setPage} setUser={setUser} />}
      {page === 'register' && <Register setPage={setPage} setUser={setUser} />}
      {page === 'search' && <Search setPage={setPage} setSelectedHomestay={setSelectedHomestay} />}
      {page === 'host' && <HostDashboard user={user} />}
    </div>
  )
}

export default App