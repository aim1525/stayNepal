function Home({ setPage }) {
  return (
    <div>
      <div style={{background:'linear-gradient(135deg, #1e3a5f, #2563eb)', color:'white', padding:'80px 24px', textAlign:'center'}}>
        <h1 style={{fontSize:'42px', marginBottom:'16px'}}>Find Authentic Homestays in Nepal</h1>
        <p style={{fontSize:'18px', marginBottom:'32px', opacity:'0.9'}}>
          Connect with verified rural homestay hosts across all 77 districts of Nepal
        </p>
        <div style={{display:'flex', justifyContent:'center', gap:'12px', flexWrap:'wrap'}}>
          <button
            onClick={() => setPage('register')}
            style={{background:'white', color:'#2563eb', padding:'14px 32px', border:'none', borderRadius:'8px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}
          >
            Get Started
          </button>
          <button
            onClick={() => setPage('login')}
            style={{background:'transparent', color:'white', padding:'14px 32px', border:'2px solid white', borderRadius:'8px', fontSize:'16px', cursor:'pointer'}}
          >
            Login
          </button>
        </div>
      </div>

      <div style={{padding:'60px 24px', textAlign:'center', background:'#f8fafc'}}>
        <h2 style={{fontSize:'28px', marginBottom:'40px', color:'#1e3a5f'}}>Why StayNepal?</h2>
        <div style={{display:'flex', justifyContent:'center', gap:'32px', flexWrap:'wrap'}}>
          <div style={{maxWidth:'250px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>🏔️</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>77 Districts</h3>
            <p style={{color:'#6b7280', fontSize:'14px'}}>Homestays across all districts of Nepal including remote rural areas</p>
          </div>
          <div style={{maxWidth:'250px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>🤖</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>AI Recommendations</h3>
            <p style={{color:'#6b7280', fontSize:'14px'}}>Smart AI suggests the perfect homestay based on your interests</p>
          </div>
          <div style={{maxWidth:'250px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>💳</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>Nepal Payments</h3>
            <p style={{color:'#6b7280', fontSize:'14px'}}>Pay easily with eSewa, Khalti or FonePay</p>
          </div>
          <div style={{maxWidth:'250px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'40px', marginBottom:'16px'}}>🗣️</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>Bilingual</h3>
            <p style={{color:'#6b7280', fontSize:'14px'}}>Full support in English and Nepali language</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home