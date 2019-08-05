import { AuthorisationGuard } from './authorisation.guard';

describe('AuthorisationGuard', () => {
  it('should be defined', () => {
    expect(new AuthorisationGuard()).toBeDefined();
  });
});
