document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const resultsList = document.getElementById("resultsList");

    // โหลดข้อมูลจากไฟล์ JSON
    fetch("places.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("places", JSON.stringify(data));

            // เมื่อพิมพ์ในช่องค้นหา
            searchInput.addEventListener("input", function() {
                const searchText = searchInput.value.toLowerCase();
                const places = JSON.parse(localStorage.getItem("places")) || [];

                // กรองสถานที่ที่ตรงกับการค้นหา
                const filteredPlaces = places.filter(place => place.name.toLowerCase().includes(searchText));

                // แสดงผลลัพธ์
                displayResults(filteredPlaces);
            });

            // แสดงผลลัพธ์ในรอบแรก
            displayResults(data);
        })
        .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล: ", error));


    function displayResults(places) {
        resultsList.innerHTML = "";
        places.forEach(place => {
            const li = document.createElement("div");
            li.classList.add('col-md-4', 'mb-4'); 

            
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'h-100');

            
            const img = document.createElement("img");
            img.src = place.img;
            img.alt = place.name;
            img.classList.add('card-img-top'); 


            
            img.style.width = "100%";
            img.style.height = "200px";
            
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = place.name;

            
            const cardLocation = document.createElement('p');
            cardLocation.classList.add('card-text', 'text-primary');
            cardLocation.textContent = `ที่ตั้ง: ${place.location}`;

            
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardLocation);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            li.appendChild(cardDiv);

            
            li.addEventListener("click", function() {
                alert(`สถานที่: ${place.name}\nที่ตั้ง: ${place.location}`);
            });

            resultsList.appendChild(li);
        });
    }
    
});
