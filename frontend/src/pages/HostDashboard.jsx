import { useState } from 'react'
import axios from 'axios'

function HostDashboard({ user }) {
  const [name_en, setNameEn] = useState('')
  const [name_ne, setNameNe] = useState('')
  const [district, setDistrict] = useState('')
  const [price_per_night, setPrice] = useState('')
  const [description_en, setDescEn] = useState('')
  const [description_ne, setDescNe] = useState('')
  const [cultural_experiences, setCultural] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/homestays', {
        host_id: user.id,
        name_en,
        name_ne,
        district,
        price_per_night,
        description_en,
        description_ne,
        cultural_experiences
      })
      setSuccess('Homestay added successfully!')
      setNameEn(''); setNameNe(''); setDistrict('')
      setPrice(''); setDescEn(''); setDescNe(''); setCultural('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add homestay')
    }
  }

  if (!user || user.role !== 'host') {
    return (
      <div style={{textAlign:'center', padding:'80px 24px'}}>
        <h2 style={{color:'#1e3a5f'}}>Host Dashboard</h2>
        <p style={{color:'#6b7280'}}>You must be logged in as a Host to access this page.</p>
      </div>
    )
  }

  return (
    <div style={{maxWidth:'600px', margin:'40px auto', padding:'32px', border:'1px solid #e5e7eb', borderRadius:'12px'}}>
      <h2 style={{color:'#1e3a5f', marginBottom:'24px'}}>Add New Homestay</h2>
      {success && <p style={{color:'green', marginBottom:'16px'}}>{success}</p>}
      {error && <p style={{color:'red', marginBottom:'16px'}}>{error}</p>}

      <label style={{fontWeight:'500'}}>Homestay Name (English)</label>
      <input value={name_en} onChange={e => setNameEn(e.target.value)}
        placeholder="e.g. Peaceful Mountain Homestay"
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', marginTop:'6px', fontSize:'14px'}} />

      <label style={{fontWeight:'500'}}>Homestay Name (Nepali)</label>
      <input value={name_ne} onChange={e => setNameNe(e.target.value)}
        placeholder="नेपालीमा नाम"
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', marginTop:'6px', fontSize:'14px'}} />

      <label style={{fontWeight:'500'}}>District</label>
      <select value={district} onChange={e => setDistrict(e.target.value)}
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', marginTop:'6px', fontSize:'14px'}}>
        <option value="">Select District</option>
        <option>Kathmandu</option>
        <option>Pokhara</option>
        <option>Chitwan</option>
        <option>Mustang</option>
        <option>Solukhumbu</option>
        <option>Ilam</option>
        <option>Banke</option>
        <option>Dhading</option>
        <option>Kaski</option>
        <option>Lalitpur</option>
        <option>Bhaktapur</option>
        <option>Sindhupalchok</option>
        <option>Dolpa</option>
        <option>Humla</option>
        <option>Jumla</option>
      </select>

      <label style={{fontWeight:'500'}}>Price Per Night (NPR)</label>
      <input value={price_per_night} onChange={e => setPrice(e.target.value)}
        placeholder="e.g. 2500"
        type="number"
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', marginTop:'6px', fontSize:'14px'}} />

      <label style={{fontWeight:'500'}}>Description (English)</label>
      <textarea value={description_en} onChange={e => setDescEn(e.target.value)}
        placeholder="Describe your homestay in English..."
        rows={3}
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', marginTop:'6px', fontSize:'14px'}} />

      <label style={{fontWeight:'500'}}>Description (Nepali)</label>
      <textarea value={description_ne} onChange={e => setDescNe(e.target.value)}
        placeholder="नेपालीमा विवरण..."
        rows={3}
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', marginTop:'6px', fontSize:'14px'}} />

      <label style={{fontWeight:'500'}}>Cultural Experiences</label>
      <input value={cultural_experiences} onChange={e => setCultural(e.target.value)}
        placeholder="e.g. Tharu dance, organic farming, local cooking"
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'24px', marginTop:'6px', fontSize:'14px'}} />

      <button onClick={handleSubmit}
        style={{width:'100%', padding:'12px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', fontSize:'16px', cursor:'pointer', fontWeight:'500'}}>
        Add Homestay
      </button>
    </div>
  )
}

export default HostDashboard