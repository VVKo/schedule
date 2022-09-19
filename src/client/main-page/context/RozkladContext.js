import React, { createContext, useState, useEffect, useReducer } from 'react';

import server from '../../utils/server';
import rozkladReducer from './RozkladReducer';
import getData from '../data/Utils';

const { serverFunctions } = server;

const RozkladContext = createContext();

const rozkladChNU_API =
  'https://script.google.com/macros/s/AKfycbw1tjvCprGFoOFCzgEmaTg8YTjTy7X7yWpyBZT32uh0lOZSccFiZ_OR6MpQK7_9cTE/exec';

const driver_API =
  'https://script.google.com/macros/s/AKfycbzPGSRA_iPCjt5IwrgY4AxPuCoKuP5gofysbI79ovilw_vob9UeHMD1ZzZoVicUhoA1/exec';

export const RozkladProvider = ({ children }) => {
  const initState = {
    showModal: false,
    xlsID: '',
    audfond: { '1 семестр': [], '2 семестр': [] },
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

  const setShowModal = val => dispatch({ type: 'SET_SHOWMODAL', payload: val });
  const setCurrentDep = id => dispatch({ type: 'SET_CURRENTDEP', payload: id });
  const setCurrentAcademicYear = obj =>
    dispatch({ type: 'SET_CURRENTACADEMICYEAR', payload: obj });
  const setCurrentSemester = obj =>
    dispatch({ type: 'SET_CURRENTSEMESTER', payload: obj });
  const setXlsId = id => dispatch({ type: 'SET_XLSID', payload: id });
  const setDataForModal = obj =>
    dispatch({ type: 'SET_DATAFORMODAL', payload: obj });
  const setLoading = (msg, newtoast) =>
    dispatch({ type: 'SET_LOADING', payload: { msg, newtoast } });

  const getDepartments = () => {
    setLoading('Завантажуємо підрозділи ...', 'deps');
    getData(`${rozkladChNU_API}?action=GETLISTOFDEPARTMENTS`).then(data => {
      dispatch({
        type: 'GETLISTOFDEPARTMENTS',
        payload: data,
      });
      dispatch({
        type: 'UPDATE',
        payload: {
          loading: false,
          status: data.status,
          newtoast: 'deps',
        },
      });
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
      dispatch({
        type: 'UPDATE',
        payload: {
          loading: false,
          status: data.status,
          newtoast: 'newAcademicYear',
        },
      });
    });
  };

  const deleteRowAud = (sem, id, row) => {
    setLoading('Видалення аудиторії з бази ...', 'delrow');
    getData(
      `${rozkladChNU_API}?action=DELETEROWAUD&sem=${sem}&xlsID=${id}&row=${row}`
    ).then(data => {
      dispatch({
        type: 'UPDATE',
        payload: {
          loading: false,
          status: 'Аудиторію успішно видалено',
          newtoast: 'delrow',
        },
      });
    });
  };

  const addAudToServer = (sem, id, arr) => {
    setLoading('Запис аудиторії у базу ...', 'addaudtoserver');
    getData(
      `${rozkladChNU_API}?action=ADDAUD&&sem=${sem}&xlsID=${id}&data=${arr}`
    ).then(data => {
      dispatch({
        type: 'UPDATE',
        payload: {
          loading: false,
          status: 'Аудиторію успішно додано',
          newtoast: 'addaudtoserver',
        },
      });
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
        console.log('dataObj', dataObj);
        setXlsId(dataObj.xlsID);
        getAudsForStaff('1 семестр', dataObj.xlsID);
        getAudsForStaff('2 семестр', dataObj.xlsID);
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
    console.log('removeAudFromLocalData', { id, day, para, w, aud, gr });
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
      console.log(tmp[semester]);
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
        console.log(dataObj);

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
        audfond: state.audfond,
        deleteRowAud,
        addAudToServer,
        getDepartments,
        setCurrentDep,
        setCurrentAcademicYear,
        setCurrentSemester,
        createNewAcademicYear,
      }}
    >
      {children}
    </RozkladContext.Provider>
  );
};

export default RozkladContext;
