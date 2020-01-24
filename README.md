# javascript-challenge
## by Michael Dowlin
## 1/23/20

### Description
The project is seperated out into two folders, one for each part.  Each folder has the requisite html, js, css and data needed for the sites to run.

#### Level 1: Automatic Table and Date Search (Required)
I used the default html page provided in the assignment.  The javascript file app.js contains a function called "render table", which iterates over the json data and writes out a table row (tr) and cells (td) for each row/field of the data.  Fortunately the data object is laid out exactly like the html table, so I don't need to check field names.  The js file has a second function called "filterData", which will iterate over the data object and, using filter, limit the rows to where the date matches.  (If the filter date input doesn't have a value, the entire, original table is returned.) 

#### Level 2: Multiple Search Categories (Optional)
Level 2 has much of the same functionality as the first part (renderTable and filterTable functions).  There are new functions to provide the user the ability to filter by all of the fields in the data.  A function called "distinctValues" returns an array of distinct values of a field.  The arguments are the data object and the field (key).  I made another function called "addSelectOptions" which takes in a select object and an array of values (that will become the select's options).  Using those functions, I made a series of calls to populate the new filter select objects (i.e. "addSelectOptions(filterCity, distinctValues(tableData, 'city'));").  I also added a filter reset button, so the user can clear all filters and start over.  I added function calls to the filterData function, so that it would run anytime a filter object is changed.

#### Next Level: Intelligent Search Categories (will come back)
For next steps, I would make more intelligent filter controls, that use the other filter values.  So if "ca" is selected as a state, only California cities would show up in the city drop-down list.  

#### Contents

| File                         | Description                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
|UFO-level-1\index.html        | html page for part one of the assignment                                                        |
|UFO-level-1\static\js\app.js  | javascript file for part one of the assignment                                                  |
|UFO-level-2\index.html        | html page for part two of the assignment                                                        |
|UFO-level-2\static\js\app.js  | javascript file for part two of the assignment                                                  |
