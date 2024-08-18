import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { getData } from "../utils/fetchWrapper";
import { airlineNameParser } from "../utils/airlineNameParser";
import { useNavigate } from "react-router-dom";

// ######################################################################
// FlightSorter componenti, uçuşları filtrelemek ve sıralamak için kullanılır.
// Kullanıcı, uçuşları varış zamanına, havayolu şirketine ve sıralama kriterine göre filtreleyebilir.
// Anasayfada kullanılır.
// API'den gelen uçuşları, local state içinde filtreler. Yeni bir request yapmaz.
// Reset Filters butonuna tıklandığında, filtreler sıfırlanır ve tüm uçuşlar gösterilir.
// ######################################################################

function FlightSorter({ flights, setFlights }) {
  const [originalFlights, setOriginalFlights] = useState();
  const [airlines, setAirlines] = useState([]);
  const [arrivalTimes, setArrivalTimes] = useState([]);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("scheduleDate");
  const [selectedAirline, setSelectedAirline] = useState("");
  const navigate = useNavigate();

  const handleArrivalTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedArrivalTime(selectedTime);
    filterFlights(selectedAirline, selectedTime);
  };

  const handleResetFilters = () => {
    navigate(0);
  };

  const handleAirlineChange = (event) => {
    const selectedICAO = event.target.value;
    setSelectedAirline(selectedICAO);
    filterFlights(selectedICAO, selectedArrivalTime);
  };

  const handleSortByChange = (event) => {
    const sortBy = event.target.value;
    setSelectedSortBy(sortBy);
    const sortedFlights = [...flights].sort((a, b) => {
      if (sortBy === "scheduleDate") {
        return new Date(a.scheduleDateTime) - new Date(b.scheduleDateTime);
      } else if (sortBy === "flightName") {
        return a.flightName.localeCompare(b.flightName);
      } else if (sortBy === "estimatedLandingTime") {
        return (
          new Date(a.estimatedLandingTime) - new Date(b.estimatedLandingTime)
        );
      }
      return 0;
    });
    setFlights(sortedFlights);
  };

  const filterFlights = (airlineICAO, arrivalTime) => {
    let filteredFlights = [...originalFlights];

    if (arrivalTime) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.estimatedLandingTime === arrivalTime
      );
    }

    if (airlineICAO) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.prefixICAO === airlineICAO
      );
    }

    const sortedFlights = filteredFlights.sort((a, b) => {
      if (selectedSortBy === "scheduleDate") {
        return new Date(a.scheduleDateTime) - new Date(b.scheduleDateTime);
      } else if (selectedSortBy === "flightName") {
        return a.flightName.localeCompare(b.flightName);
      } else if (selectedSortBy === "estimatedLandingTime") {
        return (
          new Date(a.estimatedLandingTime) - new Date(b.estimatedLandingTime)
        );
      }
      return 0;
    });

    setFlights(sortedFlights);
  };

  useEffect(() => {
    if (flights && flights.length > 0) {
      setOriginalFlights([...flights]);

      const validArrivalTimes = flights
        .map(
          (flight) => flight.estimatedLandingTime && flight.estimatedLandingTime
        )
        .filter((time) => time !== undefined);

      setArrivalTimes([...new Set(validArrivalTimes.sort())]);

      const uniqueICAOCs = [
        ...new Set(flights.map((flight) => flight.prefixICAO)),
      ];

      Promise.all(uniqueICAOCs.map((icao) => airlineNameParser(icao)))
        .then((names) => {
          const airlineNameMap = uniqueICAOCs.reduce((acc, icao, index) => {
            acc[icao] = names[index];
            return acc;
          }, {});
          setAirlines(
            Object.entries(airlineNameMap).map(([icao, name]) => ({
              icao,
              name,
            }))
          );
        })
        .catch((error) =>
          console.error("Error fetching airline names:", error)
        );
    }
  }, [flights]);

  return (
    <div className="w-full h-full pl-8 rounded-xl rounded-bl-none flex flex-col">
      <div className="flex justify-between items-end">
        <h1 className="font-semibold">Sort by:</h1>
        <Button
          variant="contained"
          className="bg-themePurple normal-case text-white hover:bg-themePurple/70"
          onClick={handleResetFilters}
        >
          RESET FILTERS
        </Button>
      </div>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        className="bg-white rounded-lg p-0 m-0 mt-2"
      >
        <Select
          value={selectedSortBy}
          onChange={handleSortByChange}
          className="text-black"
        >
          <MenuItem value="scheduleDate">Scheduled Date</MenuItem>
          <MenuItem value="flightName">Flight Name</MenuItem>
          <MenuItem value="estimatedLandingTime">
            Estimated Landing Time
          </MenuItem>
        </Select>
      </FormControl>
      <h1 className="font-semibold mt-2">Arrival Time</h1>
      <FormControl className="m-0 p-0">
        <RadioGroup
          value={selectedArrivalTime}
          onChange={handleArrivalTimeChange}
          name="radio-buttons-group"
        >
          {arrivalTimes.length > 0 ? (
            arrivalTimes.map((arrivalTime, index) => (
              <FormControlLabel
                key={index}
                value={arrivalTime}
                control={<Radio size="small" className="text-themePurple" />}
                label={arrivalTime.split("T")[1].split(".")[0].slice(0, 5)}
              />
            ))
          ) : (
            <p>No arrival times available</p>
          )}
        </RadioGroup>
      </FormControl>
      <h1 className="font-semibold mt-2">Airlines Included</h1>
      <FormControl className="m-0 p-0">
        <RadioGroup
          value={selectedAirline}
          onChange={handleAirlineChange}
          name="radio-buttons-group"
        >
          {airlines.length > 0 ? (
            airlines.map((airline, index) => (
              <FormControlLabel
                key={index}
                value={airline.icao}
                control={<Radio size="small" className="text-themePurple" />}
                label={airline.name}
              />
            ))
          ) : (
            <p>No airlines available</p>
          )}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default FlightSorter;
