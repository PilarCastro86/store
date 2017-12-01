import angular from 'angular';
import routing from './main.routes';
import cluster from './cluster/cluster.component';
import { MainService } from './main.service';

export class MainController {

  /*@ngInject*/
  constructor(MainService) {
    this.MainService = MainService;
  }
    $onInit() {
      this.MainService.getBookList()
      .then(response => {
        this.listBooks = response;
        console.log('liiibros', this.listBooks.libros);
      });
    }
  }

export default angular.module('bibliotecaApp.main', [cluster])
  .config(routing)
  .component('main', {
    template: require('./main.pug'),
    controller: MainController
  })
  .service('MainService', MainService)
  .name;
