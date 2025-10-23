'use client'

import { useEffect } from 'react'

function ErrorPage({error}: {error: Error & { digest?: string }}) {

  useEffect(() => {
    globalThis?.console?.error(error); // Logger usage
  }, [error])

  return (
    <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#C8FFF4', background: 'linear-gradient(#111, #111, #333, #fff)'}}>
      <h1 style={{fontSize: '8em'}}>500</h1>
      <br />
      <h3>Server Error</h3>
      <br />
      <h2>It&apos;s not you, it&apos;s me.</h2>
      <br />
      <button onClick={() => globalThis?.window?.history.back()}>Back</button>
      <br />
      <br />
      <br />
      <div style={{color: "black"}}>
        Contact the author on
        {' '}
        <a href="https://github.com/devorld" target="_blank" rel="noreferrer">
          https://github.com/devorld
        </a>
      </div>

    </main>
  )
}

export default ErrorPage;
