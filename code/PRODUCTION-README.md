# NASA Frontend - Production Ready

A React-based NASA educational frontend featuring interactive games and educational content about space exploration.

## 🚀 Features

- **Cupola Explorer Game**: Interactive space station game with Earth observation mechanics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Error Boundaries**: Graceful error handling with user-friendly error messages
- **Loading States**: Smooth loading experiences with custom spinners
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **Production Ready**: Optimized build configuration and deployment setup

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **State Management**: React Hooks
- **Error Handling**: React Error Boundaries
- **Asset Optimization**: Vite build optimizations

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd FrontEnd-Nasa/code

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Production
npm run build        # Build for production
npm run build:prod   # Build with production environment
npm run preview      # Preview production build
npm run analyze      # Analyze bundle size
```

## 🌐 Deployment

### Building for Production

```bash
# Create optimized production build
npm run build:prod

# Preview the production build locally
npm run preview
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

Create appropriate `.env` files for different environments:

- `.env.development` - Development environment
- `.env.production` - Production environment

### Deployment Options

#### Static Hosting (Recommended)
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3 + CloudFront**: For enterprise deployments

#### Server Deployment
- **Docker**: Use the provided Dockerfile for containerized deployment
- **Node.js Server**: Serve the `dist` folder with Express or similar

### Example Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/css text/javascript application/javascript application/json;
}
```

## 🎮 Game Features

### Cupola Explorer
- **3 Difficulty Levels**: Progressive difficulty with increasing challenges
- **Interactive Earth View**: Click on disaster icons as they appear
- **Educational Content**: Learn about natural disasters and space observation
- **Collection System**: Collect unique stickers for each disaster type
- **Performance Tracking**: Score tracking and mission statistics

## 🔧 Performance Optimizations

- **Code Splitting**: Automatic code splitting for optimal loading
- **Asset Optimization**: Compressed images and optimized video files
- **Lazy Loading**: Components and routes loaded on demand
- **Error Boundaries**: Prevent crashes with graceful error handling
- **Memoization**: React.memo and useCallback for optimal re-renders

## 🐛 Error Handling

The application includes comprehensive error handling:

- **Error Boundaries**: Catch and handle React component errors
- **Loading States**: Visual feedback during data loading
- **Fallback UI**: User-friendly error messages
- **Development Mode**: Detailed error information in development

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Video Support**: MP4 video format required for Earth view

## 🔒 Security

- **Environment Variables**: Sensitive data in environment files
- **Content Security Policy**: Can be configured in hosting environment
- **HTTPS Ready**: Secure deployment compatible

## 📊 Performance Monitoring

Monitor your application performance with:

- **Bundle Analyzer**: Use `npm run analyze` to check bundle sizes
- **Lighthouse**: Run performance audits
- **Web Vitals**: Monitor Core Web Vitals metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all assets are properly loaded
4. Check browser compatibility

## 🔄 Version History

- **v1.0.0**: Initial production release
  - Cupola Explorer game
  - Responsive design
  - Error boundaries
  - Production optimizations