const Forbidden = () => {
  return (
    <main>
      <div class="wrap">
        <h2>Forbidden</h2>
        <p>You are not authorized to access this page.</p>
        <a className="button button-secondary" href="/">
          Return to List
        </a>
      </div>
    </main>
  )
}

export default Forbidden;