import { useState } from 'react';

export default function MediaPage() {

  const MEDIA_ITEMS = [
    {
      id: 1,
      date: "2024-03-15",
      title: "WLB India in the News",
      links: [
        { label: "Anandabazar Patrika — Nilpuja fasting article", url: "https://web.archive.org/web/20260411064234/https://www.anandabazar.com/horoscope/why-bengali-mother-do-fasting-in-the-auspicious-day-of-nilpuja-dgtl/cid/1679760" },
        { label: "Times of India — Butterfly corridor", url: "https://timesofindia.indiatimes.com" },
        { label: "The Hindu — Conservation report", url: "https://thehindu.com" },
      ],
    },
    {
      id: 2,
      date: "2024-01-10",
      title: "Papilionidae of Northeast India",
      url: "https://example.com/paper",
    },
    {
      id: 3,
      date: "2023-11-05",
      title: "Citizen Science & Butterfly Mapping",
      links: [
        { label: "Full paper — Current Science (2023)", url: "https://currentscience.ac.in" },
        { label: "Supplementary data & methodology", url: "https://currentscience.ac.in" },
        { label: "Press release — DST India", url: "https://dst.gov.in" },
      ],
    },
    {
      id: 4,
      date: "2024-02-20",
      title: "Winter Survey — Western Ghats 2024",
      url: "https://wlbindia.org/reports/ghats-2024",
    },
    {
      id: 5,
      date: "2023-09-01",
      title: "UN Young Champion Feature — Ravi Sundar",
      links: [
        { label: "UN Environment Programme — official profile", url: "https://unep.org" },
        { label: "Scroll.in — interview with Ravi Sundar", url: "https://scroll.in" },
        { label: "Mongabay India — conservation spotlight", url: "https://india.mongabay.com" },
        { label: "Deccan Herald — full feature story", url: "https://deccanherald.com" },
      ],
    },
    {
      id: 6,
      date: "2023-07-14",
      title: "Monsoon Migration Tracking — 2023",
      url: "https://wlbindia.org/reports/monsoon-2023",
    },
  ];

  const [activeUrl, setActiveUrl]     = useState(null);
  const [activeTitle, setActiveTitle] = useState("");

  const openUrl = (url, title) => { setActiveUrl(url); setActiveTitle(title); };

  const totalLinks = MEDIA_ITEMS.reduce((acc, item) =>
    acc + (item.links?.length || (item.url ? 1 : 0)), 0
  );

  return (
    <div style={{ padding: "7rem 1.5rem 4rem", maxWidth: 900, margin: "0 auto" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div className="sec-eye">Press · Research · Field Reports</div>
        <h1 className="sec-h">Media &amp; <em>Publications</em></h1>
        <p className="sec-sub" style={{ marginTop: ".5rem" }}>
          Coverage, research papers, and field reports from our work.
        </p>
      </div>

      {/* ── All Links card — full width ── */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>

        {/* Card header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--ff)", fontSize: "1rem", color: "var(--text)", marginBottom: ".2rem" }}>
            All Links
          </div>
          <div style={{ fontSize: ".72rem", color: "var(--text3)" }}>
            {totalLinks} articles &amp; reports
          </div>
        </div>

        {/* Groups */}
        <div>
          {MEDIA_ITEMS.map((item) => {
            const links = item.links?.length
              ? item.links
              : item.url ? [{ label: item.title, url: item.url }] : [];
            if (!links.length) return null;
            return (
              <div key={item.id}>
                {/* Group label */}
                <div style={{
                  padding: ".4rem 1.25rem",
                  fontSize: ".68rem",
                  color: "var(--text3)",
                  background: "var(--bg3)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: ".5rem",
                }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.title}
                  </span>
                  <span style={{ flexShrink: 0 }}>{item.date}</span>
                </div>

                {/* Links */}
                {links.map((link, li) => (
                  <div
                    key={li}
                    onClick={() => openUrl(link.url, link.label)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: ".75rem",
                      padding: ".6rem 1.25rem",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--border)",
                      transition: "background .15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", minWidth: 0 }}>
                      <span style={{ fontSize: "12px", flexShrink: 0 }}>🔗</span>
                      <span style={{
                        fontSize: ".79rem",
                        color: "var(--text2)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {link.label}
                      </span>
                    </div>
                    <span style={{ fontSize: ".7rem", color: "var(--green)", flexShrink: 0 }}>Open →</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Full-page iframe overlay ── */}
      {activeUrl && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "var(--modal-overlay)",
            backdropFilter: "blur(6px)",
            display: "flex", flexDirection: "column",
            animation: "fadeIn .2s ease",
          }}
        >
          {/* Top bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: ".75rem",
            padding: ".65rem 1rem",
            background: "var(--bg2)", borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}>
            <button
              className="btn btn-o"
              style={{ fontSize: ".78rem", padding: ".35rem .9rem", flexShrink: 0 }}
              onClick={() => { setActiveUrl(null); setActiveTitle(""); }}
            >
              ← Back
            </button>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: ".88rem", color: "var(--text)", fontFamily: "var(--ff)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {activeTitle}
              </div>
              <div style={{ fontSize: ".7rem", color: "var(--text3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {activeUrl}
              </div>
            </div>
           <a 
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-p"
              style={{ fontSize: ".78rem", padding: ".35rem .9rem", flexShrink: 0, textDecoration: "none" }}
            >
              Open in new tab ↗
            </a>
          </div>

          {/* iframe */}
          <iframe
            src={activeUrl}
            title={activeTitle || "Article viewer"}
            style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
}