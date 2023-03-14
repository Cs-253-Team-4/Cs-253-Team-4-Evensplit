export default (state, action) => {
    switch(action.type) {
      case 'DELETE_REQUEST':
        return {
          ...state,
          requests: state.requests.filter(request => request.id !== action.payload)
        }
      case 'ADD_REQUEST':
        return {
          ...state,
          requests: [action.payload, ...state.requests]
        }
      default:
        return state;
    }
  }