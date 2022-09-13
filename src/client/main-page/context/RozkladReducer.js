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
        toast: toast.update(state.loading_toast, {
          render: action.payload.status,
          type: 'success',
          isLoading: false,
          autoClose: 500,
        }),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        loading_toast: toast.loading(action.payload.msg),
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
    default:
      return state;
  }
};

export default rozkladReducer;
