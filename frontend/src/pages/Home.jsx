function Home({ setPage, lang }) {
  const t = {
    en: {
      title: 'Find Authentic Homestays in Nepal',
      subtitle: 'Connect with verified rural homestay hosts across all 77 districts of Nepal',
      getStarted: 'Get Started',
      login: 'Login',
      whyTitle: 'Why StayNepal?',
      f1title: '77 Districts',
      f1desc: 'Homestays across all districts of Nepal including remote rural areas',
      f2title: 'AI Recommendations',
      f2desc: 'Smart AI suggests the perfect homestay based on your interests',
      f3title: 'Nepal Payments',
      f3desc: 'Pay easily with eSewa, Khalti or FonePay',
      f4title: 'Bilingual',
      f4desc: 'Full support in English and Nepali language',
    },
    ne: {
      title: 'नेपालमा प्रामाणिक होमस्टे खोज्नुहोस्',
      subtitle: 'नेपालका सबै ७७ जिल्लाका प्रमाणित ग्रामीण होमस्टे होस्टहरूसँग जडान गर्नुहोस्',
      getStarted: 'सुरु गर्नुहोस्',
      login: 'लगइन',
      whyTitle: 'स्टेनेपाल किन?',
      f1title: '७७ जिल्ला',
      f1desc: 'नेपालका सबै जिल्लाहरूमा होमस्टेहरू',
      f2title: 'एआई सिफारिस',
      f2desc: 'स्मार्ट एआईले तपाईंको रुचिको आधारमा उत्तम होमस्टे सुझाव दिन्छ',
      f3title: 'नेपाल भुक्तानी',
      f3desc: 'eSewa, Khalti वा FonePay बाट सजिलै भुक्तानी गर्नुहोस्',
      f4title: 'द्विभाषी',
      f4desc: 'अंग्रेजी र नेपाली भाषामा पूर्ण समर्थन',
    }
  }

  const text = t[lang] || t['en']

  return (
    <div>
      <div style={{background:'linear-gradient(135deg, #1e3a5f, #2563eb)', color:'white', padding:'80px 24px', textAlign:'center'}}>
        <h1 style={{fontSize:'38px', marginBottom:'16px', lineHeight:'1.3'}}>{text.title}</h1>
        <p style={{fontSize:'18px', marginBottom:'32px', opacity:'0.9'}}>{text.subtitle}</p>
        <div style={{display:'flex', justifyContent:'center', gap:'12px', flexWrap:'wrap'}}>
          <button
            onClick={() => setPage('register')}
            style={{background:'white', color:'#2563eb', padding:'14px 32px', border:'none', borderRadius:'8px', fontSize:'16px', fontWeight:'bold', cursor:'pointer'}}
          >
            {text.getStarted}
          </button>
          <button
            onClick={() => setPage('login')}
            style={{background:'transparent', color:'white', padding:'14px 32px', border:'2px solid white', borderRadius:'8px', fontSize:'16px', cursor:'pointer'}}
          >
            {text.login}
          </button>
        </div>
      </div>

      <div style={{padding:'60px 24px', textAlign:'center', background:'#f8fafc'}}>
        <h2 style={{fontSize:'28px', marginBottom:'40px', color:'#1e3a5f'}}>{text.whyTitle}</h2>
        <div style={{display:'flex', justifyContent:'center', gap:'24px', flexWrap:'wrap'}}>
          <div style={{maxWidth:'220px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'36px', marginBottom:'12px'}}>🏔️</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>{text.f1title}</h3>
            <p style={{color:'#6b7280', fontSize:'13px'}}>{text.f1desc}</p>
          </div>
          <div style={{maxWidth:'220px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'36px', marginBottom:'12px'}}>🤖</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>{text.f2title}</h3>
            <p style={{color:'#6b7280', fontSize:'13px'}}>{text.f2desc}</p>
          </div>
          <div style={{maxWidth:'220px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'36px', marginBottom:'12px'}}>💳</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>{text.f3title}</h3>
            <p style={{color:'#6b7280', fontSize:'13px'}}>{text.f3desc}</p>
          </div>
          <div style={{maxWidth:'220px', padding:'24px', background:'white', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize:'36px', marginBottom:'12px'}}>🗣️</div>
            <h3 style={{color:'#1e3a5f', marginBottom:'8px'}}>{text.f4title}</h3>
            <p style={{color:'#6b7280', fontSize:'13px'}}>{text.f4desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home