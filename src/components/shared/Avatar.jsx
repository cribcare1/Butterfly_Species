export default function Avatar({ i, c, size = 52 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `${c}18`,
      border: `2px solid ${c}44`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: c,
      fontWeight: 600,
      fontSize: size * 0.32,
      fontFamily: 'var(--ff)',
      flexShrink: 0,
    }}>
      {i}
    </div>
  );
}
