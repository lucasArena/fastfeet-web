import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  token: '',
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signed = true;
        const { token } = action.payload;
        draft.token = token;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.token = '';
        break;
      }

      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
