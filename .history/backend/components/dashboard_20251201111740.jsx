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
        const response = await fetch(`${window.location.origin}/api/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Stats fetch failed:', response.statusText);
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

const StatCard = ({ title, value, color, icon }) => (
  <Box
    flex
    flexDirection="column"
    bg="white"
    borderRadius="lg"
    boxShadow="card"
    p="xl"
    style={{
      minWidth: '180px',
      flex: '1',
      borderLeft: `5px solid ${color}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }}
  >
    <Text fontSize="sm" color="grey60" mb="sm" style={{ fontWeight: '500' }}>
      {title}
    </Text>
    <Box flex alignItems="center" style={{ gap: '12px' }}>
      <H2 style={{ margin: 0, color: color, fontSize: '36px' }}>
        {value}
      </H2>
      <Text style={{ fontSize: '28px' }}>{icon}</Text>
    </Box>
  </Box>
);

const RoleCard = ({ title, color, icon, permissions }) => (
  <Box
    bg="white"
    borderRadius="lg"
    p="lg"
    style={{
      border: `2px solid ${color}`,
      backgroundColor: `${color}10`,
    }}
  >
    <Box flex alignItems="center" mb="sm" style={{ gap: '8px' }}>
      <Text style={{ fontSize: '24px' }}>{icon}</Text>
      <Text style={{ fontWeight: 'bold', color: color, fontSize: '16px' }}>{title}</Text>
    </Box>
    <Box as="ul" style={{ margin: 0, paddingLeft: '20px', color: '#555', fontSize: '13px' }}>
      {permissions.map((perm, idx) => (
        <li key={idx} style={{ marginBottom: '4px' }}>{perm}</li>
      ))}
    </Box>
  </Box>
);

const ActionItem = ({ icon, title, desc }) => (
  <Box
    p="md"
    borderRadius="md"
    style={{
      border: '1px solid #E0E0E0',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#FFF8F0';
      e.currentTarget.style.borderColor = '#FF7A42';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.style.borderColor = '#E0E0E0';
    }}
  >
    <Box flex alignItems="center" mb="xs" style={{ gap: '8px' }}>
      <Text style={{ fontSize: '20px' }}>{icon}</Text>
      <Text style={{ fontWeight: 'bold', fontSize: '14px', color: '#2C3E50' }}>{title}</Text>
    </Box>
    <Text style={{ fontSize: '12px', color: '#7F8C8D' }}>{desc}</Text>
  </Box>
);

export default Dashboard;
