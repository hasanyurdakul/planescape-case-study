import { useEffect, useState } from "react";
import BookYourFlightCard from "../components/BookYourFlightCard";
import FlightCardsWrapper from "../components/FlightCardsWrapper";
import FlightSorter from "../components/FlightSorter";
import VerticalCardsWrapper from "../components/VerticalCardsWrapper";
import { getData } from "../utils/fetchWrapper";

// ######################################################################
// HomePage componenti, anasayfa componentidir.
// query stati burda tutulur ve BookYourFlightCard componentine prop olarak geçilir.
// query state'i değiştiğinde useEffect çalışır ve API'dan veri çeker.
// flights state'i burda tutulur ve FlightCardsWrapper componentine prop olarak geçilir.
// flights state'i değiştiğinde FlightCardsWrapper componenti rerender olur.
// Kullanıcı, uçuşları filtrelemek ve sıralamak için FlightSorter componentini kullanabilir.
// Sorting yapabilmesi için FlightSorter componentine prop olarak flights ve setFlights geçilir.
// Kullanıcı, uçuş aramalarını yapmak için BookYourFlightCard componentini kullanabilir.
// API'dan gelen uçuşlar, FlightCardsWrapper componenti içinde gösterilir.
// Dikey kartlar, VerticalCardsWrapper componenti içinde gösterilir.
// ######################################################################

export default function HomePage() {
  // query state'i, API'dan veri çekmek için kullanılır.
  // Varsayılan olarak operational ve delay olmayan uçuşları getirir. Bu sayede kullanıcıya rezervasyon yapabileceği uçuşlar gösterilir.
  const [query, setQuery] = useState(
    "/flights?isOperationalFlight=true&includedelays=false&"
  );
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (query) {
      getData(query)
        .then((data) => {
          setFlights(data.flights);
          console.log(flights);
        })
        .catch((error) => console.error(error));
    }
  }, [query]); // query değiştiğinde useEffect çalışması için dependency olarak eklenir.

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
      <div className="col-span-1 md:col-span-4">
        <div>
          <BookYourFlightCard query={query} setQuery={setQuery} />
          <div className="grid grid-cols-7">
            <div className="col-span-7 md:col-span-5 mt-8">
              <FlightCardsWrapper flights={flights} />
            </div>
            <div className="col-span-7 md:col-span-2  mt-8">
              <FlightSorter flights={flights} setFlights={setFlights} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <VerticalCardsWrapper />
      </div>
    </div>
  );
}
