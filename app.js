$(document).ready(function () {
  // ----------- INITIAL FUNCTIONS -----------
  render("San Francisco");

  // ----------- GLOBAL VARIABLES -----------
  var city = "";
  try {
    var cityArray = JSON.parse(window.localStorage.getItem("cities"));
  } catch {
    var cityArray = [];
  }
  if (cityArray === null) {
    cityArray = [];
  }
  window.localStorage.setItem("cities", JSON.stringify(cityArray));

  // ----------- ON CLICKS -----------
  $(document).on("click", ".historyItem", function () {
    render($(this).attr("id"));
  });

  $(document).on("click", "#btnSubmit", function (e) {
    e.preventDefault();
    render($("#textInput").val());
    city = $("#textInput").val();
    $("#textInput").val("");
    cityArray.push(city);
    window.localStorage.setItem("cities", JSON.stringify(cityArray));
  });

  $(document).on("click", ".delBtn", function () {
    console.log(cityArray);
    var dataid = $(this).attr("data-id");
    cityArray.splice(dataid, 1);
    window.localStorage.setItem("cities", JSON.stringify(cityArray));
    renderHistory();
  });

  // ----------- FUNCTIONS -----------
  function render(str) {
    var api_key = "86d5336a274d6ad585b386adde3091ea";
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${str}&appid=${api_key}&units=imperial`,
      dataType: "json",
    }).then(function (response) {
      var maxTemp = response.main.temp_max + "°F";
      var minTemp = response.main.temp_min + "°F";
      var currentTemp = response.main.temp + "°F";
      var windSpeed = response.wind.speed + "mph";
      var feelsLike = response.main.feels_like + "°F";
      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      $("#cityName").text(
        response.name + " - " + moment().format("MMM Do YYYY")
      );
      $("#temp-MaxMin").html(
        `<strong>Temp Max/Min:</strong> ${maxTemp} / ${minTemp}`
      );
      $("#currentTemp").html(`<strong>Current Temp:</strong> ${currentTemp}`);
      $("#windSpeed").html(`<strong>Wind Speed:</strong> ${windSpeed}`);
      $("#feelsLike").html(`<strong>Feels Like:</strong> ${feelsLike}`);
      $("#date0").text(moment().add(1, "days").format("MMM Do YYYY"));
      $("#date1").text(moment().add(2, "days").format("MMM Do YYYY"));
      $("#date2").text(moment().add(3, "days").format("MMM Do YYYY"));
      $("#date3").text(moment().add(4, "days").format("MMM Do YYYY"));
      $("#date4").text(moment().add(5, "days").format("MMM Do YYYY"));
      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${api_key}&units=imperial`,
        dataType: "json",
      }).then(function (res) {
        for (var i = 0; i < 5; i++) {
          var icon = `http://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}.png`;
          var desc = res.daily[i].weather[0].description;
          var temp = res.daily[i].temp.day;
          $(`#icon${i}`).attr("src", icon);
          $(`#desc${i}`).text(desc);
          $(`#temp${i}`).text(temp + "°F");
          renderHistory();
        }
      });
    });
  }

  function renderHistory() {
    $("#history").html("");
    for (var i = 0; i < cityArray.length; i++) {
      $("#history").prepend(`
      <div class="btn-group">
        <button
          id="${cityArray[i]}"
          class="historyItem btn btn-outline-dark btn-lg btn-secondary text-left text-light mb-1"
          style="width: 90%"
        >
          ${cityArray[i]}
        </button>
        <button 
        data-id="${i}"
          class="delBtn btn btn-outline-dark btn-lg btn-danger text-center text-light mb-1" 
        >
          &times;
        </button>
      </div>`);
    }
  }
});
