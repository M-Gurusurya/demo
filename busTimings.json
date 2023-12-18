function updateTime() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    document.getElementById('current-time').textContent = currentTime;
  }
  
  // Update time every second
  setInterval(updateTime, 1000);
  
  // Initial call to display time immediately
  updateTime();
  
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

  const currentTime = new Date().getTime();
  const nextBuses = busData
    .filter(bus => bus.from_location === fromLocation && bus.to_location === toLocation)
    .sort((a, b) => new Date(`01/01/2023 ${a.time}`) - new Date(`01/01/2023 ${b.time}`))
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

// Event listener for the button click
const showBusesButton = document.getElementById('showBuses');
showBusesButton.addEventListener('click', getNextBuses);

