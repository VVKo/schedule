import { toast } from 'react-toastify';

const rozkladReducer = (state, action) => {
  switch (action.type) {
    case 'INFO':
      return {
        ...state,
        loading: action.payload.loading,
        toast: toast.info(`🦄 ${action.payload.status}!`, {
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }),
      };
    case 'UPDATE':
      return {
        ...state,
        loading: action.payload.loading,
        [action.payload.newtoast]: toast.update(
          state[action.payload.newtoast],
          {
            render: action.payload.status,
            type: 'success',
            isLoading: false,
            autoClose: 500,
          }
        ),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        [action.payload.newtoast]: toast.loading(action.payload.msg),
      };
    case 'SET_CURRENTDEP':
      return {
        ...state,
        currentDep: state.departments[action.payload],
      };
    case 'SET_CURRENTACADEMICYEAR':
      return {
        ...state,
        currentAcademicYear: { ...action.payload },
      };
    case 'SET_CURRENTSEMESTER':
      return {
        ...state,
        currentSemester: { ...action.payload },
      };
    case 'GETLISTOFDEPARTMENTS':
      return {
        ...state,
        departments: action.payload.data,
      };
    case 'SET_DEPARTMENTS':
      return {
        ...state,
        departments: action.payload,
      };
    case 'SET_SHOWMODAL':
      return {
        ...state,
        showModal: action.payload,
      };
    case 'SET_DATAFORMODAL':
      return {
        ...state,
        dataForModal: action.payload,
      };
    case 'GETAUD':
      return {
        ...state,
        audfond: {
          ...state.audfond,
          [action.payload.sem]: action.payload.data,
        },
      };

    case 'SET_AUDFOND':
      return {
        ...state,
        audfond: {
          ...state.audfond,
          [action.payload.sem]: action.payload.data,
        },
      };
    case 'SET_GROUPFOND':
      return {
        ...state,
        groupfond: {
          ...state.groupfond,
          [action.payload.sem]: action.payload.data,
        },
      };
    case 'SET_DISCIPLINEFOND':
      return {
        ...state,
        disciplinefond: {
          ...state.disciplinefond,
          [action.payload.sem]: action.payload.data,
        },
      };
    case 'SET_TEACHERFOND':
      return {
        ...state,
        teacherfond: {
          ...state.teacherfond,
          [action.payload.sem]: action.payload.data,
        },
      };
    case 'DELETE_ROWFROMAUDFOND':
      return {
        ...state,
        audfond: {
          ...state.audfond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'DELETE_ROWFROMTEACHERFOND':
      return {
        ...state,
        teacherfond: {
          ...state.teacherfond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'DELETE_ROWFROMGROUPFOND':
      return {
        ...state,
        groupfond: {
          ...state.groupfond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'DELETE_ROWFROMDISCIPLINEFOND':
      return {
        ...state,
        disciplinefond: {
          ...state.disciplinefond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'ADD_AUDTOFOND':
      return {
        ...state,
        audfond: {
          ...state.audfond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'ADD_GROUPTOFOND':
      return {
        ...state,
        groupfond: {
          ...state.groupfond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'ADD_DISCIPLINETOFOND':
      return {
        ...state,
        disciplinefond: {
          ...state.disciplinefond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'ADD_TEACHERTOFOND':
      return {
        ...state,
        teacherfond: {
          ...state.teacherfond,
          [action.payload.sem]: {
            ...state[action.payload.sem],
            data: action.payload.data,
          },
        },
      };
    case 'SET_XLSID':
      return {
        ...state,
        xlsID: action.payload,
      };
    default:
      return state;
  }
};

export default rozkladReducer;
