<template>
  <body>
    <h1>Đo nhịp tim</h1>
    <p>Nhịp tim: {{ lastestEntry }}</p>
    <!-- <div class="iconSVGPulse">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        viewBox="0 0 5184 3844.17"
      >
        <path
          class="path-pulse"
          d="M472.68,2183.89h678.94c3.36,0,10.34-2.87,7.41-7.14l40.53-160.91c2.68-10.61,14.23-8.97,15.19,2.16l30.25,352.19c.99,11.57,13.2,12.68,15.35,1.4l51.88-272.25c1.69-8.83,10.4-10.78,14.13-3.15l40.54,82.96c1.45,2.95,3.91,4.74,6.55,4.74h92.41c3.66,0,6.83-3.41,7.63-8.19l76.04-452.87c1.97-11.69,14.66-10.54,15.43,1.39l53.31,824.56c.79,12.22,13.9,13.01,15.49,.93l66.68-504.25c1.55-11.69,14.13-11.48,15.44,.27l14.52,129.22c.58,5.13,3.87,8.93,7.74,8.93h513.59c3.32,0,6.29-2.81,7.39-7l45.1-171.76c2.66-10.09,13.55-9.01,15.07,1.49l51.17,354.1c1.62,11.17,13.47,11.39,15.32,.29l49.66-298.57c1.71-10.3,12.41-11.15,15.02-1.19l30.26,115.63c1.1,4.2,4.06,7.02,7.39,7.02h125.72c3.82,0,7.07-3.7,7.71-8.75l45.45-361.07c1.51-11.95,14.4-11.53,15.48,.5l58.23,649.83c1.04,11.64,13.38,12.56,15.38,1.14l83.84-478.87c1.95-11.17,13.94-10.63,15.33,.69l35.02,283.79c1.23,9.97,11.25,12.07,14.68,3.06l32.28-84.6c1.34-3.51,4.03-5.71,6.97-5.71h425.48c3.55,0,6.65-3.21,7.56-7.81l29.65-150.4c2.09-10.62,13.42-10.33,15.2,.4l65.6,394.9c1.81,10.86,13.32,10.99,15.25,.16l72.68-407.51c1.94-10.92,13.61-10.65,15.27,.35l40.26,266.12c1.6,10.56,12.61,11.41,15.11,1.16l21.96-90.15c1.05-4.32,4.05-7.24,7.44-7.24h133.92c3.78,0,7.01-3.61,7.7-8.59l58.47-424.26c1.66-11.99,14.66-11.19,15.49,.95l51.88,760.5c.82,11.97,13.57,12.99,15.44,1.23l78.72-493.98c1.74-10.95,13.34-11.12,15.26-.23l27.61,156.3c.84,4.73,3.99,8.08,7.61,8.08h550.56"
          style="
            fill: none;
            stroke: #d30909;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 29px;
          "
        ></path>
      </svg>
    </div> -->
    <div class="heart">&#x2665;</div>
    <div class="container-img">
      <img
        :class="{ 'filter-gray': active1 }"
        src="../assets/image/sick.png"
        alt=""
      />
      <img
        :class="{ 'filter-gray': active2 }"
        src="../assets/image/sad.png"
        alt=""
      />
      <img
        :class="{ 'filter-gray': active3 }"
        src="../assets/image/confused.png"
        alt=""
      />
      <img
        :class="{ 'filter-gray': active4 }"
        src="../assets/image/good.png"
        alt=""
      />
      <img
        :class="{ 'filter-gray': active5 }"
        src="../assets/image/love.png"
        alt=""
      />
    </div>
  </body>
</template>

<script>
import { listenForLastEntry } from "../firebaseService";
export default {
  data() {
    return {
      lastestEntry: null,
      active1: true,
      active2: true,
      active3: true,
      active4: false,
      active5: true,
    };
  },
  watch: {
    lastestEntry() {
      console.log(this.lastestEntry);
      switch (this.lastestEntry) {
        case this.lastestEntry === 0:
          this.active1 = false;
          this.active2 = true;
          this.active3 = true;
          this.active4 = true;
          this.active5 = true;
          break;
        case this.lastestEntry <= 50:
          this.active2 = false;
          this.active1 = true;
          this.active3 = true;
          this.active4 = true;
          this.active5 = true;
          break;
        case this.lastestEntry >= 60 && this.lastestEntry <= 100:
          this.active5 = false;
          this.active1 = true;
          this.active2 = true;
          this.active3 = true;
          this.active4 = true;
          break;
        case this.lastestEntry >= 100:
          this.active4 = false;
          this.active1 = true;
          this.active2 = true;
          this.active3 = true;
          this.active5 = true;
          break;

        case this.lastestEntry <= 60 || this.lastestEntry >= 130:
          this.active3 = true;
          this.active1 = false;
          this.active2 = false;
          this.active4 = false;
          this.active5 = false;
          break;
      }
    },
  },
  created() {
    try {
      const path = "/Data/R6CAj4ELPGPAtUXwFeorSrBlaBx1/Max30100_Readings"; // Specify the path to listen for the last entry
      listenForLastEntry(path, (entry) => {
        const lastEntry = entry;
        for (const id in lastEntry) {
          this.lastestEntry = lastEntry[id]["heartRate"];
        }
        // this.lastestEntry = lastEntry[0]["heartRate"];
        // this.loading = false;
      });
    } catch (error) {
      console.error("Error setting up listener:", error);
    }
  },
};
</script>

<style scoped>
/*  Pulse Animation */
body {
  text-align: center;
  width: 100%;
}
h1 {
  /* position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%); */
  font-weight: 500;
  color: white;
  font-size: 30px;
  text-align: center;
}

p {
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  color: white;
}
.container-img {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.container-img img {
  height: 50px;
  width: 50px;
}
/* .iconSVGPulse {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
  width: 100%;
} */
.filter-gray {
  filter: grayscale(100%);
}
/* .iconSVGPulse .path-pulse {
  stroke-dasharray: 6423;
  animation: dashPathPulse 5s linear infinite;
} */
.heart {
  font-size: 150px;
  color: #e00;
  animation: beat 0.25s infinite alternate;
  transform-origin: center;
}

/* Heart beat animation */
@keyframes beat {
  to {
    transform: scale(1.4);
  }
}

@keyframes dashPathPulse {
  0% {
    stroke-dashoffset: 12423;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>
