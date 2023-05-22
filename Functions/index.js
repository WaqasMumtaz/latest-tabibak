import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
import RNFetchBlob from 'react-native-blob-util'

function useRTL(){
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    return isRTL
}

function alertDialog(head, title, handleYes, key , options) {
   
    Alert.alert(
        `${head}`,
        `${title}`,
        [
          {
            text: options.no,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: options.yes, onPress: ()=>handleYes(key)}
        ]
      );
  
}

function showAlert(head,title, text) {
   
    Alert.alert(
        `${head}`,
         `${title}`,
        [
          {
            text: text,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        //   { text: options.yes, onPress: ()=>handleYes(key)}
        ]
      );
  
}

const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ?
           /[^.]+$/.exec(fileUrl) : undefined;
};

function downloadFile(fileUrl, callback) {
  // Get today's date to add the time suffix in filename
  let date = new Date();
  // File URL which we want to download
  let FILE_URL = fileUrl;    
  // Function to get extention of the file url
  let file_ext = getFileExtention(FILE_URL);
 
  file_ext = '.' + file_ext[0];
 
  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  const { config, fs } = RNFetchBlob;
  let RootDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path:
        RootDir+
        '/file_' + 
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,   
    },
  };
  config(options)
    .fetch('GET', FILE_URL)
    .then(res => {
      // Alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      if(callback) callback();
      //alert('File Downloaded Successfully.');
      // return true;
    });
}



export {
    useRTL,
    alertDialog,
    showAlert,
    downloadFile
}