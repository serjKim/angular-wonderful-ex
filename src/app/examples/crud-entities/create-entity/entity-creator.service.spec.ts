import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EntitiesStorage } from '../entities-storage.service';
import { EntityCreator, EntityCreatorRouting } from './entity-creator.service';

describe('EntityCreator', () => {
  let creator: EntityCreator;
  let entitiesStorage: Pick<EntityCreator, 'createEntity'>;
  let entityCreatorRouting: Record<keyof EntityCreatorRouting, jest.Mock>;

  beforeEach(() => {
    entitiesStorage = {
      createEntity() {
        return of(123);
      },
    };
    entityCreatorRouting = {
      goToEdit: jest.fn(() => Promise.resolve(456)),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: EntitiesStorage, useValue: entitiesStorage },
        { provide: EntityCreatorRouting, useValue: entityCreatorRouting },
        EntityCreator,
      ],
    });
    creator = TestBed.inject(EntityCreator);
  });

  it('should redirect to edit form after entity created', (done) => {
    creator.createEntity({ name: 'asd' });
    creator.createdEntity.subscribe(() => {
      expect(entityCreatorRouting.goToEdit).toBeCalled();
      done();
    });
  });
});
