import { ClassicsSitePage } from './app.po';

describe('classics-site App', () => {
  let page: ClassicsSitePage;

  beforeEach(() => {
    page = new ClassicsSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
