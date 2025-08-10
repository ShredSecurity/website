# PrismNode - Web3 Security Firm Website

A modern, professional website for PrismNode, a Web3 security firm specializing in blockchain security audits, penetration testing, and smart contract analysis.

## 🚀 Features

- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: Smooth scrolling, hover effects, and animated counters
- **Google Forms Integration**: Ready for Google Forms integration in the contact section
- **Professional Sections**: Hero, Services, About, Contact, and Footer sections
- **Mobile-First**: Mobile-optimized navigation and layout

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox, Grid, and animations
- **JavaScript**: Interactive functionality and smooth animations
- **Font Awesome**: Professional icons
- **Google Fonts**: Inter font family for modern typography

## 📁 Project Structure

```
prismnode-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or Download** the project files to your local machine
2. **Open** `index.html` in your web browser
3. **Customize** the content, colors, and branding as needed

### Local Development Server (Optional)

If you want to run a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors
The website uses a modern blue color scheme. You can customize the colors in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --accent-color: #667eea;
    --text-color: #1e293b;
    --light-bg: #f8fafc;
}
```

### Content
- Update company information in `index.html`
- Modify services and descriptions
- Change contact details and social media links
- Update statistics and achievements

### Google Forms Integration
To integrate your Google Form:

1. Create a form in [Google Forms](https://forms.google.com)
2. Click "Send" and copy the embed code
3. Replace the iframe in the contact section with your form's embed code
4. Update the `src` attribute with your form's URL

Example:
```html
<iframe src="https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/viewform?embedded=true" 
        width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">
    Loading…
</iframe>
```

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first navigation with hamburger menu
- Responsive grid layouts
- Optimized typography for all screen sizes
- Touch-friendly interactive elements

## 🎭 Animations

- **Scroll Animations**: Elements fade in as you scroll
- **Hover Effects**: Interactive service cards and buttons
- **Loading Animations**: Smooth page load transitions
- **Parallax Effects**: Subtle background movement on scroll

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the website.

## 📞 Support

For support or questions about this template, please open an issue in the repository.

## 🚀 Deployment

To deploy your website:

1. **Static Hosting**: Upload files to services like:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3
   - Firebase Hosting

2. **Traditional Hosting**: Upload to any web hosting service

3. **Custom Domain**: Configure your domain to point to your hosting service

## 🔒 Security Features

The website includes:
- Secure form handling (when integrated with Google Forms)
- XSS protection through proper HTML encoding
- Responsive design for all device types
- Accessibility features for better user experience

---

**Built with ❤️ for the Web3 security community**

*PrismNode - Securing the Future of Web3*
