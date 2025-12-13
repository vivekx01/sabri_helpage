// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/pages', require('./routes/pageRoutes'));
app.use('/api/public', require('./routes/public'));
=======
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/pages', require('./routes/pageRoutes'));
app.use('/api/public', require('./routes/public'));
