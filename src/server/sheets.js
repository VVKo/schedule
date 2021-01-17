const BEGIN_SECOND_SEM = {
  "1": new Date(2021, 0, 10), // 11.01.2021
  "2": new Date(2021, 0, 10), // 11.01.2021
  "3": new Date(2021, 1, 0), // 01.02.2021
  "4": new Date(2021, 1, 0) // 01.02.2021
};

const getSemestrLengh = group => {
  switch (group.slice(0, 1)) {
    case "1":
      return 23;
      break;
    case "2":
      return 18;
      break;
    case "3":
      return "234".indexOf(group.slice(2, 3)) !== -1 ? 15 : 18;
      break;
    case "4":
      return "234".indexOf(group.slice(2, 3)) !== -1 ? 12 : 14;
      break;
    default:
      break;
  }
  return 0;
};

const paraToDate = (para, data) => {
  switch (para) {
    case 0:
      data.setHours(8, 20);
      return data;
      break;
    case 1:
      data.setHours(9, 50);
      return data;
      break;
    case 2:
      data.setHours(11, 30);
      return data;
      break;
    case 3:
      data.setHours(13, 0);
      return data;
      break;
    case 4:
      data.setHours(14, 40);
      return data;
      break;
    case 5:
      data.setHours(16, 0);
      return data;
      break;
    case 6:
      data.setHours(17, 30);
      return data;
      break;
    case 7:
      data.setHours(19, 0);
      return data;
      break;
    default:
      return new Date(0, 0, 0, 0, 0, 0, 0);
  }
};

const getDateByGroup = (group, day, week, para) => {
  const d = new Date();

  switch (group.slice(0, 1)) {
    case "1":
      return paraToDate(para, d) + new Date(2021, 0, 10 + 7 * (week + 1) + day);
      break;
    case "2":
      return paraToDate(para, d) + new Date(2021, 0, 10 + 7 * (week + 1) + day);
      break;
    case "3":
      return paraToDate(para, d) + new Date(2021, 1, 0 + 7 * week + day);
      break;
    case "4":
      {
        d.setFullYear(2021, 1, 1 + 7 * week + day);

        return paraToDate(para, d);
      }
      break;

    default:
      return "fuck";
  }
};

const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName
    };
  });
};

export const addSheet = sheetTitle => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = sheetIndex => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = sheetName => {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

export const getDataForGroup = group => {
  const rozklad = SpreadsheetApp.openById(
    "1x6ydHcq-_4FknK9_ivkKV_sb9-a1BqTmyFY04VIZSks" // розклад на 2-й семестр
  );
  const ws = rozklad.getSheetByName("2 семестр");
  const data = ws
    .getDataRange()
    .getValues()
    .map((val, idx) => [idx, ...val])
    .filter(r => r[2].includes(group));

  return data;
};

const checkEmailModulni = email => {
  const sh = SpreadsheetApp.openById(
    "1zv7A0FLqs_XWkDZVQNcejpFog_AfjJsOR89Q4lbL2lw" // Для сайту
  );

  const workSheet = sh.getSheetByName("rozklad");
  const rozklad = SpreadsheetApp.openById(
    "1x6ydHcq-_4FknK9_ivkKV_sb9-a1BqTmyFY04VIZSks" // розклад на 2-й семестр
  );
  const ws = rozklad.getSheetByName("2 семестр");
  const data = ws.getDataRange().getValues();
  const kontSS = SpreadsheetApp.openById(
    "1TBemg3McWhT44vZpEDTjj5Aqq2uor4fJW2fb0-xNx80"
  );
  const kontSheet = kontSS.getSheetByName("Студенти");
  const students = kontSheet
    .getRange(2, 1, kontSheet.getLastRow() - 1, 12)
    .getValues()
    .map(r => [r[0], r[1], r[11]]);
  const prepodData = {};
  return email === "nat_dep_clg@chnu.edu.ua"
    ? { isLogined: true, email, data, students, role: "Супер адмін" }
    : {
        isLogined: true,
        email,
        data,
        students,
        role: prepodData.length === 0 ? "guest" : "Спостерігач ;)"
      };
};

export const getOrCrateCalendar = client => {
  const cal = CalendarApp.getCalendarsByName(client);

  return cal.length === 0
    ? CalendarApp.createCalendar(client).getId()
    : cal[0].getId();
};

const minusSevenHours = data => {
  return new Date(data.getTime() - 7 * 60 * 60 * 1000);
};

export const updateRozklad = obj => {
  const rozklad = SpreadsheetApp.openById(
    "1x6ydHcq-_4FknK9_ivkKV_sb9-a1BqTmyFY04VIZSks" // розклад на 2-й семестр
  );
  const ws = rozklad.getSheetByName("2 семестр");

  ws.getRange(Number(obj.row), Number(obj.col)).setValue(obj.aud);

  const groups = [
    ...new Set(
      ws
        .getRange(Number(obj.row), 2)
        .getValue()
        .split("+")
        .map(gr => `${gr.slice(0, 3)} група`)
    )
  ].sort();
  const disc = ws
    .getRange(Number(obj.row), 1)
    .getValue()
    .split("(")[0];
  const type = ws.getRange(Number(obj.row), 3).getValue();
  const prepod = ws.getRange(Number(obj.row), 5).getValue();
  const day = ((Number(obj.col) - 8) / 16) >> 0; // 0 - mon, 1 - tue,...
  const para = (((Number(obj.col) - 8) % 16) / 2) >> 0;
  const week = (((Number(obj.col) - 8) % 16) % 2) - 1;
  console.log(groups);
  groups.forEach((gro, idx) => {
    const calID = getOrCrateCalendar(gro);
    const cal = CalendarApp.getCalendarById(calID);
    cal.setTimeZone("Europe/Kiev");
    const duration = getSemestrLengh(gro);
    console.log(
      getDateByGroup(gro, day, week, para),
      disc,
      prepod,
      day,
      para,
      week,
      obj.aud
    );

    const beginEvent = getDateByGroup(gro, day, week, para);
    const endEvent = new Date(
      getDateByGroup(gro, day, week, para).getTime() + 80 * 60 * 1000
    );

    const events = cal.getEvents(beginEvent, endEvent);
    console.log(events.length, events);

    if (obj.aud === "") {
      events.forEach((ev, idxn) => {
        if (ev.getDescription().includes([type, prepod].join("\n"))) {
          cal.getEventSeriesById(ev.getId()).deleteEventSeries();
        }
      });
    } else {
      const eventSer = cal.createEventSeries(
        disc,
        beginEvent,
        endEvent,
        CalendarApp.newRecurrence()
          .addWeeklyRule()
          .interval(2)
          .times(((duration - week) / 2) >> 0),
        {
          location: `${obj.aud}`,
          description: [type, prepod].join("\n"),
          guests: "v.kovdrysh@chnu.edu.ua",
          sendInvites: false
        }
      );
      eventSer
        .setAnyoneCanAddSelf(false)
        .setGuestsCanInviteOthers(false)
        .setGuestsCanSeeGuests(false);
      const apiGet = Calendar.Events.list(calID);
      console.log("apiGet", apiGet);
      console.log("eventSer", eventSer.toString(), eventSer.getId());
    }
  });

  return "done";
};

export const getUserForRozklad = () => {
  const userEmail = Session.getActiveUser().getEmail();
  if (userEmail === "")
    return { isLogined: false, email: userEmail, role: "guest", data: [] };

  return checkEmailModulni(userEmail);
};
