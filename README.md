# Elegant Weather App  

An interactive and visually appealing weather application that fetches and displays real-time weather data using the Open Meteo API. The app allows users to search for a city and view its current weather, wind speed, and a 7-day forecast.

---

## Features  
- Real-time weather updates using [Open Meteo API](https://open-meteo.com/).  
- Dynamic icons for weather conditions based on weather codes.  
- User-friendly interface with responsive design.  
- 7-day forecast with temperature highs and lows.  
- Error handling for invalid locations and API issues.  

---

## Table of Contents  
1. [Setup Instructions](#setup-instructions)  
2. [API Details](#api-details)  
3. [Deployment Process](#deployment-process)  
4. [Load Balancer Configuration](#load-balancer-configuration)  
5. [Challenges & Solutions](#challenges-and-solutions)  
6. [Credits & Resources](#credits-and-resources)  

---

## Setup Instructions  

### Prerequisites  
- A web browser (Google Chrome, Firefox, etc.).  
- A text editor (VS Code, Sublime Text, etc.).  
- A local server environment (optional, e.g., XAMPP).  

### Steps to Run Locally  
1. Clone this repository:  
   ```bash  
   git clone https://github.com/Mugisha-Joshua/WeatherApp_Formative.git 
   ```  
2. Navigate to the project folder:  
   ```bash  
   cd WeatherApp_Formative
   ```  
3. Open `index.html` in your browser.  

---

## API Details  

### APIs Used  
1. **Geocoding API** ([Documentation](https://open-meteo.com/en/docs)):  
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`  
   - Parameters:  
     - `name`: City name  
     - `count`: Number of results to fetch  
     - `language`: Language for results (default: English)  

2. **Weather Forecast API** ([Documentation](https://open-meteo.com/en/docs)):  
   - Endpoint: `https://api.open-meteo.com/v1/forecast`  
   - Parameters:  
     - `latitude` and `longitude`: Coordinates of the city  
     - `current_weather`: Boolean for fetching current weather  
     - `daily`: Fields to include in daily forecasts  

---

## Deployment Process  

### Hosting on Web Servers  
1. Prepared the application files (`HTML`, `CSS`, `JavaScript`) by ensuring they are complete and error-free.  
2. Uploaded the files to my WEB-01 and WEB-02 (i.e, via SFTP).
3. Configured nginx to serve the application. 

### Configuring the Load Balancer  
1. Deployed the application on the two web servers (e.g., `WEB-01` and `WEB-02`).  
2. Set up the load balancer using `HAPROXY`  to distribute traffic between the two servers.  
3. Configuration steps:  
   - Registered the two web servers (`WEB-01` and `WEB-02`) as target instances.
     
### Testing the Load Balancer  
1. Verified the application is accessible via the load balancer’s public IP and domain.  
2. Simulated multiple users accessing the application and confirm traffic is balanced.  
3. Test failover by shutting down one server and verifying that the other handles the requests seamlessly.  

---

## Challenges and Solutions  

1. **Challenge**: Integrating multiple APIs and handling inconsistent data.  
   - **Solution**: Implemented error handling in JavaScript to display user-friendly messages for API errors.  

2. **Challenge**: Load balancer not routing traffic properly.  
   - **Solution**: Corrected the server health checks and ensured both servers had identical configurations.  

3. **Challenge**: Displaying weather icons dynamically.  
   - **Solution**: Created a `weatherIcons` object to map weather codes to emojis.
4. **Challenge**: The Humidity display option isn't working and I haven't benn able to identify the bug and correct it.

---

## Credits and Resources  

- **API Providers**:  
  - [Open Meteo API](https://open-meteo.com/) for weather data.  

- **Icons and Fonts**:  
  - Weather icons represented with emojis.  
  - [Google Fonts](https://fonts.google.com/) for the Poppins font.  

- **Tools Used**:  
  - [Visual Studio Code](https://code.visualstudio.com/) for development.  
  - [Git](https://git-scm.com/) for version control.  

- **Acknowledgments**:  
  - The Open Meteo team for providing a free and reliable API.  
  - Web design tutorials and community forums for guidance.  
