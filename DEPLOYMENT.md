# Deployment Guide

This project is configured to work on multiple hosting platforms. Choose your platform and follow the instructions.

## 📦 Build First
```bash
npm run build
```

---

## 🌐 Deployment Platforms

### 1. **Netlify** ✅ (Recommended)
**Uses**: `public/_redirects`

```bash
npm run build
# Drag & drop the 'build' folder to Netlify, or:
netlify deploy --prod --dir=build
```

✅ API proxying: Automatic via `_redirects`

---

### 2. **Vercel** ✅
**Uses**: `vercel.json`

```bash
npm install -g vercel
npm run build
vercel --prod
```

✅ API proxying: Automatic via `vercel.json`

---

### 3. **Firebase Hosting** ✅
**Uses**: `firebase.json`

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy
```

✅ API proxying: Automatic via `firebase.json`

---

### 4. **GitHub Pages** ⚠️
**Limitation**: No server-side proxying

```bash
npm run build
# Deploy 'build' folder to GitHub Pages
# Note: API calls may fail due to CORS. Alternative: Use GitHub Actions to run a proxy middleware.
```

---

### 5. **Traditional Apache/PHP Host** ✅
**Uses**: `public/.htaccess`

```bash
npm run build
# FTP/upload 'build' folder to your host
# Ensure mod_rewrite is enabled on your server
```

✅ API proxying: Automatic via `.htaccess`

---

### 6. **Node.js Server (Custom Backend)** ✅
**Uses**: Custom Node.js proxy

```bash
npm run build
node server.js  # See example below
```

**Example server.js**:
```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Proxy API calls
app.use('/api/wlb', createProxyMiddleware({
  target: 'https://wlbapi.toolforge.org',
  changeOrigin: true,
  pathRewrite: { '^/api/wlb': '/api/wlb' }
}));

// Serve React app
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🔧 Environment Variables

No sensitive data in this project. All API endpoints are public.

---

## ✅ Testing

After deployment, verify:

1. **Homepage loads** → Check carousel images
2. **Species page loads** → Click a species, verify images show
3. **No 404 errors** → Check browser console

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| API returns 404 | Check `_redirects`/`vercel.json`/`.htaccess` is deployed |
| Images not showing | Verify proxy is working: Check network tab in DevTools |
| Page refresh shows 404 | Ensure `index.html` fallback is configured |
| CORS errors in console | Normal in development; should be gone in production |

---

## 📝 Summary

- ✅ **Netlify**: Ready (uses `_redirects`)
- ✅ **Vercel**: Ready (uses `vercel.json`)
- ✅ **Firebase**: Ready (uses `firebase.json`)
- ✅ **Apache**: Ready (uses `.htaccess`)
- ✅ **Node.js**: Ready (use custom backend)
- ⚠️ **GitHub Pages**: Limited (no server-side proxying)
