import { modalActionTypes } from '../actions/modalAction';

const initialState = {
  modal: false,
  modalInfo: false,
  modalCalendar: false,
  modalDelete: false,
  modalPicker: false
};

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case modalActionTypes.OPEN_MODAL:
      return { ...state, modal: payload };
    case modalActionTypes.CLOSE_MODAL:
      return { ...state, modal: payload };

    case modalActionTypes.MODAL_INFO_OPEN:
      return { ...state, modalInfo: payload };
    case modalActionTypes.MODAL_INFO_CLOSE:
      return { ...state, modalInfo: payload };

    case modalActionTypes.MODAL_CALENDAR_OPEN:
      return { ...state, modalCalendar: payload };
    case modalActionTypes.MODAL_CALENDAR_CLOSE:
      return { ...state, modalCalendar: payload };

    case modalActionTypes.MODAL_DELETE_OPEN:
      return { ...state, modalDelete: payload };
    case modalActionTypes.MODAL_DELETE_CLOSE:
      return { ...state, modalDelete: payload };

    case modalActionTypes.MODAL_PICKER_OPEN:
      return { ...state, modalPicker: payload };
    case modalActionTypes.MODAL_PICKER_CLOSE:
      return { ...state, modalPicker: payload };
    default:
      return state;
  }
};
