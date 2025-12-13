export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us (Next)</h2>
      <p className="mb-6">This is a placeholder contact page. I can copy your full `ContactPage.jsx` from the Vite app into this project next.</p>
      <form className="space-y-4">
        <input className="w-full p-3 border rounded" placeholder="Name" />
        <input className="w-full p-3 border rounded" placeholder="Email" />
        <textarea className="w-full p-3 border rounded" rows={5} placeholder="Message"></textarea>
        <button className="px-6 py-3 bg-orange-500 text-white rounded">Send Message</button>
      </form>
    </main>
  )
}
