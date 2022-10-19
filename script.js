document.addEventListener("DOMContentLoaded", () => {
    var inputContainer = document.querySelector('.wrapper');
    var input = document.querySelector("input");
    var location = document.querySelector("button");
    var divider = document.querySelector(".separator");
    var resultContainer = document.querySelector(".wrapperResult");
    var result = document.querySelector(".result");
    var back = document.querySelector(".back");
    var current = document.querySelector(".current");
    var cur = document.querySelector(".cur");
    var resHead = document.querySelector(".result h2");
    var resEl = document.querySelectorAll(".result span");
    const apiKey="d9f8fe268c957fe29482b8c8c3769956";

    function transition(desc,daynight) {
        var bgimg;
        if (desc === "clear sky") {
            if (daynight === 'd') bgimg = "url(./images/w7.jpg)";
            else bgimg = "url(./images/w2.jpg)";
        }
        else if (desc === "few clouds" ) bgimg = "url(./images/cloud8.jpg)";
        else if (desc === "scattered clouds") {
            if (daynight === 'd') bgimg = "url(./images/cloud8.jpg)";
            else bgimg = "url(./images/cloud9.jpg)";
        }
        else if (desc === "broken clouds") {
            if (daynight === 'd') bgimg = "url(./images/cloud6.jpg)";
            else bgimg = "url(./images/w4.jpg)";
        }
        else if (desc === "overcast" || desc === "overcast clouds") bgimg = "url(./images/cloud2.jpg)";
        else if (desc === "shower rain" || desc === "rain" || desc === "light rain" ) bgimg = "url(./images/cloud5.jpg)";
        else if (desc === "thunderstorm" ) bgimg = "url(./images/cloud7.jpg)";
        else if (desc === "snow" ) {
            if (daynight === 'd') bgimg = "url(./images/w6.jpg)";
            else bgimg = "url(./images/w1.jpg)";
        }
        else if (desc === "mist" || desc === "haze") {
            if (daynight === 'd') bgimg = "url(./images/w8.jpg)";
            else bgimg = "url(./images/w9.jpg)";
        }
        else bgimg = "url(./images/cloud3.jpg)";
        document.querySelector('body').style.backgroundImage = bgimg;
        inputContainer.style.width = "0";
        input.style.opacity = "0";
        location.style.opacity = "0";
        divider.style.opacity = "0";
        setTimeout(() => {
            input.style.display = "none";
            location.style.display = "none";
            divider.style.display = "none";
            inputContainer.style.display = "none";
        },750);
        setTimeout(() => {
            resultContainer.style.display = "flex";
        },750);
        setTimeout(() => {
            resultContainer.style.opacity = "1";
            resultContainer.style.width = "100vw";
        },800);
        setTimeout(() => {
            result.style.width = "27.5vw";
        },1000);
        setTimeout(() => {
            back.style.opacity = "1";
        },2000);
        setTimeout(() => {
            current.style.opacity = "1";
        },2300);
        setTimeout(() => {
            cur.style.opacity = "1";
            resHead.style.opacity = "1";
        },2600);
        setTimeout(() => {
            resEl.forEach((resEl) => {
                resEl.style.opacity = "1";
            });
        },2900);
    }

    input.addEventListener("keyup", (e) => {
        if (e.key == "Enter" && input.value != "") {
            requestApi(input.value);
            input.value = "";
            transition();
        }
    });

    back.onclick = () => {
        document.querySelector('body').style.backgroundImage = "url(./images/cloud1.jpg)";
        back.style.opacity = "0";
        current.style.opacity = "0";
        cur.style.opacity = "0";
        resEl.forEach((resEl) => {
            resEl.style.opacity = "0";
        });
        resHead.style.opacity = "0";
        setTimeout(() => {
            result.style.width = "0";
        }, 50);
        setTimeout(() => {
            resultContainer.style.width = "0";
            resultContainer.style.opacity = "0";
            result.style.width = "0";
        },200);
        setTimeout(() => {
            resultContainer.style.display = "none";
        },1000);
        setTimeout(() => {
            input.style.display = "block";
            location.style.display = "block";
            divider.style.display = "block";
            inputContainer.style.display = "flex";
        },1500);
        setTimeout(() => {
            inputContainer.style.width = "25vw";
        },1750);
        setTimeout(() => {
            input.style.opacity = "1";
            location.style.opacity = "1";
            divider.style.opacity = "1";
        },2200);
    };

    function requestApi(city) {
        apiCur = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetchDataCurrent(apiCur);
    }

    function fetchDataCurrent(apiCur) {
        fetch(apiCur)
            .then(response => response.json())
                .then(resCurrent => weatherDataCurrent(resCurrent));
    }


    function Unix_timestamp(t) {
        var dt = new Date(t*1000);
        var hr = dt.getHours();
        var m = dt.getMinutes();
        var s = dt.getSeconds();
        return hr + 'hrs ' + m + 'mins ' + s + 'secs';  
    }

    function weatherDataCurrent(resCurrent) {
        console.log(resCurrent);
        var currentTempCont = document.querySelector(".currentTemp span");
        var minTempCont = document.querySelector(".minTemp");
        var maxTempCont = document.querySelector(".maxTemp");
        var appTempCont = document.querySelector(".appTemp");
        var descCont = document.querySelector(".desc");
        var locCont = document.querySelector(".location");
        var curImgCont = document.querySelector("#weather");
        var curhumid = document.querySelector(".curHumidity");
        var curvisible = document.querySelector(".curVisibility");
        var sunrise = document.querySelector(".sunrise");
        var sunset = document.querySelector(".sunset");
        var icon = resCurrent.weather[0].icon
        var desc = resCurrent.weather[0].description;
        const distance = eval(resCurrent.visibility+'/1000');
        currentTempCont.innerHTML = `${resCurrent.main.temp.toFixed(0)}°C`;
        minTempCont.innerHTML = `${resCurrent.main.temp_min.toFixed(0)}°C`;
        maxTempCont.innerHTML = `${resCurrent.main.temp_max.toFixed(0)}°C`;
        appTempCont.innerHTML = `Feels like ${resCurrent.main.feels_like.toFixed(0)}°C`;
        descCont.innerHTML = `${desc}`;
        curImgCont.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        locCont.innerHTML = resCurrent.name;
        curhumid.innerHTML = `Humidity: ${resCurrent.main.humidity}%`;
        curvisible.innerHTML = `Visibility: ${distance}Km`;
        sunrise.innerHTML = `Sunrise: ${Unix_timestamp(resCurrent.sys.sunrise)}`;
        sunset.innerHTML = `Sunset: ${Unix_timestamp(resCurrent.sys.sunset)}`;
        var daynight = icon.charAt(icon.length-1);
        transition(desc,daynight);
    }

    location.onclick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
        }
        else {
            alert("Your brwoser does not support geolocation api");
        }
    }

    function onFailure(error) {
        console.log(error);
    }

    function onSuccess(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        apiCur = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetchDataCurrent(apiCur);
    }
});