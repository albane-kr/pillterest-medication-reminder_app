import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc, deleteDoc, setDoc, arrayRemove } from 'firebase/firestore'


/**
 * create new medication (is public to all users)
 */
const createMed = async ({
    medName,
    drugAdminType,
    }) => {
    try {
        if (
            medName !== ""
            && drugAdminType !== ""
        ) {
            await addDoc(collection(db, "Medications"), {
                medicationName: medName,
                drugAdministrationType: drugAdminType,
            })
        }

    } catch (e) {
        console.log(e)
    }
}


/**
 * enable selection of the different types of drug administation from created medication
 */
const toggleDrugAdminType = async ({ docId, drugAdministrationType }) => {
    try {
        const createMedRef = doc(db, "Medications", docId)
        await updateDoc(createMedRef, {
            drugAdministrationType
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * add new med to the prescription list of medications (unique to each user)
 */
const addMed = async ({
    medName,
    qtyPerTake,
    freqPerDay,
    timeTreatmentStart,
    timeTreatmentEnd,
    uid
    }) => {
    try {
        await addDoc(collection(db, "Prescribed_Med"), {
            medicationName: medName,
            quantityPerTake: qtyPerTake,
            frequencyPerDay: freqPerDay,
            timeTreatmentStart: timeTreatmentStart,
            timeTreatmentEnd: timeTreatmentEnd,
            uid: uid
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * enable selection of the different existant medicine
 */
const toggleMedName = async ({ docId, medicationName }) => {
    try {
        const addMedRef = doc(db, "Prescribed_Med", docId)
        await updateDoc(addMedRef, {
            medicationName
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * delete a medication from the prescribed list
 * @param docId of the medication to be deleted in database
 */
const deleteMed = async (docId) => {
    try {
        const addMedRef = doc(db, "Prescribed_Med", docId)
        const notifRef = doc(db, 'Notifications', docId)
        await deleteDoc(addMedRef, notifRef)
    } catch (e) {
        console.log(e)
    }
}

/**
 * create notification of the medication to take
 */ 
const createNotification = async ({
    medName,
    uid,
    qtyPerTake,
    freqPerDay,
    timeTreatmentStart,
    timeTreatmentEnd,
    date
    }) => {
    try {
        if (
            medName !== ""
            && uid !== ""
            && freqPerDay !== ""
        ) {
            await addDoc(collection(db, "Notifications"), {
                medicationName: medName,
                uid: uid,
                quantityPerTake: qtyPerTake,
                frequencyPerDay: freqPerDay,
                timeTreatmentStart: timeTreatmentStart,
                timeTreatmentEnd: timeTreatmentEnd,
                date: date
            })
        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * add day when notification is checked
 * @param docId of notification in database
 * @param date to be added
 */
const updateNotification = async (docId, date) => {
    try {
        const notifRef = doc(db, "Notifications", docId)
        await updateDoc(notifRef, date)
    } catch (e) {
        console.log(e)
    }
}

/**
 * delete day when notification is checked by error
 * @param docId of the notification in database
 * @param dateToday to be deleted from the date array
 */
const deleteDate = async (docId, dateToday) => {
    try {
        const notifRef = doc(db, "Notifications", docId)
        await updateDoc(notifRef, {
            date: arrayRemove(dateToday)
        })
    } catch (e) {
        console.log(e)
    }
}


export { createMed, toggleDrugAdminType, addMed, toggleMedName, deleteMed, createNotification, updateNotification, deleteDate } 