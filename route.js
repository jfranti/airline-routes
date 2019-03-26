var flights = [
    { origin: "ZBB", destination: "DAL", depart: 1, arrive: 5 },
    { origin: "SZD", destination: "DAL", depart: 1, arrive: 5 },
    { origin: "SEA", destination: "DAL", depart: 1, arrive: 5 },
    { origin: "SEA", destination: "GBW", depart: 1, arrive: 5 },
    { origin: "GBW", destination: "DAL", depart: 7, arrive: 12 },
    { origin: "GBW", destination: "DAL", depart: 8, arrive: 13 },
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
];

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
    timeSpeed();
});

function getFlights(origin, time) {
    var results = [];
    flights.forEach(flight => {
        if (flight.origin == origin && flight.depart >= time) {
            results.push(flight);
        }
    });
    return results;
}

//this is for use below, in getFlightsOpt()
var sortedFlights = flights.sort((a,b)=>{return a.origin.charCodeAt(0) - b.origin.charCodeAt(0)});

function getFlightsOpt(origin, time) { //not logK yet, but faster by stopping when through valid flights in sorted list, and kinda cheating because the browser still has to sort them above
    var results = [];
    var found = false;
    for(var i = 0; i < sortedFlights.length; i++) {
        if (sortedFlights[i].origin == origin && sortedFlights[i].depart >= time) {
            results.push(sortedFlights[i]);
            found = true;
        } else if (found == true) {
            break;
        }
    };
    return results;
}

function timeSpeed() {
    var temp = [];
    var temp2 = [];
    var startOne = new Date().getTime();
    for (var i=0;i<100000;i++) {
        temp = getFlights("GBW", 0);
    }
    console.log("Current runtime is: " + (new Date().getTime() - startOne) + "ms, the array contains " + temp.length +" items");
    var startTwo = new Date().getTime();
    for (var i = 0; i < 100000; i++) {
        temp2 = getFlightsOpt("GBW", 0);
    }
    console.log("Optimized runtime is: " + (new Date().getTime() - startTwo + "ms, the array contains " + temp2.length +" items"));
}



function getRoutes(origin, destination, route = [], time = 0) {
    var validRoutes = [];
    if(route.length > 0 && route[route.length-1].destination == destination) {
        validRoutes.push(route);
    } else {
        getFlightsOpt(origin, time).forEach((flight) => {
            var newRoute = route.slice(0);
            newRoute.push(flight);
            var nextRoutes = getRoutes(flight.destination, destination, newRoute, flight.arrive);
            for(var i = 0;i<nextRoutes.length;i++) {
                validRoutes.push(nextRoutes[i]);
            }
        })
    }
    return validRoutes;
}