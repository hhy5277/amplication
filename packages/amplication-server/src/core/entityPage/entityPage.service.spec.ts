import { Test, TestingModule } from '@nestjs/testing';
import { BlockService } from 'src/core/block/block.service';
import { EntityPageService } from './entityPage.service';
import { EntityPage } from './dto';
import { EnumBlockType } from 'src/enums/EnumBlockType';

const EXAMPLE_INPUT_PARAMETERS = [];
const EXAMPLE_OUTPUT_PARAMETERS = [];
const EXAMPLE_NAME = 'Example Entity Page';
const EXAMPLE_URL = 'http://example.com';
const EXAMPLE_APP_ID = 'ExampleApp';

const EXAMPLE_CONNECTOR_REST_API_CALL: EntityPage = {
  id: 'ExampleEntityPage',
  updatedAt: new Date(),
  createdAt: new Date(),
  blockType: EnumBlockType.EntityPage,
  description: null,
  inputParameters: EXAMPLE_INPUT_PARAMETERS,
  outputParameters: EXAMPLE_OUTPUT_PARAMETERS,
  name: EXAMPLE_NAME,
  parentBlock: null,
  versionNumber: 0,
  url: EXAMPLE_URL
};

const EXAMPLE_CONNECTOR_REST_API_CALLS = [EXAMPLE_CONNECTOR_REST_API_CALL];

const createMock = jest.fn(() => EXAMPLE_CONNECTOR_REST_API_CALL);
const findOneMock = jest.fn(() => EXAMPLE_CONNECTOR_REST_API_CALL);
const findManyByBlockTypeMock = jest.fn(() => EXAMPLE_CONNECTOR_REST_API_CALLS);

describe('EntityPageService', () => {
  let service: EntityPageService;

  beforeEach(async () => {
    createMock.mockClear();
    findOneMock.mockClear();
    findManyByBlockTypeMock.mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BlockService,
          useClass: jest.fn(() => ({
            create: createMock,
            findOne: findOneMock,
            findManyByBlockType: findManyByBlockTypeMock
          }))
        },
        EntityPageService
      ],
      imports: []
    }).compile();

    service = module.get<EntityPageService>(EntityPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one', async () => {
    expect(
      await service.findOne({
        where: { id: EXAMPLE_CONNECTOR_REST_API_CALL.id },
        version: EXAMPLE_CONNECTOR_REST_API_CALL.versionNumber
      })
    ).toBe(EXAMPLE_CONNECTOR_REST_API_CALL);
    expect(findOneMock).toBeCalledTimes(1);
  });

  it('should find many', async () => {
    expect(await service.findMany({})).toEqual(
      EXAMPLE_CONNECTOR_REST_API_CALLS
    );
    expect(findManyByBlockTypeMock).toBeCalledTimes(1);
  });

  it('should create', async () => {
    expect(
      await service.create({
        data: {
          inputParameters: EXAMPLE_INPUT_PARAMETERS,
          outputParameters: EXAMPLE_OUTPUT_PARAMETERS,
          name: EXAMPLE_NAME,
          url: EXAMPLE_URL,
          app: {
            connect: {
              id: EXAMPLE_APP_ID
            }
          }
        }
      })
    ).toEqual(EXAMPLE_CONNECTOR_REST_API_CALL);
    expect(createMock).toBeCalledTimes(1);
  });
});