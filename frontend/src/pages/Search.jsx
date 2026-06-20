import { useState, useEffect } from 'react'
import axios from 'axios'

function Search({ setPage, setSelectedHomestay }) {
  const [homestays, setHomestays] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/homestays')
      .then(res => {
        setHomestays(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = homestays.filter(h =>
    h.name_en.toLowerCase().includes(search.toLowerCase()) ||
    h.district.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{padding:'24px', maxWidth:'1100px', margin:'0 auto'}}>
      <h2 style={{color:'#1e3a5f', marginBottom:'20px'}}>Find Homestays in Nepal</h2>
      <input
        type="text"
        placeholder="Search by name or district..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{width:'100%', padding:'12px', border:'1px solid #d1d5db', borderRadius:'8px', fontSize:'15px', marginBottom:'24px'}}
      />
      {loading ? (
        <p style={{textAlign:'center', color:'#6b7280'}}>Loading homestays...</p>
      ) : filtered.length === 0 ? (
        <p style={{textAlign:'center', color:'#6b7280'}}>No homestays found</p>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px'}}>
          {filtered.map(h => (
            <div key={h.id} style={{border:'1px solid #e5e7eb', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <div style={{background:'linear-gradient(135deg, #1e3a5f, #2563eb)', height:'140px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <span style={{fontSize:'48px'}}>🏠</span>
              </div>
              <div style={{padding:'16px'}}>
                <h3 style={{color:'#1e3a5f', marginBottom:'6px'}}>{h.name_en}</h3>
                <p style={{color:'#6b7280', fontSize:'14px', marginBottom:'4px'}}>📍 {h.district}</p>
                <p style={{color:'#6b7280', fontSize:'14px', marginBottom:'8px'}}>👤 Host: {h.host_name}</p>
                <p style={{color:'#2563eb', fontWeight:'bold', fontSize:'16px', marginBottom:'12px'}}>
                  NPR {h.price_per_night} / night
                </p>
                <p style={{color:'#6b7280', fontSize:'13px', marginBottom:'16px'}}>{h.description_en?.slice(0, 80)}...</p>
                <button
                  onClick={() => { setSelectedHomestay(h); setPage('detail') }}
                  style={{width:'100%', padding:'10px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'500'}}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search