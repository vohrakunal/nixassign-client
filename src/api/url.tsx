const urls = {
  auth: {
    login: "/client/login"
  },

  invigilator: {
    getAllInvigilators: "/client/invigilators",
    getInvigilatorById: "/client/getInvigilatorById",
    createInvigilator: "/client/createInvigilator",
    updateInvigilator: "/client/updateInvigilator",
    deleteInvigilator: "/client/deleteInvigilator",
    resetPassword:"/client/invigilator/password/reset",
    toggleStatus:"/client/invigilator/status" 
  },

  dashboard: {
    getExamDetails: "/client/exam/details",
    getAllUnmappedUsers: "/client/user/unmapped",
    getAllMappedUsers: "/client/getAllMappedUserLean",
    mappedUsers: "/client/exam/user/mapped",
    uploadZipStudentData: "/client/uploadZipUserData",
    uploadCSVStudentData: "/client/uploadUserCsvData",
    mapSingleStudent: "/client/user/map",
    mapMultipleStudents: "/client/user/map-multiple",
    resetMappedStudentPassword: "/client/user/reset-password",
    toggleStudentMapping: "/client/toggleStudentMapping",
    unMarkCompletedMapping:"/client/unMarkCompletedMapping"
  }
}
export default urls;