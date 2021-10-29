import Vue from "vue"

Vue.filter("date", (date: Date) => date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes())
