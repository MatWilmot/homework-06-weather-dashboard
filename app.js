$(document).ready(function () {
  // ----------- INITIAL FUNCTIONS -----------
  render("San Francisco");
  // ----------- ON CLICKS -----------
  $(document).on("click", ".btn", function () {
    render($(this).attr("id"));
  });

  $(document).on("click", "#btnSubmit", function () {
    console.log($("#textInput").val());
    render($("#textInput").val());
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
      $("#today1").text(moment().add(1, "days").format("MMM Do YYYY"));
      $("#today2").text(moment().add(2, "days").format("MMM Do YYYY"));
      $("#today3").text(moment().add(3, "days").format("MMM Do YYYY"));
      $("#today4").text(moment().add(4, "days").format("MMM Do YYYY"));
      $("#today5").text(moment().add(5, "days").format("MMM Do YYYY"));
      console.log("within lon - ", longitude);
      console.log("within lat - ", latitude);
    });
  }
});
