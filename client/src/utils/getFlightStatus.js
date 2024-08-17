export const getFlightStatus = (flight) => {
  let index = 0;
  if (!flight || !flight.publicFlightState) {
    return "Flight information not available";
  }
  if (flight.publicFlightState.flightStates?.length > 1) {
    index = 1;
  }
  switch (flight.publicFlightState?.flightStates[index]) {
    case "SCH":
      return "On Schedule";
    case "DEL":
      return "Delayed";
    case "WIL":
      return "Wait in Longue";
    case "GTO":
      return "Gate Open";
    case "BRD":
      return "Boarding";
    case "GCL":
      return "Gate Closing";
    case "GTD":
      return "Gate Closed";
    case "DEP":
      return "Departed";
    case "CNX":
      return "Cancelled";
    case "GCH":
      return "Gate Change";
    case "TOM":
      return "Tomorrow";
    case "AIR":
      return "Airborne";
    case "EXP":
      return "Expected Landing";
    case "FIR":
      return "Flight Information Region";
    case "LND":
      return "Landed";
    case "FIB":
      return "FIBAG";
    case "ARR":
      return "Arrived Flight has been completely handled";
    case "DIV":
      return "Diverted";
    default:
      return `Undefined Statue: ${flight.publicFlightState.flightStates[index]}`;
  }
};
