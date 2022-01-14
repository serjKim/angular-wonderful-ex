import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { isOk } from '../../../core';
import { Entities } from '../entities-main/entities';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { entityIdParamName } from '../routing-data';
import { EditedEntity } from './edited-entity';
import { EditedEntityEvent, EditedEntityEventEmitter } from './edited-entity-event-emitter';

describe('EditedEntity', () => {
  const entityId = 1636834529017;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EntitiesStorage,
          useValue: {
            entities: of(new Entities()),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ [entityIdParamName]: entityId }),
          },
        },
        {
          provide: EditedEntityEventEmitter,
          useValue: {},
        },
        EditedEntity,
      ],
    });
  });

  it('should find entity if there is entityId param', (done) => {
    const editedEntity = TestBed.inject(EditedEntity);
    editedEntity.subscribe((x) => {
      if (isOk(x)) {
        expect(x).toBeDefined();
        expect(x?.entityId).toBe(entityId);
        done();
      }
    });
  });

  it('should emit no event if there is entityId param', () => {
    const em = new EventEmitter<EditedEntityEvent>();
    const spy = jest.spyOn(em, 'emit');

    TestBed.overrideProvider(EditedEntityEventEmitter, {
      useValue: {
        emitter: spy,
      },
    });

    const editedEntity = TestBed.inject(EditedEntity);
    editedEntity.subscribe();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit None event if entityId param is wrong or null', (done) => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        params: of({ [entityIdParamName]: null }),
      },
    });
    TestBed.overrideProvider(EditedEntityEventEmitter, {
      useValue: {
        emitter: {
          emit(e: EditedEntityEvent) {
            expect(e).toEqual(EditedEntityEvent.None);
            done();
          },
        },
      },
    });
    const editedEntity = TestBed.inject(EditedEntity);
    editedEntity.subscribe();
  });
});
