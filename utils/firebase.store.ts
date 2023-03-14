import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
export const setAudioToFirebase = async (file: File) => {
  let fileUrl: null | string = null;
  const id = uuidv4();
  const audioRef = ref(storage, `audio/${id}`);
  await uploadBytes(audioRef, file).then((snapshot) => {});
  await getDownloadURL(audioRef)
    .then((url) => {
      fileUrl = url;
      alert("аудіо успішно зберено");
    })
    .catch((error) => {
      alert("Помилка завантаження аудіо");
      console.error(`Помилка завантаження аудіо: ${error}`);
    });
    return fileUrl && {
      url: fileUrl,
      id,
    };
};
export const setImageToFirebase = async (file: File) => {
  let fileUrl: null | string = null;
  const id = uuidv4();
  const imageRef = ref(storage, `picture/${id}`);
  await uploadBytes(imageRef, file).then((snapshot) => {});
  await getDownloadURL(imageRef)
    .then((url) => {
      fileUrl = url;
      alert("картинка успішно збережена");
    })
    .catch((error) => {
      alert("Помилка завантаження фото");
      console.error(`Помилка завантаження фото: ${error}`);
    });
    return fileUrl && {
      url: fileUrl,
      id,
    };
};
