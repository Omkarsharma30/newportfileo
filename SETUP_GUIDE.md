# 🏗️ Omkar Kumar Sharma - Civil Engineer Portfolio

A modern, responsive portfolio website for civil engineering professional with advanced 404 error handling and interactive features.

## 🚀 Features

### Main Portfolio Features
- **Glassmorphism Design**: Modern glass-effect UI with dark/light theme support
- **Responsive Layout**: Perfect on all devices (mobile, tablet, desktop)
- **Interactive Resume Viewer**: PDF viewer modal with download options
- **Contact Form**: Web3Forms integration for real contact submissions
- **Floating Navigation**: Smooth scrolling navigation that adapts to sections
- **Project Showcase**: Detailed project information with technical specifications

### Advanced 404 Error Handling
- **Smart Redirection**: Automatic 404 detection for missing pages
- **Interactive Elements**: Funny construction-themed jokes and animations
- **Easter Eggs**: Hidden features (Konami code, click counters)
- **Sound Effects**: Web Audio API generated construction sounds
- **Responsive Design**: Perfect mobile experience
- **Error Analytics**: Tracks 404 occurrences for optimization

## 📁 File Structure

```
civil/
├── index.html              # Main portfolio page
├── 404.html               # Custom 404 error page
├── reports.html           # Project reports page
├── test-404.html          # 404 page testing utility
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript functionality
├── 404.js                 # 404 page interactive features
├── error-handler.js       # Error detection and handling
├── .htaccess              # Apache server configuration
├── web.config             # IIS server configuration
├── img/                   # Images directory
│   ├── myphoto.jpeg       # Profile photo
│   └── construction.jpg   # Background image
└── documents/             # Documents directory
    └── *.pdf              # Resume and project reports
```

## 🛠️ Setup Instructions

### 1. Server Configuration

#### For Apache Servers:
The `.htaccess` file is already configured to:
- Redirect 404 errors to `/404.html`
- Enable compression and caching
- Set security headers

#### For IIS Servers:
The `web.config` file provides:
- Custom error page redirection
- URL rewrite rules
- Performance optimization

#### For Static Hosting (Netlify, Vercel, GitHub Pages):
Add these redirects in your hosting platform:
- **Netlify**: Add `_redirects` file with `/* /404.html 404`
- **Vercel**: Add `vercel.json` with redirect rules
- **GitHub Pages**: GitHub automatically serves `404.html` for missing pages

### 2. Web3Forms Configuration

1. **Get Access Key**: Sign up at [Web3Forms](https://web3forms.com)
2. **Replace API Key**: In `index.html`, find and replace the access_key value:
   ```html
   <input type="hidden" name="access_key" value="YOUR_NEW_ACCESS_KEY">
   ```

### 3. File Customization

#### Update Personal Information:
1. **Photos**: Replace files in `img/` directory
2. **Documents**: Add PDFs to `documents/` directory
3. **Content**: Edit text content in HTML files
4. **Colors**: Modify CSS variables in `style.css`

#### Customize 404 Page:
1. **Jokes**: Edit `constructionJokes` array in `404.js`
2. **Sounds**: Modify sound frequencies in `playSound()` function
3. **Easter Eggs**: Customize Konami code or click counters

## 🎮 404 Page Features

### Interactive Elements:
- **Construction Worker**: Click for speech bubbles
- **Floating Tools**: Clickable construction tools
- **Sound Buttons**: Generate construction sound effects
- **Progress Bar**: Fake "searching" animation with humor
- **Reason Generator**: Random funny explanations

### Easter Eggs:
- **Konami Code**: `↑↑↓↓←→←→BA` activates secret mode
- **Click Counter**: Click "404" text 10 times for confetti
- **Keyboard Shortcuts**: `Ctrl+H` to go home, `Escape` to reset

### Testing:
1. Open `test-404.html` in browser
2. Click "Go to 404 Page" to test functionality
3. Try all interactive elements listed in the test page

## 🔧 Technical Details

### Technologies Used:
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Custom properties, animations, responsive design
- **JavaScript ES6+**: Modern features, Web Audio API
- **Bootstrap 5**: Grid system and components
- **Web3Forms**: Form handling service

### Browser Support:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance Features:
- **Lazy Loading**: Images load when needed
- **Compression**: Gzip enabled for static assets
- **Caching**: Long-term caching for static resources
- **Optimization**: Minified CSS/JS in production

## 🚦 Testing Checklist

### Main Site:
- [ ] Theme toggle works in all sections
- [ ] Navigation highlights current section
- [ ] Resume PDF viewer opens correctly
- [ ] Contact form submits successfully
- [ ] All links work properly
- [ ] Mobile responsive design

### 404 Page:
- [ ] Loads when accessing non-existent pages
- [ ] All interactive elements respond
- [ ] Sound effects play (if browser allows)
- [ ] Easter eggs function correctly
- [ ] Theme toggle persists from main site
- [ ] Navigation back to main site works

### Error Handling:
- [ ] Broken links redirect to 404
- [ ] Missing images handled gracefully
- [ ] Server errors show custom page
- [ ] Analytics track 404 occurrences

## 📈 Analytics & Monitoring

The error handler includes Google Analytics integration:
```javascript
// Track 404 errors
gtag('event', 'page_not_found', {
  'event_category': '404_Error',
  'event_label': currentPath
});
```

Add your Google Analytics tracking code to monitor:
- 404 error frequency
- Popular missing pages
- User navigation patterns

## 🔒 Security Features

- **CSRF Protection**: Token generation for forms
- **XSS Prevention**: Content-Type and frame options headers
- **Input Validation**: Client and server-side validation
- **Honeypot Protection**: Spam bot detection

## 📞 Support & Customization

For questions or custom modifications:
- **Email**: okssiwan720@gmail.com
- **Portfolio**: [omkarkumar.space](https://omkarkumar.space/)
- **LinkedIn**: [Omkar Kumar Sharma](https://www.linkedin.com/in/omkar-kumar-890786286)

## 📄 License

This portfolio template is open for personal and educational use. Please provide attribution when using significant portions of the code.

---

**Built with 💙 by Omkar Kumar Sharma - Civil Engineer**