const express = require('express');
const app = express();

// create local server
app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
})


//serve public folder
app.use(express.static('public'));

