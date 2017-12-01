export class MainService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }
  getBookList() {
    return this.$http.get('/api/libros').then(response => response.data);
  }
}