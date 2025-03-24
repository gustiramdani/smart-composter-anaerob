function fetchData() {
    $.get('/get_latest_data', function(data) {
        if (data.error) {
            alert(data.error);
            return
        }

        console.log(data);

        $('#temperature').text(data.temperature);
        $('#humidity').text(data.humidity);
        $('#ph').text(data.ph);
        $('#flow-rate').text(data.flow_rate);
        $('#timestamp').text(new Date(data.timestamp).toLocaleString());

        updateTemperatureStyle(data.temperature);
        updateHumidityStyle(data.humidity);
        updatePhStyle(data.ph);
    });
}

function updateTemperatureStyle(temperature) {
    const tempCard = $('#temperature-card');
    if (temperature < 30) {
        tempCard.css('background-color', '#add8e6'); // Blue for cold
    } else if (temperature > 45) {
        tempCard.css('background-color', '#f44336'); // Red for hot
    } else {
        tempCard.css('background-color', '#ffffff'); // Default background
    }
}

function updateHumidityStyle(humidity) {
    const humidityCard = $('#humidity-card');
    if (humidity < 40) {
        humidityCard.css('background-color', '#ffeb3b'); // Yellow for dry
    } else if (humidity > 60) {
        humidityCard.css('background-color', '#03a9f4'); // Blue for wet
    } else {
        humidityCard.css('background-color', '#ffffff'); // Default background
    }
}

function updatePhStyle(ph) {
    const phCard = $('#ph-card');
    if (ph < 6) {
        phCard.css('background-color', '#f44336'); // Red for acidic
    } else if (ph > 8) {
        phCard.css('background-color', '#4caf50'); // Green for alkaline
    } else {
        phCard.css('background-color', '#ffffff'); // Default background
    }
}

fetchData();
setInterval(fetchData, 5000);

// Fetch Historical Data
function fetchHistoricalData() {
    $.get('/get_historical_data', function(data) {
        // Clear existing table rows
        $('#historical-data-table tbody').empty();

        // Iterate over the data and insert into the table
        data.forEach(function(row) {
            var timestamp = new Date(row[4]).toLocaleString();
            var rowHtml = `
                <tr>
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${timestamp}</td>
                </tr>
            `;
            $('#historical-data-table tbody').append(rowHtml);
        });
    });
}

fetchHistoricalData();
setInterval(fetchHistoricalData, 5000);

// style
// Scroll functions
function scrollToHistorical() {
    document.getElementById('historical-section').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToRealtime() {
    document.getElementById('realtime-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Function to export the table data to a CSV file
function exportToCSV() {
    const table = document.getElementById('historical-data-table');
    const rows = table.querySelectorAll('tr');
    
    let csvContent = '';
    
    // Loop through each row of the table and build CSV content
    rows.forEach(row => {
        const columns = row.querySelectorAll('th, td');
        let rowData = [];
        columns.forEach(column => {
            rowData.push(column.innerText);
        });
        csvContent += rowData.join(',') + '\n';
    });
    
    // Create a temporary link element for downloading the CSV file
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    link.target = '_blank';
    link.download = 'historical_data.csv';
    
    // Trigger the download
    link.click();
}
