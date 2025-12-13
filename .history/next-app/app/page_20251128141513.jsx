export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-6">Sabri Helpage — Next.js Migration (Proof of Concept)</h1>
      <p className="mb-6">This is a minimal Next.js scaffold placed in <code>next-app/</code>. Next steps: copy your React components from the Vite app into this project and wire routes.</p>
      <div className="space-x-4">
        <a href="/contact" className="text-orange-500 font-semibold">Contact Page</a>
      </div>
    </main>
  )
}
