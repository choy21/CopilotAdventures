# 🌐 Echo Chamber Web Interface

A modern, responsive web interface for the Echo Chamber application built with Express, HTML, CSS, and Vanilla JavaScript.

## Quick Start

```bash
# Install dependencies
npm install

# Start the web server
npm run web

# Open in browser
# http://localhost:3000
```

## Features

### 🎨 User Interface
- **Beautiful Design**: Modern, responsive layout with fantasy theme
- **Real-time Updates**: Instant feedback on predictions
- **Memory Tracking**: Visual display of all stored echoes
- **Mobile Friendly**: Fully responsive design works on all devices

### 🔮 Core Functionality
- **Sequence Prediction**: Input any sequence to predict the next number
- **Demo Mode**: Quick demo button with pre-filled sample sequence
- **Example Library**: Click example sequences to test them instantly
- **Input Validation**: Real-time validation with helpful error messages

### 📜 Memory Management
- **Echo Storage**: All predictions are stored and displayed
- **Memory Panel**: Sidebar showing all stored echoes with details
- **Clear Function**: Reset all memories with one click
- **Timestamp Tracking**: Each prediction shows when it was made

### 🧪 Testing Tools
- **Built-in Tests**: Run automated test suite from the interface
- **Server Test**: Verify server connectivity
- **Example Sequences**: Quick-load pre-made examples

### 📊 Information
- **Story Context**: Learn about the Chamber of Echoes
- **About Modal**: View application information
- **Examples Modal**: Browse and test example sequences

## Server Architecture

### Express.js Backend
```
server.js
├── POST /api/predict      - Predict next number
├── GET  /api/memories     - Get all stored echoes
├── DELETE /api/memories   - Clear all memories
├── POST /api/validate     - Validate sequence
├── GET  /api/test         - Test server connection
└── Static Files (public/)
    ├── index.html         - Main HTML
    ├── styles.css         - Styling
    └── app.js             - Client-side logic
```

### API Response Format

All API endpoints return JSON responses:

**Success Response:**
```json
{
  "success": true,
  "nextNumber": 15,
  "commonDifference": 3,
  "message": "✓ The next number in the sequence is: 15"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Client-Side Architecture

### HTML Structure (`index.html`)
- **Header**: Application title and branding
- **Story Section**: Fantasy narrative context
- **Two-Column Layout**:
  - Left: Prediction interface
  - Right: Memories and quick actions
- **Examples Section**: Collapsible example sequences
- **Modals**: About and test results dialogs
- **Footer**: Links and credits

### Styling (`styles.css`)
- **CSS Variables**: Customizable color scheme
- **Responsive Grid**: Mobile-first design
- **Animations**: Smooth transitions and fade-ins
- **Dark Theme**: Beautiful dark background with accent colors
- **Custom Scrollbar**: Fantasy-themed scrollbar styling

### JavaScript (`app.js`)
- **API Communication**: Fetch-based API calls
- **Event Handlers**: Form submission and button clicks
- **UI Updates**: Dynamic content rendering
- **Memory Management**: Display and update stored predictions
- **Modal Management**: Show/hide dialogs
- **Input Parsing**: Parse and validate comma-separated numbers
- **Auto-Updates**: Periodic memory refresh

## File Structure

```
echo-chamber/
├── server.js              # Express server
├── index.js               # Core EchoChamber logic
├── package.json           # Dependencies
├── README.md              # Full documentation
├── QUICKSTART.md          # Quick start guide
└── public/
    ├── index.html         # Web interface
    ├── styles.css         # Styling
    └── app.js             # Client-side logic
```

## Features in Detail

### Prediction Interface

**Input:**
- Type numbers separated by commas
- Examples: `3, 6, 9, 12` or `10, 7, 4, 1`

**Output:**
- Shows next number in sequence
- Displays common difference
- Stores prediction in memory

**Quick Actions:**
- Demo button - Pre-fills sample sequence
- Enter key - Submits prediction
- Example buttons - Load predefined sequences

### Memory Display

**Features:**
- Shows all stored predictions
- Displays sequence, next number, and difference
- Shows timestamp for each prediction
- Automatic updates every 5 seconds
- Clear button to reset all memories

**Memory Entry Format:**
```
Echo #1
Sequence: [3, 6, 9, 12]
Next: 15
Difference: 3
Time: 10:30:45 AM
```

### Testing Interface

**Built-in Tests:**
- Simple Arithmetic Progression
- Decreasing Sequences
- Large Numbers
- Negative Numbers
- Floating Point Numbers
- Invalid (Geometric) Sequences

**Test Results:**
- Shows pass/fail status for each test
- Displays input and output
- Summary statistics
- Quick identification of failures

### Examples Library

**Pre-loaded Examples:**
```
[3, 6, 9, 12]        → Simple +3
[10, 7, 4, 1]        → Decreasing
[2, 4, 6, 8]         → Even numbers
[-5, -3, -1, 1]      → Negative start
[100, 200, 300, 400] → Large numbers
[1.5, 3.0, 4.5, 6.0] → Decimals
```

Click any example to auto-load and predict!

## Browser Compatibility

The web interface works on:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance

- **Fast Loading**: Minimal CSS and JavaScript
- **No External Dependencies**: Uses Vanilla JS
- **Real-time Updates**: Instant server responses
- **Responsive**: Smooth animations and transitions
- **Scalable**: Handles large numbers of predictions

## Customization

### Color Scheme

Edit `public/styles.css` CSS variables:

```css
:root {
    --primary: #7c3aed;      /* Purple */
    --secondary: #06b6d4;    /* Cyan */
    --success: #10b981;      /* Green */
    --danger: #ef4444;       /* Red */
}
```

### Port Configuration

Edit `server.js` to change port:

```javascript
const PORT = process.env.PORT || 3000;
```

Or set environment variable:

```bash
PORT=8080 npm run web
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
PORT=3001 npm run web

# Or kill the process using port 3000
lsof -i :3000
kill -9 <PID>
```

### API Errors

Check browser console for errors:
- Right-click → Inspect → Console tab
- Look for network errors in Network tab
- Verify server is running

### Server Won't Start

Ensure dependencies are installed:

```bash
npm install
```

Check Node.js version:

```bash
node --version  # Should be v12 or higher
```

## Deployment

### Local Development

```bash
npm run web
# Navigate to http://localhost:3000
```

### Production Deployment

For deploying to production services (Heroku, AWS, etc.):

1. Ensure Node.js runtime is available
2. Install dependencies: `npm install`
3. Set environment variables if needed
4. Start server: `npm run web`

Example `Procfile` for Heroku:
```
web: npm run web
```

## REST API Documentation

See [README.md](README.md#rest-api-endpoints) for complete API endpoint documentation.

## Development Tips

### Adding New Features

1. **Backend**: Add endpoint to `server.js`
2. **Frontend**: Add button/form to `index.html`
3. **Styling**: Add CSS to `styles.css`
4. **Logic**: Add function to `public/app.js`
5. **Connect**: Call API from JavaScript

### Common Tasks

**Add a new button:**
```html
<button class="btn btn-outline" onclick="myFunction()">Label</button>
```

**Add a new API endpoint:**
```javascript
app.post('/api/myendpoint', (req, res) => {
  const result = doSomething(req.body);
  res.json(result);
});
```

**Add a new style:**
```css
.my-class {
  background: var(--primary);
  /* ... */
}
```

**Call API from JavaScript:**
```javascript
const response = await fetch('/api/myendpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const result = await response.json();
```

## Support

For issues, questions, or suggestions:
1. Check the [README.md](README.md) for general documentation
2. Review the [QUICKSTART.md](QUICKSTART.md) for common questions
3. Open an issue on the [GitHub repository](https://github.com/microsoft/CopilotAdventures)

---

**🏰 Welcome to the Web Chamber of Echoes! 🔮**

Built with Express.js, HTML5, CSS3, and Vanilla JavaScript.
