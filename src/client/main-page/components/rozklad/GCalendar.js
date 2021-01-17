import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import server from "../../../utils/server";

const { serverFunctions } = server;
const GCalendar = props => {
  console.log("Calendar", props);
  const client =
    props.client.length === 3 ? `${props.client} група` : props.client;

  const [cal, setCal] = useState({ show: false, src: "", group: client });

  useEffect(() => {
    serverFunctions
      .getOrCrateCalendar(client)
      .then(res => {
        setCal(prevState => {
          console.log("calendarId", res);
          const tmp = { ...prevState };
          tmp.show = true;
          tmp.src = `https://calendar.google.com/calendar/embed?src=${res}&height=400&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FKiev&color=%23C0CA33&showNav=1&showPrint=0&showTabs=0&mode=WEEK&showCalendars=0&showDate=1&showTitle=0`;

          return tmp;
        });
      })
      .catch(alert);
  }, []);

  return (
    <>
      {cal.show ? (
        <div>
          <p>{cal.group}</p>
          <iframe src={cal.src} width={"100%"} height={"400"}></iframe>
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default GCalendar;
