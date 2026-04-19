export default function Hero({ onPostRequest, onPostOffer }) {
  return (
    <section className="hero">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes runChicken { 0%{left:-120px} 100%{left:110%} }
        @keyframes bulletTrail { 0%{opacity:1;transform:translateX(0)} 100%{opacity:0;transform:translateX(300px)} }
        @keyframes glowPulse { 0%,100%{filter:drop-shadow(0 0 12px #1d6ef5)} 50%{filter:drop-shadow(0 0 28px #00d4ff)} }
        @keyframes floatAKL { 0%,100%{transform:translateY(0) rotate(-30deg)} 50%{transform:translateY(-18px) rotate(-30deg)} }
        @keyframes floatAKR { 0%,100%{transform:translateY(0) scaleX(-1) rotate(20deg)} 50%{transform:translateY(-14px) scaleX(-1) rotate(20deg)} }
      `}</style>

      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-eyebrow">🎮 Gaming Boost Marketplace</div>
        <h1>Find Your Boost.<br />Win Your Game.</h1>
        <p>Connect with pro boosters or post your own request. Browse verified offers — no middleman, just results.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onPostOffer} style={{ padding: '12px 28px', fontSize: '1rem' }}>🚀 Post an Offer</button>
          <button className="btn-secondary" onClick={onPostRequest} style={{ padding: '12px 28px', fontSize: '1rem' }}>💬 Post a Request</button>
        </div>
      </div>

      {/* AK Left */}
      <div style={{ position:'absolute',left:60,top:'50%',transform:'translateY(-50%)',pointerEvents:'none',animation:'floatAKL 3s ease-in-out infinite',fontSize:90,filter:'drop-shadow(0 0 20px #1d6ef5)',opacity:0.85,zIndex:1 }}>🔫</div>
      {/* AK Right */}
      <div style={{ position:'absolute',right:60,top:'45%',transform:'translateY(-50%) scaleX(-1) rotate(20deg)',pointerEvents:'none',animation:'floatAKR 3.5s ease-in-out infinite',fontSize:80,filter:'drop-shadow(0 0 20px #00d4ff)',opacity:0.75,zIndex:1 }}>🔫</div>

      {/* Bullet trails */}
      <div style={{ position:'absolute',left:130,top:'52%',pointerEvents:'none',overflow:'hidden',width:160,height:6,zIndex:1 }}>
        <div style={{ position:'absolute',width:60,height:3,background:'linear-gradient(90deg,#1d6ef5,transparent)',borderRadius:99,animation:'bulletTrail 1.2s ease-out infinite' }}></div>
        <div style={{ position:'absolute',width:40,height:2,background:'linear-gradient(90deg,#00d4ff,transparent)',borderRadius:99,animation:'bulletTrail 1.2s ease-out 0.4s infinite',top:4 }}></div>
      </div>

      {/* Floating icons */}
      <div style={{ position:'absolute',top:30,left:'50%',fontSize:28,animation:'float 4s ease-in-out 1s infinite',opacity:0.5,pointerEvents:'none',zIndex:1 }}>🏆</div>
      <div style={{ position:'absolute',top:'35%',left:'15%',fontSize:32,animation:'floatSlow 5s ease-in-out 0.8s infinite',opacity:0.3,pointerEvents:'none',filter:'drop-shadow(0 0 10px #3d8bff)',zIndex:1 }}>🎮</div>
      <div style={{ position:'absolute',top:'25%',right:'15%',fontSize:26,animation:'floatSlow 4.5s ease-in-out 2s infinite',opacity:0.25,pointerEvents:'none',filter:'drop-shadow(0 0 10px #00d4ff)',zIndex:1 }}>🎮</div>
      <div style={{ position:'absolute',top:'20%',left:'8%',fontSize:24,animation:'float 3.8s ease-in-out 1.2s infinite',opacity:0.35,pointerEvents:'none',zIndex:1 }}>🛡️</div>
      <div style={{ position:'absolute',top:'65%',right:'8%',fontSize:22,animation:'float 4.2s ease-in-out 0.3s infinite',opacity:0.3,pointerEvents:'none',zIndex:1 }}>⚔️</div>
      <div style={{ position:'absolute',bottom:80,left:160,fontSize:28,animation:'float 2.5s ease-in-out infinite',opacity:0.45,pointerEvents:'none',zIndex:1 }}>💥</div>
      <div style={{ position:'absolute',top:'18%',right:'28%',fontSize:22,animation:'float 3.5s ease-in-out 0.7s infinite',opacity:0.4,pointerEvents:'none',zIndex:1 }}>💰</div>
      <div style={{ position:'absolute',top:'40%',right:'5%',fontSize:26,animation:'float 5s ease-in-out 0.5s infinite',opacity:0.35,pointerEvents:'none',zIndex:1 }}>💎</div>
      <div style={{ position:'absolute',top:'70%',left:'5%',fontSize:22,animation:'float 4s ease-in-out 1.5s infinite',opacity:0.3,pointerEvents:'none',zIndex:1 }}>👑</div>

      {/* Floating score text */}
      <div style={{ position:'absolute',top:'15%',left:'20%',fontSize:11,fontWeight:700,color:'#3d8bff',opacity:0.35,pointerEvents:'none',animation:'float 6s ease-in-out infinite',letterSpacing:2,zIndex:1 }}>+100 XP</div>
      <div style={{ position:'absolute',top:'28%',right:'20%',fontSize:11,fontWeight:700,color:'#00e676',opacity:0.35,pointerEvents:'none',animation:'float 5s ease-in-out 1s infinite',letterSpacing:2,zIndex:1 }}>+WIN</div>
      <div style={{ position:'absolute',bottom:140,right:200,fontSize:11,fontWeight:700,color:'#ffd600',opacity:0.4,pointerEvents:'none',animation:'float 4s ease-in-out 2s infinite',letterSpacing:2,zIndex:1 }}>RANK UP! 🔥</div>

      {/* Running chickens */}
      <div style={{ position:'absolute',bottom:16,fontSize:44,animation:'runChicken 6s linear infinite',pointerEvents:'none',whiteSpace:'nowrap',zIndex:1 }}>🐔💨</div>
      <div style={{ position:'absolute',bottom:20,fontSize:32,animation:'runChicken 9s linear 3s infinite',pointerEvents:'none',zIndex:1 }}>🐔</div>
      <div style={{ position:'absolute',bottom:8,fontSize:24,animation:'runChicken 12s linear 5s infinite',pointerEvents:'none',zIndex:1 }}>🐔🐔</div>
    </section>
  )
}
