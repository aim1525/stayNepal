import { useState, useEffect } from 'react'
import axios from 'axios'

function Search({ setPage, setSelectedHomestay, user, lang }) {
  const [homestays, setHomestays] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const t = {
    en: {
      title: 'Find Homestays in Nepal',
      searchPlaceholder: 'Search by name or district...',
      recommended: '🤖 AI Recommended For You',
      allHomestays: 'All Homestays',
      viewDetails: 'View Details',
      noResults: 'No homestays found',
      loading: 'Loading homestays...',
      host: 'Host',
      night: '/ night',
      score: 'AI Score',
    },
    ne: {
      title: 'नेपालमा होमस्टे खोज्नुहोस्',
      searchPlaceholder: 'नाम वा जिल्लाले खोज्नुहोस्...',
      recommended: '🤖 तपाईंको लागि एआई सिफारिस',
      allHomestays: 'सबै होमस्टेहरू',
      viewDetails: 'विवरण हेर्नुहोस्',
      noResults: 'होमस्टे फेला परेन',
      loading: 'होमस्टेहरू लोड हुँदैछ...',
      host: 'होस्ट',
      night: '/ रात',
      score: 'एआई स्कोर',
    }
  }

  const text = t[lang] || t['en']

  useEffect(() => {
    axios.get('http://localhost:5000/api/homestays')
      .then(res => {
        setHomestays(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    if (user) {
      axios.get(`http://localhost:8000/recommend/${user.id}`)
        .then(res => setRecommendations(res.data.recommendations || []))
        .catch(() => {})
    }
  }, [user])

  const filtered = homestays.filter(h =>
    h.name_en.toLowerCase().includes(search.toLowerCase()) ||
    h.district.toLowerCase().includes(search.toLowerCase())
  )

  const HomestayCard = ({ h, isRecommended }) => (
    <div style={{border:'1px solid #e5e7eb', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', background:'white'}}>
      <div style={{background:'linear-gradient(135deg, #1e3a5f, #2563eb)', height:'130px', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
        <span style={{fontSize:'44px'}}>🏠</span>
        {isRecommended && (
          <span style={{position:'absolute', top:'8px', right:'8px', background:'#f59e0b', color:'white', padding:'3px 8px', borderRadius:'12px', fontSize:'11px', fontWeight:'bold'}}>
            🤖 {text.score}: 95%
          </span>
        )}
      </div>
      <div style={{padding:'14px'}}>
        <h3 style={{color:'#1e3a5f', marginBottom:'4px', fontSize:'15px'}}>{h.name_en}</h3>
        <p style={{color:'#6b7280', fontSize:'13px', marginBottom:'2px'}}>📍 {h.district}</p>
        <p style={{color:'#6b7280', fontSize:'13px', marginBottom:'6px'}}>👤 {text.host}: {h.host_name}</p>
        {h.cultural_experiences && (
          <p style={{color:'#059669', fontSize:'12px', marginBottom:'8px'}}>🎭 {h.cultural_experiences}</p>
        )}
        <p style={{color:'#2563eb', fontWeight:'bold', fontSize:'15px', marginBottom:'12px'}}>
          NPR {h.price_per_night} {text.night}
        </p>
        <button
          onClick={() => { setSelectedHomestay(h); setPage('booking') }}
          style={{width:'100%', padding:'9px', background:'#2563eb', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontWeight:'500', fontSize:'13px'}}
        >
          {text.viewDetails}
        </button>
      </div>
    </div>
  )

  return (
    <div style={{padding:'24px', maxWidth:'1100px', margin:'0 auto'}}>
      <h2 style={{color:'#1e3a5f', marginBottom:'16px'}}>{text.title}</h2>
      <input
        type="text"
        placeholder={text.searchPlaceholder}
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{width:'100%', padding:'12px', border:'1px solid #d1d5db', borderRadius:'8px', fontSize:'15px', marginBottom:'24px'}}
      />

      {/* AI RECOMMENDATIONS SECTION */}
      {user && recommendations.length > 0 && (
        <div style={{marginBottom:'32px'}}>
          <h3 style={{color:'#1e3a5f', marginBottom:'16px', fontSize:'18px'}}>{text.recommended}</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'16px'}}>
            {recommendations.map(h => (
              <HomestayCard key={h.id} h={h} isRecommended={true} />
            ))}
          </div>
        </div>
      )}

      {/* ALL HOMESTAYS SECTION */}
      <h3 style={{color:'#1e3a5f', marginBottom:'16px', fontSize:'18px'}}>{text.allHomestays}</h3>
      {loading ? (
        <p style={{textAlign:'center', color:'#6b7280'}}>{text.loading}</p>
      ) : filtered.length === 0 ? (
        <p style={{textAlign:'center', color:'#6b7280'}}>{text.noResults}</p>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'16px'}}>
          {filtered.map(h => (
            <HomestayCard key={h.id} h={h} isRecommended={false} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search