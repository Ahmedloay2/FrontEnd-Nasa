import { memo } from 'react'

const EBook = memo(() => {
  return (
    <main 
      className="ebook-page"
      style={{
        minHeight: 'calc(100vh - 8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div 
        className="ebook-content"
        style={{
          textAlign: 'center',
          maxWidth: '600px'
        }}
      >
        <i 
          className="fas fa-book" 
          aria-hidden="true"
          style={{
            fontSize: '4rem',
            color: '#3b82f6',
            marginBottom: '2rem'
          }}
        ></i>
        <h1 
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#e2e8f0',
            margin: '0 0 1rem 0'
          }}
        >
          E-Book
        </h1>
        <p 
          style={{
            fontSize: '1.125rem',
            color: '#94a3b8',
            marginBottom: '2rem'
          }}
        >
          Interactive space exploration e-books coming soon. Learn about astronaut missions, 
          space technology, and the International Space Station through immersive digital content.
        </p>
        <div 
          className="coming-soon-badge"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#1e293b',
            border: '1px solid #3b82f6',
            borderRadius: '0.5rem',
            color: '#3b82f6',
            fontWeight: '600'
          }}
        >
          Coming Soon
        </div>
      </div>
    </main>
  )
})

EBook.displayName = 'EBook'

export default EBook