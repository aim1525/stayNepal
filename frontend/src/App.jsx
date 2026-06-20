import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Search from './pages/Search'
import HostDashboard from './pages/HostDashboard'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'

function App() {
  const [page, setPage] = useState('home')
  const [user, setUser] = useState(null)
  const [selectedHomestay, setSelectedHomestay] = useState(null)
  const [lang, setLang] = useState('en')

  const t = {
    en: {
      brand: '🏔️ StayNepal',
      search: 'Search Homestays',
      myBookings: 'My Bookings',
      dashboard: 'My Dashboard',
      hello: 'Hello',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
    },
    ne: {
      brand: '🏔️ स्टेनेपाल',
      search: 'होमस्टे खोज्नुहोस्',
      myBookings: 'मेरा बुकिङहरू',
      dashboard: 'मेरो ड्यासबोर्ड',
      hello: 'नमस्ते',
      logout: 'बाहिर जानुहोस्',
      login: 'लगइन',
      register: 'दर्ता',
    }
  }

  const text = t[lang]

  return (
    <div>
      <nav style={{background:'#1e3a5f', padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span onClick={() => setPage('home')} style={{color:'white', fontSize:'20px', fontWeight:'bold', cursor:'pointer'}}>
          {text.brand}
        </span>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <span onClick={() => setPage('search')} style={{color:'white', cursor:'pointer', fontSize:'14px'}}>
            {text.search}
          </span>
          {user && user.role === 'host' && (
            <span onClick={() => setPage('host')} style={{color:'white', cursor:'pointer', fontSize:'14px'}}>
              {text.dashboard}
            </span>
          )}
          {user && user.role === 'tourist' && (
            <span onClick={() => setPage('mybookings')} style={{color:'white', cursor:'pointer', fontSize:'14px'}}>
              {text.myBookings}
            </span>
          )}

          {/* LANGUAGE SWITCH BUTTON */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ne' : 'en')}
            style={{background:'#374151', color:'white', border:'1px solid #6b7280', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'13px', fontWeight:'500'}}
          >
            {lang === 'en' ? '🇳🇵 नेपाली' : '🇬🇧 English'}
          </button>

          {user ? (
            <>
              <span style={{color:'#93c5fd', fontSize:'14px'}}>{text.hello}, {user.name}</span>
              <button
                onClick={() => { setUser(null); setPage('home') }}
                style={{background:'transparent', color:'white', border:'1px solid white', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'13px'}}
              >
                {text.logout}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setPage('login')} style={{background:'white', color:'#1e3a5f', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', fontWeight:'500'}}>
                {text.login}
              </button>
              <button onClick={() => setPage('register')} style={{background:'#2563eb', color:'white', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', fontWeight:'500'}}>
                {text.register}
              </button>
            </>
          )}
        </div>
      </nav>

      {page === 'home' && <Home setPage={setPage} lang={lang} />}
      {page === 'login' && <Login setPage={setPage} setUser={setUser} lang={lang} />}
      {page === 'register' && <Register setPage={setPage} setUser={setUser} lang={lang} />}
      {page === 'search' && <Search setPage={setPage} setSelectedHomestay={setSelectedHomestay} lang={lang} />}
      {page === 'host' && <HostDashboard user={user} lang={lang} />}
      {page === 'booking' && <Booking user={user} homestay={selectedHomestay} setPage={setPage} lang={lang} />}
      {page === 'mybookings' && <MyBookings user={user} setPage={setPage} lang={lang} />}
    </div>
  )
}

export default App