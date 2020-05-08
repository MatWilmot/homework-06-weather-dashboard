$(document).ready(function () {
  // ----------- INITIAL FUNCTIONS -----------
  render("San Francisco");
  // ----------- ON CLICKS -----------
  $(document).on("click", ".preset", function () {
    render($(this).attr("id"));
  });

  $(document).on("click", "#btnSubmit", function (e) {
    e.preventDefault();
    render($("#textInput").val());
    $("#textInput").val("");
  });

  // ----------- FUNCTIONS -----------
  function render(str) {
    var api_key = "86d5336a274d6ad585b386adde3091ea";
    $.ajax({
      type: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${str}&appid=${api_key}&units=imperial`,
      dataType: "json",
    }).then(function (response) {
      console.log(response);

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
      console.log("within lon - ", longitude);
      console.log("within lat - ", latitude);
      $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${api_key}&units=imperial`,
        dataType: "json",
      }).then(function (res) {
        console.log(res);
        for (var i = 0; i < 5; i++) {
          var icon = `http://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}.png`;
          var desc = res.daily[i].weather[0].description;
          var temp = res.daily[i].temp.day;
          $(`#icon${i}`).attr("src", icon);
          $(`#desc${i}`).text(desc);
          $(`#temp${i}`).text(temp + "°F");
          console.log(temp);
        }
      });
    });
  }
});
