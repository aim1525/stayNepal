import { useState } from 'react'
import axios from 'axios'

function Booking({ user, homestay, setPage }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  if (!homestay) {
    return (
      <div style={{textAlign:'center', padding:'80px'}}>
        <p>No homestay selected. <span onClick={() => setPage('search')} style={{color:'#2563eb', cursor:'pointer'}}>Search homestays</span></p>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{textAlign:'center', padding:'80px'}}>
        <p>Please <span onClick={() => setPage('login')} style={{color:'#2563eb', cursor:'pointer'}}>login</span> to book a homestay.</p>
      </div>
    )
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    return days > 0 ? days * homestay.price_per_night : 0
  }

  const handleBooking = async () => {
    try {
      if (!checkIn || !checkOut) {
        setError('Please select check-in and check-out dates')
        return
      }
      const total = calculateTotal()
      if (total <= 0) {
        setError('Check-out must be after check-in')
        return
      }
      await axios.post('http://localhost:5000/api/bookings', {
        tourist_id: user.id,
        homestay_id: homestay.id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        total_price: total
      })
      setSuccess('Booking confirmed! The host will contact you soon.')
      setCheckIn(''); setCheckOut(''); setGuests(1)
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed')
    }
  }

  return (
    <div style={{maxWidth:'500px', margin:'40px auto', padding:'32px', border:'1px solid #e5e7eb', borderRadius:'12px'}}>
      <h2 style={{color:'#1e3a5f', marginBottom:'8px'}}>Book Homestay</h2>
      <p style={{color:'#6b7280', marginBottom:'24px'}}>{homestay.name_en} · {homestay.district}</p>

      {success && (
        <div style={{background:'#d1fae5', border:'1px solid #6ee7b7', borderRadius:'8px', padding:'12px', marginBottom:'16px', color:'#065f46'}}>
          {success}
        </div>
      )}
      {error && (
        <div style={{background:'#fee2e2', border:'1px solid #fca5a5', borderRadius:'8px', padding:'12px', marginBottom:'16px', color:'#991b1b'}}>
          {error}
        </div>
      )}

      <label style={{fontWeight:'500', display:'block', marginBottom:'6px'}}>Check-in Date</label>
      <input
        type="date"
        value={checkIn}
        onChange={e => setCheckIn(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', fontSize:'14px'}}
      />

      <label style={{fontWeight:'500', display:'block', marginBottom:'6px'}}>Check-out Date</label>
      <input
        type="date"
        value={checkOut}
        onChange={e => setCheckOut(e.target.value)}
        min={checkIn || new Date().toISOString().split('T')[0]}
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'16px', fontSize:'14px'}}
      />

      <label style={{fontWeight:'500', display:'block', marginBottom:'6px'}}>Number of Guests</label>
      <input
        type="number"
        value={guests}
        onChange={e => setGuests(e.target.value)}
        min="1" max="10"
        style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', marginBottom:'24px', fontSize:'14px'}}
      />

      <div style={{background:'#f0f9ff', borderRadius:'8px', padding:'16px', marginBottom:'24px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
          <span style={{color:'#6b7280'}}>Price per night</span>
          <span>NPR {homestay.price_per_night}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
          <span style={{color:'#6b7280'}}>Nights</span>
          <span>{calculateTotal() > 0 ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000*60*60*24)) : 0}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', borderTop:'1px solid #bae6fd', paddingTop:'8px', fontWeight:'bold'}}>
          <span>Total</span>
          <span style={{color:'#2563eb'}}>NPR {calculateTotal()}</span>
        </div>
      </div>

      <div style={{marginBottom:'16px'}}>
        <p style={{fontWeight:'500', marginBottom:'12px'}}>Payment Method</p>
        <div style={{display:'flex', gap:'12px'}}>
          <div style={{flex:1, border:'2px solid #2563eb', borderRadius:'8px', padding:'12px', textAlign:'center', cursor:'pointer'}}>
            <div style={{fontSize:'24px'}}>💚</div>
            <div style={{fontSize:'13px', fontWeight:'500'}}>eSewa</div>
          </div>
          <div style={{flex:1, border:'1px solid #e5e7eb', borderRadius:'8px', padding:'12px', textAlign:'center', cursor:'pointer'}}>
            <div style={{fontSize:'24px'}}>💜</div>
            <div style={{fontSize:'13px', fontWeight:'500'}}>Khalti</div>
          </div>
          <div style={{flex:1, border:'1px solid #e5e7eb', borderRadius:'8px', padding:'12px', textAlign:'center', cursor:'pointer'}}>
            <div style={{fontSize:'24px'}}>🏦</div>
            <div style={{fontSize:'13px', fontWeight:'500'}}>FonePay</div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBooking}
        style={{width:'100%', padding:'14px', background:'#2563eb', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}
      >
        Confirm Booking — NPR {calculateTotal()}
      </button>
    </div>
  )
}

export default Booking