
  import React from 'react';

  const DonatePage = () => (
    <div className="min-h-screen font-sans antialiased bg-white flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl w-full bg-[#f9e6e4] rounded-2xl shadow-xl p-10 border border-[#f9e6e4]">
        <h1 className="text-4xl font-extrabold text-center mb-4" style={{ color: '#b13c30' }}>Donate to Sabri Helpage</h1>
        <p className="text-lg text-center mb-8 text-gray-700">Your support fuels our mission to help the elderly and vulnerable. Every contribution makes a difference!</p>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Amount (INR)</label>
            <input type="number" min="100" placeholder="Enter amount" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b13c30] focus:border-[#b13c30]" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input type="text" placeholder="Your Name" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b13c30] focus:border-[#b13c30]" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" placeholder="Your Email" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b13c30] focus:border-[#b13c30]" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl font-bold text-white" style={{ backgroundColor: '#b13c30' }}>
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );

  export default DonatePage;
                