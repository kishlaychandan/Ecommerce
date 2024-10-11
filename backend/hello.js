async function fetchData() {
    try {
        const response = await fetch("https://capi.mini.store/api/v1/stores/hyki/catalog");

        
        if (!response.ok) {
            console.log("not ok");
            
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // console.log(response);
        
        const data = await response.json();
        console.log(data.data.products); 
    } catch (err) {
        console.log(err.message);
    }
}

fetchData();
