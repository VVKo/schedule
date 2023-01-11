import React, { createContext, useState, useEffect, useReducer } from 'react';

import server from '../../utils/server';
import rozkladReducer from './RozkladReducer';
import getData, { getDataNEW } from '../data/Utils';

const { serverFunctions } = server;

const RozkladContext = createContext();

const rozkladChNU_API =
  'https://script.google.com/macros/s/AKfycbz9TGybKSdfNecmU7-8_nWFn5sPSwNX6Ly2D9tSdIxy8WwrusVvLYR0B3c9oUfMoRo/exec';

const driver_API =
  'https://script.google.com/macros/s/AKfycbzPGSRA_iPCjt5IwrgY4AxPuCoKuP5gofysbI79ovilw_vob9UeHMD1ZzZoVicUhoA1/exec';

export const RozkladProvider = ({ children }) => {
  const initState = {
    activeId: null,
    showModal: false,
    xlsID: '',
    loading: false,
    dataForModal: {
      title: 'title',
      size: 'xl',
      body: { func: '', data: {} },
    },
  };

  const [groupsWeek, setGroupsWeek] = useState(null);
  const [teachersWeek, setTeachersWeek] = useState(null);

  const [change, setChange] = useState(false);
  const [flagOfChanges, setFlagOfChanges] = useState(0);
  const [jsonID, setJsonID] = useState('');

  const [user, setUser] = useState({ role: 'public', email: '' });
  const [data, setData] = useState(null);
  const [workData, setWorkData] = useState(null);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [publicPanel, setPublicPanel] = useState({
    academicYear: { name: 'Виберіть навчальний рік', id: '' },
    semester: { name: 'Виберіть семестр' },
    group: 'Виберіть групу',
    teacher: 'Виберіть викладача',
    groups: ['Виберіть групу'],
    teachers: [],
  });

  const [currentGroups, setCurrentGroups] = useState([]);
  const [currentTeachers, setCurrentTeachers] = useState([]);
  const [scheduleKey, setScheduleKey] = useState('');

  const [state, dispatch] = useReducer(rozkladReducer, initState);

  const updateContext = (type, payload) =>
    dispatch({
      type,
      payload,
    });

  const setActiveId = val => dispatch({ type: 'SET_ACTIVEID', payload: val });
  const setShowModal = val => dispatch({ type: 'SET_SHOWMODAL', payload: val });
  const setCurrentDep = id => dispatch({ type: 'SET_CURRENTDEP', payload: id });
  const setCurrentAcademicYear = obj =>
    dispatch({ type: 'SET_CURRENTACADEMICYEAR', payload: obj });
  const setCurrentSemester = obj =>
    dispatch({ type: 'SET_CURRENTSEMESTER', payload: obj });
  const setCurrentGroup = gr =>
    dispatch({ type: 'SET_CURRENTGROUP', payload: gr });
  const setXlsId = id => dispatch({ type: 'SET_XLSID', payload: id });
  const setDataForModal = obj =>
    dispatch({ type: 'SET_DATAFORMODAL', payload: obj });
  const setLoading = (msg, newtoast) =>
    dispatch({ type: 'SET_LOADING', payload: { msg, newtoast } });
  const updateToast = (status, newtoast) =>
    dispatch({
      type: 'UPDATE',
      payload: {
        loading: false,
        status,
        newtoast,
      },
    });

  const getDepartments = () => {
    const toastName = 'deps';
    const API = 'rozkladChNU_API';
    const action = 'GETLISTOFDEPARTMENTS';
    setLoading('Завантажуємо підрозділи ...', toastName);
    getDataNEW(API, action, '').then(resp => {
      updateContext(action, resp.data);
      updateToast(resp.status, toastName);
    });
  };

  const createNewAcademicYear = ({ dep, academicYear }) => {
    setLoading('Створюємо новий навчальний рік ...', 'newAcademicYear');
    getData(
      `${driver_API}?action=INITROZKLADYEAR&dep=${dep}&academicYear=${academicYear}`
    ).then(data => {
      const depIdx = state.departments.findIndex(o => o.Підрозділ === dep);
      const updatedata = [...state.departments];
      updatedata[depIdx][academicYear] = data.id;
      setCurrentAcademicYear({ name: academicYear, id: data.id });
      dispatch({ type: 'SET_DEPARTMENTS', payload: [...updatedata] });
      updateToast(data.status, 'newAcademicYear');
    });
  };

  const deleteRowAud = (sem, id, row) => {
    setLoading('Видалення аудиторії з бази ...', 'delrow');
    getData(
      `${rozkladChNU_API}?action=DELETEROWAUD&sem=${sem}&xlsID=${id}&row=${row}`
    ).then(data => {
      updateToast('Аудиторію успішно видалено', 'delrow');
    });
  };

  const deleteFromAudFond = (sem, folderID, row) => {
    setLoading('Видалення аудиторії з фонду ...', 'delrowfromfond');
    getData(
      `${rozkladChNU_API}?action=DELETEROWFROMAUDFOND&sem=${sem}&folderID=${folderID}&row=${row}`
    ).then(data => {
      const tmp = state.audfond[sem].data.filter((r, idx) => idx !== row - 4);
      // delete tmp[row - 4];
      dispatch({ type: 'DELETE_ROWFROMAUDFOND', payload: { sem, data: tmp } });
      updateToast(data.status, 'delrowfromfond');
    });
  };

  const deleteFromSchedule = (sem, folderID, txt) => {
    setLoading('Видалення дисципліни з розкладу ...', 'delfromschedule');
    getData(
      `${rozkladChNU_API}?action=DELETEDISCFROMSCHEDULE&sem=${sem}&folderID=${folderID}&txt=${txt}`
    ).then(data => {
      const obj = JSON.parse(txt);
      const aud = state.audfond[sem].data;
      if (obj.audRow) aud[+obj.audRow - 4][+obj.audCol - 1] = '';
      const prep = state.teacherfond[sem].data;
      prep[+obj.teacherRow - 4][+obj.teacherCol - 1] = '';
      const academ = state.academicloadfond[sem].data;
      academ[+obj.academicRow - 4][+obj.academicCol - 1] = '';
      academ[+obj.academicRow - 4][7] -= 1;

      dispatch({
        type: 'DELETE_DISC_FROM_SCHEDULE',
        payload: { sem, data: { aud, prep, academ } },
      });
      updateToast(data.status, 'delfromschedule');
    });
  };

  const deleteFromGroupFond = (sem, folderID, row) => {
    setLoading('Видалення групи з фонду ...', 'delrowfromgrfond');
    getData(
      `${rozkladChNU_API}?action=DELETEROWFROMGROUPFOND&sem=${sem}&folderID=${folderID}&row=${row}`
    ).then(data => {
      const tmp = state.groupfond[sem].data.filter((r, idx) => idx !== row - 4);
      // delete tmp[row - 4];
      dispatch({
        type: 'DELETE_ROWFROMGROUPFOND',
        payload: { sem, data: tmp },
      });
      updateToast(data.status, 'delrowfromgrfond');
    });
  };

  const deleteFromDisciplineFond = (sem, folderID, row) => {
    setLoading('Видалення Дисципліни з фонду ...', 'delrowfromdiscfond');
    getData(
      `${rozkladChNU_API}?action=DELETEROWFROMDISCIPLINEFOND&sem=${sem}&folderID=${folderID}&row=${row}`
    ).then(data => {
      const tmp = state.disciplinefond[sem].data.filter(
        (r, idx) => idx !== row - 4
      );
      // delete tmp[row - 4];
      dispatch({
        type: 'DELETE_ROWFROMDISCIPLINEFOND',
        payload: { sem, data: tmp },
      });
      updateToast(data.status, 'delrowfromdiscfond');
    });
  };

  const deleteFromAcademicLoadFond = (sem, folderID, row) => {
    setLoading(
      'Видалення Дисципліни з Навантаження ...',
      'delrowfromdiscfondload'
    );
    getData(
      `${rozkladChNU_API}?action=DELETEROWFROMACADEMICLOADFOND&sem=${sem}&folderID=${folderID}&row=${row}`
    ).then(data => {
      const tmp = state.academicloadfond[sem].data.filter(
        (r, idx) => idx !== row - 4
      );

      dispatch({
        type: 'DELETE_ROWFROMACADEMICLOADFOND',
        payload: { sem, data: tmp },
      });
      updateToast(data.status, 'delrowfromdiscfondload');
    });
  };

  const deleteFromTeacherFond = (sem, folderID, row) => {
    setLoading('Видалення викладача з фонду ...', 'delteacerrowfromfond');
    getData(
      `${rozkladChNU_API}?action=DELETEROWFROMTEACHERFOND&sem=${sem}&folderID=${folderID}&row=${row}`
    ).then(data => {
      const tmp = state.teacherfond[sem].data.filter(
        (r, idx) => idx !== row - 4
      );
      // delete tmp[row - 4];
      dispatch({
        type: 'DELETE_ROWFROMTEACHERFOND',
        payload: { sem, data: tmp },
      });
      updateToast(data.status, 'delteacerrowfromfond');
    });
  };

  const addAudToServer = (sem, id, arr) => {
    setLoading('Запис аудиторії у базу ...', 'addaudtoserver');
    getData(
      `${rozkladChNU_API}?action=ADDAUD&&sem=${sem}&xlsID=${id}&data=${arr}`
    ).then(data => {
      updateToast('Аудиторію успішно додано', 'addaudtoserver');
    });
  };

  const uploadToLoadFond = (sem, folderID, arr) => {
    setLoading('Оновлення навантаження ...', 'uploadtoloadfond');
    const txt = JSON.stringify({ sem, folderID, arr });
    getData(`${rozkladChNU_API}?action=UPLOADTOLOADFOND&data=${txt}`).then(
      data => {
        const tmp = state.academicloadfond[sem].data;
        const spaces = [];
        for (let i = 0; i < 80; i++) {
          spaces.push('');
        }
        arr.forEach(a => tmp.push([...a, ...spaces]));

        dispatch({ type: 'UPLOAD_LOADTOFOND', payload: { sem, data: tmp } });
        updateToast(data.status, 'uploadtoloadfond');
      }
    );
  };
  const uploadToAudFond = (sem, folderID, arr) => {
    setLoading('Оновлення аудиторної бази ...', 'uploadtoaudfond');
    const txt = JSON.stringify({ sem, folderID, arr });
    getData(`${rozkladChNU_API}?action=UPLOADTOAUDFOND&data=${txt}`).then(
      data => {
        const tmp = state.audfond[sem].data;
        const spaces = [];
        for (let i = 0; i < 80; i++) {
          spaces.push('');
        }
        arr.forEach(a => tmp.push([...a, ...spaces]));

        dispatch({ type: 'UPLOAD_AUDTOFOND', payload: { sem, data: tmp } });
        updateToast(data.status, 'uploadtoaudfond');
      }
    );
  };
  const addToAudFond = (sem, folderID, arr) => {
    setLoading('Запис аудиторії у базу ...', 'addaudtofond');
    getData(
      `${rozkladChNU_API}?action=ADDTOAUDFOND&sem=${sem}&folderID=${folderID}&data=${arr}`
    ).then(data => {
      const tmp = state.audfond[sem].data;
      const spaces = [];
      for (let i = 0; i < 80; i++) {
        spaces.push('');
      }
      tmp.push([...arr, ...spaces]);
      dispatch({ type: 'ADD_AUDTOFOND', payload: { sem, data: tmp } });
      updateToast(data.status, 'addaudtofond');
    });
  };

  const addToGroupFond = (sem, folderID, arr) => {
    setLoading('Запис групи у базу ...', 'addgrouptofond');
    getData(
      `${rozkladChNU_API}?action=ADDTOGROUPFOND&sem=${sem}&folderID=${folderID}&data=${encodeURIComponent(
        arr
      )}`
    ).then(data => {
      const tmp = state.groupfond[sem].data;
      const spaces = [];
      for (let i = 0; i < 80; i++) {
        spaces.push('');
      }
      JSON.parse(arr).forEach(r => tmp.push([...r, ...spaces]));
      dispatch({ type: 'ADD_GROUPTOFOND', payload: { sem, data: tmp } });
      updateToast(data.status, 'addgrouptofond');
    });
  };

  const addToSchedule = (sem, folderID, arr) => {
    setLoading('Збереження...', 'addtoschedule');
    getData(
      `${rozkladChNU_API}?action=ADDTOSCHEDULE&sem=${sem}&folderID=${folderID}&data=${encodeURIComponent(
        arr
      )}`
    ).then(data => {
      const {
        rowload,
        colload,
        rowteacher,
        colteacher,
        rowaud,
        colaud,
        aud,
      } = JSON.parse(arr);
      const academicloadfonddata = state.academicloadfond[sem].data;
      academicloadfonddata[+rowload - 4][+colload - 1] = aud;
      academicloadfonddata[+rowload - 4][7] =
        +academicloadfonddata[+rowload - 4][7] + 1;
      const teacherfonddata = state.teacherfond[sem].data;
      teacherfonddata[+rowteacher - 4][+colteacher - 1] = '+';
      const audfonddata = state.audfond[sem].data;
      if (rowaud) audfonddata[+rowaud - 4][+colaud - 1] = '+';
      dispatch({
        type: 'ADD_TO_SCHEDULE',
        payload: {
          sem,
          data: { academicloadfonddata, teacherfonddata, audfonddata },
        },
      });
      updateToast(data.status, 'addtoschedule');
    });
  };

  const addToAcademicLoadFond = (sem, folderID, arr) => {
    setLoading('Додаємо дисципліну до навантаження ...', 'addgrouptofondload');
    getData(
      `${rozkladChNU_API}?action=ADDTOACADEMICLOADFOND&sem=${sem}&folderID=${folderID}&data=${encodeURIComponent(
        arr
      )}`
    ).then(data => {
      const tmp = state.academicloadfond[sem].data;
      const spaces = [];
      for (let i = 0; i < 80; i++) {
        spaces.push('');
      }
      tmp.push([...JSON.parse(arr), ...spaces]);
      dispatch({ type: 'ADD_ACADEMICLOADTOFOND', payload: { sem, data: tmp } });
      updateToast(data.status, 'addgrouptofondload');
    });
  };

  const addToDisciplineFond = (sem, folderID, arr) => {
    setLoading('Запис групи у базу ...', 'adddisciplinetofond');
    getData(
      `${rozkladChNU_API}?action=ADDTODISCIPLINEFOND&sem=${sem}&folderID=${folderID}&data=${encodeURIComponent(
        arr
      )}`
    ).then(data => {
      const tmp = state.disciplinefond[sem].data;
      const spaces = [''];
      tmp.push([...JSON.parse(arr), ...spaces]);
      dispatch({ type: 'ADD_DISCIPLINETOFOND', payload: { sem, data: tmp } });
      updateToast(data.status, 'adddisciplinetofond');
    });
  };

  const addToTeacherFond = (sem, folderID, arr) => {
    setLoading('Запис викладача у базу ...', 'addteachertofond');
    getData(
      `${rozkladChNU_API}?action=ADDTOTEACHERFOND&sem=${sem}&folderID=${folderID}&data=${arr}`
    ).then(data => {
      const tmp = state.teacherfond[sem].data;
      const spaces = [];
      for (let i = 0; i < 80; i++) {
        spaces.push('');
      }
      tmp.push([...arr, ...spaces]);
      dispatch({ type: 'ADD_TEACHERTOFOND', payload: { sem, data: tmp } });
      updateToast(data.status, 'addteachertofond');
    });
  };

  const getAudFond = (sem, folderID) => {
    const toastName = 'audfondnew';
    const API = 'rozkladChNU_API';
    const action = 'GETAUDFOND';
    const txt = JSON.stringify({ sem, folderID });
    setLoading('Завантажуємо аудиторний фонд ...', toastName);
    getDataNEW(API, action, txt).then(resp => {
      updateContext('SET_AUDFOND', { sem, data: resp });
      updateToast(resp.status, toastName);
    });
  };

  const getGroupFond = (sem, folderID) => {
    const toastName = 'groupfondnew';
    const API = 'rozkladChNU_API';
    const action = 'GETGROUPFOND';
    const txt = JSON.stringify({ sem, folderID });
    setLoading('Завантажуємо груповий фонд ...', toastName);
    getDataNEW(API, action, txt).then(resp => {
      updateContext('SET_GROUPFOND', { sem, data: resp });
      updateToast(resp.status, toastName);
    });
  };

  const getDisciplineFond = (sem, folderID) => {
    const toastName = 'disciplinefondnew';
    const API = 'rozkladChNU_API';
    const action = 'GETDISCIPLINEFOND';
    const txt = JSON.stringify({ sem, folderID });
    setLoading('Завантажуємо дисципліни ...', 'disciplinefondnew');
    getDataNEW(API, action, txt).then(resp => {
      updateContext('SET_DISCIPLINEFOND', { sem, data: resp });
      updateToast(resp.status, toastName);
    });
  };

  const getAcademicLoadFond = (sem, folderID) => {
    const toastName = 'academikloadfondnew';
    const API = 'rozkladChNU_API';
    const action = 'GETACADEMICLOADFOND';
    const txt = JSON.stringify({ sem, folderID });
    setLoading('Завантажуємо навантаження ...', toastName);
    getDataNEW(API, action, txt).then(resp => {
      updateContext('SET_ACADEMICLOADFOND', { sem, data: resp });
      updateToast(resp.status, toastName);
    });
  };

  const getTeacherFond = (sem, folderID) => {
    const toastName = 'toastteacherfondnew';
    const API = 'rozkladChNU_API';
    const action = 'GETTEACHERFOND';
    const txt = JSON.stringify({ sem, folderID });
    setLoading('Завантажуємо викладацький фонд ...', toastName);
    getDataNEW(API, action, txt).then(resp => {
      updateContext('SET_TEACHERFOND', { sem, data: resp });
      updateToast(resp.status, toastName);
    });
  };

  const getAudsForStaff = (sem, id) => {
    setLoading(`${sem} Завантажуємо аудиторний фонд ...`, `audfond${sem}`);
    getData(`${rozkladChNU_API}?action=GETAUD&&sem=${sem}&xlsID=${id}`).then(
      data => {
        dispatch({
          type: 'GETAUD',
          payload: { sem, data },
        });
        dispatch({
          type: 'UPDATE',
          payload: {
            loading: true,
            status: `${sem} аудиторний фонд завантажено ...`,
            newtoast: `audfond${sem}`,
          },
        });
      }
    );
  };

  useEffect(() => {
    setChange(prev => {
      if (flagOfChanges === 0) return false;
      return true;
    });
  }, [flagOfChanges]);

  function getWeekFromData(localdata, sem, val, key, day, para, w) {
    let result = [];

    if (key === 'Групи') {
      localdata[sem].data
        .filter(o => o['групаНавантаження'].includes(val))
        .forEach(ob => (result = [...result, ...ob.week[day][para][w]]));
    }

    if (key === 'Викладачі') {
      localdata[sem].data
        .filter(o => o['викладач'] === val)
        .forEach(ob => (result = [...result, ...ob.week[day][para][w]]));
    }

    return result;
  }

  function initWeek(obj) {
    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ'];
    const paras = ['1п.', '2п.', '3п.', '4п.', '5п.', '6п.'];
    const weeks = ['1-й тиж.', '2-й тиж.'];
    const { localdata, sem, target } = obj;

    const tmp = {};
    tmp.week = {};
    days.forEach(day => {
      tmp.week[day] = {};

      paras.forEach(para => {
        tmp.week[day][para] = {};

        weeks.forEach(
          week =>
            (tmp.week[day][para][week] = getWeekFromData(
              localdata,
              sem,
              target.val,
              target.key,
              day,
              para,
              week
            ))
        );
      });
    });

    return tmp.week;
  }
  const getUserData = obj => {
    setLoading('Завантаження даних для користувача ...', 'getuserdata');
    setDataLoaded(false);
    serverFunctions
      .getUserData(obj)
      .then(res => {
        const dataObj = JSON.parse(res);
        // console.log('dataObj', dataObj);
        setXlsId(dataObj.xlsID);
        // getAudsForStaff('1 семестр', dataObj.xlsID);
        // getAudsForStaff('2 семестр', dataObj.xlsID);
        setDataLoaded(true);
        setUser(dataObj.user);
        setData(dataObj.data.staff);
        setGroupsWeek(() => {
          const tmp = { '1 семестр': {}, '2 семестр': {} };
          dataObj.data.staff['1 семестр']['Групи'].forEach(
            gr =>
              (tmp['1 семестр'][gr] = initWeek({
                target: { key: 'Групи', val: gr },
                sem: '1 семестр',
                localdata: { ...dataObj.data.staff },
              }))
          );
          dataObj.data.staff['2 семестр']['Групи'].forEach(
            gr =>
              (tmp['2 семестр'][gr] = initWeek({
                target: { key: 'Групи', val: gr },
                sem: '2 семестр',
                localdata: { ...dataObj.data.staff },
              }))
          );
          return tmp;
        });
        setTeachersWeek(() => {
          const tmp = { '1 семестр': {}, '2 семестр': {} };
          dataObj.data.staff['1 семестр']['Викладачі'].forEach(
            prepod =>
              (tmp['1 семестр'][prepod] = initWeek({
                target: { key: 'Викладачі', val: prepod },
                sem: '1 семестр',
                localdata: { ...dataObj.data.staff },
              }))
          );
          dataObj.data.staff['2 семестр']['Викладачі'].forEach(
            prepod =>
              (tmp['2 семестр'][prepod] = initWeek({
                target: { key: 'Викладачі', val: prepod },
                sem: '2 семестр',
                localdata: { ...dataObj.data.staff },
              }))
          );
          return tmp;
        });

        setDataLoaded(true);
        dispatch({
          type: 'UPDATE',
          payload: {
            loading: false,
            status: 'Усі дані завантажено',
            newtoast: 'getuserdata',
          },
        });
      })
      .catch(alert);
  };

  const handleChangePanel = () => {
    const { semester, group, teacher } = publicPanel;

    if (semester.name !== 'Виберіть семестр') {
      if (group !== 'Виберіть групу') {
        setScheduleKey('Розклад групи');
        setWorkData(prevState => {
          const tmp = { ...prevState };

          const discs = data[semester.name].data.filter(o =>
            o['групаНавантаження'].includes(group)
          );
          tmp['Розклад групи'] = [
            {
              група: group,
              дисципліни: discs,
              week: groupsWeek[semester.name][group],
            },
          ];

          return { ...tmp };
        });
      } else {
        setCurrentGroups(data[semester.name]['Групи']);

        if (teacher !== 'Виберіть викладача') {
          setScheduleKey('Розклад викладача');
          setWorkData(prevState => {
            const tmp = { ...prevState };

            const discs = data[semester.name].data.filter(
              o => o['викладач'] === teacher
            );
            tmp['Розклад викладача'] = [
              {
                викладач: teacher,
                дисципліни: discs,
                week: teachersWeek[semester.name][teacher],
              },
            ];

            return { ...tmp };
          });
        } else {
          setScheduleKey('Виберіть групу або викладача');
          setCurrentTeachers(data[semester.name]['Викладачі']);

          setWorkData(() => {
            return {
              'Розклад групи': data[semester.name]['Групи'].map(gr => {
                const discs = data[semester.name].data.filter(o =>
                  o['групаНавантаження'].includes(gr)
                );

                return {
                  група: gr,
                  дисципліни: discs,
                  week: groupsWeek[semester.name][gr],
                };
              }),
            };
          });

          // setScheduleKey('Групи');
        }
      }
    } else setWorkData(null);
  };

  useEffect(() => {
    handleChangePanel();
  }, [publicPanel]);

  const removeAudFromLocalData = obj => {
    const { semester } = publicPanel;
    const { id, day, para, w, aud, gr } = obj;
    // console.log('removeAudFromLocalData', { id, day, para, w, aud, gr });
    setFlagOfChanges(prevState => prevState + 1);
    setData(prev => {
      const tmp = { ...prev };
      const indexData = tmp[semester].data.findIndex(o => o.id === +id);
      const teacher = tmp[semester].data[indexData]['викладач'];
      const fulGroup = tmp[semester].data[indexData]['групаНавантаження'];

      tmp[semester].data[indexData]['виставлено'] =
        +tmp[semester].data[indexData]['виставлено'] - 1;

      tmp[semester].data[indexData].week[day][para][w] = tmp[semester].data[
        indexData
      ].week[day][para][w].filter(ob => ob.aud !== aud && ob.id !== id);

      setGroupsWeek(prevState => {
        const t = { ...prevState };
        fulGroup
          .split('+')
          .map(g => g.split('гр')[0])
          .forEach(
            grr =>
              (t[semester][grr][day][para][w] = t[semester][grr][day][para][
                w
              ].filter(ob => ob.aud !== aud && ob.id !== id))
          );

        return t;
      });

      const indexAud = tmp[semester]['Аудиторії'].findIndex(
        o => o.audDetal === aud
      );

      indexAud !== -1
        ? (tmp[semester]['Аудиторії'][indexAud].week[day][para][w] = tmp[
            semester
          ]['Аудиторії'][indexAud].week[day][para][w].filter(
            o => o.id !== id && o.group !== gr
          ))
        : aud === 'Вільні аудиторії'
        ? tmp[semester]['Аудиторії'].forEach((auditoria, audIdx) => {
            tmp[semester]['Аудиторії'][audIdx].week[day][para][
              w
            ] = auditoria.week[day][para][w].filter(
              o => o.id !== id && o.group !== gr
            );
          })
        : null;

      setTeachersWeek(prevState => {
        const t = { ...prevState };
        t[semester][teacher][day][para][w] = t[semester][teacher][day][para][
          w
        ].filter(ob => ob.aud !== aud && ob.id !== id);
        return t;
      });
      return { ...tmp };
    });
  };

  const addAudToLocalData = obj => {
    const { semester } = publicPanel;
    const { id, day, para, w, aud, group } = obj;

    setFlagOfChanges(prevState => prevState + 1);

    setData(prev => {
      const tmp = { ...prev };
      // console.log(tmp[semester]);
      const indexData = tmp[semester].data.findIndex(o => o.id === +id);
      const teacher = tmp[semester].data[indexData]['викладач'];
      const fulGroup = tmp[semester].data[indexData]['групаНавантаження'];

      tmp[semester].data[indexData]['виставлено'] =
        +tmp[semester].data[indexData]['виставлено'] + 1;

      tmp[semester].data[indexData].week[day][para][w].push({ id, aud }); // TODO fix

      setGroupsWeek(prevState => {
        const t = { ...prevState };
        fulGroup
          .split('+')
          .map(g => g.split('гр')[0])
          .forEach(grr => t[semester][grr][day][para][w].push({ id, aud }));

        return t;
      });

      const indexAud = tmp[semester]['Аудиторії'].findIndex(
        o => o.audDetal === aud
      );

      indexAud !== -1
        ? tmp[semester]['Аудиторії'][indexAud].week[day][para][w].push({
            id,
            group,
          })
        : null;

      setTeachersWeek(prevState => {
        const t = { ...prevState };
        t[semester][teacher][day][para][w].push({ id, aud });
        return t;
      });

      return { ...tmp };
    });
  };

  const saveToServer = () => {
    const obj = {
      action: 'updateDB',
      key: user.role,
      jsonID,
      data,
    };

    setDataLoaded(false);
    serverFunctions
      .saveToServer(JSON.stringify(obj))
      .then(res => {
        const dataObj = JSON.parse(res);
        // console.log(dataObj);

        setDataLoaded(true);
        setFlagOfChanges(0);
      })
      .catch(alert);
  };

  return (
    <RozkladContext.Provider
      value={{
        state,
        dataLoaded,
        departments: state.departments,
        publicPanel,
        user,
        data,
        workData,
        getUserData,
        // showButton,
        setPublicPanel,
        showModal: state.showModal,
        xlsID: state.xlsID,
        setShowModal,
        dataForModal: state.dataForModal,
        auds_first_sem: state['auds 1 семестр'],
        setDataForModal,
        currentGroups,
        setCurrentGroups,
        currentTeachers,
        setCurrentTeachers,
        scheduleKey,
        addAudToLocalData,
        teachersWeek,
        groupsWeek,
        removeAudFromLocalData,
        change,
        saveToServer,
        setJsonID,
        isDataLoaded,

        getAudsForStaff,
        deleteRowAud,
        addAudToServer,
        getDepartments,
        setCurrentDep,
        setCurrentAcademicYear,
        setCurrentSemester,
        setCurrentGroup,
        setActiveId,
        createNewAcademicYear,
        getAudFond,
        getGroupFond,
        getTeacherFond,
        getDisciplineFond,
        getAcademicLoadFond,
        deleteFromAudFond,
        deleteFromTeacherFond,
        deleteFromGroupFond,
        deleteFromDisciplineFond,
        deleteFromAcademicLoadFond,
        deleteFromSchedule,
        addToAudFond,
        addToTeacherFond,
        addToGroupFond,
        addToDisciplineFond,
        addToAcademicLoadFond,
        addToSchedule,
        uploadToAudFond,
        uploadToLoadFond,
      }}
    >
      {children}
    </RozkladContext.Provider>
  );
};

export default RozkladContext;
