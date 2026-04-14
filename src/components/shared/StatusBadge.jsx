export default function StatusBadge({ s }) {
  const m = {
    'Least Concern': 't-green',
    'Vulnerable': 't-amber',
    'Endangered': 't-red',
    'Near Threatened': 't-blue',
  };
  return <span className={`tag ${m[s] || 't-blue'}`}>{s}</span>;
}
