const express = require('express');
const serveIndex = require('serve-index');

const app = express()

const PORT = process.env.PORT || 3000;

app.use(
  '/mypc',
  express.static('public/mypc'),
  serveIndex('public/mypc', { icons: true })
)

app.use(
  '/*',
  express.static('public/mypc/404.html'),
  serveIndex('public/mypc/404.html', { icons: true })
)
app.get('/', (req,res) => {res.json('Contributed by hgl555 - Eagle.Team');});


app.listen(PORT, () => console.log(`🚀 is on port ${PORT}`))


