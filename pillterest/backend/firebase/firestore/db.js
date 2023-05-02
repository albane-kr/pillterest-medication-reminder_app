import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc, deleteDoc, } from 'firebase/firestore'


//create new mdeication (has to public to all users)
const createMed = async ({ medName, drugAdminType, qtyPackage }) => {
    try {
        if (medName !== "" && drugAdminType !== "" && qtyPackage !== 0) {
            const docRef = await addDoc(collection(db, "Medications"), {
                medicationName: medName,
                drugAdministrationType: drugAdminType,
                quantityPerPackage: qtyPackage,
            })
            console.log(docRef.id)
        }
        
    } catch (e) {
        console.log(e)
    }
}

//enables selection of the different types of drug administation
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

//adds new med to the prescription list of medications
const addMed = async ({ 
    medName, 
    qtyPerTake, 
    freqPerDay, 
    timeOfTreatment, 
    //stockLeft 
    }) => {
    try {
        await addDoc(collection(db, "Prescribed_Med"), {
            medicationName: medName,
            quantityPerTake: qtyPerTake,
            frequencyPerDay: freqPerDay,
            timeOfTreatment: timeOfTreatment,
            //stockLeft: stockLeft,
            createdAt: new Date().getTime(),
        })
    } catch (e) {
        console.log(e)
    }
}

//enables selection of the different existant medicine
const toggleMedName = async ({ docId, medicationName }) => {
    try {
        const addMed = doc(db, "Prescribed_Med", docId)
        await updateDoc(addMedRef, {
            medicationName
        })
    } catch (e) {
        console.log(e)
    }
}

//deletes a medication from the prescribed list
const deleteMed = async (docId) => {
    try {
        const addMedRef = doc(db, "Prescribed_Med", docId)
        await deleteDoc(addMedRef)
    } catch (e) {
        console.log(e)
    }
}

export { createMed, toggleDrugAdminType, addMed, toggleMedName, deleteMed } 