import { useState, useEffect } from 'react'
import axios from 'axios'

function Admin({ user, setPage }) {
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [homestays, setHomestays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.role === 'admin') {
      Promise.all([
        axios.get('http://localhost:5000/api/admin/stats'),
        axios.get('http://localhost:5000/api/admin/bookings'),
        axios.get('http://localhost:5000/api/homestays')
      ]).then(([statsRes, bookingsRes, homestaysRes]) => {
        setStats(statsRes.data)
        setBookings(bookingsRes.data)
        setHomestays(homestaysRes.data)
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }, [user])

  const verifyHomestay = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/homestays/${id}/verify`)
      const res = await axios.get('http://localhost:5000/api/homestays')
      setHomestays(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div style={{textAlign:'center', padding:'80px'}}>
        <div style={{fontSize:'48px', marginBottom:'16px'}}>🔒</div>
        <h2 style={{color:'#1e3a5f', marginBottom:'8px'}}>Admin Access Only</h2>
        <p style={{color:'#6b7280'}}>You must be logged in as admin to access this page.</p>
        <button
          onClick={() => setPage('login')}
          style={{marginTop:'16px', background:'#2563eb', color:'white', border:'none', padding:'10px 24px', borderRadius:'8px', cursor:'pointer'}}
        >
          Login as Admin
        </button>
      </div>
    )
  }

  if (loading) {
    return <div style={{textAlign:'center', padding:'80px', color:'#6b7280'}}>Loading dashboard...</div>
  }

  return (
    <div style={{maxWidth:'1100px', margin:'0 auto', padding:'24px'}}>
      <h2 style={{color:'#1e3a5f', marginBottom:'24px'}}>Admin Dashboard</h2>

      {/* Stats Cards */}
      {stats && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'16px', marginBottom:'32px'}}>
          <div style={{background:'linear-gradient(135deg, #1e3a5f, #2563eb)', borderRadius:'12px', padding:'20px', color:'white'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>{stats.total_users}</div>
            <div style={{opacity:'0.8', marginTop:'4px'}}>Total Users</div>
          </div>
          <div style={{background:'linear-gradient(135deg, #065f46, #059669)', borderRadius:'12px', padding:'20px', color:'white'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>{stats.total_homestays}</div>
            <div style={{opacity:'0.8', marginTop:'4px'}}>Total Homestays</div>
          </div>
          <div style={{background:'linear-gradient(135deg, #92400e, #d97706)', borderRadius:'12px', padding:'20px', color:'white'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>{stats.total_bookings}</div>
            <div style={{opacity:'0.8', marginTop:'4px'}}>Total Bookings</div>
          </div>
          <div style={{background:'linear-gradient(135deg, #5b21b6, #7c3aed)', borderRadius:'12px', padding:'20px', color:'white'}}>
            <div style={{fontSize:'32px', fontWeight:'bold'}}>NPR {stats.total_revenue || 0}</div>
            <div style={{opacity:'0.8', marginTop:'4px'}}>Total Revenue</div>
          </div>
        </div>
      )}

      {/* Homestay Verification */}
      <div style={{marginBottom:'32px'}}>
        <h3 style={{color:'#1e3a5f', marginBottom:'16px'}}>Homestay Verification</h3>
        <div style={{border:'1px solid #e5e7eb', borderRadius:'12px', overflow:'hidden'}}>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f8fafc'}}>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Homestay</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>District</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Price/Night</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Status</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {homestays.map((h, i) => (
                <tr key={h.id} style={{borderTop:'1px solid #f3f4f6', background: i%2===0?'white':'#fafafa'}}>
                  <td style={{padding:'12px 16px', color:'#1e3a5f', fontWeight:'500'}}>{h.name_en}</td>
                  <td style={{padding:'12px 16px', color:'#6b7280'}}>{h.district}</td>
                  <td style={{padding:'12px 16px', color:'#6b7280'}}>NPR {h.price_per_night}</td>
                  <td style={{padding:'12px 16px'}}>
                    <span style={{
                      background: h.is_verified ? '#d1fae5' : '#fef3c7',
                      color: h.is_verified ? '#065f46' : '#92400e',
                      padding:'3px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:'500'
                    }}>
                      {h.is_verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td style={{padding:'12px 16px'}}>
                    {!h.is_verified && (
                      <button
                        onClick={() => verifyHomestay(h.id)}
                        style={{background:'#2563eb', color:'white', border:'none', padding:'6px 14px', borderRadius:'6px', cursor:'pointer', fontSize:'13px'}}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h3 style={{color:'#1e3a5f', marginBottom:'16px'}}>Recent Bookings</h3>
        <div style={{border:'1px solid #e5e7eb', borderRadius:'12px', overflow:'hidden'}}>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f8fafc'}}>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>ID</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Homestay</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Check In</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Check Out</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Total</th>
                <th style={{padding:'12px 16px', textAlign:'left', color:'#6b7280', fontSize:'13px', fontWeight:'500'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b.id} style={{borderTop:'1px solid #f3f4f6', background: i%2===0?'white':'#fafafa'}}>
                  <td style={{padding:'12px 16px', color:'#6b7280'}}>#{b.id}</td>
                  <td style={{padding:'12px 16px', color:'#1e3a5f', fontWeight:'500'}}>{b.name_en}</td>
                  <td style={{padding:'12px 16px', color:'#6b7280'}}>{new Date(b.check_in).toLocaleDateString()}</td>
                  <td style={{padding:'12px 16px', color:'#6b7280'}}>{new Date(b.check_out).toLocaleDateString()}</td>
                  <td style={{padding:'12px 16px', color:'#2563eb', fontWeight:'500'}}>NPR {b.total_price}</td>
                  <td style={{padding:'12px 16px'}}>
                    <span style={{
                      background: b.status==='confirmed'?'#d1fae5': b.status==='pending'?'#fef3c7':'#fee2e2',
                      color: b.status==='confirmed'?'#065f46': b.status==='pending'?'#92400e':'#991b1b',
                      padding:'3px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:'500'
                    }}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin