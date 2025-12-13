import React, { useState } from 'react';
import { LayoutDashboard, FileEdit, Settings, Menu, X, ChevronRight } from 'lucide-react';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: LayoutDashboard,
      component: 'Component2',
      description: 'Overview and analytics',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'sections',
      title: 'Sections Editor',
      icon: FileEdit,
      component: 'Component0',
      description: 'Edit and manage content sections',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'manage',
      title: 'Manage Page',
      icon: Settings,
      component: 'Component1',
      description: 'Page configuration and settings',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const activeItem = sections.find(s => s.id === activeSection);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col border-r border-gray-200`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AdminJS
              </h1>
              <p className="text-sm text-gray-500 mt-1">Control Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r ' + section.color + ' text-white shadow-lg shadow-blue-500/30'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Icon size={22} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                {sidebarOpen && (
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{section.title}</div>
                    {!isActive && (
                      <div className="text-xs opacity-60 mt-0.5">
                        {section.description}
                      </div>
                    )}
                  </div>
                )}
                {sidebarOpen && isActive && (
                  <ChevronRight size={18} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {sidebarOpen ? (
            <div className="text-xs text-gray-500 text-center">
              AdminJS v4.0
            </div>
          ) : (
            <div className="h-2 w-2 bg-green-500 rounded-full mx-auto"></div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{activeItem?.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{activeItem?.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                {activeItem?.component}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Component Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.id}
                    className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-300 cursor-pointer ${
                      activeSection === section.id
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {section.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs font-mono text-gray-500">
                        {section.component}
                      </span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Component Display */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                {React.createElement(activeItem?.icon, { 
                  size: 24, 
                  className: `text-${activeItem?.color.split('-')[1]}-600` 
                })}
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Active Component: {activeItem?.component}
                  </h3>
                  <p className="text-sm text-gray-500">
                    This area will render your {activeItem?.title} component
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${activeItem?.color} flex items-center justify-center mb-4 shadow-xl`}>
                  {React.createElement(activeItem?.icon, { size: 40, className: 'text-white' })}
                </div>
                <p className="text-gray-600 font-medium mb-2">
                  {activeItem?.component} Component Area
                </p>
                <p className="text-sm text-gray-500">
                  Your custom component will be rendered here
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
