# Sabri Helpage Admin Panel API Documentation

## 🔐 Authentication

All protected routes require JWT authentication token in header:
```
Authorization: Bearer <your_jwt_token>
```

## 🎭 Role-Based Access Control

### Roles Hierarchy:
1. **Super Admin** - Full system access
2. **Admin** - Full content access, user management
3. **Manager** - Registrations, donors, content management
4. **Editor** - Content creation/editing only (no delete/approve)

---

## 📋 Universal Endpoints Pattern

All resources follow this pattern:

### Base CRUD Operations

#### Get All Resources
```
GET /api/{resource}?page=1&limit=20&status=pending&search=keyword&sort=-createdAt
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status
- `search` (string): Search in text fields
- `sort` (string): Sort field (prefix with `-` for descending)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Get Single Resource
```
GET /api/{resource}/:id
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

#### Create Resource
```
POST /api/{resource}
Content-Type: application/json

{
  "field1": "value1",
  "field2": "value2"
}
```

#### Update Resource
```
PUT /api/{resource}/:id
Content-Type: application/json

{
  "field1": "updated value"
}
```

#### Delete Resource
```
DELETE /api/{resource}/:id
```
**Required Role:** Admin, Manager, or Super Admin

---

### Approval Workflow Endpoints

#### Approve Resource
```
PATCH /api/{resource}/:id/approve
Content-Type: application/json

{
  "reviewNotes": "Looks good!"
}
```
**Required Role:** Admin, Manager, or Super Admin

#### Reject Resource
```
PATCH /api/{resource}/:id/reject
Content-Type: application/json

{
  "reviewNotes": "Needs revision"
}
```
**Required Role:** Admin, Manager, or Super Admin

#### Archive Resource
```
PATCH /api/{resource}/:id/archive
```
**Required Role:** Admin, Manager, or Super Admin

#### Unarchive Resource
```
PATCH /api/{resource}/:id/unarchive
```
**Required Role:** Admin, Manager, or Super Admin

---

### Bulk Operations

#### Bulk Approve
```
POST /api/{resource}/bulk/approve
Content-Type: application/json

{
  "ids": ["id1", "id2", "id3"]
}
```
**Required Role:** Admin or Super Admin

#### Bulk Archive
```
POST /api/{resource}/bulk/archive
Content-Type: application/json

{
  "ids": ["id1", "id2", "id3"]
}
```
**Required Role:** Admin or Super Admin

#### Bulk Delete
```
POST /api/{resource}/bulk/delete
Content-Type: application/json

{
  "ids": ["id1", "id2", "id3"]
}
```
**Required Role:** Admin or Super Admin

---

### Statistics
```
GET /api/{resource}/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "byStatus": {
      "pending": 45,
      "approved": 80,
      "rejected": 15,
      "archived": 10
    }
  }
}
```

---

## 📝 Specific Resources

### 1. CSR Submissions (`/api/csr`)

**Public Submission Endpoint:**
```
POST /api/csr/submit
Content-Type: multipart/form-data

organizationName: "Company Name"
contactPerson: "John Doe"
email: "john@example.com"
phone: "+91 9876543210"
proposalTitle: "Education Initiative"
proposalDescription: "Details..."
budget: 500000
duration: "6 months"
focusArea: "Education"
proposalDocument: [file upload]
```

**Status Flow:** `pending` → `under-review` → `approved` / `rejected` → `archived`

### 2. Donor Management (`/api/donors`)

**Fields:**
- name (required)
- email (required)
- phone (required)
- amount (required, number)
- address (optional)
- status: `pending` | `approved` | `archived`

**Access:** Manager, Admin, Super Admin

### 3. Registrations

#### Clubs (`/api/clubs`)
**Fields:**
- name, phone, college, city
- status: `pending` | `approved` | `rejected` | `archived`

#### Volunteers (`/api/volunteers`)
**Fields:**
- name, phone, skills (array)
- status: `pending` | `approved` | `rejected` | `archived`

#### Internships (`/api/internships`)
**Fields:**
- name, email, resumeUrl
- status: `pending` | `approved` | `rejected` | `archived`

### 4. Content Management

#### Blogs (`/api/blogs`)
**Fields:**
- title, content, coverImage, author, tags
- status: `draft` | `published` | `archived`

#### Stories (`/api/stories`)
**Fields:**
- title, description, image, category
- status: `draft` | `published` | `archived`

#### Events (`/api/events`)
**Fields:**
- title, description, year, month, images (array)
- status: `draft` | `published` | `archived`

**Filter by Year/Month:**
```
GET /api/events?year=2025&month=12
```

#### Videos (`/api/videos`)
**Fields:**
- title, videoUrl
- status: `draft` | `published` | `archived`

### 5. Recognition

#### Awards (`/api/awards`)
**Fields:**
- title, imageUrl, year
- status: `draft` | `published` | `archived`

#### Publications (`/api/publications`)
**Fields:**
- title, fileUrl, year
- status: `draft` | `published` | `archived`

### 6. Communications

#### Contacts (`/api/contacts`)
**Fields:**
- name, email, subject, message
- status: `new` | `read` | `replied` | `archived`

**Access:** Manager, Admin, Super Admin

### 7. Team & Support

#### Teachers (`/api/teachers`)
**Fields:**
- name
- status: `active` | `inactive` | `archived`

#### FAQs (`/api/faqs`)
**Fields:**
- question, answer
- status: `active` | `archived`

### 8. Site Configuration (`/api/config`)

**Fields:**
- logoUrl (string)
- heroImages (array of image URLs)
- carouselImages (array of image URLs)

**Access:** Admin, Super Admin only

---

## 📤 File Upload

### Upload Logo
```
POST /api/upload/logo
Content-Type: multipart/form-data

logo: [file]
```

**Allowed:** JPG, PNG, WEBP (max 5MB)

### Upload Hero Images
```
POST /api/upload/hero
Content-Type: multipart/form-data

images: [file1, file2, file3]
```

**Max:** 3 images, 5MB each

### Upload Event Images
```
POST /api/upload/events
Content-Type: multipart/form-data

images: [file1, file2, ...]
```

**Max:** 10 images, 5MB each

### Upload Video
```
POST /api/upload/video
Content-Type: multipart/form-data

video: [file]
```

**Allowed:** MP4, MOV (max 100MB)

### Upload Document (CSR/Publication)
```
POST /api/upload/document
Content-Type: multipart/form-data

document: [file]
```

**Allowed:** PDF, DOC, DOCX (max 10MB)

---

## ⚠️ Error Responses

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Error Codes:**
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🎯 Example Workflows

### Approve a Volunteer Application
```bash
# 1. Get all pending volunteers
GET /api/volunteers?status=pending

# 2. Review specific volunteer
GET /api/volunteers/:id

# 3. Approve
PATCH /api/volunteers/:id/approve
{
  "reviewNotes": "Great skills, approved for orientation"
}
```

### Bulk Archive Old Events
```bash
# 1. Get events from 2023
GET /api/events?year=2023

# 2. Bulk archive
POST /api/events/bulk/archive
{
  "ids": ["event1_id", "event2_id", ...]
}
```

### Publish a Blog Post
```bash
# 1. Create draft
POST /api/blogs
{
  "title": "New Blog Post",
  "content": "Content here...",
  "author": "Admin",
  "status": "draft"
}

# 2. Update to published
PUT /api/blogs/:id
{
  "status": "published"
}
```

---

## 🔒 Admin Panel Access

**URL:** `http://localhost:5000/admin`

**Login Credentials (Default):**
- Email: `superadmin@helpage.org`
- Password: `admin123`

**Features:**
- ✅ Role-based dashboard
- ✅ Color-coded navigation
- ✅ Approve/Reject/Archive actions
- ✅ Bulk operations
- ✅ Advanced filters & search
- ✅ Real-time statistics
- ✅ File upload integration

---

## 📊 Dashboard Statistics

```
GET /api/stats
```

**Response:**
```json
{
  "users": 25,
  "blogs": 120,
  "stories": 85,
  "events": 45,
  "videos": 30,
  "contacts": 200,
  "volunteers": 150,
  "donors": 80
}
```

---

## 🚀 Rate Limiting

- **General API:** 100 requests/15 minutes per IP
- **File Upload:** 20 uploads/hour per user
- **Bulk Operations:** 10 operations/hour per user

---

## 📝 Notes

1. All dates are in ISO 8601 format
2. All amounts are in INR (Indian Rupees)
3. Files uploaded to Cloudinary with auto-optimization
4. Soft delete used for most resources (archived status)
5. All write operations logged with user info

---

**Last Updated:** December 2025  
**API Version:** 1.0.0
