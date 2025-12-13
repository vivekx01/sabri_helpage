import React, { useMemo, useState, useEffect } from "react";

// Simple in-memory + localStorage store
const REGISTRY = [
  { slug: "home", title: "Home" },
  { slug: "about", title: "About" },
  { slug: "sociofare", title: "SocioFare" },
  { slug: "causes", title: "Causes" },
  { slug: "news", title: "News" },
  { slug: "donate", title: "Donate" },
  { slug: "contact", title: "Contact" },
];

const presets = {
  Hero: () => ({ type: "Hero", title: "", subtitle: "", buttonLabel: "", buttonLink: "", backgroundImage: "", visible: true }),
  RichText: () => ({ type: "RichText", title: "", body: "", visible: true }),
  StatGrid: () => ({ type: "StatGrid", title: "", stats: [], visible: true }),
  CardGrid: () => ({ type: "CardGrid", title: "", cards: [], visible: true }),
  TestimonialList: () => ({ type: "TestimonialList", title: "", items: [], visible: true }),
  CTA: () => ({ type: "CTA", title: "", description: "", primaryLabel: "", primaryLink: "", visible: true }),
  MediaBlock: () => ({ type: "MediaBlock", title: "", caption: "", image: "", alignment: "center", visible: true })
};

const pageDefs = {
  home: {
    seo: { title: "Home", description: "Welcome" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "intro", preset: "RichText" },
      { key: "keyStats", preset: "StatGrid" },
      { key: "causesHighlight", preset: "CardGrid" },
      { key: "testimonials", preset: "TestimonialList" },
      { key: "donateCTA", preset: "CTA" },
    ]
  },
  about: {
    seo: { title: "About", description: "About us" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "overview", preset: "RichText" },
      { key: "timeline", preset: "RichText" },
    ]
  },
  sociofare: {
    seo: { title: "SocioFare", description: "Programs" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "programOverview", preset: "RichText" },
      { key: "coreAreas", preset: "CardGrid" },
    ]
  },
  causes: {
    seo: { title: "Causes", description: "Our causes" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "intro", preset: "RichText" },
      { key: "causes", preset: "CardGrid" },
    ]
  },
  news: {
    seo: { title: "News", description: "Updates" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "listing", preset: "CardGrid" },
    ]
  },
  donate: {
    seo: { title: "Donate", description: "Support" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "whyDonate", preset: "RichText" },
      { key: "donateCTA", preset: "CTA" },
    ]
  },
  contact: {
    seo: { title: "Contact", description: "Get in touch" },
    sections: [
      { key: "hero", preset: "Hero" },
      { key: "info", preset: "RichText" },
      { key: "whatsappCTA", preset: "CTA" },
    ]
  },
};

function loadPage(slug) {
  const raw = localStorage.getItem(`single_page_${slug}`);
  if (raw) {
    try { return JSON.parse(raw); } catch {}
  }
  const def = pageDefs[slug];
  const base = {
    slug,
    seo: { ...def.seo },
    sections: def.sections.map(s => ({ key: s.key, ...presets[s.preset]() }))
  };
  localStorage.setItem(`single_page_${slug}`, JSON.stringify(base));
  return base;
}

function savePage(slug, data) { localStorage.setItem(`single_page_${slug}`, JSON.stringify(data)); }

// Renderers
const SectionRenderer = ({ sec }) => {
  if (!sec.visible) return null;
  switch (sec.type) {
    case "Hero":
      return (
        <section style={{ padding: 24, textAlign: sec.align || "center", background: "#f5f7ff" }}>
          <h1>{sec.title}</h1>
          <p>{sec.subtitle}</p>
          {sec.buttonLabel && <a href={sec.buttonLink} style={{ display: "inline-block", marginTop: 8, padding: "8px 12px", background: "#1f6feb", color: "#fff", borderRadius: 6 }}>{sec.buttonLabel}</a>}
        </section>
      );
    case "RichText":
      return (
        <section style={{ padding: 24 }}>
          <h2>{sec.title}</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>{sec.body}</p>
        </section>
      );
    case "StatGrid":
      return (
        <section style={{ padding: 24 }}>
          <h2>{sec.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {(sec.stats||[]).map((st,i)=> (
              <div key={i} style={{ border:"1px solid #eee", borderRadius:8, padding:12 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{st.value}</div>
                <div style={{ color: "#666" }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    case "CardGrid":
      return (
        <section style={{ padding: 24 }}>
          <h2>{sec.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {(sec.cards||[]).map((c,i)=> (
              <div key={i} style={{ border:"1px solid #eee", borderRadius:8, padding:12 }}>
                <div style={{ fontWeight:700 }}>{c.title}</div>
                <div style={{ color: "#666" }}>{c.excerpt}</div>
              </div>
            ))}
          </div>
        </section>
      );
    case "TestimonialList":
      return (
        <section style={{ padding: 24 }}>
          <h2>{sec.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {(sec.items||[]).map((t,i)=> (
              <blockquote key={i} style={{ border:"1px solid #eee", borderRadius:8, padding:12 }}>
                “{t.quote}” — <strong>{t.authorName}</strong>
              </blockquote>
            ))}
          </div>
        </section>
      );
    case "CTA":
      return (
        <section style={{ padding: 24, background: "#fff7ed" }}>
          <h2>{sec.title}</h2>
          <p>{sec.description}</p>
          {sec.primaryLabel && <a href={sec.primaryLink} style={{ display: "inline-block", marginTop: 8, padding: "8px 12px", background: "#f97316", color: "#fff", borderRadius: 6 }}>{sec.primaryLabel}</a>}
        </section>
      );
    case "MediaBlock":
      return (
        <section style={{ padding: 24 }}>
          <h2>{sec.title}</h2>
          <p>{sec.caption}</p>
          {sec.image && <img src={sec.image} alt="" style={{ maxWidth: "100%", borderRadius: 8 }} />}
        </section>
      );
    default:
      return null;
  }
};

const PageView = ({ slug }) => {
  const [page, setPage] = useState(loadPage(slug));
  useEffect(()=>{ setPage(loadPage(slug)); }, [slug]);
  return (
    <div>
      <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <strong>{page.seo?.title || slug}</strong>
      </header>
      {page.sections.map((sec)=> (
        <SectionRenderer key={sec.key} sec={sec} />
      ))}
    </div>
  );
};

const Admin = ({ slug, onClose }) => {
  const [page, setPage] = useState(loadPage(slug));
  const [tab, setTab] = useState("sections");

  function setField(path, value) {
    setPage(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let obj = next;
      for (let i=0; i<parts.length-1; i++) obj = obj[parts[i]];
      obj[parts[parts.length-1]] = value;
      return next;
    });
  }

  function persist() { savePage(slug, page); alert("Saved"); }

  return (
    <div style={{ position:"fixed", inset:0, background:"#0006", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width: "90%", maxWidth: 1000, background: "#fff", borderRadius: 12, overflow:"hidden" }}>
        <div style={{ display:"flex", padding: 12, borderBottom:"1px solid #eee" }}>
          <strong style={{ flex:1 }}>Admin — {slug}</strong>
          <button onClick={persist} style={{ marginRight: 8 }}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
        <div style={{ display:"flex" }}>
          <aside style={{ width: 220, borderRight:"1px solid #eee", padding:12 }}>
            <div>
              <button onClick={()=>setTab("seo")} style={{ display:"block", width:"100%", padding:"6px 8px" }}>SEO</button>
              <button onClick={()=>setTab("sections")} style={{ display:"block", width:"100%", padding:"6px 8px" }}>Sections</button>
            </div>
          </aside>
          <main style={{ flex:1, padding:12 }}>
            {tab === "seo" && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <input value={page.seo?.title||""} onChange={(e)=>setField("seo.title", e.target.value)} placeholder="SEO Title" />
                <input value={page.seo?.description||""} onChange={(e)=>setField("seo.description", e.target.value)} placeholder="SEO Description" />
              </div>
            )}
            {tab === "sections" && (
              <div style={{ display:"grid", gap:12 }}>
                {page.sections.map((sec, idx)=> (
                  <div key={sec.key} style={{ border:"1px solid #eee", borderRadius:8, padding:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <strong style={{ flex:1 }}>{sec.key} ({sec.type})</strong>
                      <label style={{ fontSize:12 }}>
                        <input type="checkbox" checked={sec.visible} onChange={(e)=>{
                          const next = [...page.sections];
                          next[idx] = { ...next[idx], visible: e.target.checked };
                          setPage(p=>({ ...p, sections: next }));
                        }} /> Visible
                      </label>
                    </div>
                    {sec.type === "Hero" && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{
                          const next = [...page.sections]; next[idx] = { ...next[idx], title: e.target.value }; setPage(p=>({ ...p, sections: next }));
                        }} placeholder="Title" />
                        <input value={sec.subtitle} onChange={(e)=>{
                          const next = [...page.sections]; next[idx] = { ...next[idx], subtitle: e.target.value }; setPage(p=>({ ...p, sections: next }));
                        }} placeholder="Subtitle" />
                        <input value={sec.buttonLabel} onChange={(e)=>{
                          const next = [...page.sections]; next[idx] = { ...next[idx], buttonLabel: e.target.value }; setPage(p=>({ ...p, sections: next }));
                        }} placeholder="Button Label" />
                        <input value={sec.buttonLink} onChange={(e)=>{
                          const next = [...page.sections]; next[idx] = { ...next[idx], buttonLink: e.target.value }; setPage(p=>({ ...p, sections: next }));
                        }} placeholder="Button Link" />
                        <input value={sec.backgroundImage} onChange={(e)=>{
                          const next = [...page.sections]; next[idx] = { ...next[idx], backgroundImage: e.target.value }; setPage(p=>({ ...p, sections: next }));
                        }} placeholder="Background Image URL" />
                      </div>
                    )}
                    {sec.type === "RichText" && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], title:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Title" />
                        <textarea value={sec.body} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], body:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Body" rows={5} style={{ gridColumn:"1/-1" }} />
                      </div>
                    )}
                    {sec.type === "StatGrid" && (
                      <div style={{ marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], title:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Title" />
                        <div style={{ display:"grid", gap:8, marginTop:8 }}>
                          {(sec.stats||[]).map((st,sidx)=> (
                            <div key={sidx} style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:8 }}>
                              <input value={st.label} onChange={(e)=>{ const stats=[...sec.stats]; stats[sidx]={...stats[sidx], label:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], stats}; setPage(p=>({ ...p, sections:n })); }} placeholder="Label" />
                              <input value={st.value} onChange={(e)=>{ const stats=[...sec.stats]; stats[sidx]={...stats[sidx], value:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], stats}; setPage(p=>({ ...p, sections:n })); }} placeholder="Value" />
                              <button onClick={()=>{ const stats=(sec.stats||[]).filter((_,i)=>i!==sidx); const n=[...page.sections]; n[idx]={...n[idx], stats}; setPage(p=>({ ...p, sections:n })); }}>Remove</button>
                            </div>
                          ))}
                          <button onClick={()=>{ const stats=[...(sec.stats||[]), { label:"", value:"" }]; const n=[...page.sections]; n[idx]={...n[idx], stats}; setPage(p=>({ ...p, sections:n })); }}>Add Stat</button>
                        </div>
                      </div>
                    )}
                    {sec.type === "CardGrid" && (
                      <div style={{ marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], title:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Title" />
                        <div style={{ display:"grid", gap:8, marginTop:8 }}>
                          {(sec.cards||[]).map((c,cidx)=> (
                            <div key={cidx} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr auto", gap:8 }}>
                              <input value={c.title||""} onChange={(e)=>{ const cards=[...sec.cards]; cards[cidx]={...cards[cidx], title:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], cards}; setPage(p=>({ ...p, sections:n })); }} placeholder="Card Title" />
                              <input value={c.excerpt||""} onChange={(e)=>{ const cards=[...sec.cards]; cards[cidx]={...cards[cidx], excerpt:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], cards}; setPage(p=>({ ...p, sections:n })); }} placeholder="Excerpt" />
                              <input value={c.image||""} onChange={(e)=>{ const cards=[...sec.cards]; cards[cidx]={...cards[cidx], image:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], cards}; setPage(p=>({ ...p, sections:n })); }} placeholder="Image URL" />
                              <button onClick={()=>{ const cards=(sec.cards||[]).filter((_,i)=>i!==cidx); const n=[...page.sections]; n[idx]={...n[idx], cards}; setPage(p=>({ ...p, sections:n })); }}>Remove</button>
                            </div>
                          ))}
                          <button onClick={()=>{ const cards=[...(sec.cards||[]), { title:"", excerpt:"", image:"" }]; const n=[...page.sections]; n[idx]={...n[idx], cards}; setPage(p=>({ ...p, sections:n })); }}>Add Card</button>
                        </div>
                      </div>
                    )}
                    {sec.type === "TestimonialList" && (
                      <div style={{ marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], title:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Title" />
                        <div style={{ display:"grid", gap:8, marginTop:8 }}>
                          {(sec.items||[]).map((t,tidx)=> (
                            <div key={tidx} style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:8 }}>
                              <input value={t.quote||""} onChange={(e)=>{ const items=[...sec.items]; items[tidx]={...items[tidx], quote:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], items}; setPage(p=>({ ...p, sections:n })); }} placeholder="Quote" />
                              <input value={t.authorName||""} onChange={(e)=>{ const items=[...sec.items]; items[tidx]={...items[tidx], authorName:e.target.value}; const n=[...page.sections]; n[idx]={...n[idx], items}; setPage(p=>({ ...p, sections:n })); }} placeholder="Author" />
                              <button onClick={()=>{ const items=(sec.items||[]).filter((_,i)=>i!==tidx); const n=[...page.sections]; n[idx]={...n[idx], items}; setPage(p=>({ ...p, sections:n })); }}>Remove</button>
                            </div>
                          ))}
                          <button onClick={()=>{ const items=[...(sec.items||[]), { quote:"", authorName:"" }]; const n=[...page.sections]; n[idx]={...n[idx], items}; setPage(p=>({ ...p, sections:n })); }}>Add Testimonial</button>
                        </div>
                      </div>
                    )}
                    {sec.type === "CTA" && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], title:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Title" />
                        <input value={sec.description} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], description:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Description" />
                        <input value={sec.primaryLabel} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], primaryLabel:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Primary Label" />
                        <input value={sec.primaryLink} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], primaryLink:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Primary Link" />
                      </div>
                    )}
                    {sec.type === "MediaBlock" && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:8 }}>
                        <input value={sec.title} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], title:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Title" />
                        <input value={sec.caption} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], caption:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Caption" />
                        <input value={sec.image} onChange={(e)=>{ const n=[...page.sections]; n[idx]={...n[idx], image:e.target.value}; setPage(p=>({ ...p, sections:n })); }} placeholder="Image URL" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default function SingleFileApp() {
  const [route, setRoute] = useState("home");
  const [openAdmin, setOpenAdmin] = useState(false);

  const pagesMenu = useMemo(()=>REGISTRY, []);

  return (
    <div>
      <nav style={{ display:"flex", gap:8, padding:12, borderBottom:"1px solid #eee" }}>
        {pagesMenu.map(p => (
          <button key={p.slug} onClick={()=>setRoute(p.slug)} style={{ padding:"6px 10px" }}>{p.title}</button>
        ))}
        <button onClick={()=>setOpenAdmin(true)} style={{ marginLeft:"auto", padding:"6px 10px", background:"#1f6feb", color:"#fff", borderRadius:6 }}>Admin</button>
      </nav>
      <div>
        <PageView slug={route} />
      </div>
      {openAdmin && <Admin slug={route} onClose={()=>setOpenAdmin(false)} />}
    </div>
  );
}
