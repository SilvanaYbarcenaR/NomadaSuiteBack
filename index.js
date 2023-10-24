const server = require('./src/server');
const {db} = require('./src/db.js')
const PORT = 3001;

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`Server en puerto ${PORT}`)
    })
})