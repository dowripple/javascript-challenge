// from data.js
var tableData = data;

// variable for the ufo sightings table
var table = d3.select('#ufo-table');
var tbody = table.select('tbody');

// variables for the filtering
var filterButton = d3.select('#filter-btn');
var filterDatetime = d3.select('#datetime');

// function to render the html table from the passed in json
function renderTable(tableData) {

    // reset the table body html
    tbody.html('');

    // loop through the data, adding a row to the html table 
    tableData.forEach(ufo => {

        // new row
        var row = tbody.append('tr');

        // iterate over the entries within the row
        Object.entries(ufo).forEach(([key, value]) => {
            
            // the columns are in the same order as the html, so just append
            row.append('td').text(value)

        });
    });
};

// function to filter the data
function filterData() {

        // get the date value for the filter
        var filterDate = filterDatetime.property('value');

        // if the filter is not empty, proceed
        if (filterDate != '') {
    
            // create a filtered dataset, matching on date
            var filteredData = tableData.filter(ufo => ufo.datetime === filterDate);
    
            // render the table with the filtered data
            renderTable(filteredData);
    
        } else {
    
            // reset the table with the original data
            renderTable(tableData);
        }
}

// add function to the filter button
filterButton.on('click', function() {

    filterData();

});

// also to the input for after update
filterDatetime.on('change', function() {
    
    filterData();
    
})

// initialize the table
renderTable(tableData);