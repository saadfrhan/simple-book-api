import SAMPLES from './samples';

export default function Home() {
  return <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'monospace',
      flexDirection: 'column',
      marginInline: 'auto',
      width: '500px'
    }}
  >
    <h1
      style={{
        boxShadow: 'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;'
      }}
    >
      Books API!
    </h1>
    <div>
      <h2>Books</h2>
      <div>
        <h3>GET /api/books</h3>
        <h4>Example Response:</h4>
        <pre>
          {JSON.stringify(SAMPLES.GET_BOOKS, null, 2)}
        </pre>
      </div>
      <div>
        <h3>GET /api/book</h3>
        <h4>Example Response:</h4>
        <pre>
          {JSON.stringify(SAMPLES.GET_BOOK, null, 2)}
        </pre>
      </div>
    </div>
    <div>
      <h2>Orders</h2>
      <div>
        <h3>GET /api/orders</h3>
        <pre>Requires Authentication</pre>
        <p>Returns the user's submitted orders.</p>
        <h4>Example Response</h4>
        <pre>
          {JSON.stringify(SAMPLES.GET_ORDERS, null, 2)}
        </pre>
      </div>
    </div>
  </div>
}