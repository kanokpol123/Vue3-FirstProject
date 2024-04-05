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
            li.classList.add('col-md-4', 'mb-4'); // เพิ่มคลาส Bootstrap สำหรับการจัดขนาดและระยะห่าง

            // สร้าง div สำหรับ dynamic card ของ Bootstrap
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'h-100');

            // เพิ่มรูปภาพใน dynamic card
            const img = document.createElement("img");
            img.src = place.img;
            img.alt = place.name;
            img.classList.add('card-img-top'); // เพิ่มคลาส Bootstrap สำหรับการจัดตำแหน่งรูป


            // กำหนดความสูงและความกว้างของรูปภาพ
            img.style.width = "100%";
            img.style.height = "200px";
            // สร้าง div สำหรับเนื้อหาของ dynamic card
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // เพิ่มชื่อสถานที่ลงใน dynamic card
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = place.name;

            // เพิ่มที่ตั้งสถานที่ลงใน dynamic card
            const cardLocation = document.createElement('p');
            cardLocation.classList.add('card-text', 'text-primary');
            cardLocation.textContent = `ที่ตั้ง: ${place.location}`;

            // นำ element ทั้งหมดมาเรียงลงในกันตามลำดับ
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardLocation);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            li.appendChild(cardDiv);

            // เมื่อคลิกที่ dynamic card ให้แสดงข้อความ
            li.addEventListener("click", function() {
                alert(`สถานที่: ${place.name}\nที่ตั้ง: ${place.location}`);
            });

            resultsList.appendChild(li);
        });
    }
    
});
