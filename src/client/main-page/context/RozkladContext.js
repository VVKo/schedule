import React, { createContext, useState, useEffect, useReducer } from 'react';

import server from '../../utils/server';
import rozkladReducer from './RozkladReducer';

const { serverFunctions } = server;

const RozkladContext = createContext();

export const RozkladProvider = ({ children }) => {
  const initState = {
    showModal: false,
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
  const [isMounted, setIsMounted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [publicPanel, setPublicPanel] = useState({
    semester: 'Виберіть семестр',
    group: 'Виберіть групу',
    teacher: 'Виберіть викладача',
    groups: ['Виберіть групу'],
    teachers: [],
  });

  const [departmentList, setDepartmentList] = useState([]);

  const [currentGroups, setCurrentGroups] = useState([]);
  const [currentTeachers, setCurrentTeachers] = useState([]);
  const [scheduleKey, setScheduleKey] = useState('');

  const [state, dispatch] = useReducer(rozkladReducer, initState);

  const setShowModal = val => dispatch({ type: 'SET_SHOWMODAL', payload: val });
  const setDataForModal = obj =>
    dispatch({ type: 'SET_DATAFORMODAL', payload: obj });
  const setLoading = msg => dispatch({ type: 'SET_LOADING', payload: { msg } });

  useEffect(() => {
    setChange(prev => {
      if (flagOfChanges === 0) return false;
      return true;
    });
  }, [flagOfChanges]);

  useEffect(() => {
    setLoading('Завантажуємо інформацію про підрозділи...');
    serverFunctions
      .getListOfPidrozdilsJSON()
      .then(res => {
        setDepartmentList(JSON.parse(res));
        setDataLoaded(true);
        dispatch({
          type: 'UPDATE',
          payload: {
            loading: false,
            status: 'інформацію про підрозділи завантажено',
          },
        });
      })
      .catch(alert);
  }, []);

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
    setLoading('Будь ласка, зачекайте...');
    setDataLoaded(false);
    serverFunctions
      .getUserData(obj)
      .then(res => {
        const dataObj = JSON.parse(res);
        console.log('dataObj', dataObj);
        setDataLoaded(true);
        setUser(dataObj.user);
        dispatch({
          type: 'INFO',
          payload: { loading: true, status: 'Дані про користувача' },
        });
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
          payload: { loading: false, status: 'Усі дані завантажено' },
        });
      })
      .catch(alert);
  };

  const handleChangePanel = () => {
    const { semester, group, teacher } = publicPanel;

    if (semester !== 'Виберіть семестр') {
      if (group !== 'Виберіть групу') {
        setScheduleKey('Розклад групи');
        setWorkData(prevState => {
          const tmp = { ...prevState };

          const discs = data[semester].data.filter(o =>
            o['групаНавантаження'].includes(group)
          );
          tmp['Розклад групи'] = [
            {
              група: group,
              дисципліни: discs,
              week: groupsWeek[semester][group],
            },
          ];

          return { ...tmp };
        });
      } else {
        setCurrentGroups(data[semester]['Групи']);

        if (teacher !== 'Виберіть викладача') {
          setScheduleKey('Розклад викладача');
          setWorkData(prevState => {
            const tmp = { ...prevState };

            const discs = data[semester].data.filter(
              o => o['викладач'] === teacher
            );
            tmp['Розклад викладача'] = [
              {
                викладач: teacher,
                дисципліни: discs,
                week: teachersWeek[semester][teacher],
              },
            ];

            return { ...tmp };
          });
        } else {
          setScheduleKey('Виберіть групу або викладача');
          setCurrentTeachers(data[semester]['Викладачі']);

          setWorkData(() => {
            return {
              'Розклад групи': data[semester]['Групи'].map(gr => {
                const discs = data[semester].data.filter(o =>
                  o['групаНавантаження'].includes(gr)
                );

                return {
                  група: gr,
                  дисципліни: discs,
                  week: groupsWeek[semester][gr],
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
        dataLoaded,
        departmentList,
        publicPanel,
        user,
        data,
        workData,
        getUserData,
        // showButton,
        setPublicPanel,
        showModal: state.showModal,
        setShowModal,
        dataForModal: state.dataForModal,
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
      }}
    >
      {children}
    </RozkladContext.Provider>
  );
};

export default RozkladContext;
