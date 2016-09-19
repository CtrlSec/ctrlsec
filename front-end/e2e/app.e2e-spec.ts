import { CtrlSecPage } from './app.po';

describe('CtrlSec App', function() {
  let page: CtrlSecPage;

  beforeEach(() => {
    page = new CtrlSecPage();
  });

  it('should display message saying CtrlSec', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('CtrlSec');
  });
});
