'use client'
 
// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function Header() {
  return (
    <header>
        <h1 className="text-3xl text-center mx-5 my-10 font-bold tracking-tighter text-gray-900 sm:text-5xl">JSON Visualizer</h1>
    </header>
  )
}