<footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="grid grid-cols-5 gap-12 mb-16">
                <div className="col-span-1">
                    <h4 className="text-base font-semibold mb-6">Quick Links</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Search a Doctor</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Search a Clinic</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Insurance & Pricing</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">FAQs</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Contact</a></li>
                    </ul>
                </div>
                
                <div className="col-span-1">
                    <h4 className="text-base font-semibold mb-6 invisible">Links</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Survey</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Course</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Self Understanding</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Campus</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Workplace</a></li>
                    </ul>
                </div>
                
                <div className="col-span-1">
                    <h4 className="text-base font-semibold mb-6 invisible">More</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Disorder</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Therapy</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Psychoactive Drugs</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Franchise</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Jobs</a></li>
                    </ul>
                </div>
                
                <div className="col-span-1">
                    <h4 className="text-base font-semibold mb-6 invisible">Info</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Career</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Feedback</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Events</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Videos</a></li>
                    </ul>
                </div>
                
                <div className="col-span-1">
                    <h4 className="text-base font-semibold mb-6 invisible">Resources</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">About Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Terms</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Privacy</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 text-sm">Support</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-700 pt-12">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-3xl font-bold mb-6">ShareYrHeart</h3>
                        <p className="text-sm font-semibold text-gray-300 mb-6 uppercase tracking-wider">Mental Health At Any Age</p>
                        <div className="w-24 h-1 bg-yellow-400 mb-8"></div>
                        <h4 className="text-xl font-semibold mb-4">Subscribe to our newsletter!</h4>
                        <form className="flex max-w-md">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none border border-gray-700"
                            />
                            <button
                                type="submit"
                                className="p-3 rounded-r-lg transition duration-300"
                                style={{ backgroundColor: ACCENT_ORANGE }}
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </form>
                    </div>
                    
                    <div className="flex flex-col justify-end items-end">
                        <div className="flex space-x-4 mb-8">
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400 mb-2">© {new Date().getFullYear()} Preash H & H | All Rights Reserved</p>
                            <div className="flex space-x-4 text-sm">
                                <a href="#" className="text-gray-300 hover:text-white transition duration-300">About</a>
                                <a href="#" className="text-gray-300 hover:text-white transition duration-300">Terms</a>
                                <a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>