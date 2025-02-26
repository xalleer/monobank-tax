const express = require('express');
const cors = require('cors');
const monobankRoutes = require('./routes/monobankRoutes');
const { port } = require('./config/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', monobankRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});