console.log("adapter");
const RocketAdapter = {
  url: "https://api.spacexdata.com/v2/rockets",
  getAll: function() {
    return fetch(this.url).then(r => r.json())
  },

  getOne: function(num) {
// 1 ={id: "falcon1", name: "Falcon 1", type: "rocket", active: false, stages: 2, …}
// 2 ={id: "falcon9", name: "Falcon 9", type: "rocket", active: true, stages: 2, …}
// 3 ={id: "falconheavy", name: "Falcon Heavy", type: "rocket", active: true, stages: 2, …}
// 4 ={id: "bfr", name: "Big Falcon Rocket", type: "rocket", active: false, stages: 2, …}
    return this.getAll()
      .then(rockets => rockets[num - 1])
      .then(rocket => {
        let rocketInfo = {id: num},
          picks = ["name", "description", "success_rate_pct", "height", "mass","stages"];
        for (attr in rocket) {
          if (picks.includes(attr)){
            rocketInfo[attr] = rocket[attr]
          }
        }
        return rocketInfo
      })
  }
}
