export const MAINID = '1gnuWvvaO0xrobmb44Pj_VfMiGIEyeXORIzuE8dzTIAw';

export const getListOfPidrozdils = () => {
  const ss = SpreadsheetApp.openById(MAINID);
  const ws = ss.getSheetByName('Монітор');
  const data = ws.getRange(2, 1, ws.getLastRow() - 1, 2).getValues();

  return data;
};

export const getListOfPidrozdilsJSON = () => {
  const ss = SpreadsheetApp.openById(MAINID);
  const ws = ss.getSheetByName('Монітор');
  const data = ws.getDataRange().getValues();

  const res = [];

  const headers = data[0];

  data.slice(1).forEach(r => {
    const tmp = {};
    r.forEach((val, idx) => (tmp[headers[idx]] = val));
    res.push(tmp);
  });

  return JSON.stringify(res);
};

export const getUserData = obj => {
  const { users, user, jsonID, xlsID } = obj;

  const userEmail = Session.getActiveUser().getEmail();
  // obj.user.session = { ...Session.getActiveUser() };
  // if (!userEmail) {
  //   userEmail = 'useEmail';
  //   obj.user.email = 'userEmail';
  //   obj.user.role = 'public';
  // }

  if (obj.users.includes(userEmail)) {
    obj.user.email = userEmail;
    obj.user.role = 'staff';
  } else {
    obj.user.email = userEmail;
    obj.user.role = 'public';
  }
  //
  // if (jsonID === '') {
  //   const data = {};
  //   data.staff = {};
  //   const { staff } = data;
  //
  //   const ws = SpreadsheetApp.openById(xlsID);
  //   const dbFile = DriveApp.getFileById(xlsID)
  //     .getParents()
  //     .next()
  //     .createFile('db', '{}', MimeType.JAVASCRIPT);
  //
  //   data.id = dbFile.getId();
  //
  //   staff['1 семестр'] = getSemesterInfo(ws, '1 семестр');
  //   staff['2 семестр'] = getSemesterInfo(ws, '2 семестр');
  //
  //   data.public = {};
  //   dbFile.setContent(JSON.stringify(data));
  //   obj.jsonID = dbFile.getId();
  //
  //   return JSON.stringify({ ...obj, data });
  // }

  const file = DriveApp.getFileById(jsonID);

  const data = JSON.parse(file.getBlob().getDataAsString());

  return JSON.stringify({ ...obj, data });
};

function getSemesterInfo(ws, semName) {
  const res = {};
  const sem = ws
    .getSheetByName(semName)
    .getDataRange()
    .getValues()
    .slice(6);
  // res['Групи'] = getGroups(
  //   sem.map(r => r[1].toString()),
  //   sem
  // );
  // res['Викладачі'] = getPrepods(
  //   sem.map(r => r[4].toString()),
  //   sem
  // );

  let groupList = [];
  sem
    .map(r => r[1].toString())
    .forEach(gr => {
      groupList = [...groupList, ...gr.split('+')];
    });

  res['Групи'] = [...new Set(groupList.map(g => g.split('гр')[0]))].sort();
  res['Викладачі'] = [...new Set(sem.map(r => r[4].toString()))].sort();

  const audFond = ws
    .getSheetByName(`${semName} Аудиторії`)
    .getDataRange()
    .getValues()
    .slice(3)
    .filter(r => r[0].toString() !== '');

  res['Аудиторії'] = audFond.map(r => {
    const tmp = {};
    tmp.aud = r[4].toString().split(' -- ')[0];
    tmp.audDetal = r[4];
    tmp['тип'] = r[3];
    tmp.places = r[2];
    tmp.week = initWeek();

    const totalData = [];
    sem
      .map((r, idx) => [idx + 6, ...r])
      .forEach(gr => {
        const tmp = {};
        tmp.id = gr[0];
        tmp['Назва дисципліни'] = gr[1];
        tmp['групаНавантаження'] = gr[2];
        tmp['тип'] = gr[3];
        tmp['год'] = gr[4];
        tmp['викладач'] = gr[5];
        tmp['К-ть тижнів'] = gr[6];
        tmp['К-ть год/тижд'] = gr[7];
        tmp['виставлено'] = gr[8];
        tmp.week = initWeek();

        totalData.push(tmp);
      });
    res.data = totalData;
    return tmp;
  });

  // getDataForRozklad(res, sem, res['Групи'], res['Викладачі'], res['Аудиторії']);

  return res;
}

function getGroups(listOfGroups, data) {
  let rez = [];

  listOfGroups.forEach(gr => {
    rez = [...rez, ...gr.split('+')];
  });

  const rez1 = rez.map(g => g.split('гр')[0]);
  // const result = {};
  return [...new Set(rez1)].map(gr => {
    // result[gr] = {};
    const tmp = {};
    tmp['група'] = gr;
    tmp['підгрупи'] = [
      ...new Set(
        rez
          .filter(g => g.toString().includes(`${gr}гр`))
          .filter(gg => gg.toString().slice(-2) !== 'гр')
          .map(ggg => ggg.toString().split('гр')[1])
      ),
    ];
    tmp['дисципліни'] = getDataForScheduleByGroup(data, gr);
    tmp.week = initWeek();
    return tmp;

    // result[gr] = getDataForScheduleByGroupJSON(data, gr);
  });
}

function getPrepods(listOfPrepods, data) {
  const rez = [...listOfPrepods];

  return [...new Set(rez)].map(prepod => {
    const tmp = {};
    tmp['викладач'] = prepod;
    tmp['підгрупи'] = getGroupsByPrepod(data, prepod);
    tmp['дисципліни'] = getDataForScheduleByPrepod(data, prepod);
    tmp.week = initWeek();
    return tmp;
  });
}

function getGroupsByPrepod(data, prepod) {
  const rez = data
    .filter(r => r[4].toString().includes(prepod))
    .map(rr => rr[1].toString())
    .join('+')
    .split('+');

  return [...new Set(rez)];
}

function initWeek() {
  const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'];
  const paras = ['1п.', '2п.', '3п.', '4п.', '5п.', '6п.'];
  const weeks = ['1-й тиж.', '2-й тиж.'];

  const tmp = {};
  tmp.week = {};
  days.forEach(day => {
    tmp.week[day] = {};

    paras.forEach(para => {
      tmp.week[day][para] = {};

      weeks.forEach(week => (tmp.week[day][para][week] = []));
    });
  });

  return tmp.week;
}

function getDataForScheduleByPrepod(data, prepod) {
  const res = [];
  data
    .filter(r => r[4].toString().includes(prepod))
    .map(gr => {
      const tmp = {};
      tmp['Назва дисципліни'] = gr[0];
      tmp['групаНавантаження'] = gr[1];
      tmp['тип'] = gr[2];
      tmp['год'] = gr[3];
      tmp['викладач'] = gr[4];
      tmp['К-ть тижнів'] = gr[5];
      tmp['К-ть год/тижд'] = gr[6];
      tmp['виставлено'] = gr[7];
      tmp.week = initWeek();
      res.push(tmp);
    });

  return res;
}

function getFullNameOfGroup(line, gr) {
  return line.split('+').filter(g => g.includes(gr))[0];
}

function getDataForScheduleByGroupJSON(data, group) {
  const obj = {};
  data
    .filter(r => r[1].toString().includes(group))
    .forEach(r => {
      if (!(r[0] in obj)) {
        obj[r[0]] = {};
      }
      const fullGr = getFullNameOfGroup(r[1], group);
      if (!(fullGr in obj[r[0]])) {
        obj[r[0]][fullGr] = {};
      }
      const typOfDisc = r[2];

      if (!(typOfDisc in obj[r[0]][fullGr])) {
        obj[r[0]][fullGr][typOfDisc] = {};
      }

      obj[r[0]][fullGr][typOfDisc]['год'] = r[3];
      obj[r[0]][fullGr][typOfDisc]['викладач'] = r[4];
      obj[r[0]][fullGr][typOfDisc]['К-ть тижнів'] = r[5];
      obj[r[0]][fullGr][typOfDisc]['К-ть год/тижд'] = r[6];
      obj[r[0]][fullGr][typOfDisc]['виставлено'] = r[7];
      obj[r[0]][fullGr][typOfDisc].week = initWeek();
    });
  return obj;
}

function getDataForScheduleByGroup(data, group) {
  const res = [];
  data
    .filter(r => r[1].toString().includes(group))
    .map(gr => {
      const tmp = {};
      tmp['Назва дисципліни'] = gr[0];
      tmp['групаНавантаження'] = gr[1];
      tmp['тип'] = gr[2];
      tmp['год'] = gr[3];
      tmp['викладач'] = gr[4];
      tmp['К-ть тижнів'] = gr[5];
      tmp['К-ть год/тижд'] = gr[6];
      tmp['виставлено'] = gr[7];
      tmp.week = initWeek();
      res.push(tmp);
    });

  return res;
}

// function getDataForRozklad(res, data, groups, prepods, auds) {
//
//   auds.forEach(aud => {
//     const tmp = {};
//     tmp.week = initWeek();
//
//     audsObj.push(Object.assign(aud, tmp));
//   });
//
//   result['Зайнятість аудиторій'] = audsObj;
//
//   const prepodsObj = [];
//   prepods.forEach(prepod => {
//     const tmp = {};
//     tmp.prepod = prepod;
//     tmp.week = initWeek();
//
//
//     prepodsObj.push(tmp);
//   });
//
//   result['Зайнятість викладачів'] = prepodsObj;
//
//   const res = {};
//   groups.forEach(grop => {
//     res[grop] = [];
//     data
//       .filter(r => r[1].toString().includes(grop))
//       .map(gr => {
//         const tmp = {};
//         tmp['Назва дисципліни'] = gr[0];
//         tmp['групаНавантаження'] = gr[1];
//         tmp['тип'] = gr[2];
//         tmp['год'] = gr[3];
//         tmp['викладач'] = gr[4];
//         tmp['К-ть тижнів'] = gr[5];
//         tmp['К-ть год/тижд'] = gr[6];
//         tmp['виставлено'] = gr[7];
//         tmp.week = initWeek();
//         res[grop].push(tmp);
//       });
//   });
//   result['група'] = res;
//
//   return { ...result };
// }

export const saveToServer = text => {
  const obj = JSON.parse(text);

  const { action, key, jsonID, data } = obj;

  if (action === 'updateDB') {
    const file = DriveApp.getFileById(jsonID);

    const DB = JSON.parse(file.getBlob().getDataAsString());

    DB[key] = { ...data };

    file.setContent(JSON.stringify(DB));

    return JSON.stringify({ status: 'OK' });
  }

  return JSON.stringify({ status: 'Error' });
};

export const getUser = () => {
  const user = Session.getActiveUser();
  return { role: 'public', email: user.getEmail() };
};
