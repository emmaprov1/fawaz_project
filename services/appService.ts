
import firebase from './../utils/firebaseInit' 
 
// superadmin
const appService = {

  allApointment: async (data:any) => {
    const db = firebase.firestore() 
     db.collection("apointments").get()
    },
  saveApointment: async (data:any) => {
    const db = firebase.firestore() 
      db.collection("apointments").add(data)
    },
  deleteApointment: async (id:any) => {
    const db = firebase.firestore() 
      db.collection("apointments").doc(id).delete()
    },
  }

export default appService
