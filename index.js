// Main function that runs all of the functions
const main = async () => {
  // Calls the fetchData function to get the data. 
  const data = await fetchData();

  const rocketLaunchArray = await getRocketLaunchArray(data);

  for (const launch of rocketLaunchArray) {
    displayLaunch(launch.rocketName, launch.windowStart, launch.windowEnd);
    console.log(launch.rocketName)
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

const getRocketLaunchArray = async (data) => {
  const rocketLaunchArray = [];

  for (const launch of data.results) {
    const rocketId = launch.id;
    const rocketName = launch.name;
    const rocketImage = launch.image;
    const windowStart = launch.window_start;
    const windowEnd = launch.window_end;
    rocketLaunchArray.push({ rocketId, rocketName, rocketImage, windowStart, windowEnd });
  }

  return rocketLaunchArray;
};

const displayLaunch = async (rocketName, windowStart, windowEnd) => {
  let name = document.querySelector('#RocketName');
  let start = document.querySelector('#WindowStart');
  let end = document.querySelector('#WindowEnd');

  name.textContent = rocketName;
  start.textContent = windowStart;
  end.textContent = windowEnd;
}

main();
