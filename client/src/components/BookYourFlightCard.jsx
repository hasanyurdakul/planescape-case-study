"use client";
import { Box, Button, FormControl, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import { FlightTakeoff, FlightLand } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { dateTimeSubtractor } from "../utils/dateTimeSubtractor";
import { airportCodes } from "../utils/airportCodes";

function BookYourFlightCard({ query, setQuery }) {
  const newDate = new Date();
  const nextDay = new Date(newDate);
  nextDay.setDate(newDate.getDate() + 1);

  const [fromDateTime, setFromDateTime] = useState(dayjs(newDate));
  const [toDateTime, setToDateTime] = useState(dayjs(nextDay));
  const [selectedAirport, setSelectedAirport] = useState("");

  const handleShowFlightsButton = () => {
    let baseQuery = query
      .replace(/&fromDateTime=[^&]*/, "")
      .replace(/&toDateTime=[^&]*/, "")
      .replace(/&route=[^&]*/, "");

    if (fromDateTime && toDateTime) {
      const selectedDaysRange = dateTimeSubtractor(fromDateTime, toDateTime);

      if (selectedDaysRange.days > 3) {
        toast.error(
          "Max day range limit is 3 days. Please select a valid date range."
        );
        return;
      }

      if (fromDateTime > toDateTime) {
        toast.error(
          "The 'fromDateTime' must be earlier than the 'toDateTime'. Please select a valid date range."
        );
        return;
      }

      const formattedFromDateTime = fromDateTime.format("YYYY-MM-DDTHH:mm:ss");
      const formattedToDateTime = toDateTime.format("YYYY-MM-DDTHH:mm:ss");

      baseQuery += `&fromDateTime=${formattedFromDateTime}&toDateTime=${formattedToDateTime}`;
    }

    if (selectedAirport) {
      baseQuery += `&route=${selectedAirport}`;
    }

    const finalQuery = baseQuery.replace(
      /&route=[^&]*&route=[^&]*/,
      "&route=" + selectedAirport
    );

    setQuery(finalQuery);
    console.log("Updated query:", finalQuery);
    toast.success("Flights updated successfully");
  };

  const handleAirportChange = (event) => {
    setSelectedAirport(event.target.value);
  };

  return (
    <div className="bg-white w-full h-full p-4 rounded-xl">
      <Box className="flex justify-between">
        <div className="flex items-center gap-1">
          <FlightIcon className="rotate-90" />
          <span className="font-semibold uppercase">Book Your Flight</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-0 gap-2">
          <Button
            size="large"
            className="bg-themePurple hover:bg-themePurple/70 text-sm text-white p-3 px-4 lg:rounded-l-2xl lg:rounded-r-none rounded-full"
          >
            Round trip
          </Button>
          <Button
            size="large"
            className="bg-themeDarkGrey hover:bg-themeDarkGrey/70 text-sm text-themePurple p-3 px-4 lg:rounded-r-2xl lg:rounded-l-none rounded-full"
          >
            One way
          </Button>
        </div>
      </Box>

      <Box className="mt-3 lg:mt-6">
        <FormControl size="small" className="flex flex-col md:flex-row gap-2">
          <div className="flex grow flex-col md:flex-row gap-1 md:w-1/2">
            <Select
              startAdornment={<FlightTakeoff className="text-themePurple" />}
              value={selectedAirport}
              onChange={handleAirportChange}
              className="md:w-1/2 border border-themeDarkGrey rounded-t-3xl md:rounded-l-3xl md:rounded-r-none text-2xl xl:text-base"
            >
              {airportCodes.map((airport) => (
                <MenuItem key={airport.code} value={airport.code}>
                  {airport.name} ({airport.code})
                </MenuItem>
              ))}
            </Select>
            <Select
              startAdornment={<FlightLand className="text-themePurple" />}
              value="AMS"
              disabled
              className="md:w-1/2 border border-themeDarkGrey rounded-b-3xl md:rounded-r-3xl md:rounded-l-none text-2xl xl:text-base"
            >
              <MenuItem value="AMS">Amsterdam Airport Schiphol (AMS)</MenuItem>
            </Select>
          </div>
          <div className="flex grow flex-col md:flex-row gap-1 md:w-1/2">
            <DatePicker
              value={fromDateTime}
              onChange={(newValue) => setFromDateTime(newValue)}
              slotProps={{
                inputAdornment: {
                  position: "start",
                  sx: {
                    color: "yourColorHere",
                  },
                },
                textField: {
                  className:
                    "w-full md:w-1/2 border-2 border-themeDarkGrey rounded-t-3xl md:rounded-l-3xl md:rounded-r-none",
                  InputProps: {
                    classes: {
                      notchedOutline:
                        "border-2 border-themeDarkGrey rounded-t-3xl md:rounded-l-3xl md:rounded-r-none outline-none",
                    },
                  },
                },
              }}
            />
            <DatePicker
              value={toDateTime}
              onChange={(newValue) => setToDateTime(newValue)}
              slotProps={{
                inputAdornment: {
                  position: "end",
                  sx: {
                    color: "yourColorHere",
                  },
                },
                textField: {
                  className:
                    "w-full md:w-1/2 border-2 border-themeDarkGrey rounded-b-3xl md:rounded-r-3xl md:rounded-l-none",
                  InputProps: {
                    classes: {
                      notchedOutline:
                        "border-2 border-themeDarkGrey rounded-b-3xl md:rounded-r-3xl md:rounded-l-none outline-none",
                    },
                  },
                },
              }}
            />
          </div>
        </FormControl>
      </Box>

      <Box className="flex mt-6">
        <Button
          onClick={handleShowFlightsButton}
          size="large"
          className="bg-themePurple text-sm text-white p-2 px-4 rounded-lg hover:bg-themePurple/70"
        >
          Show flights
        </Button>
      </Box>
    </div>
  );
}

export default BookYourFlightCard;
