function getCurrentTime() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be displayed as 12

  const formattedTime = `${hours}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)} ${ampm}`;
  return formattedTime;
}

function addLeadingZero(timeUnit) {
  return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
}

// Display current time in hh:mm:ss am/pm format
setInterval(function() {
  const currentTime = getCurrentTime();
  document.getElementById('current-time').textContent = currentTime; // Replace with how you want to display the time
}, 1000); // Update every second
  
  const busScheduleFile = 'busTimings.json';
  let busData;
    fetch(busScheduleFile)
    .then(response => response.json())
    .then(data => {
        busData = data;
    })
    .catch(error => {
        console.error('Error fetching bus schedule:', error);
    });

// Function to get the next three buses
function getNextBuses() {
  const fromLocation = document.getElementById('from').value;
  const toLocation = document.getElementById('to').value;

  if (!busData) {
    console.error('Bus data not available');
    return;
  }

  const currentTime = new Date(); // Get current time
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentAMPM = (currentHours >= 12) ? "PM" : "AM";

  const nextBuses = busData
    .filter(bus => bus.from_location === fromLocation && bus.to_location === toLocation)
    .sort((a, b) => new Date(`01/01/2023 ${a.time}`) - new Date(`01/01/2023 ${b.time}`))
    .filter(item => {
      // Extract hours, minutes, and AM/PM from the time string
      const [time, ampm] = item.time.split(' ');
      const [hours, minutes] = time.split(':').map(num => parseInt(num));
  
      // Convert timings to 24-hour format for comparison
      let hours24 = hours;
      if (ampm === "PM" && hours !== 12) {
        hours24 += 12;
      } else if (ampm === "AM" && hours === 12) {
        hours24 = 0;
      }
  
      // Compare timings
      if (
        (hours24 > currentHours || (hours24 === currentHours && minutes > currentMinutes)) &&
        ampm === currentAMPM
      ) {
        return true;
      }
      return false;
    })
    .slice(0, 3);

    // Result
    
    const busInfoElement = document.getElementById('busInfo');
    busInfoElement.innerHTML = '';
    
    if (nextBuses.length === 0) {
      busInfoElement.textContent = 'No upcoming buses found.';
      return;
    }
    
    const table = document.createElement('table');
    const tableHeader = document.createElement('tr');
    ['Sno', 'Time', 'Bus Name'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      tableHeader.appendChild(th);
    });
    table.appendChild(tableHeader);
    
    nextBuses.forEach((bus, index) => {
      const row = document.createElement('tr');
      
      const snoCell = document.createElement('td');
      snoCell.textContent = index + 1;
      row.appendChild(snoCell);
    
      const timeCell = document.createElement('td');
      timeCell.textContent = bus.time;
      row.appendChild(timeCell);
    
      const busNameCell = document.createElement('td');
      busNameCell.textContent = bus.bus_name;
      row.appendChild(busNameCell);
    
      table.appendChild(row);
    });
    
    busInfoElement.appendChild(table);
}

const showBusesButton = document.getElementById('showBuses');
showBusesButton.addEventListener('click', getNextBuses);

function getAllBuses() {
  const fromLocation = document.getElementById('from').value;
  const toLocation = document.getElementById('to').value;

  if (!busData) {
    console.error('Bus data not available');
    return;
  }

  const nextBuses = busData
    .filter(bus => bus.from_location === fromLocation && bus.to_location === toLocation)
    .sort((a, b) => new Date(`01/01/2023 ${a.time}`) - new Date(`01/01/2023 ${b.time}`))

    // Result
    const busInfoElement = document.getElementById('busInfo');
    busInfoElement.innerHTML = '';
    
    if (nextBuses.length === 0) {
      busInfoElement.textContent = 'No upcoming buses found.';
      return;
    }
    
    const table = document.createElement('table');
    const tableHeader = document.createElement('tr');
    ['Sno', 'Time', 'Bus Name'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      tableHeader.appendChild(th);
    });
    table.appendChild(tableHeader);
    
    nextBuses.forEach((bus, index) => {
      const row = document.createElement('tr');
      
      const snoCell = document.createElement('td');
      snoCell.textContent = index + 1;
      row.appendChild(snoCell);
    
      const timeCell = document.createElement('td');
      timeCell.textContent = bus.time;
      row.appendChild(timeCell);
    
      const busNameCell = document.createElement('td');
      busNameCell.textContent = bus.bus_name;
      row.appendChild(busNameCell);
    
      table.appendChild(row);
    });
    
    busInfoElement.appendChild(table);
}

const showAllBusesButton = document.getElementById('showAll');
showAllBusesButton.addEventListener('click', getAllBuses);

