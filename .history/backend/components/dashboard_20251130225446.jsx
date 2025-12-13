import React, { useEffect, useState } from 'react';
import { ApiClient, useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, H3, Text, Badge } from '@adminjs/design-system';

const api = new ApiClient();

const Dashboard = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [stats, setStats] = useState({
    users: 0,
    blogs: 0,
    stories: 0,
    events: 0,
    videos: 0,
    contacts: 0,
    volunteers: 0,
    donors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  const getRoleBadge = (role) => {
    const roleConfig = {
      'super-admin': { label: '🔐 Super Admin', color: '#E74C3C' },
      'admin': { label: '👨‍💼 Admin', color: '#9B59B6' },
      'manager': { label: '📊 Manager', color: '#3498DB' },
      'editor': { label: '✍️ Editor', color: '#2ECC71' },
    };
    return roleConfig[role] || { label: role, color: '#95A5A6' };
  };

  const roleBadge = currentAdmin ? getRoleBadge(currentAdmin.role) : null;

  return (
    <Box>
      {/* Header Section */}
      <Box 
        mb="xxl" 
        mt="xl" 
        p="xxl"
        bg="white"
        borderRadius="lg"
        boxShadow="card"
        style={{
          background: 'linear-gradient(135deg, #FF7A42 0%, #FF8F5C 100%)',
          color: 'white'
        }}
      >
        <H2 style={{ color: 'white', marginBottom: '10px' }}>
          🏢 Sabri Helpage Admin Panel
        </H2>
        {currentAdmin && (
          <Box>
            <Text style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>
              Welcome back, <strong>{currentAdmin.name}</strong>
            </Text>
            {roleBadge && (
              <Badge 
                style={{ 
                  backgroundColor: 'white', 
                  color: roleBadge.color,
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  borderRadius: '20px'
                }}
              >
                {roleBadge.label}
              </Badge>
            )}
          </Box>
        )}
      </Box>

      {/* Statistics Grid */}
      <Box mb="xxl">
        <H3 mb="lg" style={{ color: '#2C3E50' }}>📊 Platform Overview</H3>
        <Box
          flex
          flexDirection="row"
          flexWrap="wrap"
          style={{ gap: '20px' }}
        >
          <StatCard title="👥 Users" value={stats.users} color="#4A90E2" icon="👥" />
          <StatCard title="📝 Blogs" value={stats.blogs} color="#2ECC71" icon="📝" />
          <StatCard title="📖 Stories" value={stats.stories} color="#F39C12" icon="📖" />
          <StatCard title="📅 Events" value={stats.events} color="#9B59B6" icon="📅" />
          <StatCard title="🎥 Videos" value={stats.videos} color="#E74C3C" icon="🎥" />
          <StatCard title="📞 Contacts" value={stats.contacts} color="#1ABC9C" icon="📞" />
          <StatCard title="🤝 Volunteers" value={stats.volunteers} color="#3498DB" icon="🤝" />
          <StatCard title="💰 Donors" value={stats.donors} color="#E67E22" icon="💰" />
        </Box>
      </Box>

      {/* Role-Based Access Info */}
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="card"
        p="xxl"
        mb="lg"
      >
        <H5 mb="lg" style={{ color: '#2C3E50' }}>🔐 Role-Based Access Control</H5>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <RoleCard 
            title="Super Admin" 
            color="#E74C3C"
            icon="🔐"
            permissions={['Full System Access', 'User Management', 'All Delete Actions']}
          />
          <RoleCard 
            title="Admin" 
            color="#9B59B6"
            icon="👨‍💼"
            permissions={['Content Management', 'User Editing', 'Site Configuration']}
          />
          <RoleCard 
            title="Manager" 
            color="#3498DB"
            icon="📊"
            permissions={['Registrations', 'Donor Data', 'Team Management']}
          />
          <RoleCard 
            title="Editor" 
            color="#2ECC71"
            icon="✍️"
            permissions={['Blogs & Stories', 'Events & Videos', 'View Only Access']}
          />
        </Box>
      </Box>

      {/* Quick Actions */}
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="card"
        p="xxl"
      >
        <H5 mb="lg" style={{ color: '#2C3E50' }}>⚡ Quick Navigation</H5>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <ActionItem icon="💰" title="Donor Management" desc="Track donations & donors" />
          <ActionItem icon="📝" title="Registrations" desc="Clubs, Volunteers, Internships" />
          <ActionItem icon="📅" title="Events & Media" desc="Manage events & videos" />
          <ActionItem icon="✍️" title="Content" desc="Blogs & success stories" />
          <ActionItem icon="🏆" title="Recognition" desc="Awards & publications" />
          <ActionItem icon="📞" title="Communications" desc="Contact inquiries" />
          <ActionItem icon="⚙️" title="Site Settings" desc="Logo & hero images" />
          <ActionItem icon="❓" title="Help & Support" desc="FAQs management" />
        </Box>
      </Box>
    </Box>
  );
};

const StatCard = ({ title, value, color }) => (
  <Box
    flex
    flexDirection="column"
    bg="white"
    borderRadius="lg"
    boxShadow="card"
    p="xl"
    style={{
      minWidth: '200px',
      flex: '1',
      borderTop: `4px solid ${color}`,
    }}
  >
    <Text fontSize="sm" color="grey60" mb="sm">
      {title}
    </Text>
    <H2 color={color} style={{ margin: 0 }}>
      {value}
    </H2>
  </Box>
);

export default Dashboard;
