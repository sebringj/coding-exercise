const reducers = (state = [], action) => {
  switch (action.type) {
    case 'FORM_UPDATE':
      return {
        ...state,
        form: action.form
      }
    case 'REQEST_CONTACTS':
      return {
        ...state,
        theStatus: 'loading',
      }
    case 'REQEST_CONTACTS_ERROR':
      return {
        ...state,
        theStatus: 'error',
      }
    case 'REQEST_CONTACTS_COMPLETE':
      return {
        ...state,
        theStatus: 'results',
        results: action.contacts
      }
    case 'ADD_CONTACT':
      return {
        ...state,
        theStatus: 'loading',
      }
    case 'ADD_CONTACT_ERROR':
      return {
        ...state,
        theStatus: 'error',
      }
    case 'ADD_CONTACT_COMPLETE':
      return {
        ...state,
        theStatus: 'results',
        results: [
          ...state.results,
          action.contact
        ]
      }
    case 'DELETE_CONTACT':
      return {
        ...state,
        theStatus: 'loading',
      }
    case 'DELETE_CONTACT_ERROR':
      return {
        ...state,
        theStatus: 'error',
      }
    case 'DELETE_CONTACT_COMPLETE':
      let results = state.results.slice(0)
      for (let i = 0; results.length; i++) {
        if (results[i]._id === action.contact._id) {
          results.splice(i, 1)
          break
        }
      }
      return {
        ...state,
        results: action.results,
        theStatus: 'results',
      }
    default:
      return state
  }
}

export default reducers
