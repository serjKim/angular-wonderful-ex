import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { entitiesPath } from '../../../app-routing-data';
import { isOk } from '../../../core';
import { Entities } from '../entities-main/entities';
import { EntitiesStorage } from '../entities-main/entities-storage';
import { entityIdParamName } from '../routing-data';
import { EditedEntity } from './edited-entity';

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
          provide: Router,
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

  it('should redirect to entities if entityId param is wrong or null', (done) => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        params: of({ [entityIdParamName]: null }),
      },
    });
    TestBed.overrideProvider(Router, {
      useValue: {
        navigate(s: string[]) {
          expect(s).toEqual([entitiesPath]);
          done();
        },
      },
    });
    console.log(jest.spyOn);
    const editedEntity = TestBed.inject(EditedEntity);
    editedEntity.subscribe();
  });
});
