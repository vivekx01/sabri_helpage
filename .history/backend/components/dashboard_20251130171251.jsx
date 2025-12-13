import React, { useEffect, useState } from 'react';
import { ApiClient, useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, Text, Illustration, IllustrationProps } from '@adminjs/design-system';

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
    // Fetch statistics from your API
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
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

  return (
    <Box>
      <Box mb="xl" mt="xl">
        <H2>Welcome to NGO Management System</H2>
        {currentAdmin && (
          <Text mt="default">
            Hello <strong>{currentAdmin.name}</strong> ({currentAdmin.title || currentAdmin.role})
          </Text>
        )}
      </Box>

      <Box
        flex
        flexDirection="row"
        flexWrap="wrap"
        style={{ gap: '20px', marginBottom: '30px' }}
      >
        <StatCard title="Total Users" value={stats.users} color="#4285f4" />
        <StatCard title="Blog Posts" value={stats.blogs} color="#38c172" />
        <StatCard title="Stories" value={stats.stories} color="#f39c12" />
        <StatCard title="Events" value={stats.events} color="#9b59b6" />
        <StatCard title="Videos" value={stats.videos} color="#e74c3c" />
        <StatCard title="Contact Messages" value={stats.contacts} color="#1abc9c" />
        <StatCard title="Volunteers" value={stats.volunteers} color="#3498db" />
        <StatCard title="Donors" value={stats.donors} color="#2ecc71" />
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="card"
        p="xxl"
      >
        <H5 mb="lg">Quick Actions</H5>
        <Text>
          Use the navigation menu on the left to manage your NGO content, users, and applications.
        </Text>
        <Box mt="xl">
          <ul style={{ lineHeight: '2', color: '#666' }}>
            <li>📝 <strong>Content:</strong> Manage blogs, stories, and events</li>
            <li>🎥 <strong>Media:</strong> Upload and organize videos</li>
            <li>👥 <strong>People:</strong> Manage teachers and team members</li>
            <li>📧 <strong>Communications:</strong> View contact messages</li>
            <li>💰 <strong>Fundraising:</strong> Track donors and donations</li>
            <li>🤝 <strong>Volunteers:</strong> Review volunteer applications</li>
            <li>💼 <strong>Opportunities:</strong> Manage internship applications</li>
            <li>⚙️ <strong>Settings:</strong> Configure site settings</li>
          </ul>
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
