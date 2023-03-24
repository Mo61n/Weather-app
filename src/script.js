document
        .getElementById("location")
        .addEventListener("keypress", function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            if (document.getElementById("location").value.trim() !== "") {
              getWeatherInfo();
            } else {
              var alertDiv = document.getElementById("empty-input-alert");
              alertDiv.style.display = "block";
              setTimeout(function () {
                alertDiv.style.display = "none";
              }, 3500);
            }
          }
        });

      function getWeatherInfo() {
        var location = document.getElementById("location").value.trim();
        // You can make your API key in https://weatherstack.com and paste into "API-KEY"
        var access_key = "API-KEY";
        var url =
          "http://api.weatherstack.com/current?access_key=" +
          access_key +
          "&query=" +
          location;
        $.get(url, function (data) {
          if (data.success !== false) {
            var temp = data.current.temperature;
            var desc = data.current.weather_descriptions[0];
            var icon = data.current.weather_icons[0];
            var info =
              "<h3>Current Weather in " +
              location +
              "</h3><br><img src=" +
              icon +
              "><br>" +
              temp +
              " °C<br>" +
              desc;
            $("#weather-info").html(info);
          } else {
            var errorInfo =
              "<h3>Oops, we couldn't find any information for " +
              location +
              ". Please try again.</h3>";
            $("#weather-info").html(errorInfo);
          }
        });
      }