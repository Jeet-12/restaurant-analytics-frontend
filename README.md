Restaurant Analytics Dashboard - Frontend


https://img.shields.io/badge/React-18.2.0-blue
https://img.shields.io/badge/Material--UI-5.11.7-blue
https://img.shields.io/badge/Chart.js-4.2.1-green

A modern React frontend for the Restaurant Analytics Dashboard that provides interactive visualizations and insights into restaurant performance metrics.

🚀 Quick Start
Prerequisites
Node.js 14.x or higher

npm or yarn package manager

Backend API running (Laravel backend)

Installation
Clone the repository

bash
git clone <your-repository-url>
cd restaurant-analytics-frontend
Install dependencies

bash
npm install
Install required packages

bash
npm install @mui/material @mui/icons-material @mui/x-date-pickers @emotion/react @emotion/styled axios chart.js date-fns react-chartjs-2 react-router-dom
Configure API endpoint (if different from default)
Edit src/services/api.js:

javascript
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Update if your backend runs on different port
});
Start the development server

bash
npm start
The application will open at: http://localhost:3000

📁 Project Structure
text
src/
├── components/           # React components
│   ├── AppBar.js        # Navigation header
│   ├── RestaurantList.js # Restaurant listing with filters
│   ├── AnalyticsDashboard.js # Main analytics dashboard
│   ├── TopRestaurants.js # Top performers component
│   └── charts/          # Chart components
│       ├── DailyOrdersChart.js
│       └── RevenueChart.js
├── services/            # API services
│   └── api.js          # Axios configuration and API calls
├── styles/             # Theme and styling
│   └── theme.js        # Material-UI theme configuration
├── App.js              # Main application component
└── index.js            # Application entry point
🎯 Features
🔍 Restaurant Management
Interactive list of all restaurants

Search functionality by name, location, or cuisine

Sort by name, location, or cuisine

Filter by cuisine type

Click any restaurant to view detailed analytics

📊 Analytics Dashboard
Daily Orders Count: Bar chart showing orders per day

Revenue Trends: Line chart with daily revenue and average order value

Peak Hours: Table showing busiest hours for each day

Date Range Selection: Customizable date filters for analysis

🏆 Top Restaurants
Display top 3 restaurants by revenue

Configurable date range filtering

Order count and total revenue metrics

🎨 User Interface
Material-UI Design: Modern, responsive interface

Interactive Charts: Chart.js visualizations with hover effects

Responsive Layout: Works on desktop, tablet, and mobile

Loading States: Smooth loading indicators for better UX

🛠️ Available Scripts
npm start
Runs the app in development mode at http://localhost:3000. The page will reload automatically when you make changes.

npm test
Launches the test runner in interactive watch mode.

npm run build
Builds the app for production to the build folder. The build is optimized for performance and ready for deployment.

npm run eject
Note: This is irreversible! Removes Create React App tooling and gives you full control over configuration.

🔧 Configuration
Environment Variables
Create a .env file in the root directory for custom configuration:

env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_APP_NAME="Restaurant Analytics"
API Integration
The frontend communicates with these backend endpoints:

Endpoint	Method	Purpose
/api/restaurants	GET	Get restaurant list with filtering
/api/analytics/restaurant/{id}	GET	Get restaurant metrics
/api/analytics/top-restaurants	GET	Get top restaurants by revenue
🎨 Customization
Theme Modification
Edit src/styles/theme.js to customize the Material-UI theme:

javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
    secondary: {
      main: '#dc004e', // Change secondary color
    },
  },
});
Adding New Charts
Create new chart components in src/components/charts/ following the pattern of existing charts.

📱 Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

🚀 Deployment
Build for Production
bash
npm run build
This creates an optimized production build in the build folder.

Deployment Options
Netlify: Drag and drop the build folder

Vercel: Connect your GitHub repository for automatic deployments

AWS S3: Upload the build folder contents to an S3 bucket

Traditional Hosting: Upload to any web server

🐛 Troubleshooting
Common Issues
Module Not Found Errors:

bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
CORS Errors:

Ensure backend has CORS configured

Verify API base URL in src/services/api.js

Date Picker Issues:

bash
# Install required date adapter
npm install @mui/x-date-pickers @date-io/date-fns
Port Already in Use:

bash
PORT=3001 npm start