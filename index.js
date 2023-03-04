// Main function that runs all of the functions
const main = async () => {

  // Calls the fetchData function to get the data. 
  const data = await fetchData();

  const rocketLaunchArray = await getRocketLaunchArray(data);

  const rocketLaunchesDiv = document.querySelector('#rocketLaunches');

  for (const launch of rocketLaunchArray) {
    const precipitationProbability = await fetchWeather(launch.latitude, launch.longitude, launch.windowStart);
    const launchDiv = document.createElement('div');
    launchDiv.classList.add('launch'); // Add class to launchDiv
    launchDiv.innerHTML = `
      <h2>${launch.rocketName}</h2>
      <img src="${launch.rocketImage}" alt="${launch.rocketName}">
      <p>Window Start: ${launch.windowStart}</p>
      <p>Window End: ${launch.windowEnd}</p>
      <p>${launch.description}</p>
    `;
    if (typeof precipitationProbability !== 'undefined') {
      launchDiv.innerHTML += `<p>Precipitation Probability on Launch Day: ${precipitationProbability}%</p>`;
    }
    rocketLaunchesDiv.appendChild(launchDiv);
  }
  

}

const fetchData = async () => {
  try {
    const response = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const fetchWeather = async (latitude, longitude, windowStart) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_2m&daily=precipitation_probability_mean&timezone=auto`);
    const data = await response.json();
    console.log("This is weather data below");
    console.log(data);
    const days = data.daily.time;
    const index = days.indexOf(windowStart.substring(0, 10));
    const precipitationProbability = data.daily.precipitation_probability_mean[index];
    return precipitationProbability;
  } catch (error) {
    throw error;
  }
}




const getRocketLaunchArray = async (data) => {
  const rocketLaunchArray = [];

  for (const launch of data.results) {
    const rocketId = launch.id;
    const rocketName = launch.name;
    const rocketImage = launch.image;
    const windowStart = launch.window_start;
    const windowEnd = launch.window_end;
    const description = launch.mission.description;
    const latitude = launch.pad.latitude;
    const longitude = launch.pad.longitude;
    rocketLaunchArray.push({ rocketId, rocketName, rocketImage, windowStart, windowEnd, description, latitude, longitude });
  }

  return rocketLaunchArray;
};

main();
