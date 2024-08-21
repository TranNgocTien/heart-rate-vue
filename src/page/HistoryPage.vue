<template>
  <body>
    <h1>Lịch sử đo nhịp tim</h1>

    <ul>
      <li class="history-list-item" v-for="data in datas" :key="data.id">
        <div class="time">
          <p>Thời gian:</p>

          <p>{{ data.epochTime }}</p>
        </div>
        <div class="rate">
          <p>Nhịp tim:</p>

          <p>{{ data.heartRate }}</p>
        </div>
      </li>
    </ul>
  </body>
</template>

<script>
import { listenForLastTenEntries } from "../firebaseService";
import { format } from "date-fns";
export default {
  data() {
    return {
      tutorials: [],
      datas: [],
    };
  },

  created() {
    try {
      const path = "/Data/R6CAj4ELPGPAtUXwFeorSrBlaBx1/Max30100_Readings"; // Specify the path to listen for last ten entries
      listenForLastTenEntries(path, (entries) => {
        const lastTenEntries = entries;
        this.datas = [];
        for (const id in lastTenEntries) {
          this.datas.push({
            id: id,
            epochTime: this.formatTime(lastTenEntries[id]["epoch_time"]),
            heartRate: lastTenEntries[id]["heartRate"],
          });
        }
        // this.loading = false;
      });
    } catch (error) {
      console.error("Error setting up listener:", error);
    }
  },

  // async created() {
  //   try {
  //     const path = "/Data/R6CAj4ELPGPAtUXwFeorSrBlaBx1/Max30100_Readings";

  //     const results = await getLastTenEntries(path);

  //     for (const id in results) {
  //       this.datas.push({
  //         id: id,
  //         epochTime: this.formatTime(results[id]["epoch_time"]),
  //         heartRate: results[id]["heartRate"],
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error loading data:", error);
  //   } finally {
  //     this.loading = false;
  //   }
  // },
  // computed: {
  //   formatTime(epochTime) {
  //     const date = new Date(epochTime * 1000); // Convert seconds to milliseconds
  //     return format(date, "PPpp");
  //   },
  // },
  methods: {
    formatTime(epochTime) {
      const date = new Date(epochTime * 1000); // Convert seconds to milliseconds
      return format(date, "PPpp");
    },
    // onDataChange(items) {
    //   let _tutorials = [];
    //   items.forEach((item) => {
    //     let key = item.key;
    //     let data = item.val();
    //     _tutorials.push({
    //       key: key,
    //       title: data.title,
    //       description: data.description,
    //       published: data.published,
    //     });
    //   });
    //   this.tutorials = _tutorials;
    // },
  },
};
</script>

<style scoped>
body {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  color: white;
  font-size: 2rem;
}
.history-list-item {
  width: 30rem;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 10px;
}
.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.time p {
  color: white;
}
.rate {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rate p {
  color: white;
}
</style>
