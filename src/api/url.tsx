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
    
  }
}
export default urls;