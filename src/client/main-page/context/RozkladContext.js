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
    currentTeacher: 'Виберіть викладача',
    currentGroup: 'Виберіть групу',
  };

  const [state, dispatch] = useReducer(rozkladReducer, initState);

  const updateContext = (type, payload) =>
    dispatch({
      type,
      payload,
    });

  const setActiveId = val => dispatch({ type: 'SET_ACTIVEID', payload: val });
  const setShowModal = val => dispatch({ type: 'SET_SHOWMODAL', payload: val });
  const setCurrentDep = id => dispatch({ type: 'SET_CURRENTDEP', payload: id });
  const resetCurrentDep = () => dispatch({ type: 'RESET_CURRENTDEP' });
  const setCurrentAcademicYear = obj =>
    dispatch({ type: 'SET_CURRENTACADEMICYEAR', payload: obj });
  const setCurrentSemester = obj =>
    dispatch({ type: 'SET_CURRENTSEMESTER', payload: obj });
  const setCurrentGroup = gr =>
    dispatch({ type: 'SET_CURRENTGROUP', payload: gr });
  const setCurrentTeacher = teacher =>
      dispatch({ type: 'SET_CURRENTTEACHER', payload: teacher });
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

  const getUser = () => {
    setLoading('Сканую Вашу сітківку ...', 'getuser');
    serverFunctions
      .getUser()
      .then(res => {
        updateContext('GET_USER', res);
        updateToast(res.email, 'getuser');
      })
      .catch(alert);
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

  const editAud = txt => {
    const toastName = 'editAud';
    const API = 'rozkladChNU_API';
    const action = 'EDITAUDINSCHEDULE';
    setLoading('Редагуємо розклад ...', toastName);
    getDataNEW(API, action, txt).then(resp => {
      const obj = JSON.parse(txt);
      const {
        sem,
        folderID,
        academicRow,
        academicCol,
        teacherRow,
        teacherCol,
        audRow,
        audCol,
        targetAudRow,
        newAud,
      } = obj;

      const academicloadfonddata = state.academicloadfond[sem].data;
      academicloadfonddata[academicRow - 4][academicCol - 1] = newAud;

      const teacherfonddata = state.teacherfond[sem].data;

      const audfonddata = state.audfond[sem].data;
      if (audRow) audfonddata[audRow - 4][audCol - 1] = '';
      if (targetAudRow) audfonddata[targetAudRow - 4][audCol - 1] = '+';

      updateContext('EDIT_AUD_IN_SCHEDULE', {
        sem,
        data: { academicloadfonddata, teacherfonddata, audfonddata },
      });
      updateToast(resp.status, toastName);
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

  return (
    <RozkladContext.Provider
      value={{
        state,

        getUser,

        setShowModal,
        setDataForModal,

        getAudsForStaff,
        deleteRowAud,
        addAudToServer,
        getDepartments,
        setCurrentDep,
        resetCurrentDep,
        setCurrentAcademicYear,
        setCurrentSemester,
        setCurrentGroup,
        setCurrentTeacher,
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
        editAud,
      }}
    >
      {children}
    </RozkladContext.Provider>
  );
};

export default RozkladContext;
