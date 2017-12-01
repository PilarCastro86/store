'use strict';

describe('Component: cluster', function() {
  // load the component's module
  beforeEach(module('bibliotecaApp.cluster'));

  var clusterComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    clusterComponent = $componentController('cluster', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
