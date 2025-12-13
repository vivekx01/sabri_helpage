# NGO Admin Panel Guide

## 🚀 Quick Start

Your admin panel is now running at: **http://localhost:5000/admin**

## 📋 Features

### ✅ Simple, Clean Interface
- **No custom categories** - Just your backend models displayed as-is
- **Flat structure** - All resources (Users, Blogs, Stories, Events, etc.) in one simple list
- **Easy navigation** - Click any resource to view, edit, or delete

### ✅ Login & Signup
- **Login**: Existing admins can log in with email/password
- **Sign Up**: New users can create accounts (default role: editor)
- **Session-based**: Stay logged in for 24 hours

### ✅ Resource Management
All 15 backend models are available:
- Users
- Blogs
- Stories
- Events
- Videos
- Awards
- Publications
- FAQs
- Teachers
- Contacts
- Donors
- Volunteers
- Internships
- Club Registrations
- Site Config

### ✅ Easy Content Management
For each resource you can:
- **View all records** in a table
- **Search & filter** data
- **Create new** entries with forms
- **Edit existing** records inline
- **Delete** records with confirmation
- **Upload files** for image/video fields
- **Rich text editing** for content fields

## 🔐 User Roles

1. **Editor** - Can create and edit content (blogs, stories, events)
2. **Manager** - Can delete content, manage volunteers/donors
3. **Admin** - Full access except user management
4. **Super Admin** - Complete access including user management

## 📝 How to Use

### First Time Setup:
1. Go to http://localhost:5000/admin
2. Click **"Sign Up"** tab
3. Enter your name, email, and password
4. You'll be logged in automatically as an **Editor**

### Editing Content:
1. Click on any resource (e.g., "Blogs")
2. See all existing entries in a table
3. Click **"Create new"** to add content
4. Click on any row to view/edit
5. Use the **Delete** button to remove

### Uploading Images/Videos:
- In edit forms, you'll see file upload buttons
- Click to select files from your computer
- Images preview automatically
- Videos show embed players

### Managing Settings:
- Click **"Site Config"** for global settings
- Edit site name, contact info, social links
- Changes save immediately

## 🎨 Interface Tips

- **Search bar**: Type to filter records instantly
- **Pagination**: Navigate large datasets easily
- **Sort columns**: Click column headers to sort
- **Filters**: Use sidebar filters for advanced searches
- **Bulk actions**: Select multiple records for batch operations

## 🔒 Security

- All passwords are hashed with bcrypt
- Sessions expire after 24 hours
- CSRF protection enabled
- Role-based access control on all actions

## 📱 Mobile Friendly

The admin panel works on:
- Desktop browsers
- Tablets
- Mobile phones (responsive design)

## 🆘 Troubleshooting

**Can't log in?**
- Check your email/password
- Make sure your user role is editor/manager/admin/super-admin

**Can't see a resource?**
- Check your user role permissions
- Some resources require manager+ access

**Upload not working?**
- Check file size limits
- Ensure proper image/video formats

**Session expired?**
- Just log in again (24-hour limit)

## 🎯 Default Credentials

**Super Admin:**
- Email: superadmin@helpage.org
- Password: admin123

**Regular Admin:**
- Email: admin@helpage.org
- Password: admin123

*(Change these immediately in production!)*

## 📞 Support

For issues or questions:
1. Check console logs in browser (F12)
2. Check server terminal for errors
3. Verify MongoDB is running
4. Restart server if needed

---

**Enjoy managing your NGO content! 🎉**
