'use strict';
const angular = require('angular');


export class clusterComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }

}

export default angular.module('bibliotecaApp.cluster', [])
  .component('cluster', {
    template: require('./cluster.pug'),
    bindings: { libro: '<'},
    controller: clusterComponent,
    controllerAs: '$clusterComponent'
  })
  .name;
