# Test Backend API Routes
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Testing Backend API Routes" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Test Root Endpoint
try {
    Write-Host "[1/15] Testing Root Endpoint..." -ForegroundColor Yellow
    $root = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get
    Write-Host "✓ Root: $($root.message)" -ForegroundColor Green
} catch {
    Write-Host "✗ Root endpoint failed" -ForegroundColor Red
}

# Test Blogs API
try {
    Write-Host "`n[2/15] Testing Blogs API..." -ForegroundColor Yellow
    $blogs = Invoke-RestMethod -Uri "http://localhost:5000/api/blogs" -Method Get
    Write-Host "✓ Blogs: Retrieved $($blogs.data.Count) blogs" -ForegroundColor Green
} catch {
    Write-Host "✗ Blogs API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Stories API
try {
    Write-Host "`n[3/15] Testing Stories API..." -ForegroundColor Yellow
    $stories = Invoke-RestMethod -Uri "http://localhost:5000/api/stories" -Method Get
    Write-Host "✓ Stories: Retrieved $($stories.data.Count) stories" -ForegroundColor Green
} catch {
    Write-Host "✗ Stories API failed" -ForegroundColor Red
}

# Test Events API
try {
    Write-Host "`n[4/15] Testing Events API..." -ForegroundColor Yellow
    $events = Invoke-RestMethod -Uri "http://localhost:5000/api/events" -Method Get
    Write-Host "✓ Events: Retrieved $($events.data.Count) events" -ForegroundColor Green
} catch {
    Write-Host "✗ Events API failed" -ForegroundColor Red
}

# Test Awards API
try {
    Write-Host "`n[5/15] Testing Awards API..." -ForegroundColor Yellow
    $awards = Invoke-RestMethod -Uri "http://localhost:5000/api/awards" -Method Get
    Write-Host "✓ Awards: Retrieved $($awards.data.Count) awards" -ForegroundColor Green
} catch {
    Write-Host "✗ Awards API failed" -ForegroundColor Red
}

# Test FAQs API
try {
    Write-Host "`n[6/15] Testing FAQs API..." -ForegroundColor Yellow
    $faqs = Invoke-RestMethod -Uri "http://localhost:5000/api/faqs" -Method Get
    Write-Host "✓ FAQs: Retrieved $($faqs.data.Count) FAQs" -ForegroundColor Green
} catch {
    Write-Host "✗ FAQs API failed" -ForegroundColor Red
}

# Test Publications API
try {
    Write-Host "`n[7/15] Testing Publications API..." -ForegroundColor Yellow
    $publications = Invoke-RestMethod -Uri "http://localhost:5000/api/publications" -Method Get
    Write-Host "✓ Publications: Retrieved $($publications.data.Count) publications" -ForegroundColor Green
} catch {
    Write-Host "✗ Publications API failed" -ForegroundColor Red
}

# Test Internships API
try {
    Write-Host "`n[8/15] Testing Internships API..." -ForegroundColor Yellow
    $internships = Invoke-RestMethod -Uri "http://localhost:5000/api/internships" -Method Get
    Write-Host "✓ Internships: Retrieved $($internships.data.Count) internships" -ForegroundColor Green
} catch {
    Write-Host "✗ Internships API failed" -ForegroundColor Red
}

# Test Volunteers API
try {
    Write-Host "`n[9/15] Testing Volunteers API..." -ForegroundColor Yellow
    $volunteers = Invoke-RestMethod -Uri "http://localhost:5000/api/volunteers" -Method Get
    Write-Host "✓ Volunteers: Retrieved $($volunteers.data.Count) volunteers" -ForegroundColor Green
} catch {
    Write-Host "✗ Volunteers API failed" -ForegroundColor Red
}

# Test Donors API
try {
    Write-Host "`n[10/15] Testing Donors API..." -ForegroundColor Yellow
    $donors = Invoke-RestMethod -Uri "http://localhost:5000/api/donors" -Method Get
    Write-Host "✓ Donors: Retrieved $($donors.data.Count) donors" -ForegroundColor Green
} catch {
    Write-Host "✗ Donors API failed" -ForegroundColor Red
}

# Test Videos API
try {
    Write-Host "`n[11/15] Testing Videos API..." -ForegroundColor Yellow
    $videos = Invoke-RestMethod -Uri "http://localhost:5000/api/videos" -Method Get
    Write-Host "✓ Videos: Retrieved $($videos.data.Count) videos" -ForegroundColor Green
} catch {
    Write-Host "✗ Videos API failed" -ForegroundColor Red
}

# Test Clubs API
try {
    Write-Host "`n[12/15] Testing Clubs API..." -ForegroundColor Yellow
    $clubs = Invoke-RestMethod -Uri "http://localhost:5000/api/clubs" -Method Get
    Write-Host "✓ Clubs: Retrieved $($clubs.data.Count) clubs" -ForegroundColor Green
} catch {
    Write-Host "✗ Clubs API failed" -ForegroundColor Red
}

# Test Teachers API
try {
    Write-Host "`n[13/15] Testing Teachers API..." -ForegroundColor Yellow
    $teachers = Invoke-RestMethod -Uri "http://localhost:5000/api/teachers" -Method Get
    Write-Host "✓ Teachers: Retrieved $($teachers.data.Count) teachers" -ForegroundColor Green
} catch {
    Write-Host "✗ Teachers API failed" -ForegroundColor Red
}

# Test Users API (requires auth - expect 401)
try {
    Write-Host "`n[14/15] Testing Users API (protected)..." -ForegroundColor Yellow
    $users = Invoke-RestMethod -Uri "http://localhost:5000/api/users" -Method Get
    Write-Host "✓ Users: Retrieved $($users.data.Count) users" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Users API properly protected (401 Unauthorized)" -ForegroundColor Green
    } else {
        Write-Host "✗ Users API failed with unexpected error" -ForegroundColor Red
    }
}

# Test Contacts API
try {
    Write-Host "`n[15/15] Testing Contacts API..." -ForegroundColor Yellow
    $contacts = Invoke-RestMethod -Uri "http://localhost:5000/api/contacts" -Method Get
    Write-Host "✓ Contacts: Retrieved $($contacts.data.Count) contacts" -ForegroundColor Green
} catch {
    Write-Host "✗ Contacts API failed" -ForegroundColor Red
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "Testing Complete!" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
