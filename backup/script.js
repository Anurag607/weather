document.addEventListener("DOMContentLoaded", () => {
    var inputContainer = document.querySelector('.wrapper');
    var input = document.querySelector("input");
    var location = document.querySelector("Button");
    var divider = document.querySelector(".separator");
    var resultContainer = document.querySelector(".wrapperResult");
    var result = document.querySelector(".result");
    var back = document.querySelector(".back");
    var api;
    const apiKey="d9f8fe268c957fe29482b8c8c3769956";

    function transition() {
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
            result.style.display = "grid";
        },750);
        setTimeout(() => {
            resultContainer.style.opacity = "1";
            resultContainer.style.width = "100vw";
        },800);
        setTimeout(() => {
            back.style.opacity = "1";
        },2000);
        setTimeout(() => {
            result.children[0].style.opacity = "1";
        },2300);
        setTimeout(() => {
            result.children[1].style.opacity = "1";
        },2600);
        setTimeout(() => {
            result.children[2].style.opacity = "1";
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
        back.style.opacity = "0";
        result.style.opacity = "0";
        setTimeout(() => {
            resultContainer.style.width = "0";
            resultContainer.style.opacity = "0";
        },500);
        setTimeout(() => {
            resultContainer.style.display = "none";
            result.style.display = "none";
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
        apihourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&cnt=6&appid=${apiKey}&units=metric`;
        apidaily = `https://pro.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}&units=metric`;
        fetchDataCurrent(apiCur);
        // fetchDatahourly(apihourly);
        fetchDatadaily(apidaily);
    }

    function fetchDataCurrent(apiCur) {
        fetch(apiCur)
            .then(response => response.json())
                .then(resCurrent => weatherDataCurrent(resCurrent));
    }

    function fetchDatahourly(apihourly) {
        fetch(apihourly)
            .then(response => response.json())
                .then(reshourly => weatherDatahourly(reshourly));
    }

    function fetchDatadaily(apidaily) {
        fetch(apidaily)
            .then(response => response.json())
                .then(resdaily => weatherDatadaily(resdaily));
    }

    function weatherDataCurrent(resCurrent) {
        console.log(resCurrent);
        const currentTemp = resCurrent.main.temp;
        const minTemp = resCurrent.main.temp_min;
        const maxTemp = resCurrent.main.temp_max;
        const appTemp = resCurrent.main.feels_like;
        const weatherDesc = resCurrent.weather[0].description;
        const iconURLCur = `http://openweathermap.org/img/wn/${resCurrent.weather[0].icon}@2x.png`;
        var currentTempCont = document.querySelector(".currentTemp");
        var minTempCont = document.querySelector(".minTemp");
        var maxTempCont = document.querySelector(".maxTemp");
        var appTempCont = document.querySelector(".appTemp");
        var descCont = document.querySelector(".desc");
        var curImgCont = document.querySelector(".current .subsect img");
        currentTempCont.innerHTML = `${currentTemp}°C`;
        minTempCont.innerHTML = `${minTemp}°C`;
        maxTempCont.innerHTML = `${maxTemp}°C`;
        appTempCont.innerHTML = `Feels like ${appTemp}°C`;
        descCont.innerHTML = `${weatherDesc}`;
        curImgCont.src = iconURLCur;
    }

    function weatherDatahourly(reshourly) {
        console.log(reshourly);
        // const humidity = reshourly.main.humidity;
        // const iconURLhourly = `http://openweathermap.org/img/wn/${reshourly.weather[0].icon}@2x.png`;
        // var humidityConttxt = document.querySelector(".humidity span");
        // var hourlyImgCont = document.querySelector(".hourlyTemp img");
        // humidityConttxt.innerHTML = `${humidity}%`;
        // hourlyImgCont.src = iconURLhourly;
    }

    function weatherDatadaily(resdaily) {
        console.log(resdaily);
        // const iconURLdaily = `http://openweathermap.org/img/wn/${resdaily.weather[0].icon}@2x.png`;
        // const nightTemp = resdaily.temp.night;
        // const dayTemp = resdaily.temp.day;
        // var nightTempCont = document.querySelector(".nightTemp");
        // var dayTempCont = document.querySelector(".dayTemp");
        // var dailyImgCont = document.querySelector(".daily img");
        // nightTempCont.innerHTML = `${nightTemp}°C`;
        // dayTempCont.innerHTML = `${dayTemp}°C`;
        // dailyImgCont.src = iconURLdaily;
    }

    location.onclick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
            transition();
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
        apihourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}&units=metric`;
        apidaily = `https://pro.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}&units=metric`;
        fetchDataCurrent(apiCur);
        // fetchDatahourly(apihourly);
        fetchDatadaily(apidaily);
    }
});