

import { useEffect, useState } from 'react';
import React from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SpeciesModal from "./components/modals/SpeciesModal";
import { Provider, useApp } from "./context/AppContext";
import SpeciesPage from './pages/SpeciesPage';
import HomePage from './pages/HomePage';
import MediaPage from './pages/MediaPage';
import TeamPage from './pages/TeamPage';

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#04080a;--bg2:#081012;--bg3:rgba(255,255,255,.03);
  --border:rgba(134,211,175,.12);--border2:rgba(134,211,175,.3);
  --green:#52c97b;--green2:#34d399;--greenGlow:rgba(82,201,123,.13);
  --text:#e8f0e9;--text2:#8aaa92;--text3:#4a6a52;
  --ff:'Cormorant Garamond',Georgia,serif;--fb:'DM Sans',sans-serif;
  --nav-bg:rgba(4,8,10,.94);
  --modal-bg:linear-gradient(160deg,#0a1a0e,#070f09);
  --sidebar-bg:linear-gradient(180deg,#0a1410 0%,#040810 100%);
  --sidebar-header-bg:linear-gradient(180deg,#0a1410 0%,#040810 100%);
  --inp-bg:rgba(255,255,255,.04);--sel-opt-bg:#081012;
  --card-hover-shadow:0 18px 38px rgba(0,0,0,.28);
  --modal-overlay:rgba(0,0,0,.85);--scrollbar-thumb:#1a3a22;
}
[data-theme="light"]{
  --bg:#f4f8f4;--bg2:#eaf1eb;--bg3:rgba(0,0,0,.04);
  --border:rgba(30,90,50,.12);--border2:rgba(30,90,50,.28);
  --green:#1c7a3e;--green2:#15803d;--greenGlow:rgba(28,122,62,.1);
  --text:#0d1a10;--text2:#3a6345;--text3:#7a9e82;
  --nav-bg:rgba(244,248,244,.95);
  --modal-bg:linear-gradient(160deg,#eef5ef,#e8f0ea);
  --sidebar-bg:linear-gradient(180deg,#eef5ef 0%,#e8f0ea 100%);
  --sidebar-header-bg:linear-gradient(180deg,#eef5ef 0%,#e8f0ea 100%);
  --inp-bg:rgba(0,0,0,.04);--sel-opt-bg:#eaf1eb;
  --card-hover-shadow:0 18px 38px rgba(0,80,30,.1);
  --modal-overlay:rgba(200,230,210,.75);--scrollbar-thumb:#6abf82;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--fb);overflow-x:hidden;font-size:15px}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:3px}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes flap{0%,100%{transform:scaleX(1) rotate(-1deg)}50%{transform:scaleX(.58) rotate(2deg)}}
@keyframes floatBf{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-16px) rotate(6deg)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .5s ease forwards}
.fi{animation:fadeIn .3s ease forwards}
.btn{font-family:var(--fb);cursor:pointer;border:none;transition:all .22s;letter-spacing:.03em;display:inline-flex;align-items:center;gap:.4rem;white-space:nowrap}
.btn-p{background:linear-gradient(135deg,#22c55e,#15803d);color:#fff;padding:.6rem 1.5rem;border-radius:50px;font-size:.84rem;box-shadow:0 4px 16px rgba(34,197,94,.22)}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(34,197,94,.32)}
.btn-o{background:transparent;border:1px solid var(--border2);color:var(--green);padding:.55rem 1.3rem;border-radius:50px;font-size:.84rem}
.btn-o:hover{background:var(--greenGlow)}
.btn-sm{font-size:.76rem;padding:.38rem .95rem;border-radius:50px;background:var(--greenGlow);border:1px solid var(--border2);color:var(--green);cursor:pointer;font-family:var(--fb);transition:all .2s}
.btn-sm:hover{background:rgba(82,201,123,.22)}
.card{background:var(--bg3);border:1px solid var(--border);border-radius:16px;transition:all .28s cubic-bezier(.34,1.2,.64,1);overflow:hidden}
.card:hover{background:rgba(255,255,255,.052);border-color:var(--border2);transform:translateY(-5px);box-shadow:0 18px 38px rgba(0,0,0,.28)}
.tag{display:inline-block;padding:2px 9px;border-radius:20px;font-size:.7rem;letter-spacing:.05em;font-family:var(--fb)}
.t-green{background:rgba(82,201,123,.12);color:#52c97b;border:1px solid rgba(82,201,123,.22)}
.t-red{background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.22)}
.t-amber{background:rgba(251,191,36,.12);color:#fbbf24;border:1px solid rgba(251,191,36,.22)}
.t-blue{background:rgba(96,165,250,.12);color:#60a5fa;border:1px solid rgba(96,165,250,.22)}
.t-purple{background:rgba(167,139,250,.12);color:#a78bfa;border:1px solid rgba(167,139,250,.22)}
.inp{background:var(--inp-bg);border:1px solid var(--border);color:var(--text);padding:.52rem .95rem;border-radius:10px;font-family:var(--fb);font-size:.88rem;outline:none;transition:border-color .3s;width:100%}
.inp:focus{border-color:var(--green);background:var(--greenGlow)}
.inp::placeholder{color:var(--text3)}
.sel{background:var(--inp-bg);border:1px solid var(--border);color:var(--text);padding:.48rem .85rem;border-radius:10px;font-family:var(--fb);font-size:.83rem;outline:none;cursor:pointer;transition:border-color .3s}
.sel:focus{border-color:var(--green)}
.sel option{background:var(--sel-opt-bg)}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(14px);animation:fadeIn .2s ease;overflow-y:auto}
.modal{background:var(--modal-bg);border:1px solid var(--border2);border-radius:22px;padding:2.5rem;max-width:600px;width:100%;position:relative;animation:fadeUp .3s ease;max-height:92vh;overflow-y:auto}
.nav-btn{background:none;border:none;color:var(--text2);font-family:var(--fb);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;padding:.4rem .95rem;border-radius:8px;transition:all .2s;position:relative;white-space:nowrap}
.nav-btn:hover{color:var(--green);background:var(--greenGlow)}
.nav-btn.active{color:var(--green);background:rgba(82,201,123,.1)}
.nav-btn.active::after{content:'';position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);width:18px;height:2px;background:var(--green);border-radius:2px}
.loader{width:26px;height:26px;border:2px solid rgba(82,201,123,.15);border-top-color:var(--green);border-radius:50%;animation:spin .6s linear infinite}
.sec-eye{font-family:var(--fb);color:var(--green);letter-spacing:.26em;font-size:.7rem;text-transform:uppercase;margin-bottom:.75rem;opacity:.75}
.sec-h{font-family:var(--ff);font-size:clamp(1.9rem,4vw,3rem);color:var(--text);line-height:1.08}
.sec-h em{color:var(--green);font-style:italic}
.sec-sub{font-family:var(--ff);color:var(--text2);font-size:1rem;line-height:1.75;font-style:italic}
.shimmer{background:linear-gradient(90deg,var(--green2),#86efac,var(--green2));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 2.8s linear infinite}
.g2{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}
.g3{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.4rem}
.tree-item{padding:.48rem .75rem;border-radius:9px;cursor:pointer;transition:background .18s;display:flex;align-items:center;gap:.55rem;font-family:var(--fb);font-size:.88rem}
.tree-item:hover{background:var(--greenGlow)}
@media(max-width:760px){.g2,.g3{grid-template-columns:1fr}.hide-m{display:none!important}.modal{padding:1.5rem 1.2rem}}
`;

// ─── Shared small components ──────────────────────────────────────────────────
const Loader = () => <div className="loader" />;

const CloseBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{position:"absolute",top:"1.1rem",right:"1.1rem",background:"rgba(255,255,255,.06)",border:"1px solid var(--border)",color:"var(--text2)",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}
    onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,.12)";e.currentTarget.style.color="#f87171"}}
    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.color="var(--text2)"}}>
    ✕
  </button>
);

const Avatar = ({ i, c, size=52 }) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:`${c}18`,border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",color:c,fontWeight:600,fontSize:size*.32,fontFamily:"var(--ff)",flexShrink:0}}>{i}</div>
);

const Dot = ({ c }) => (
  <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}} />
);

// ─── Taxon Tree ───────────────────────────────────────────────────────────────
function TaxonTree() {
  const { state, dispatch } = useApp();
  const LS = {borderLeft:"2px solid rgba(82,201,123,.18)",marginLeft:"1.3rem",paddingLeft:"1rem"};

  return (
    <div style={{padding:"7rem 1.5rem 4rem",maxWidth:1200,margin:"0 auto"}}>
      <div style={{marginBottom:"2.5rem"}}>
        <div className="sec-eye">Systematic Classification</div>
        <h1 className="sec-h">Butterfly <em>Taxon Tree</em></h1>
        <p className="sec-sub" style={{marginTop:".5rem"}}>Explore the complete taxonomic hierarchy. Click any node to expand.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
        <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:18,padding:"1.5rem"}}>
          <div style={{fontSize:".78rem",color:"var(--text3)",marginBottom:"1rem",letterSpacing:".06em"}}>FULL CLASSIFICATION</div>
          {[["Kingdom","Animalia"],["Phylum","Arthropoda"],["Class","Insecta"],["Order","Lepidoptera"],["Suborder","Rhopalocera"]].map(([l, v]) => (
            <div key={l} style={{display:"flex",gap:".75rem",alignItems:"center",padding:".4rem .75rem",borderRadius:9,marginBottom:".25rem"}}>
              <span style={{fontSize:".72rem",color:"var(--text3)",minWidth:80}}>{l}</span>
              <span style={{fontSize:".88rem",color:"var(--text)",fontFamily:"var(--ff)",fontStyle:"italic"}}>{v}</span>
            </div>
          ))}
          <div style={{padding:".4rem .75rem",borderRadius:9,marginTop:".5rem",borderTop:"1px solid var(--border)",paddingTop:"1rem"}}>
            <span style={{fontSize:".72rem",color:"var(--text3)"}}>Families</span>
            <span style={{fontSize:".88rem",color:"var(--green)",marginLeft:".5rem"}}>6 ({state.categories.reduce((a, c) => a + c.count, 0)} spp)</span>
          </div>
          <div style={LS}>
            {state.categories.map(cat => {
              const exp = state.taxonExpanded[cat.id];
              return (
                <div key={cat.id}>
                  <div className="tree-item" onClick={() => dispatch({type:"TAXON_TOGGLE",id:cat.id})}>
                    <span style={{fontSize:".9rem"}}>🦋</span>
                    <span style={{flex:1,color:"var(--text)"}}>{cat.name} <span style={{color:"var(--text3)",fontSize:".8rem"}}>({cat.count})</span></span>
                    <span style={{color:"var(--green)",transform:exp?"rotate(90deg)":"none",transition:"transform .2s",fontSize:".9rem"}}>›</span>
                  </div>
                  {exp && (
                    <div style={LS}>
                      {cat.subcategories.map(sub => {
                        const sid    = `${cat.id}-${sub}`;
                        const subExp = state.taxonExpanded[sid];
                        const subSp  = cat.species.filter(s => s.subcategory === sub);
                        return (
                          <div key={sub}>
                            <div className="tree-item" onClick={() => dispatch({type:"TAXON_TOGGLE",id:sid})}>
                              <span style={{flex:1,color:"var(--text2)",fontSize:".84rem"}}>{sub} <span style={{color:"var(--text3)",fontSize:".76rem"}}>{subSp.length}</span></span>
                              {subSp.length > 0 && <span style={{color:"var(--green)",transform:subExp?"rotate(90deg)":"none",transition:"transform .2s",fontSize:".85rem"}}>›</span>}
                            </div>
                            {subExp && (
                              <div style={LS}>
                                {subSp.length === 0
                                  ? <div style={{padding:".35rem .5rem",fontSize:".8rem",color:"var(--text3)"}}>No species listed</div>
                                  : subSp.map(s => (
                                    <div key={s.id} className="tree-item" onClick={() => dispatch({type:"SEL_SPECIES",v:s})} style={{gap:".4rem"}}>
                                      <span style={{fontSize:".75rem"}}>🦋</span>
                                      <div>
                                        <div style={{color:"var(--text)",fontSize:".82rem"}}>{s.name}</div>
                                        <div style={{color:"var(--text3)",fontSize:".72rem",fontStyle:"italic"}}>{s.scientific}</div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{fontSize:".78rem",color:"var(--text3)",marginBottom:"1rem",letterSpacing:".06em"}}>FAMILY SUMMARY</div>
          <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
            {state.categories.map(cat => (
              <div key={cat.id} className="card" style={{padding:"1rem",cursor:"pointer"}} onClick={() => { dispatch({type:"SEL_CAT",v:cat}); dispatch({type:"SET_PAGE",p:"species"}); }}>
                <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
                  <div style={{width:36,height:36,borderRadius:9,background:`${cat.color}12`,border:`1px solid ${cat.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>🦋</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"var(--ff)",fontSize:"1rem",color:"var(--text)"}}>{cat.name} <span style={{fontStyle:"italic",color:"var(--text3)",fontSize:".85rem"}}>({cat.common})</span></div>
                    <div style={{display:"flex",gap:".35rem",marginTop:".3rem",flexWrap:"wrap"}}>
                      {cat.subcategories.map(s => <span key={s} className="tag t-blue" style={{fontSize:".62rem"}}>{s}</span>)}
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"var(--ff)",fontSize:"1.3rem",color:"var(--green)"}}>{cat.count}</div>
                    <div style={{fontSize:".7rem",color:"#f87171"}}>{cat.endangered} ⚠</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Member Modal ─────────────────────────────────────────────────────────────
function MemberModal() {
  const { state, dispatch } = useApp();
  const m = state.selectedMember;
  if (!m) return null;

  const icons = {twitter:"🐦",instagram:"📸",github:"💻",linkedin:"💼",researchgate:"🔬",email:"✉️"};

  return (
    <div className="modal-bg" onClick={() => dispatch({type:"SEL_MEMBER",v:null})}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={() => dispatch({type:"SEL_MEMBER",v:null})}/>
        <div style={{display:"flex",alignItems:"flex-start",gap:"1.25rem",marginBottom:"1.5rem"}}>
          <Avatar i={m.initials} c={m.color} size={68}/>
          <div>
            <h2 style={{fontFamily:"var(--ff)",fontSize:"1.6rem",color:"var(--text)",marginBottom:".2rem"}}>{m.name}</h2>
            <div style={{fontSize:".85rem",color:"var(--text2)",marginBottom:".5rem"}}>{m.role}</div>
            <span className="tag t-green">{m.dept}</span>
          </div>
        </div>
        <p style={{fontFamily:"var(--ff)",fontSize:".97rem",color:"var(--text2)",lineHeight:1.8,marginBottom:"1.5rem",fontStyle:"italic"}}>{m.bio}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:".6rem",marginBottom:"1.25rem"}}>
          {[["Papers",m.publications,"📄"],["Years",m.experience,"🌿"],["Trips",m.fieldTrips,"🗺"],["Species",m.species_described,"🦋"]].map(([l, v, ic]) => (
            <div key={l} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:12,padding:".75rem",textAlign:"center"}}>
              <div style={{fontSize:"1rem",marginBottom:".25rem"}}>{ic}</div>
              <div style={{fontFamily:"var(--ff)",fontSize:"1.4rem",color:"var(--green)"}}>{v}</div>
              <div style={{fontSize:".68rem",color:"var(--text3)"}}>{l}</div>
            </div>
          ))}
        </div>
        {[["Education",m.education],["Specialization",m.specialization]].map(([k, v]) => (
          <div key={k} style={{marginBottom:".75rem",padding:".75rem",background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:12}}>
            <div style={{fontSize:".72rem",color:"var(--text3)",marginBottom:".25rem"}}>{k}</div>
            <div style={{fontSize:".88rem",color:"var(--text)"}}>{v}</div>
          </div>
        ))}
        <div style={{marginBottom:"1.25rem",padding:".75rem",background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:12}}>
          <div style={{fontSize:".72rem",color:"var(--text3)",marginBottom:".5rem"}}>🏆 Awards</div>
          <div style={{display:"flex",flexDirection:"column",gap:".3rem"}}>
            {m.awards.map(a => (
              <div key={a} style={{display:"flex",gap:".5rem",alignItems:"center"}}>
                <Dot c="var(--green)"/>
                <span style={{fontSize:".84rem",color:"var(--text)"}}>{a}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:".72rem",color:"var(--text3)",marginBottom:".5rem"}}>Connect</div>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {Object.entries(m.social).map(([p, url]) => (
              <a key={p} href={url} target="_blank" rel="noopener noreferrer"
                style={{padding:".35rem .8rem",borderRadius:50,background:"rgba(255,255,255,.04)",border:"1px solid var(--border)",color:"var(--text2)",textDecoration:"none",fontFamily:"var(--fb)",fontSize:".76rem",display:"flex",alignItems:"center",gap:".3rem",transition:"all .2s"}}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--green)"; e.currentTarget.style.color="var(--green)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text2)"; }}>
                {icons[p] || "🔗"} {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── About Page ───────────────────────────────────────────────────────────────
function AboutPage() {
  const SOCIAL = [
    {icon:"📘",label:"Facebook",   handle:"Nature Mates Society",    note:"Follow 8,200 supporters", href:"https://facebook.com"},
    {icon:"📸",label:"Instagram",  handle:"@butterfly_india",        note:"32K followers",            href:"https://instagram.com"},
    {icon:"🐦",label:"Twitter / X",handle:"@butterfly_india",        note:"12K followers",            href:"https://twitter.com"},
    {icon:"🌐",label:"Website",    handle:"naturematessociety.org",   note:"Main portal",             href:"https://naturematessociety.org"},
  ];

  return (
    <div style={{padding:"7rem 1.5rem 4rem",maxWidth:1100,margin:"0 auto",position:"relative"}}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{position:"absolute",top:`${10+i*11}%`,left:`${i%2===0?5:88}%`,fontSize:"1.4rem",opacity:.04,animation:`floatBf ${6+i}s ease-in-out ${i*.5}s infinite`,pointerEvents:"none"}}>🦋</div>
      ))}
      <div style={{textAlign:"center",marginBottom:"4rem"}}>
        <div style={{fontSize:".72rem",color:"var(--text3)",letterSpacing:".2em",marginBottom:".5rem"}}>Est. 2018 · Kolkata, India</div>
        <h1 className="sec-h" style={{marginBottom:"1.25rem"}}>About <em>butterfly</em></h1>
        <blockquote style={{fontFamily:"var(--ff)",fontSize:"1.1rem",color:"var(--text2)",fontStyle:"italic",maxWidth:640,margin:"0 auto",lineHeight:1.8,borderLeft:"3px solid rgba(82,201,123,.3)",paddingLeft:"1.5rem",textAlign:"left"}}>
          "In every butterfly, we see not just a species to be catalogued, but a world to be understood — a mirror of the health of our ecosystems."
          <footer style={{fontSize:".82rem",color:"var(--text3)",marginTop:".5rem",fontStyle:"normal"}}>— Dr. Meera Nair, Founder</footer>
        </blockquote>
      </div>

      <div className="g2" style={{marginBottom:"3rem"}}>
        {[
          ["Our Story", "Butterfly was founded in 2018 by Dr. Meera Nair after a decade documenting declining populations across peninsular India. What began as a solo field project grew into a nationwide network of researchers, educators, and naturalists united by a single conviction: that butterflies are both measurable indicators of ecosystem health and worthy of our deepest wonder. Today, we are one of India's leading platforms for butterfly observation, conservation advocacy, and open scientific documentation — with active programs in 28 states."],
          ["Our Mission","We exist to document India's extraordinary butterfly diversity, make that knowledge freely accessible, and translate it into measurable conservation outcomes. We build bridges between field researchers and citizen scientists, between policymakers and local communities, and between present generations and the children who will inherit this natural heritage. We believe rigorous science and a sense of awe are not opposites."],
        ].map(([t, b]) => (
          <div key={t} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:18,padding:"2rem"}}>
            <h3 style={{fontFamily:"var(--ff)",fontSize:"1.4rem",color:"var(--green)",marginBottom:"1rem"}}>{t}</h3>
            <p style={{fontFamily:"var(--ff)",color:"var(--text2)",lineHeight:1.9,fontSize:".97rem"}}>{b}</p>
          </div>
        ))}
      </div>

      <div style={{marginBottom:"3rem"}}>
        <div className="sec-eye" style={{textAlign:"center",marginBottom:"1.5rem"}}>Our Values</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem"}}>
          {[
            ["🔬","Scientific Rigor",  "Every observation verified. Every claim evidence-based."],
            ["🌍","Radical Openness",  "All data, code, and findings published openly."],
            ["🤝","Inclusive Community","Space for PhD and schoolchild alike. Every sighting matters."],
            ["🌱","Long-term Thinking","Building infrastructure that outlasts any single project."],
            ["✨","Wonder as Method",  "Curiosity is our most powerful conservation tool."],
            ["⚖️","Justice & Equity", "Conservation must benefit communities that live with nature."],
          ].map(([i, t, d]) => (
            <div key={t}
              style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,padding:"1.25rem",transition:"all .25s",cursor:"default"}}
              onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)";  e.currentTarget.style.transform="translateY(0)";    }}>
              <div style={{fontSize:"1.5rem",marginBottom:".6rem"}}>{i}</div>
              <div style={{fontFamily:"var(--ff)",fontSize:"1rem",color:"var(--text)",marginBottom:".35rem"}}>{t}</div>
              <div style={{fontSize:".8rem",color:"var(--text2)",lineHeight:1.6}}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginBottom:"3rem",background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:18,padding:"2rem"}}>
        <div className="sec-eye" style={{marginBottom:"1.5rem"}}>Our Journey</div>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:60,top:0,bottom:0,width:"2px",background:"linear-gradient(to bottom,rgba(82,201,123,.3),rgba(82,201,123,.05))"}}/>
          {[
            ["2018","Founded in Kolkata. First Western Ghats survey with 3 volunteers."],
            ["2019","Citizen science mobile protocol launched. First 500 verified observations."],
            ["2020","'Checklist of Indian Butterflies' published — open access, 1,547 species."],
            ["2021","First butterfly corridor notified in Karnataka using our habitat data."],
            ["2022","Annual Butterfly Week — 12,000 participants, 40,000 sightings."],
            ["2023","MoEFCC partnership for national pollinator monitoring framework."],
            ["2024","AI habitat model launched. 4,200+ volunteer network."],
            ["2025","Active in 28 states. 92,000+ verified observations published."],
          ].map(([yr, ev]) => (
            <div key={yr} style={{display:"flex",gap:"1.5rem",alignItems:"flex-start",marginBottom:"1rem",position:"relative"}}>
              <div style={{width:60,fontFamily:"var(--ff)",fontSize:"1.05rem",color:"var(--green)",flexShrink:0,textAlign:"right",lineHeight:1.5}}>{yr}</div>
              <div style={{width:10,height:10,borderRadius:"50%",background:"var(--green)",flexShrink:0,marginTop:5,zIndex:1}}/>
              <div style={{fontSize:".88rem",color:"var(--text2)",lineHeight:1.6,paddingTop:".1rem"}}>{ev}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="g2">
        <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:18,padding:"2rem"}}>
          <div className="sec-eye" style={{marginBottom:"1rem"}}>Contact Info</div>
          {[
            ["📍","6/7, Bijoygarh\nKolkata 700032\nWest Bengal, India"],
            ["📞","+91 947 727 5731\nShop: +91 990 312 4285"],
            ["✉️","naturemates@gmail.com"],
          ].map(([ic, val]) => (
            <div key={ic} style={{display:"flex",gap:".75rem",marginBottom:"1rem",alignItems:"flex-start"}}>
              <span style={{fontSize:"1.1rem",marginTop:".15rem"}}>{ic}</span>
              <span style={{fontSize:".88rem",color:"var(--text2)",lineHeight:1.7,whiteSpace:"pre-line"}}>{val}</span>
            </div>
          ))}
        </div>
        <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:18,padding:"2rem"}}>
          <div className="sec-eye" style={{marginBottom:"1rem"}}>Follow Us</div>
          <div style={{display:"flex",flexDirection:"column",gap:".6rem"}}>
            {SOCIAL.map(({ icon, label, handle, note, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",gap:".85rem",padding:".85rem 1rem",borderRadius:12,background:"rgba(255,255,255,.02)",border:"1px solid var(--border)",textDecoration:"none",transition:"all .2s"}}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.background="var(--greenGlow)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)";  e.currentTarget.style.background="rgba(255,255,255,.02)"; }}>
                <span style={{fontSize:"1.3rem"}}>{icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"var(--ff)",fontSize:".95rem",color:"var(--text)"}}>{label}</div>
                  <div style={{fontSize:".76rem",color:"var(--text3)"}}>{handle}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:".2rem"}}>
                  <span style={{fontSize:".72rem",color:"var(--green)"}}>{note}</span>
                  <span style={{color:"var(--text3)",fontSize:".85rem"}}>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Media & Publications Page ────────────────────────────────────────────────
// To add more articles, push another object into MEDIA_ITEMS following the same shape:
// { id, title, source, date, tag, description, url }
// Tags available: "Press", "Research", "Field Report", "Policy", "Culture", "Education"
const MEDIA_ITEMS = [
  {
    id: 1,
    title: "Why Bengali Mothers Fast on the Auspicious Day of Nilpuja",
    source: "Ananda Bazar Patrika",
    date: "Apr 2026",
    tag: "Culture",
    description: "An exploration of the cultural traditions and significance of the Nilpuja festival among Bengali communities.",
    url: "https://web.archive.org/web/20260411064234/https://www.anandabazar.com/horoscope/why-bengali-mother-do-fasting-in-the-auspicious-day-of-nilpuja-dgtl/cid/1679760",
  },
  // ── Add more items below this line ──
  // {
  //   id: 2,
  //   title: "Your Article Title",
  //   source: "Source Name",
  //   date: "Mon YYYY",
  //   tag: "Research",
  //   description: "A short one-line description shown on the card.",
  //   url: "https://your-url-here.com",
  // },
];

const TAG_COLORS = {
  "Press":        "t-blue",
  "Research":     "t-purple",
  "Field Report": "t-green",
  "Policy":       "t-amber",
  "Culture":      "t-red",
  "Education":    "t-blue",
};


// ─── Menu Button (mobile) ─────────────────────────────────────────────────────
function MenuButton() {
  const { dispatch } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", top: 20, right: 20, zIndex: 1000,
          background: "rgba(4,8,10,.9)", border: "1px solid var(--border)", color: "var(--text)",
          padding: ".5rem", borderRadius: 8, cursor: "pointer", fontSize: "1.2rem",
          backdropFilter: "blur(10px)",
        }}
      >
        ☰
      </button>
      {open && (
        <div
          style={{
            position: "fixed", top: 70, right: 20, zIndex: 1000,
            background: "rgba(4,8,10,.95)", border: "1px solid var(--border)", borderRadius: 12,
            padding: "1rem", backdropFilter: "blur(10px)", minWidth: 200,
          }}
        >
          {[
            { id: "home",    l: "Home" },
            { id: "species", l: "Species" },
            { id: "media",   l: "Media" },
            { id: "team",    l: "Team" },
            { id: "about",   l: "About" },
          ].map(({ id, l }) => (
            <button
              key={id}
              onClick={() => { dispatch({ type: "SET_PAGE", p: id }); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", color: "var(--text)", padding: ".5rem",
                cursor: "pointer", fontFamily: "var(--fb)", fontSize: ".9rem",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
function AppContent() {
  const { state, dispatch } = useApp();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 760);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pages = {
    home:    <HomePage/>,
    species: <SpeciesPage/>,
    media:   <MediaPage/>,
    taxon:   <TaxonTree/>,
    team:    <TeamPage/>,
    about:   <AboutPage/>,
  };

  const isSpeciesPage = state.page === "species";

  const mainStyle = {
    minHeight: "100vh",
    width: isSpeciesPage && !isMobile ? "calc(100% - 280px)" : "100%",
    marginLeft: isSpeciesPage && !isMobile ? "280px" : "0",
    transition: "margin-left .3s ease, width .3s ease",
  };

  return (
    <>
      <style>{CSS}</style>
      {isSpeciesPage && (!isMobile || state.sidebarOpen) && <Sidebar/>}
      {isSpeciesPage && state.sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay active"
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          style={{ cursor: "pointer" }}
        />
      )}
      {isSpeciesPage && isMobile && (
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          style={{
            position: "fixed", top: 20, right: 80, zIndex: 1000,
            background: "rgba(4,8,10,.9)", border: "1px solid var(--border)", color: "var(--text)",
            padding: ".5rem", borderRadius: 8, cursor: "pointer", fontSize: "1.2rem",
            backdropFilter: "blur(10px)",
          }}
        >
          📂
        </button>
      )}
      <div style={mainStyle}>
        {isMobile ? <MenuButton/> : <Navbar/>}
        {pages[state.page] || <HomePage/>}
        <Footer/>
        {state.selectedSpecies && <SpeciesModal/>}
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Provider>
        <AppContent/>
      </Provider>
    </>
  );
}