console.log("adapter");
const RocketAdapter = {
  url: "https://api.spacexdata.com/v2/rockets",
  getAll: function() {
    return fetch(this.url).then(r => r.json())
      .then(rockets=> {
        return rockets.map((rocket, index) => {
          let rocketInfo = {rocket_id: rocket.id, id: index + 1 },
            picks = ["name", "description", "success_rate_pct", "height", "mass","stages"];
          for (attr in rocket) {
            if (picks.includes(attr)){
              rocketInfo[attr] = rocket[attr]
            }
          }
          return rocketInfo
        })
      })
  },

  getOne: function(num) {
// 1 ={id: "falcon1", name: "Falcon 1", type: "rocket", active: false, stages: 2, …}
// 2 ={id: "falcon9", name: "Falcon 9", type: "rocket", active: true, stages: 2, …}
// 3 ={id: "falconheavy", name: "Falcon Heavy", type: "rocket", active: true, stages: 2, …}
// 4 ={id: "bfr", name: "Big Falcon Rocket", type: "rocket", active: false, stages: 2, …}
    return this.getAll()
      .then(rockets => rockets[num - 1])
  }
}

const LaunchAdapter = {
  url: "https://api.spacexdata.com/v2/launches/all",
  getAll: function() {
    return fetch(this.url)
      .then(r => r.json())
      .then(launches=> {
        return launches.map((launch, index) => {
          let launchInfo = {rocket_id: launch.rocket.rocket_id, id: launch.flight_number }
            picks = ["mission_name", "launch_success", "launch_date_utc"];
          for (attr in launch) {
            if (picks.includes(attr)){
              launchInfo[attr] = launch[attr]
            }
          }
          return launchInfo
        })
      })
  }
}
