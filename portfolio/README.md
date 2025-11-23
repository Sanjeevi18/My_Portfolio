# 🚀 Sanjeevi G - Portfolio Website

A modern, responsive portfolio website showcasing my skills as a Full Stack Developer, now optimized for Node.js deployment on Render.

## 🌟 Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Interactive Animations** - Canvas-based tech stack visualization and smooth scrolling effects
- **Email Contact Form** - Integrated with EmailJS for direct contact functionality
- **Dynamic Content** - Auto-typing effect and infinite scrolling marquees
- **Modern UI/UX** - Clean design with glassmorphism effects and smooth animations
- **Performance Optimized** - Fast loading with Express.js server and compression

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with custom properties and animations
- **JavaScript (ES6+)** - Modern vanilla JavaScript for interactions
- **Font Awesome** - Icon library for UI elements
- **Google Fonts** - Poppins and Fira Code typography

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **Compression** - Gzip compression for better performance

### Deployment

- **Render.com** - Cloud hosting platform

## 🚀 Quick Deploy to Render

1. **Fork this repository** on GitHub

2. **Connect to Render:**

   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your forked repository

3. **Configure deployment:**

   - **Name**: `your-portfolio-name`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Deploy** - Render will automatically build and deploy your site!

## 💻 Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sanjeevi18/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   Or for production mode:

   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
portfolio/
├── assets/              # Images, resume, and static assets
├── node_modules/        # Dependencies (auto-generated)
├── index.html          # Main HTML file
├── style.css           # Stylesheet with animations and responsive design
├── script.js           # JavaScript functionality and interactions
├── server.js           # Express server for production
├── keys.js             # EmailJS configuration (gitignored)
├── package.json        # Node.js dependencies and scripts
├── .gitignore         # Git ignore file
└── README.md          # This documentation
```

## ⚙️ Configuration

### EmailJS Setup (Optional)

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Update `keys.js`:
   ```javascript
   const EMAILJS_CONFIG = {
     publicKey: "your_public_key",
     serviceId: "your_service_id",
     templateId: "your_template_id",
   };
   ```

### Environment Variables (Render)

For production deployment, add these in Render dashboard:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

## 🎨 Customization

### Update Content

- Modify personal info in `index.html`
- Update skills in `script.js`
- Replace `assets/MYPIC.jpg` with your photo
- Add your resume as `assets/sanjeevi_resume.pdf`

### Styling

Update CSS variables in `style.css`:

```css
:root {
  --primary: #00f2ea;
  --secondary: #ff0055;
  /* ... customize colors */
}
```

## 📱 Key Features

- **Mobile Profile Animation** - Visible rotating tech rings on mobile
- **Theme Switch** - Positioned next to hamburger menu on mobile
- **Infinite Scroll** - Smooth auto-scrolling project and skill sections
- **Contact Form** - Serverless email functionality
- **Performance** - Compressed assets and optimized delivery

## 🌐 Deployment Options

### Render (Recommended)

- Free tier available
- Automatic deployments from GitHub
- Built-in SSL certificates
- Custom domains supported

### Alternative Platforms

- **Netlify**: Works with static files
- **Vercel**: Supports Node.js apps
- **Railway**: Node.js deployment
- **Heroku**: Traditional PaaS option

## 📈 Performance

- Express.js with compression middleware
- Static asset caching
- Optimized images and fonts
- Lighthouse Score: 95+

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sanjeevi Gopalakrishnan**

- 🌐 **Portfolio**: [Live Demo](https://your-render-url.onrender.com)
- 💼 **LinkedIn**: [linkedin.com/in/sanjeevi-g-969bb2224/](https://linkedin.com/in/sanjeevi-g-969bb2224/)
- 🐱 **GitHub**: [@Sanjeevi18](https://github.com/Sanjeevi18)
- 📧 **Email**: Contact through portfolio

---

⭐ **Star this repo if it helped you!**

_Built with ❤️ by Sanjeevi G_
