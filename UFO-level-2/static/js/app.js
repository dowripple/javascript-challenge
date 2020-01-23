// from data.js
var tableData = data;

// YOUR CODE HERE!
// variable for the ufo sightings table
var table = d3.select('#ufo-table');
var tbody = table.select('tbody');

// variables for the filtering
var filterButton = d3.select('#filter-btn');
var filterDatetime = d3.select('#datetime');
var filterCity = d3.select('#city');
var filterState = d3.select('#state');
var filterCountry = d3.select('#country');
var filterShape = d3.select('#shape');

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

// function to pull distinct value lists out of a json object
function distinctValues(myData, myKey) {

    // array to store the distinct values
    var vals = [];

    // found this snippet on codeburst.io (https://codeburst.io/javascript-array-distinct-5edc93501dc4)
    // returns a distinct list of values from an object's key/column
    vals = [...new Set(tableData.map(x => x[myKey]))];

    // sort the list for a better user experience
    vals.sort();
    
    // return back the list of unique, sorted values
    return vals;

}

// function that will populate a drop down list, from passed in array
function addSelectOptions(selectBox, optionArray) {

    // loop through array, adding 1 option per row
    for (var i=0; i < optionArray.length; ++i) {

        // create the option
        var option = document.createElement('OPTION');
        option.text = optionArray[i];
        option.value = optionArray[i];

        // append to the select
        selectBox.add(option);
        // selectBox.append(option);
    }
}

// assemble the filter drop downs
var cities = distinctValues(tableData, 'city');

// console.log(filterCity)
var option = document.createElement('option');
option.text = 'test';
option.value = 'test';

filterCity.optionArray.add(option)

// addSelectOptions(filterCity, distinctValues(tableData, 'city'));

// test function to console log
// var cities = [];

// cities = distinctValues(data, 'city');

// console.log(cities)

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