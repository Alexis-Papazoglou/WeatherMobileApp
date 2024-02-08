# WeatherMobileApp

This is a weather forecast application built with React and JavaScript. It allows users to view the current weather and forecast for multiple locations.

## Features

- View current weather for multiple locations
- View detailed forecast for the next few days and hours
- Add and remove locations
- Automatically detect your current location

## Installation

To install the project, follow these steps:

```
npm install
```

## Usage
To run the project:
```
npm start
```

# Screens
- AddLocation.jsx: This screen is used to add a new location.
- Locations.jsx: This screen displays a list of all added locations.
- SpecificLocation.jsx: This screen shows the current weather and forecast for a specific location.
# Components
- FollowingDays/DayForecastCard.jsx: This component displays the forecast for a specific day.
- FollowingDays/DayModal.jsx: This component is a modal that shows detailed forecast for a specific day.
- FollowingDays/FollowingDaysCardsContainer.jsx: This component is a container for DayForecastCard components.
- FollowingHoursCardsContainer.jsx: This component is a container for FollowingHoursSingleCard components.
- FollowingHoursSingleCard.jsx: This component displays the forecast for a specific hour.
- NavigationBar.jsx: This component is the navigation bar for the application.
- WeatherLocationsCard.jsx: This component displays the current weather for a specific location.
# Context
- WeatherContext.js: This context provides weather data to the components.
# Hooks
- fetchLocationDetails.js: This hook fetches the weather data for a specific location.
# Utilities
- utils.js: This file contains utility functions that are used throughout the application.
# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
