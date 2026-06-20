import { useState, useEffect } from 'react'
import axios from 'axios'

function MyBookings({ user, setPage }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/bookings/user/${user.id}`)
        .then(res => {
          setBookings(res.data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [user])

  if (!user) {
    return (
      <div style={{textAlign:'center', padding:'80px'}}>
        <h2 style={{color:'#1e3a5f'}}>My Bookings</h2>
        <p style={{color:'#6b7280'}}>Please <span onClick={() => setPage('login')} style={{color:'#2563eb', cursor:'pointer'}}>login</span> to see your bookings.</p>
      </div>
    )
  }

  const getStatusColor = (status) => {
    if (status === 'confirmed') return '#065f46'
    if (status === 'pending') return '#92400e'
    if (status === 'cancelled') return '#991b1b'
    return '#1e3a5f'
  }

  const getStatusBg = (status) => {
    if (status === 'confirmed') return '#d1fae5'
    if (status === 'pending') return '#fef3c7'
    if (status === 'cancelled') return '#fee2e2'
    return '#eff6ff'
  }

  return (
    <div style={{maxWidth:'800px', margin:'40px auto', padding:'24px'}}>
      <h2 style={{color:'#1e3a5f', marginBottom:'24px'}}>My Bookings</h2>

      {loading ? (
        <p style={{textAlign:'center', color:'#6b7280'}}>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <div style={{textAlign:'center', padding:'60px', border:'1px solid #e5e7eb', borderRadius:'12px'}}>
          <div style={{fontSize:'48px', marginBottom:'16px'}}>🏠</div>
          <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>No bookings yet</h3>
          <p style={{color:'#6b7280', marginBottom:'24px'}}>You have not booked any homestays yet.</p>
          <button
            onClick={() => setPage('search')}
            style={{background:'#2563eb', color:'white', border:'none', padding:'12px 24px', borderRadius:'8px', cursor:'pointer', fontSize:'15px'}}
          >
            Search Homestays
          </button>
        </div>
      ) : (
        <div>
          {bookings.map(b => (
            <div key={b.id} style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'20px', marginBottom:'16px', background:'white', boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
                <div>
                  <h3 style={{color:'#1e3a5f', marginBottom:'4px'}}>{b.name_en}</h3>
                  <p style={{color:'#6b7280', fontSize:'14px'}}>📍 {b.district}</p>
                </div>
                <span style={{background:getStatusBg(b.status), color:getStatusColor(b.status), padding:'4px 12px', borderRadius:'20px', fontSize:'13px', fontWeight:'500'}}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>

              <div style={{display:'flex', gap:'24px', flexWrap:'wrap', marginBottom:'12px'}}>
                <div>
                  <p style={{color:'#6b7280', fontSize:'12px', marginBottom:'2px'}}>CHECK IN</p>
                  <p style={{color:'#1e3a5f', fontWeight:'500'}}>{new Date(b.check_in).toLocaleDateString('en-US', {day:'numeric', month:'short', year:'numeric'})}</p>
                </div>
                <div>
                  <p style={{color:'#6b7280', fontSize:'12px', marginBottom:'2px'}}>CHECK OUT</p>
                  <p style={{color:'#1e3a5f', fontWeight:'500'}}>{new Date(b.check_out).toLocaleDateString('en-US', {day:'numeric', month:'short', year:'numeric'})}</p>
                </div>
                <div>
                  <p style={{color:'#6b7280', fontSize:'12px', marginBottom:'2px'}}>GUESTS</p>
                  <p style={{color:'#1e3a5f', fontWeight:'500'}}>{b.guests} {b.guests === 1 ? 'guest' : 'guests'}</p>
                </div>
                <div>
                  <p style={{color:'#6b7280', fontSize:'12px', marginBottom:'2px'}}>TOTAL</p>
                  <p style={{color:'#2563eb', fontWeight:'bold'}}>NPR {b.total_price}</p>
                </div>
              </div>

              <div style={{borderTop:'1px solid #f3f4f6', paddingTop:'12px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <p style={{color:'#9ca3af', fontSize:'12px'}}>
                  Booked on {new Date(b.created_at).toLocaleDateString()}
                </p>
                <p style={{color:'#9ca3af', fontSize:'12px'}}>
                  Booking ID: #{b.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings