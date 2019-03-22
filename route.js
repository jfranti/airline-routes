var flights = [
    { origin: "SEA", destination: "DAL", depart: 1, arrive: 5 },
    { origin: "SEA", destination: "PDX", depart: 1, arrive: 2 },
    { origin: "SEA", destination: "SFX", depart: 1, arrive: 3 },
    { origin: "SEA", destination: "LAX", depart: 1, arrive: 4 },
    { origin: "PDX", destination: "DAL", depart: 1, arrive: 4 },
    { origin: "DAL", destination: "SEA", depart: 12, arrive: 17 },
    { origin: "LAX", destination: "SEA", depart: 15, arrive: 19 },
    { origin: "SEA", destination: "DAL", depart: 19, arrive: 24 },
    { origin: "PDX", destination: "DAL", depart: 16, arrive: 20 },
    { origin: "SFX", destination: "DAL", depart: 7, arrive: 12 },
    { origin: "LAX", destination: "SFX", depart: 12, arrive: 14 },
    { origin: "LAX", destination: "DAL", depart: 4, arrive: 7 }
]

$(document).ready(function() {
    $("#list").hide();
    $("#master").click(()=>{$("#list").toggle()});
    flights.forEach((flight) => {
        $("#list").append("<li>" + flight.origin + " -> " + flight.destination + ": " + flight.depart + " oclk.");
    })
    $("#seeflights").click(function(){
        $("#results").empty();
        var foundRoutes = getRoutes($("#origin").val(), $("#destination").val());
        foundRoutes.forEach((route) =>{
            $("#results").append("<li>");
            route.forEach((flight) => {
                $("#results").append(flight.origin + " -> "+ flight.destination + " departing at " + flight.depart + ". ");
            })
            $("#results").append("</li>");
        })
    })
});

function getFlights(origin, time) {
    var results = [];
    flights.forEach(flight => {
        if(flight.origin == origin && flight.depart >= time) {
            results.push(flight);
        }
    });
    return results;
}

function getRoutes(origin, destination, route = [], time = 0) {
    var validRoutes = [];
    if(route.length > 0 && route[route.length-1].destination == destination) {
        validRoutes.push(route);
    } else {
        getFlights(origin, time).forEach((flight) => {
            var newRoute = route.slice(0);
            newRoute.push(flight);
            var nextRoutes = getRoutes(flight.destination, destination, newRoute, flight.arrive)
            if (nextRoutes.length > 0) {
                validRoutes.push(nextRoutes[0]);
            }
        })
    }
    return validRoutes;
}