import ContactAPI from './api/Contact'

export function formUpdate(form) {
  return {
    type: FORM_UPDATE,
    form
  }
}

export const REQEST_CONTACTS = 'REQEST_CONTACTS'
function _requestContacts() {
  return {
    type: REQEST_CONTACTS
  }
}

export const REQEST_CONTACTS_ERROR = 'REQEST_CONTACTS_ERROR'
function requestContactsError() {
  return {
    type: REQEST_CONTACT_ERROR,
  }
}

export const REQEST_CONTACTS_COMPLETE = 'REQEST_CONTACTS_COMPLETE'
function requestContactsComplete(contacts) {
  return {
    type: REQEST_CONTACTS_COMPLETE,
    contacts
  }
}

export const ADD_CONTACT = 'ADD_CONTACT'
function _addContact() {
  return {
    type: ADD_CONTACT
  }
}

export const ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR'
function addContactError() {
  return {
    type: ADD_CONTACT_ERROR,
  }
}

export const ADD_CONTACT_COMPLETE = 'ADD_CONTACT_COMPLETE'
function addContactComplete(contact) {
  return {
    type: ADD_CONTACT_COMPLETE,
    contact
  }
}

export const DELETE_CONTACT = 'DELETE_CONTACT'
function deleteContact() {
  return {
    type: DELETE_CONTACT
  }
}

export const DELETE_CONTACT_ERROR = 'DELETE_CONTACT_ERROR'
function deleteContact() {
  return {
    type: DELETE_CONTACT_ERROR
  }
}

export const DELETE_CONTACT_COMPLETE = 'DELETE_CONTACT_COMPLETE'
function deleteContact(contact) {
  return {
    type: DELETE_CONTACT_COMPLETE,
    contact
  }
}

export async function requestContacts = () => {
  return function(dispatch) {
    dispatch(_requestContacts)
    return ContactAPI.get({ path: '/contact' })
    .then(contacts => {
      dispatch(requestContactsComplete(contacts))
    })
    .catch(err => {
      dispatch(requestContactsError())
    })
  }
}

export async function addContact = () => {
  return function(dispatch) {
    dispatch(_requestContacts)
    return ContactAPI.get({ path: '/contact' })
    .then(contacts => {
      dispatch(requestContactsComplete(contacts))
    })
    .catch(err => {
      dispatch(requestContactsError())
    })
  }
}
