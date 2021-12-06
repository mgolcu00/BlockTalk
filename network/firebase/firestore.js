import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";


const NOTES = "notes";
const TOKENS = "tokens"

const addData = async (collection_name, data) => {
    const db = getFirestore();
    const docRef = await addDoc(collection(db, collection_name), data);
    return docRef;
}

const getData = async (collection_name) => {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, collection_name));
    return querySnapshot;
}

const addNote = async (note) => {
    const docRef = await addData(NOTES, note);
    return docRef;
}

const getNotes = async () => {
    const querySnapshot = await getData(NOTES);
    let notes = [];
    querySnapshot.forEach(doc => {
        notes.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return notes;
}

const savePushToken = async (token) => {
    getData(TOKENS).then(querySnapshot => {
        let isHave = false
        querySnapshot.forEach(doc => {
            if (token.token == doc.data().token)
                isHave = true
        })
        if (!isHave) {
            addData(TOKENS, token).then(res => { return docRef })
                .catch(err => { return err })
        }
        else {
            return null
        }
    }).catch(err => {
        addData(TOKENS, token).then(res => { return docRef })
            .catch(err => { return err })
    })
}


const getNote = async (note_id) => {
    const querySnapshot = await getData(NOTES).where("id", "==", note_id);
    return querySnapshot;
}

export { getData, addData, addNote, getNotes, getNote, savePushToken };
