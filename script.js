// your-script.js



$(document).ready(function() {
    // Attach event listeners for filter boxes
    fetchData('all', '');

    $('#level').on('input', function() {
      filterData('level', $(this).val());
      console.log($(this).val());
      console.log("sucess");
    });
  
    $('#timestamp').on('input', function() {
      filterData('timestamp', $(this).val());
    });
  
    $('#resourceId').on('input', function() {
      filterData('resourceId', $(this).val());
      console.log($(this).val());
      console.log("sucess");
    });
  
    $('#spanId').on('input', function() {
      filterData('spanId', $(this).val());
    });
  
    $('#commit').on('input', function() {
      filterData('commit', $(this).val());
    });
  
    $('#traceId').on('input', function() {
      filterData('traceId', $(this).val());
    });
  
    // Attach event listener for message input
    $('#msgInput').on('input', function() {
      searchData();
    });
  });
  
  // Function to filter data based on the selected criterion
  function filterData(criterion, value) {
    fetchData(criterion, value);
  }
  
  // Function to search data by message
  function searchData() {
    const message = $('#msgInput').val();
    fetchData('message', message);
  }
  
  // Function to fetch data from the backend
  function fetchData(criterion, value) {
    // port change
    $.get(`http://localhost:3000/allData?${criterion}=${value}`, function(data) {

      updateResultContainer(data);
    });
  }
  
  // Function to update the result container with the received data
  function updateResultContainer(data) {
    // Parse the JSON data (assuming it's JSON)
  
    console.log(data);
    try {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
    } catch (error) 
    {
      console.log(error);
    }
   
  //  console.log(parsedData);
    // Update the #resultContainer with the formatted data
    const resultContainer = $('#resultContainer');
    resultContainer.empty(); // Clear previous content
  
    data.forEach(item => {
      
      const div = $('<div>').addClass('log-item');
      const line = `<strong>Resource ID:</strong> ${item.resourceId}, ` +
                   `<strong>Level:</strong> ${item.level}, ` +
                   `<strong>Message:</strong> ${item.message}, ` +
                   `<strong>Timestamp:</strong> ${item.timestamp}, ` +
                   `<strong>Trace ID:</strong> ${item.traceId}, ` +
                   `<strong>Span ID:</strong> ${item.spanId}, ` +
                   `<strong>Commit:</strong> ${item.commit}`;
      
      div.html(line);
      resultContainer.append(div);
      // Add more properties as needed
      
    });
  }
  
 