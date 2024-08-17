import { useEffect, useState } from "react";
import BookYourFlightCard from "../components/BookYourFlightCard";
import FlightCardsWrapper from "../components/FlightCardsWrapper";
import FlightSorter from "../components/FlightSorter";
import VerticalCardsWrapper from "../components/VerticalCardsWrapper";
import { getData } from "../utils/fetchWrapper";

export default function HomePage() {
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
  }, [query]); // Include query in the dependency array

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
