import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api.js"
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // statusLogin: false,
    checkLogin: false,
    listQuestions: [
      { userId: { name: '' } }
    ],
    detailQuestion: {voteUp:[], voteDown:[], userId: {name: ''}},
    answers: [{ voteUp:[], voteDown:[], userId: {name: ''} }],
    // dataQuestion: {},
    detailAnswer: {},

    errorMsg: null,
    successMsg: null
  },
  mutations: {
    SignMutate(state, status){
      state.checkLogin = status
    },

    getAllQuestionMutate(state, questions){
      state.listQuestions = questions
    },

    getDetailsQuestionMutate(state, question){
      state.detailQuestion = question
    },

    postQuestionMutate(state, question){
      console.log('question baru =',question)
      state.listQuestions.unshift(question)
    },

    checkLoginMutate(state, data){
      state.checkLogin = data.status
    },

    getAnswerMutate(state, answers){
      state.answers = answers
    },

    getOneAnswerMutate(state, answer){
      state.detailAnswer = answer
    },

    showErrorMessage(state, message){
      state.errorMsg = message
    },

    showSuccessMessage(state, message){
      state.successMsg = message
    },

    deleteMessage(state){
      state.errorMsg = null
      state.successMsg = null
    }
  },
//===============================================================================
  actions: {
    search({commit}, data){
      api({
        url: `questions?title=${data.title}&sort=${data.sort}`
      })
        .then( ({data}) => {
          commit('getAllQuestionMutate', data.questions)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    login({commit}){
      commit('SignMutate', true)
    },

    logout({commit}){
      localStorage.clear()
      commit('SignMutate', false)  
    },

    getAllQuestions({commit}){
      api({
        method: 'get',
        url: '/questions',
        headers: {
          token: localStorage.token
        }
      })
        .then( ({data}) => {
          commit('getAllQuestionMutate', data.questions)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    postQuestion({commit}, question){
      question.tags = question.tags.map( e => e.text)

      api({
        url: '/questions',
        method: "POST",
        data: question,
        headers : {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          commit('postQuestionMutate', question)
          commit('showSuccessMessage', data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
        .catch(error => {
          commit('showErrorMessage', error.response.data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        });
    },

    checkLogin({commit}){
      api({
        method: 'get',
        url: '/checklogin',
        headers: {
          token: localStorage.token
        }
      })
        .then( ({data}) => {
          console.log(data)
          commit('checkLoginMutate', data)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    getDetailsQuestion({commit}, questionId){
      api({
        url: `/questions/${questionId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({data}) => {
          commit('getDetailsQuestionMutate', data.question)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    editQuestion({commit}, data){
      console.log('edit question')
      api
        .put(`/questions/${data.questionId}`, data.question, {
          headers: {
            token: localStorage.token
          }
        })
        .then( ({data}) => {
          commit('showSuccessMessage', data.message)
          this.dispatch('getAllQuestions')
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    getAnswer({commit}, questionId){
      api
      .get(`/answers/${questionId}`)
      .then( ({data}) => {
        commit('getAnswerMutate', data.answers)
      })
      .catch( error => {
        commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
      })
    },

    getOneAnswer({commit}, data){
      api
        .get(`/answers/${data.questionId}/${data.answerId}`)
        .then( ({data}) => {
          commit('getOneAnswerMutate', data.answer)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    editAnswer({commit}, data1){
      api
        .put(`/answers/${data1.answerId}`, {content: data1.content}, {
          headers: {
            token: localStorage.token
          }
        })
        .then( ({data}) => {
          commit('showSuccessMessage', data.message)
          this.dispatch('getAnswer', data1.questionId)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    voteQuestion({commit}, data){
      api
        .put(`/questions/vote/${data.questionId}`, {status: data.status}, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then( vote => {
          this.dispatch('getDetailsQuestion',data.questionId)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    deleteQuestion({commit}, questionId){
      api
        .delete(`/questions/${questionId}`,{
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then( ({data}) => {
          commit('showSuccessMessage', data.message)
          this.dispatch('getAllQuestions')
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
          
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    postAnswer({commit}, data1){
      api
        .post(`/answers/${data1.questionId}`, {content: data1.content}, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then( ({data}) => {
          console.log(data)
          commit('showSuccessMessage', data.message)
          this.dispatch('getAnswer', data1.questionId)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    },

    voteAnswer({commit}, data){
      api
        .put(`/answers/vote/${data.answerId}`, {status: data.status}, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then( vote => {
          this.dispatch('getAnswer', data.questionId)
        })
        .catch( error => {
          commit('showErrorMessage', error.response.data.message)
          setTimeout(() => {
            commit('deleteMessage')
          }, 2500);
        })
    }
  }
})
