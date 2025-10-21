import express from "express";

const app = express()

app.set('port', process.env.FAKE_API_PORT || 3003);

// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>Express.js API</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/data">API Data</a>
          <a href="/status">Status</a>
        </nav>
      </body>
    </html>
  `)
})

// Get some data
app.get('/data', (req, res) => {
  res.json({
    message: 'Here is some data for you',
    items: ['Lorem', 'ipsum', 'cherry'],
  })
})

// Health check
app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(app.get('port'), function () {
  console.log(`app API is listening on port: ${app.get('port')} 👂`);
});

// noinspection JSUnusedGlobalSymbols
export default app
