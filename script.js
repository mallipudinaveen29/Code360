
async function fetchDataAndFilter(url, filters) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        const filteredData = filterData(data, filters);
        //  console.log(filteredData);
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for(let product of filteredData){

            out += `
                <tr>
                    <td>${product.level}</td>
                    <td>${product.log_string}</td>
                    <td>${product.timestamp}</td>
                    <td>${product.metadata.source}</td>
                </tr>
            `;
            }
            placeholder.innerHTML = out;
         } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function filterData(data, filters) {
    let filteredData = data;
    //    console.log(filters);
    //    console.log(filters["level"]);

    for (var filterName in filters) {

            // console.log(filterName);
       
        let filterValue = filters[filterName];
        // console.log(filterValue.toString());
        
        if (filterValue !== '') { // Check if filter value is not empty
            filteredData = applyFilter(filteredData, filterName.toString(), filterValue.toString());
            console.log(filterData);
        }
    }

    return filteredData;
}

function applyFilter(data, filterName, filterValue) {
    // Implement logic to filter data based on filter name and value
    // This function depends on the structure of your data and the filtering logic
    
   
    if (filterName === "level") {
        // console.log(filterValue);
        return data.filter(item => item.level === filterValue);
    } else if (filterName === "log_string") {
        return data.filter(item => item.log_string <= filterValue);
    } else if (filterName === "timestamp") {
        return data.filter(item => item.timestamp === filterValue);
    }
    else if(filterName === "metadata.source"){
        return data.filter(item => item.metadata.source === filterValue);
    }
    

    return data;
}

// Example usage:
const url = 'file.json'; // Replace 'data.json' with the path to your JSON file

// var formData = [];
var jsonData = {};
function convertToJson() {
    // Get form data
    var formData = new FormData(document.getElementById("dataForm"));
    
    // Convert FormData object to JSON
    // var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });

    // Use JSON data in script.js
    console.log(jsonData);
    // console.log(jsonData);
    fetchDataAndFilter(url, jsonData);


}


    







