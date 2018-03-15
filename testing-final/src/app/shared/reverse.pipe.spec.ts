/* tslint:disable:no-unused-variable */

/*
   Isolated test because Angular isn't even really necessary.  We just instansiate the object and execute the method
*/

import { ReversePipe } from "./reverse.pipe";
describe('Pipe: ReversePipe', () => {
  it('should reverse the inputs', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });

});
