window.addEventListener("load",()=>{
    let long;
    let lat;

    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".location.degree");
    let timeZone=document.querySelector(".location.timezone");
    let icono=document.querySelector("icon1");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(`Latitud:${lat} - Longitud:${long}`);

            let proxy="https://cors-anywhere.herokuapp.com/"
            let url=`${proxy}https://api.darksky.net/forecast/b5464264d52899ac05464e305985dac1/${lat},${long}`

            fetch(url)
            .then(response=>{return response.json();})
            .then(datos=>{
                console.log(datos)
                // console.log(datos.currently)
                const {temperature,summary,icon}=datos.currently;

                temperatureDescription.textContent=summary;
                temperatureDegree.textContent=temperature;
                timeZone.textContent=datos.timezone;

                setIcons(icon,icono);
            });
        })
        
        function setIcons(icon,iconID) {
            let skycons=new Skycons({"color":"pink"});
            const currentIcon=icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
        }
    }else{
        alert("Tienes que activar la geolocalizacion");
    }
})