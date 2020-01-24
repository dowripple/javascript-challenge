// from data.js
var tableData = data;

// YOUR CODE HERE!
// variable for the ufo sightings table
var table = d3.select('#ufo-table');
var tbody = table.select('tbody');

// variables for the filtering
// buttons (filter and clear)
var filterButton = d3.select('#filter-btn');
var clearButton = d3.select('#filter-clear');

// filter inputs
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

        var option = selectBox.append('option').text(optionArray[i]);

    }
}

// assemble the filter drop downs
addSelectOptions(filterCity, distinctValues(tableData, 'city'));
addSelectOptions(filterState, distinctValues(tableData, 'state'));
addSelectOptions(filterCountry, distinctValues(tableData, 'country'));
addSelectOptions(filterShape, distinctValues(tableData, 'shape'));

// function to filter the data
function filterData() {

        // get the date value for the filter
        var dateValue = filterDatetime.property('value');
        var cityValue = filterCity.property('value');
        var stateValue = filterState.property('value');
        var countryValue = filterCountry.property('value');
        var shapeValue = filterShape.property('value');

        var bolFilter = false;
        var filteredData = tableData;

        // if the filter is not empty, proceed
        if (dateValue != '') {
    
            // create a filtered dataset, matching on date
            filteredData = filteredData.filter(ufo => ufo.datetime === dateValue);
            bolFilter = true;
        
        } 
    
        // city
        if (cityValue != '') {

            // create a filtered dataset, matching on date
            filteredData = filteredData.filter(ufo => ufo.city === cityValue);
            bolFilter = true;

        }    
        
        // state filter
        if (stateValue != '') {

            filteredData = filteredData.filter(ufo => ufo.state === stateValue);
            bolFilter = true;
        }

        // country
        if (countryValue != '') {

            filteredData = filteredData.filter(ufo => ufo.country === countryValue);
            bolFilter = true;

        }

        // shapes
        if (shapeValue != '') {

            filteredData = filteredData.filter(ufo => ufo.shape === shapeValue);
            bolFilter = true;

        }
        // if any of the filters were used, create the table from the filter data set
        if (bolFilter) {
            
            // render the table with the filtered data
            renderTable(filteredData);

        } else {
            
            // render table with original data
            renderTable(tableData);

        }
}

// add function to the filter button
filterButton.on('click', function() {

    filterData();

});

// clear filter button
clearButton.on('click', function() {

    // clear the inputs
    filterDatetime.property('value','');
    filterCity.property('value','');
    filterState.property('value','');
    filterCountry.property('value','');
    filterShape.property('value','');

    // reinitialize the table (with no filters)
    filterData();

})

// also to the input for after update
filterDatetime.on('change', function() {
    filterData(); 
})
filterCity.on('change',function() {
    filterData();
})
filterState.on('change',function() {
    filterData();
})
filterCountry.on('change',function() {
    filterData();
})
filterShape.on('change',function() {
    filterData();
})

// initialize the table
renderTable(tableData);