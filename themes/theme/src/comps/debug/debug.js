export default function Debug({ php, react}) {
  return (
    <div style={{
      background: 'deepskyblue',
      position: 'fixed',
      top: '10px',
      left: '10px',
      zIndex: 100,
      padding: '0.5rem',
      color: 'white'
    }}>
      (React) {react}  
    </div>
  );
}