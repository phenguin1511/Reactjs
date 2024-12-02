import axios from "../axios";



const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const handleAddUser = (data) => {
    return axios.post(`/api/create-new-user`, data);
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, { data: { id: userId } });
}

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveInfoDoctorService = (data) => {
    return axios.post(`/api/save-info-doctor`, data)
}

const getInfoDetailDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor?id=${inputId}`);
}

const createScheduleDoctor = (data) => {
    return axios.post('/api/create-schedule-doctor', data)
}
const getScheduleDoctorByDate = (inputId, inputDate) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${inputId}&date=${inputDate}`);
}
const getExtraInfoDoctorById = (inputId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${inputId}`);
}
const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-book-appoitment', data)
}
const verifyBookingAppointment = (data) => {
    return axios.post('/api/verify-book-appoitment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}


const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}
export {
    handleLoginApi,
    getAllUsers,
    handleAddUser,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveInfoDoctorService,
    getInfoDetailDoctor,
    createScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    postPatientBookingAppointment,
    verifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty
}
