
 
import firebase from './../utils/firebaseInit'

 
const fileService = {
  uploadImage: async (file:any) => {
    const metadata = {
      contentType: null
    };
    const filePath = `${file[0].name}`

    return await firebase.storage().ref().child(filePath).put(file[0], metadata)
      .then((snapshot) => {
        console.log(snapshot)
        return snapshot.ref.getDownloadURL()
      }); 
  },
 

  uploadBase64: async (file: string, name: string, token: any) => {
    const metadata = {
      contentType: null
    };
    const reName = name + '.png'
    const storageRef = firebase.storage().ref().child(`qrcodes/${token}/${reName}`)

    await storageRef.putString(file, 'data_url', metadata)

    return await storageRef.getDownloadURL().then((downloadURL: any) => (downloadURL))
  },

  deleteFile: async (file:any) => {
    // Create a reference to the file to delete
    return await firebase.storage().ref().child(file).delete();
  },

  updateFileMime: async (file:any) => {
    // Create a reference to the file whose metadata we want to change
    const docRef = await firebase.storage().ref().child(file);

    // Create file metadata to update
    const newMetadata = {
      cacheControl: 'public,max-age=300',
      contentType: null,
      contentDisposition: "inline"
    };

    // Update metadata properties
    return await docRef.updateMetadata(newMetadata)
  }
}

export default fileService
