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
        <button @click="redirectToSignUp" type="button" class="btn btn-primary">Sign-up</button>
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
                v-model="searchText"
                class="form-control border rounded-pill"
                type="text"
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
          <div v-for="place in filteredPlaces" :key="place.id" class="col-md-4 mb-4">
            <div @click="showPlaceDetails(place)" class="card h-100">
              <img :src="place.img" :alt="place.name" class="card-img-top" style="width: 100%; height: 200px;">
              <div class="card-body">
                <h5 class="card-title">{{ place.name }}</h5>
                <p class="card-text text-primary">ที่ตั้ง: {{ place.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const searchText = ref('');
const places = ref([]);

onMounted(() => {
  fetchPlaces();
});

function fetchPlaces() {
  fetch("places.json")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("places", JSON.stringify(data));
      places.value = data;
    })
    .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล: ", error));
}

const filteredPlaces = computed(() => {
  return places.value.filter(place => place.name.toLowerCase().includes(searchText.value.toLowerCase()));
});

function showPlaceDetails(place) {
  alert(`สถานที่: ${place.name}\nที่ตั้ง: ${place.location}`);
}

function redirectToSignUp() {
  
}
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
