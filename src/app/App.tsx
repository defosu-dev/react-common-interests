import React, { Suspense } from 'react'

const MapView = React.lazy(() =>
  import('../widgets/map/MapView').then(module => ({ default: module.MapView }))
)

const InterestFilter = React.lazy(() =>
  import('../features/interest-filter/InterestFilter').then(module => ({
    default: module.InterestFilter,
  }))
)

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 overflow-x-hidden bg-neutral-900 p-4 text-neutral-100">
      <header className="sticky top-0 z-10 container w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-800/80 px-6 py-3 shadow-lg shadow-neutral-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-center text-xl font-bold tracking-widest text-neutral-50 uppercase">
          Common Interests
        </div>
      </header>
      <main className="container flex w-full flex-1 flex-col gap-6">
        <Suspense
          fallback={
            <div className="pulse h-12.5 w-full max-w-md rounded-xl bg-neutral-800" />
          }
        >
          <InterestFilter />
        </Suspense>
        <div className="h-160 w-full overflow-hidden rounded-xl bg-neutral-800 shadow-inner">
          <Suspense fallback={<div className="pulse h-full w-full bg-neutral-800" />}>
            <MapView />
          </Suspense>
        </div>
      </main>
      <footer className="container mt-auto w-full max-w-md rounded-xl border border-neutral-700 bg-neutral-800/80 px-6 py-3 shadow-lg shadow-neutral-900/50 backdrop-blur-sm">
        <div className="text-center text-sm text-neutral-400">
          © 2026 Common Interests. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
