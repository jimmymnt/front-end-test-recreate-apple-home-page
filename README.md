# Front-End Test Assignment

A modern HTML/SCSS/JavaScript project with webpack bundling for efficient development and production builds.

## 🚀 Features

- **Modern Build System**: Webpack 5 with hot reloading for development
- **SCSS Architecture**: Modular SCSS with variables, mixins, and utilities
- **Component-Based Structure**: Reusable components and layouts
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **JavaScript Modules**: ES6+ modules with modern JavaScript features
- **Performance Optimized**: Code splitting, minification, and asset optimization

## 📁 Project Structure

```
front-end-test-assignment/
├── src/
│   ├── index.html              # Main HTML template
│   ├── js/
│   │   ├── main.js            # Main JavaScript entry point
│   │   └── modules/
│   │       ├── navigation.js  # Navigation functionality
│   │       ├── buttons.js     # Button interactions
│   │       └── animations.js  # Animation utilities
│   └── scss/
│       ├── main.scss          # Main SCSS entry point
│       ├── base/
│       │   ├── _variables.scss # SCSS variables
│       │   ├── _reset.scss    # CSS reset
│       │   ├── _typography.scss # Typography styles
│       │   └── _utilities.scss # Utility classes
│       ├── components/
│       │   ├── _buttons.scss  # Button components
│       │   ├── _cards.scss    # Card components
│       │   └── _navigation.scss # Navigation components
│       ├── layout/
│       │   ├── _header.scss   # Header layout
│       │   ├── _footer.scss   # Footer layout
│       │   └── _grid.scss     # Grid system
│       └── pages/
│           └── _home.scss     # Home page styles
├── dist/                      # Build output (generated)
├── package.json               # Dependencies and scripts
├── webpack.config.js          # Webpack configuration
└── README.md                  # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd front-end-test-recreate-apple-home-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes

## 🎨 SCSS Architecture

### Base Styles
- **Variables**: Colors, typography, spacing, breakpoints
- **Reset**: Normalize browser defaults
- **Typography**: Text utilities and responsive typography
- **Utilities**: Spacing, display, positioning utilities

### Components
- **Buttons**: Multiple variants with hover effects
- **Cards**: Feature cards and content cards
- **Navigation**: Responsive navigation with mobile menu

### Layout
- **Header**: Hero section and page headers
- **Footer**: Multi-column footer with social links
- **Grid**: CSS Grid and Flexbox utilities

## 🔧 Webpack Configuration

The webpack configuration includes:

- **SCSS Processing**: sass-loader with css-loader
- **HTML Generation**: html-webpack-plugin
- **Asset Optimization**: Image and font handling
- **Development Server**: Hot reloading and live updates
- **Production Builds**: Minification and code splitting

## 📱 Responsive Design

The project uses a mobile-first approach with breakpoints:

- **Small**: 576px and up
- **Medium**: 768px and up
- **Large**: 992px and up
- **Extra Large**: 1200px and up

## 🎯 JavaScript Features

### Modules
- **Navigation**: Mobile menu, smooth scrolling, active link highlighting
- **Buttons**: Click handlers, loading states, ripple effects
- **Animations**: Scroll animations, fade effects, hover animations

### Utilities
- Dynamic element creation
- Animation helpers
- Event management

## 🚀 Performance Features

- **Code Splitting**: Automatic chunk splitting
- **Asset Optimization**: Image and font optimization
- **Minification**: CSS and JS minification for production
- **Caching**: Content hash for cache busting

## 🎨 Customization

### Colors
Edit `src/scss/base/_variables.scss` to customize the color palette:

```scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
$accent-color: #e74c3c;
```

### Typography
Modify typography variables in the same file:

```scss
$font-family-primary: 'Arial', sans-serif;
$font-size-base: 13px;
```

### Breakpoints
Adjust responsive breakpoints:

```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request