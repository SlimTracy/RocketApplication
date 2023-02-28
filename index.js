// Main function that runs all of the functions
const main = async () => {
  // Calls the fetchData function to get the data. 
  const data = await fetchData();

  const rocketLaunchArray = await getRocketLaunchArray(data);

  const rocketLaunchesDiv = document.querySelector('#rocketLaunches');

  for (const launch of rocketLaunchArray) {
    const launchDiv = document.createElement('div');
    launchDiv.classList.add('launch'); // Add class to launchDiv
    launchDiv.innerHTML = `
      <h2>${launch.rocketName}</h2>
      <img src="${launch.rocketImage}" alt="${launch.rocketName}">
      <p>Window Start: ${launch.windowStart}</p>
      <p>Window End: ${launch.windowEnd}</p>
      <p>${launch.description}</p>
    `;
    rocketLaunchesDiv.appendChild(launchDiv);
  }
}

const fetchData = async () => {
  try {
    const response = await fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}



const fetchWeather = async () => {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.41&longitude=-80.60&timezone=auto&hourly=temperature_2m,dewpoint_2m,precipitation');
    const data = await response.json();

    console.log("This is weather data below");
    console.log(data);
    
    return data;
  } catch (error) {
    throw error;
  }
}

fetchWeather();


// Now we can see if the launch data has precipatation that day. 

// If we have weather data for the launch data put that in the ui.

// If we don't have weather data for the launch date, we can go ahead and show an icon tha says no weather data at this time.











const getRocketLaunchArray = async (data) => {
  const rocketLaunchArray = [];

  for (const launch of data.results) {
    const rocketId = launch.id;
    const rocketName = launch.name;
    const rocketImage = launch.image;
    const windowStart = launch.window_start;
    const windowEnd = launch.window_end;
    const description = launch.mission.description;
    rocketLaunchArray.push({ rocketId, rocketName, rocketImage, windowStart, windowEnd, description });
  }

  return rocketLaunchArray;
};

main();
