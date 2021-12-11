import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppRouter } from './app-router';
import { entitiesPath, githubPath } from './app-routing-data';
import { EntityId } from './examples/entities/models';

describe('AppRouter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {},
        },
        AppRouter,
      ],
    });
  });

  it('should be created', () => {
    const appRouter = TestBed.inject(AppRouter);
    expect(appRouter).toBeTruthy();
  });

  it('should return [github]', async () => {
    TestBed.overrideProvider(Router, {
      useValue: {
        navigate(s: string[]) {
          expect(s).toEqual([githubPath]);
        },
      },
    });
    const appRouter = TestBed.inject(AppRouter);
    await appRouter.github();
  });

  it('should return [entities]', async () => {
    TestBed.overrideProvider(Router, {
      useValue: {
        navigate(s: string[]) {
          expect(s).toEqual([entitiesPath]);
        },
      },
    });
    const appRouter = TestBed.inject(AppRouter);
    await appRouter.entities();
  });

  it('should return [entities, id]', async () => {
    const mockRouter: Pick<Router, 'navigate'> = {
      navigate: () => Promise.resolve(true),
    };
    TestBed.overrideProvider(Router, {
      useValue: mockRouter,
    });
    const navigate = jest.spyOn(mockRouter, 'navigate');
    const appRouter = TestBed.inject(AppRouter);
    const entityId = new Date().valueOf().toString();
    await appRouter.editEntity(EntityId.parse(entityId));
    expect(navigate).toHaveBeenCalledWith([entitiesPath, entityId]);
  });
});
