const BEGIN_SECOND_SEM = {
  '1': new Date(2021, 0, 10), // 11.01.2021
  '2': new Date(2021, 0, 10), // 11.01.2021
  '3': new Date(2021, 1, 0), // 01.02.2021
  '4': new Date(2021, 1, 0), // 01.02.2021
};

const MAINID = '1gnuWvvaO0xrobmb44Pj_VfMiGIEyeXORIzuE8dzTIAw';

export const getListOfPidrozdils = () => {
  const ss = SpreadsheetApp.openById(MAINID);
  const ws = ss.getSheetByName('Монітор');
  const data = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();

  return data;
};

const getSemestrLengh = group => {
  switch (group.slice(0, 1)) {
    case '1':
      return 23;
      break;
    case '2':
      return 18;
      break;
    case '3':
      return '234'.indexOf(group.slice(2, 3)) !== -1 ? 15 : 18;
      break;
    case '4':
      return '234'.indexOf(group.slice(2, 3)) !== -1 ? 12 : 14;
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
    case '1':
      return paraToDate(para, d) + new Date(2021, 0, 10 + 7 * (week + 1) + day);
      break;
    case '2':
      return paraToDate(para, d) + new Date(2021, 0, 10 + 7 * (week + 1) + day);
      break;
    case '3':
      return paraToDate(para, d) + new Date(2021, 1, 0 + 7 * week + day);
      break;
    case '4':
      {
        d.setFullYear(2021, 1, 1 + 7 * week + day);

        return paraToDate(para, d);
      }
      break;

    default:
      return 'fuck';
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
      isActive: name === activeSheetName,
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
    '1x6ydHcq-_4FknK9_ivkKV_sb9-a1BqTmyFY04VIZSks' // розклад на 2-й семестр
  );
  const ws = rozklad.getSheetByName('2 семестр');
  const data = ws
    .getDataRange()
    .getValues()
    .map((val, idx) => [idx, ...val])
    .filter(r => r[2].includes(group));

  return data;
};

const checkEmailModulni = email => {
  const sh = SpreadsheetApp.openById(
    '1zv7A0FLqs_XWkDZVQNcejpFog_AfjJsOR89Q4lbL2lw' // Для сайту
  );

  const workSheet = sh.getSheetByName('rozklad');
  const rozklad = SpreadsheetApp.openById(
    '1x6ydHcq-_4FknK9_ivkKV_sb9-a1BqTmyFY04VIZSks' // розклад на 2-й семестр
  );
  const ws = rozklad.getSheetByName('2 семестр');
  const data = ws.getDataRange().getValues();
  const kontSS = SpreadsheetApp.openById(
    '1TBemg3McWhT44vZpEDTjj5Aqq2uor4fJW2fb0-xNx80'
  );
  const kontSheet = kontSS.getSheetByName('Студенти');
  const students = kontSheet
    .getRange(2, 1, kontSheet.getLastRow() - 1, 12)
    .getValues()
    .map(r => [r[0], r[1], r[11]]);
  const prepodData = {};
  return email === 'nat_dep_clg@chnu.edu.ua'
    ? { isLogined: true, email, data, students, role: 'Супер адмін' }
    : {
        isLogined: true,
        email,
        data,
        students,
        role: prepodData.length === 0 ? 'guest' : 'Спостерігач ;)',
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

const updateRooms = obj => {
  const stepOldRoom = obj.allrooms.indexOf(obj.oldRoom);
  const stepNewRoom = obj.allrooms.indexOf(obj.newRoom);

  switch (obj.newRoom) {
    case '':
      if (stepOldRoom > -1)
        obj.sheet.getRange(obj.col - 5, 4 + stepOldRoom).clear();
      break;
    default:
      if (stepOldRoom > -1)
        obj.sheet.getRange(obj.col - 5, 4 + stepOldRoom).clear();
      if (stepNewRoom > -1)
        obj.sheet
          .getRange(obj.col - 5, 4 + stepNewRoom)
          .setHorizontalAlignment('center')
          .setVerticalAlignment('middle')
          .setFontFamily('Times New Roman')
          .setFontSize(10)
          .setFontWeight('bold')
          .setBorder(
            true,
            true,
            true,
            true,
            true,
            true,
            'black',
            SpreadsheetApp.BorderStyle.SOLID
          )
          .setBackground('red')
          .setFontColor('black')
          .setValue(obj.text);
      break;
  }
};

export const updateRozklad = obj => {
  const rozklad = SpreadsheetApp.openById(obj.table.id);

  const ws = rozklad.getSheetByName(obj.table.pidrozdil);
  const audFond = rozklad.getSheetByName('Зайнятість аудиторій');
  const allrooms = audFond
    .getRange(3, 4, 1, audFond.getLastColumn() - 3)
    .getValues()[0];
  const oldRoom = ws.getRange(Number(obj.row), Number(obj.col)).getValue();
  const newRoom = obj.aud;
  const group = ws.getRange(Number(obj.row), 2).getValue();
  const subj = ws.getRange(Number(obj.row), 1).getValue();
  const subj_type = ws.getRange(Number(obj.row), 3).getValue();
  const text = `${subj_type}\n${group}\n${subj}`;

  ws.getRange(Number(obj.row), Number(obj.col)).setValue(obj.aud);
  updateRooms({
    allrooms,
    oldRoom,
    newRoom,
    text,
    row: Number(obj.row),
    col: Number(obj.col),
    sheet: audFond,
  });
};

export const getDataForPidrozdil = pidrozdil => {
  const userEmail = Session.getActiveUser().getEmail();
  if (userEmail === '')
    return {
      isLogined: false,
      email: userEmail,
      role: 'guest',
      data: [],
      list: [],
    };

  const ss = SpreadsheetApp.openById(MAINID);
  const ws = ss.getSheetByName('Монітор');
  const row = ws
    .getRange(2, 1, ws.getLastRow() - 1, 3)
    .getValues()
    .filter(r => r[0] === pidrozdil)[0];

  const rozklad = SpreadsheetApp.openById(row[1]);
  const workSheet = rozklad.getSheetByName(row[0]);
  const data = workSheet.getDataRange().getValues();

  const rooms = {};
  const roomsSheet = rozklad.getSheetByName('Аудиторний фонд');
  const roomsData = roomsSheet
    .getRange(1, 1, roomsSheet.getLastRow(), 3)
    .getValues();
  const labs = roomsData.map(r => r[0]).filter(r => r.toString() !== '');
  rooms[labs[0]] = labs.slice(1);
  const others = roomsData.map(r => r[2]).filter(r => r.toString() !== '');
  rooms[others[0]] = others.slice(1);
  return {
    isLogined: true,
    email: userEmail,
    data,
    rooms,
    students: [],
    role: row[2].includes(userEmail) ? 'Супер адмін' : 'Спостерігач ;)',
    table: { id: row[1], pidrozdil: row[0] },
  };
};
