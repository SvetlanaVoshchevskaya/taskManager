export const modalActionTypes = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  MODAL_INFO_OPEN: 'MODAL_INFO_OPEN',
  MODAL_INFO_CLOSE: 'MODAL_INFO_CLOSE',
  MODAL_CALENDAR_OPEN: 'MODAL_CALENDAR_OPEN',
  MODAL_CALENDAR_CLOSE: 'MODAL_CALENDAR_CLOSE',
  MODAL_DELETE_OPEN: 'MODAL_DELETE_OPEN',
  MODAL_DELETE_CLOSE: 'MODAL_DELETE_CLOSE',
  MODAL_PICKER_OPEN: 'MODAL_PICKER_OPEN',
  MODAL_PICKER_CLOSE: 'MODAL_PICKER_CLOSE',
};

export const openModal = () => ({
  type: modalActionTypes.OPEN_MODAL,
  payload: true
});

export const closeModal = () => ({
  type: modalActionTypes.CLOSE_MODAL,
  payload: false
});

export const openInfoModal = () => ({
  type: modalActionTypes.MODAL_INFO_OPEN,
  payload: true
});

export const closeInfoModal = () => ({
  type: modalActionTypes.MODAL_INFO_CLOSE,
  payload: false
});

export const openCalendarModal = () => ({
  type: modalActionTypes.MODAL_CALENDAR_OPEN,
  payload: true
});

export const closeCalendarModal = () => ({
  type: modalActionTypes.MODAL_CALENDAR_CLOSE,
  payload: false
});

export const openDeleteModal = () => ({
  type: modalActionTypes.MODAL_DELETE_OPEN,
  payload: true
});

export const closeDeleteModal = () => ({
  type: modalActionTypes.MODAL_DELETE_CLOSE,
  payload: false
});

export const openPickerModal = () => ({
  type: modalActionTypes.MODAL_PICKER_OPEN,
  payload: true
});

export const closePickerModal = () => ({
  type: modalActionTypes.MODAL_PICKER_CLOSE,
  payload: false
});
