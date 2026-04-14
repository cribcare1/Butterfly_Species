

import { useEffect, } from 'react';
import React, { useState  } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SpeciesModal from "./components/modals/SpeciesModal";
import { Provider, useApp } from "./context/AppContext";
import SpeciesPage from './pages/SpeciesPage';
import HomePage from  './pages/HomePage';
// ─── Constants ────────────────────────────────────────────────────────────────
// const WIKI_URL = "https://meta.wikimedia.org/wiki/Wiki_Loves_Butterfly";

// const PER_PAGE = 4;
// const VISIBLE_PAGES = 3;

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
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--fb);overflow-x:hidden;font-size:15px}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:#1a3a22;border-radius:3px}
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
.inp{background:rgba(255,255,255,.04);border:1px solid var(--border);color:var(--text);padding:.52rem .95rem;border-radius:10px;font-family:var(--fb);font-size:.88rem;outline:none;transition:border-color .3s;width:100%}
.inp:focus{border-color:var(--green);background:var(--greenGlow)}
.inp::placeholder{color:var(--text3)}
.sel{background:rgba(255,255,255,.04);border:1px solid var(--border);color:var(--text);padding:.48rem .85rem;border-radius:10px;font-family:var(--fb);font-size:.83rem;outline:none;cursor:pointer;transition:border-color .3s}
.sel:focus{border-color:var(--green)}
.sel option{background:#081012}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(14px);animation:fadeIn .2s ease;overflow-y:auto}
.modal{background:linear-gradient(160deg,#0a1a0e,#070f09);border:1px solid var(--border2);border-radius:22px;padding:2.5rem;max-width:600px;width:100%;position:relative;animation:fadeUp .3s ease;max-height:92vh;overflow-y:auto}
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

// const StatusBadge = ({ s }) => {
//   const m = {"Least Concern":"t-green","Vulnerable":"t-amber","Endangered":"t-red","Near Threatened":"t-blue"};
//   return <span className={`tag ${m[s]||"t-blue"}`}>{s}</span>;
// };

const Avatar = ({ i, c, size=52 }) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:`${c}18`,border:`2px solid ${c}44`,display:"flex",alignItems:"center",justifyContent:"center",color:c,fontWeight:600,fontSize:size*.32,fontFamily:"var(--ff)",flexShrink:0}}>{i}</div>
);

const Dot = ({ c }) => (
  <span style={{width:8,height:8,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}} />
);

// ─── Global Search ────────────────────────────────────────────────────────────
// function GlobalSearch() {
//   const { state, dispatch } = useApp();
//   const [open, setOpen] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, []);

//   const results = state.categories.flatMap(c => c.species).filter(s => {
//     if (!state.search || state.search.length < 2) return false;
//     const q = state.search.toLowerCase();
//     return s.name.toLowerCase().includes(q) || s.scientific.toLowerCase().includes(q);
//   }).slice(0, 6);

//   return (
//     <div ref={ref} style={{position:"relative",minWidth:240,maxWidth:320,flex:1}}>
//       <div style={{position:"relative"}}>
//         <span style={{position:"absolute",left:".75rem",top:"50%",transform:"translateY(-50%)",opacity:.4,fontSize:".9rem"}}>🔍</span>
//         <input
//           className="inp"
//           placeholder="Search species…"
//           value={state.search}
//           style={{paddingLeft:"2.1rem",borderRadius:50}}
//           onChange={e => { dispatch({type:"SET_SEARCH",v:e.target.value}); setOpen(true); }}
//           onFocus={() => setOpen(true)}
//         />
//       </div>
//       {open && state.search.length >= 2 && (
//         <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,background:"#0d1f12",border:"1px solid var(--border2)",borderRadius:14,overflow:"hidden",zIndex:200,boxShadow:"0 20px 40px rgba(0,0,0,.5)",animation:"slideDown .15s ease"}}>
//           {results.length === 0 ? (
//             <div style={{padding:"1.2rem",textAlign:"center",color:"var(--text3)",fontSize:".85rem"}}>No results</div>
//           ) : results.map(s => (
//             <div
//               key={s.id}
//               onClick={() => { dispatch({type:"SEL_SPECIES",v:s}); setOpen(false); dispatch({type:"SET_SEARCH",v:""}); }}
//               style={{padding:".75rem 1.1rem",cursor:"pointer",display:"flex",alignItems:"center",gap:".75rem",borderBottom:"1px solid var(--border)",transition:"background .15s"}}
//               onMouseEnter={e => e.currentTarget.style.background = "var(--greenGlow)"}
//               onMouseLeave={e => e.currentTarget.style.background = "transparent"}
//             >
//               🦋
//               <div>
//                 <div style={{fontSize:".88rem",color:"var(--text)"}}>{s.name}</div>
//                 <div style={{fontSize:".75rem",color:"var(--text3)"}}>{s.scientific} · {s.region}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// ─── Home Page ────────────────────────────────────────────────────────────────
// function HomePage() {
//   const { state, dispatch } = useApp();
//   const { stats } = state;

//   const particles = Array.from({length:12}, () => ({
//     top: `${8 + Math.random() * 84}%`,
//     left: `${3 + Math.random() * 94}%`,
//     dur: 5 + Math.random() * 5,
//     dl: Math.random() * 4,
//     op: .04 + Math.random() * 0.09,
//     sz: `${.8 + Math.random() * 1.2}rem`,
//   }));

//   return (
//     <div>
//       {/* Hero */}
//       <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",position:"relative",overflow:"hidden",padding:"7rem 1.5rem 4rem"}}>
//         <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 60%,rgba(34,197,94,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
//         {particles.map((p, i) => (
//           <div key={i} style={{position:"absolute",top:p.top,left:p.left,fontSize:p.sz,opacity:p.op,animation:`floatBf ${p.dur}s ease-in-out ${p.dl}s infinite`,pointerEvents:"none"}}>🦋</div>
//         ))}
//         <div style={{position:"relative",maxWidth:780,margin:"0 auto"}} className="fu">
//           <div style={{display:"inline-flex",alignItems:"center",gap:".6rem",background:"rgba(82,201,123,.07)",border:"1px solid rgba(82,201,123,.2)",borderRadius:50,padding:".38rem 1.1rem",marginBottom:"2rem",fontSize:".75rem",color:"var(--green)",letterSpacing:".15em"}}>
//             ✦ India's Butterfly Conservation Platform ✦
//           </div>
//           <h1 style={{fontFamily:"var(--ff)",fontSize:"clamp(3rem,8vw,5.5rem)",lineHeight:1.02,marginBottom:"1.5rem",letterSpacing:"-.01em"}}>
//             <span className="shimmer">Wings of Wonder</span>
//           </h1>
//           <p style={{fontFamily:"var(--ff)",fontSize:"clamp(1rem,2.5vw,1.22rem)",color:"var(--text2)",maxWidth:580,margin:"0 auto 2.5rem",lineHeight:1.8,fontStyle:"italic"}}>
//             Carrying the untold stories of nature's hidden wonders from the wild heart of Northeast India.
//           </p>
//           <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
//             <button className="btn btn-p" onClick={() => dispatch({type:"SET_PAGE",p:"species"})}>🦋 Explore Species →</button>
//           </div>
//         </div>
//       </section>

//       {/* Marquee */}
//       <div style={{overflow:"hidden",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",background:"var(--bg3)",padding:".85rem 0"}}>
//         <div style={{display:"flex",animation:"marquee 30s linear infinite",gap:"2.5rem",width:"max-content"}}>
//           {[...Array(3)].flatMap(() => ["Monarch Swallowtail","Blue Morpho","Apollo","Glasswing","Crimson Rose","Malabar Banded Peacock","Painted Lady","Blue Tiger","Common Jezebel","Yellow Orange Tip"]).map((t, i) => (
//             <span key={i} style={{color:"var(--text3)",fontSize:".8rem",letterSpacing:".12em",whiteSpace:"nowrap",fontFamily:"var(--fb)"}}>🦋 {t}</span>
//           ))}
//         </div>
//       </div>

//       {/* ── Stats Section ──────────────────────────────────────────────────────
//           All 8 values currently come from FALLBACK_STATS in AppContext.js.
//           When your API is ready, map the response fields inside fetchStats()
//           in AppContext.js to these keys:
//             imagesUploaded  → json?.total_images
//             speciesTotal    → json?.species_count
//             pageViews       → json?.page_views
//             contributors    → json?.contributors
//             districts       → json?.districts
//             statesActive    → json?.states
//             papers          → json?.publications
//             qualityImages   → json?.quality_images
//       ─────────────────────────────────────────────────────────────────────── */}
//       {stats && (
//         <section style={{padding:"5rem 1.5rem",maxWidth:1100,margin:"0 auto"}}>
//           <div style={{marginBottom:"3rem",textAlign:"center"}}>
//             <h2 className="sec-h">Project <em>At a Glance</em></h2>
//           </div>
//           <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem"}}>
//             {[
//               /* 1 — Images Uploaded */
//               {
//                 v: stats.imagesUploaded != null
//                   ? `${stats.imagesUploaded.toLocaleString()}+`
//                   : "—",
//                 l: "Images Uploaded",
//                 i: "🖼️",
//                 c: "#52c97b",
//               },
//               /* 2 — Number of Species */
//               {
//                 v: stats.speciesTotal != null
//                   ? `${stats.speciesTotal.toLocaleString()}+`
//                   : "—",
//                 l: "Number of Species",
//                 i: "🦋",
//                 c: "#60a5fa",
//               },
//               /* 3 — Page Views */
//               {
//                 v: stats.pageViews != null
//                   ? `${(stats.pageViews / 1000).toFixed(0)}K+`
//                   : "—",
//                 l: "Page Views",
//                 i: "👁️",
//                 c: "#f472b6",
//               },
//               /* 4 — Contributors */
//               {
//                 v: stats.contributors != null
//                   ? `${stats.contributors.toLocaleString()}+`
//                   : "—",
//                 l: "Contributors",
//                 i: "🤝",
//                 c: "#f59e0b",
//               },
//               /* 5 — Number of Districts */
//               {
//                 v: stats.districts ?? "—",
//                 l: "Number of Districts",
//                 i: "📍",
//                 c: "#fb923c",
//               },
//               /* 6 — Number of States */
//               {
//                 v: stats.statesActive ?? "—",
//                 l: "Number of States",
//                 i: "🗺️",
//                 c: "#34d399",
//               },
//               /* 7 — No. of Publications */
//               {
//                 v: stats.papers ?? "—",
//                 l: "No. of Publications",
//                 i: "📄",
//                 c: "#a78bfa",
//               },
//               /* 8 — Quality Images */
//               {
//                 v: stats.qualityImages != null
//                   ? `${stats.qualityImages.toLocaleString()}+`
//                   : "—",
//                 l: "Quality Images",
//                 i: "⭐",
//                 c: "#f87171",
//               },
//             ].map(({ v, l, i, c }) => (
//               <div
//                 key={l}
//                 style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:16,padding:"1.4rem",textAlign:"center",transition:"all .28s",cursor:"default"}}
//                 onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.transform="translateY(-4px)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)";  e.currentTarget.style.transform="translateY(0)";    }}
//               >
//                 <div style={{fontSize:"1.6rem",marginBottom:".5rem"}}>{i}</div>
//                 <div style={{fontFamily:"var(--ff)",fontSize:"2rem",color:c,fontWeight:700,lineHeight:1}}>{v}</div>
//                 <div style={{fontSize:".75rem",color:"var(--text3)",marginTop:".4rem",letterSpacing:".04em"}}>{l}</div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Taxon category cards */}
//       <section style={{padding:"5rem 1.5rem",maxWidth:1200,margin:"0 auto"}}>
//         <div style={{marginBottom:"3rem",textAlign:"center"}}>
//           <div className="sec-eye">6 Butterfly Families</div>
//           <h2 className="sec-h">Taxon <em>Categories</em></h2>
//         </div>
//         <div className="g2">
//           {state.categories.map((cat, ci) => (
//             <div
//               key={cat.id}
//               className="card"
//               style={{padding:"1.5rem",cursor:"pointer",animationDelay:`${ci*.08}s`}}
//               onClick={() => { dispatch({type:"SEL_CAT",v:cat}); dispatch({type:"SET_PAGE",p:"species"}); }}
//             >
//               <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1rem"}}>
//                 <div style={{width:48,height:48,borderRadius:12,background:`${cat.color}12`,border:`1px solid ${cat.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",flexShrink:0}}>🦋</div>
//                 <div>
//                   <div style={{fontFamily:"var(--ff)",fontSize:"1.15rem",color:"var(--text)"}}>{cat.name}</div>
//                   <div style={{fontSize:".78rem",color:"var(--text3)"}}>{cat.count} species · {cat.common}</div>
//                 </div>
//               </div>
//               <p style={{fontSize:".85rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1rem"}}>{cat.description}</p>
//               <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"1rem"}}>
//                 {cat.subcategories.map(s => <span key={s} className="tag t-blue" style={{fontSize:".68rem"}}>{s}</span>)}
//               </div>
//               <div style={{display:"flex",justifyContent:"space-between",paddingTop:".75rem",borderTop:"1px solid var(--border)"}}>
//                 <button className="btn-sm">Explore →</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }



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

// ─── Team Page ────────────────────────────────────────────────────────────────
function TeamPage() {
  const { state, dispatch } = useApp();
  const [dept, setDept] = useState("all");
  const depts    = [...new Set(state.team.map(m => m.dept))];
  const filtered = dept === "all" ? state.team : state.team.filter(m => m.dept === dept);

  return (
    <div style={{padding:"7rem 1.5rem 4rem",maxWidth:1200,margin:"0 auto"}}>
      <div style={{marginBottom:"2.5rem"}}>
        <div className="sec-eye">The People Behind the Wings</div>
        <h1 className="sec-h">Our <em>Team</em></h1>
        <p className="sec-sub" style={{marginTop:".5rem"}}>Scientists, researchers, and passionate naturalists. Click any card for full profile.</p>
      </div>
      <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"2rem"}}>
        {["all", ...depts].map(d => (
          <button key={d} onClick={() => setDept(d)}
            style={{background:dept===d?"rgba(82,201,123,.14)":"transparent",border:`1px solid ${dept===d?"rgba(82,201,123,.48)":"var(--border)"}`,color:dept===d?"var(--green)":"var(--text2)",padding:".38rem 1.05rem",borderRadius:50,fontFamily:"var(--fb)",fontSize:".8rem",cursor:"pointer",transition:"all .2s"}}>
            {d === "all" ? "All Departments" : d}
          </button>
        ))}
      </div>
      {state.teamLoading ? (
        <div style={{textAlign:"center",padding:"4rem"}}><Loader/></div>
      ) : (
        <div className="g2">
          {filtered.map(m => (
            <div key={m.id} className="card fu" style={{padding:"1.5rem",cursor:"pointer"}} onClick={() => dispatch({type:"SEL_MEMBER",v:m})}>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.1rem"}}>
                <Avatar i={m.initials} c={m.color}/>
                <div>
                  <div style={{fontFamily:"var(--ff)",fontSize:"1.1rem",color:"var(--text)"}}>{m.name}</div>
                  <div style={{fontSize:".78rem",color:"var(--text2)",marginBottom:".35rem"}}>{m.role}</div>
                  <span className="tag t-green" style={{fontSize:".66rem"}}>{m.dept}</span>
                </div>
              </div>
              <p style={{fontSize:".83rem",color:"var(--text2)",lineHeight:1.65,marginBottom:"1rem"}}>{m.bio.substring(0, 128)}...</p>
              <div style={{display:"flex",gap:"1rem",paddingTop:".85rem",borderTop:"1px solid var(--border)",marginBottom:".75rem"}}>
                {[["📄",m.publications,"Papers"],["🗺️",m.fieldTrips,"Trips"],["🦋",m.species_described,"Species"]].map(([ic, v, l]) => (
                  <div key={l} style={{textAlign:"center",flex:1}}>
                    <div style={{fontSize:".75rem",color:"var(--text3)"}}>{ic}</div>
                    <div style={{fontFamily:"var(--ff)",fontSize:"1.15rem",color:"var(--green)"}}>{v}</div>
                    <div style={{fontSize:".68rem",color:"var(--text3)"}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:".35rem",flexWrap:"wrap"}}>
                  {Object.keys(m.social).map(p => (
                    <a key={p} href={m.social[p]} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      style={{padding:".26rem .6rem",borderRadius:50,background:"rgba(255,255,255,.04)",border:"1px solid var(--border)",color:"var(--text3)",textDecoration:"none",fontFamily:"var(--fb)",fontSize:".68rem",transition:"all .2s"}}
                      onMouseEnter={e => { e.currentTarget.style.color="var(--green)"; e.currentTarget.style.borderColor="var(--border2)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color="var(--text3)"; e.currentTarget.style.borderColor="var(--border)"; }}>
                      {p}
                    </a>
                  ))}
                </div>
                <button className="btn-sm">Full Profile →</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{marginTop:"3rem",textAlign:"center",background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:20,padding:"2.5rem"}}>
        <div style={{fontSize:"2rem",marginBottom:".75rem"}}>🦋</div>
        <h3 style={{fontFamily:"var(--ff)",fontSize:"1.6rem",marginBottom:".5rem"}}>Join Our Mission</h3>
        <p style={{color:"var(--text2)",fontFamily:"var(--ff)",fontSize:".95rem",marginBottom:"1.5rem",fontStyle:"italic"}}>Researchers, naturalists, photographers, and policy advocates — all welcome.</p>
        <div style={{display:"flex",gap:".75rem",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn btn-p">Apply as Researcher</button>
          <button className="btn btn-o">Volunteer</button>
        </div>
      </div>
      {state.selectedMember && <MemberModal/>}
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

// ─── Menu Button ─────────────────────────────────────────────────────────────
function MenuButton() {
  const { dispatch } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 1000,
          background: 'rgba(4,8,10,.9)', border: '1px solid var(--border)', color: 'var(--text)',
          padding: '.5rem', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem',
          backdropFilter: 'blur(10px)',
        }}
      >
        ☰
      </button>
      {open && (
        <div
          style={{
            position: 'fixed', top: 70, right: 20, zIndex: 1000,
            background: 'rgba(4,8,10,.95)', border: '1px solid var(--border)', borderRadius: 12,
            padding: '1rem', backdropFilter: 'blur(10px)', minWidth: 200,
          }}
        >
          {[
            { id: 'home', l: 'Home' },
            { id: 'species', l: 'Species' },
            { id: 'team', l: 'Team' },
            { id: 'about', l: 'About' },
          ].map(({ id, l }) => (
            <button
              key={id}
              onClick={() => { dispatch({ type: 'SET_PAGE', p: id }); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', color: 'var(--text)', padding: '.5rem',
                cursor: 'pointer', fontFamily: 'var(--fb)', fontSize: '.9rem',
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
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pages = {
    home:    <HomePage/>,
    species: <SpeciesPage/>,
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
          onClick={() => dispatch({type:"TOGGLE_SIDEBAR"})}
          style={{cursor:"pointer"}}
        />
      )}
      {isSpeciesPage && isMobile && (
        <button
          onClick={() => dispatch({type:"TOGGLE_SIDEBAR"})}
          style={{
            position: 'fixed', top: 20, right: 80, zIndex: 1000,
            background: 'rgba(4,8,10,.9)', border: '1px solid var(--border)', color: 'var(--text)',
            padding: '.5rem', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem',
            backdropFilter: 'blur(10px)',
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