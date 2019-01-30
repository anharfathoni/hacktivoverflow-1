import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "question" */ './components/FormSign.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "question" */ './components/FormSign.vue'),
      }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import(/* webpackChunkName: "about" */ './views/Question.vue'),
      children: [
        {
          path: 'ask',
          name: 'askquestion',
          component: () => import('./components/FormAddQuestion.vue')
        },{
          path: 'edit/:questionId',
          name: 'editquestion',
          component: () => import('./components/EditQuestion.vue')
        },{
          path: ':questionId',
          name: 'detailquestion',
          component: () => import('./components/DetailQuestion.vue')
        }
      ]
    },
    {
      path: '/answers',
      name: 'answer',
      component: () => import('./views/Answer.vue'),
      children: [{
        path: 'edit/:questionId/:answerId',
        name: 'editanswer',
        component: () => import('./components/EditAnswer.vue')
      }]
    }
  ]
})
