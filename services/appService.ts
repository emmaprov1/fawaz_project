
import firebase from './../utils/firebaseInit' 
 
// superadmin
const appService = {

  allApointment: async () => {
    const db = firebase.firestore() 
     return await db.collection("apointments").get()
    },
    saveApointment: async (data:any) => {
      const db = firebase.firestore() 
      return await db.collection("apointments").add(data)
      }, 
      
      updateApointment: async (data:any, id:any) => {
        const db = firebase.firestore() 
        return await db.collection("apointments").doc(id).update(data) 
      },

    deleteApointment: async (id:any) => {
      const db = firebase.firestore() 
      return await db.collection("apointments").doc(id).delete()
      },
  }

export default appService
