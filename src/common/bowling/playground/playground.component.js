import templateUrl from './playground.html';

export const PlaygroundComponent = {
  templateUrl,
  controller: class ComponentController {
    constructor() {}

    $onInit() {}
  },
};

PlaygroundComponent.$inject = [];
