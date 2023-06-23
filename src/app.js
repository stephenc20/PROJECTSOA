const express = require('express');

const routes = require('./routes/index')
const authRoutes = require('./routes/auth');
const holidayRoutes = require('./routes/query');
const accountRoutes = require('./routes/account');
const dynamicRoutes = require('./routes/cons_dynamic');


const app=express();
//const port = env('PORT')



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authRoutes);
app.use('/api', holidayRoutes);
app.use('/api', accountRoutes);
app.use('/api', dynamicRoutes);



// Error handling middleware
    app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

  // Start the server
    app.listen(3000, () => {
    console.log('Server berjalan pada http://localhost:3000');
});

