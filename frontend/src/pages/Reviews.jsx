import { useState, useEffect } from 'react'
import axios from 'axios'

function Reviews({ user, homestay, setPage }) {
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (homestay) {
      axios.get(`http://localhost:5000/api/reviews/${homestay.id}`)
        .then(res => {
          setReviews(res.data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [homestay])

  const handleSubmit = async () => {
    if (!user) {
      setError('Please login to leave a review')
      return
    }
    if (!comment.trim()) {
      setError('Please write a comment')
      return
    }
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        tourist_id: user.id,
        homestay_id: homestay.id,
        rating,
        comment
      })
      setSuccess('Review submitted successfully!')
      setComment('')
      setRating(5)
      const res = await axios.get(`http://localhost:5000/api/reviews/${homestay.id}`)
      setReviews(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    }
  }

  const StarRating = ({ value, onChange }) => (
    <div style={{display:'flex', gap:'4px', marginBottom:'16px'}}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          onClick={() => onChange && onChange(star)}
          style={{fontSize:'28px', cursor:onChange?'pointer':'default', color: star <= value ? '#f59e0b' : '#d1d5db'}}
        >
          ★
        </span>
      ))}
    </div>
  )

  const avgRating = reviews.length > 0
    ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
    : null

  if (!homestay) {
    return (
      <div style={{textAlign:'center', padding:'80px'}}>
        <p>No homestay selected. <span onClick={() => setPage('search')} style={{color:'#2563eb', cursor:'pointer'}}>Search homestays</span></p>
      </div>
    )
  }

  return (
    <div style={{maxWidth:'700px', margin:'40px auto', padding:'24px'}}>

      <div style={{background:'linear-gradient(135deg, #1e3a5f, #2563eb)', borderRadius:'12px', padding:'20px', color:'white', marginBottom:'24px'}}>
        <h2 style={{marginBottom:'4px'}}>{homestay.name_en}</h2>
        <p style={{opacity:'0.8'}}>📍 {homestay.district}</p>
        {avgRating && (
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginTop:'8px'}}>
            <span style={{fontSize:'24px', color:'#f59e0b'}}>★</span>
            <span style={{fontSize:'20px', fontWeight:'bold'}}>{avgRating}</span>
            <span style={{opacity:'0.8'}}>({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      <button
        onClick={() => setPage('booking')}
        style={{marginBottom:'20px', background:'transparent', border:'none', color:'#2563eb', cursor:'pointer', fontSize:'14px'}}
      >
        ← Back to Booking
      </button>

      {user && (
        <div style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'20px', marginBottom:'24px'}}>
          <h3 style={{color:'#1e3a5f', marginBottom:'16px'}}>Write a Review</h3>
          {success && <p style={{color:'green', marginBottom:'12px'}}>{success}</p>}
          {error && <p style={{color:'red', marginBottom:'12px'}}>{error}</p>}

          <label style={{fontWeight:'500', display:'block', marginBottom:'8px'}}>Your Rating</label>
          <StarRating value={rating} onChange={setRating} />

          <label style={{fontWeight:'500', display:'block', marginBottom:'8px'}}>Your Comment</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Share your experience at this homestay..."
            rows={4}
            style={{width:'100%', padding:'10px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px', marginBottom:'16px'}}
          />

          <button
            onClick={handleSubmit}
            style={{width:'100%', padding:'12px', background:'#2563eb', color:'white', border:'none', borderRadius:'8px', fontSize:'15px', fontWeight:'500', cursor:'pointer'}}
          >
            Submit Review
          </button>
        </div>
      )}

      <h3 style={{color:'#1e3a5f', marginBottom:'16px'}}>
        All Reviews {reviews.length > 0 && `(${reviews.length})`}
      </h3>

      {loading ? (
        <p style={{color:'#6b7280'}}>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div style={{textAlign:'center', padding:'40px', border:'1px solid #e5e7eb', borderRadius:'12px'}}>
          <div style={{fontSize:'40px', marginBottom:'12px'}}>⭐</div>
          <p style={{color:'#6b7280'}}>No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div>
          {reviews.map(r => (
            <div key={r.id} style={{border:'1px solid #e5e7eb', borderRadius:'10px', padding:'16px', marginBottom:'12px'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                <div>
                  <span style={{fontWeight:'500', color:'#1e3a5f'}}>{r.tourist_name}</span>
                  <div style={{display:'flex', gap:'2px', marginTop:'4px'}}>
                    {[1,2,3,4,5].map(star => (
                      <span key={star} style={{color: star <= r.rating ? '#f59e0b' : '#d1d5db', fontSize:'16px'}}>★</span>
                    ))}
                  </div>
                </div>
                <span style={{color:'#9ca3af', fontSize:'12px'}}>
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              <p style={{color:'#4b5563', fontSize:'14px', lineHeight:'1.5'}}>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews