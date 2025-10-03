const EBook = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 8rem)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <i className="fas fa-book" style={{
          fontSize: '4rem',
          color: '#3b82f6',
          marginBottom: '2rem'
        }}></i>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#e2e8f0',
          margin: '0 0 1rem 0'
        }}>
          E-Book
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#94a3b8',
          marginBottom: '2rem'
        }}>
          Coming Soon
        </p>
      </div>
    </div>
  );
};

export default EBook;