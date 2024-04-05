<template>
  <div>
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 px-5">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <h2>LOGO</h2>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 ">Home</a></li>
        <li><a href="#" class="nav-link px-2 ">Features</a></li>
        <li><a href="#" class="nav-link px-2 ">Pricing</a></li>
        <li><a href="#" class="nav-link px-2 ">FAQs</a></li>
        <li><a href="#" class="nav-link px-2 ">About</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </header>

    <main>
      <div class="hero-box">
        <div class="px-4  text-center">
          <video autoplay loop muted plays-inline class="back-video">
            <source src="https://videos.pexels.com/video-files/4782483/4782483-uhd_3840_2160_30fps.mp4" type="video/mp4">
          </video>
          <h1 class="display-5 fw-bold">ค้นหาสถานที่ท่องเที่ยว</h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
                We bring you tailored travel experiences that cater to your adventurous spirit.
            </p>

            <div class="col-md-5 mx-auto">
              <input
                class="form-control border rounded-pill"
                type="text"
                id="searchInput"
                placeholder="ค้นหาชื่อสถานที่..."
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container px-4 py-5 my-3" id="custom-cards">
        <h2 class="pb-2 border-bottom">สถานที่ท่องเที่ยว</h2>
        <p style="color: rgb(2, 118, 207);">ค้นพบสถานที่ท่องเที่ยวที่คุณค้นหา</p>
        <div class="row" id="resultsList">
          <!-- สถานที่ท่องเที่ยวจะถูกแสดงที่นี่ -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
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

</script>

<style>

header h2 {
    font-weight: 500;
    color: #ffffff;
}

.display-5 {
    color: #fefefe;
    text-shadow: 2px 2px 8px #000000;
}

.lead {
    color: #fefefe;
}

.nav .nav-link {
    color: #fefefe;
} 

.nav .nav-link:hover {
  color: #000000;
}
.col-md-3 .btn-primary {
    color: #000000;
    background-color: #ffffff;
    border-color: #ffffff;
    border-radius: 18px;
}


.back-video {
  background-color: #000000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    object-fit: cover; /* จัดให้วิดีโอเต็มพื้นที่ */
    z-index: -1;
    filter: brightness(60%); /* ปรับความสว่างลงเหลือ 70% */
}
</style>