import { FeatureCollection } from "geojson";
import { FlexVersions } from "../../src/database/entity/flex-version-entity";
import gtfsFlexValidationSuccessMessage from "../test-data/flex-validation-success.message.json";
import { Readable } from "stream";

export class TdeiObjectFaker {
    static getGtfsFlexVersion() {
        return {
            polygon: this.getPolygon(),
            tdei_record_id: "test_record_id",
            confidence_level: 0,
            tdei_org_id: "test_user",
            file_upload_path: "test_path",
            uploaded_by: "test",
            collected_by: "test",
            collection_date: new Date(),
            valid_from: new Date(),
            valid_to: new Date(),
            collection_method: "manual",
            data_source: "InHouse",
            flex_schema_version: "v2.0",
            tdei_service_id: "test_service_id"
        } as FlexVersions;
    }

    static getGtfsFlexPayload(){
        return {
            polygon: this.getPolygon(),
            tdei_org_id: 'tdei-org-id',
            tdei_service_id:'tdei-service-id',
            collected_by:'collectedby',
            collection_method:'manual',
            data_source:'InHouse',
            flex_schema_version:'v2.0',
            valid_from: new Date(),
            valid_to : new Date()
        }
    }

    static getGtfsFlexVersionFromDB() {
        return {
            //DB polygon is stored as binary obj
            polygon: {},
            //Select query converts the binary polygon to json using spatial query
            polygon2: JSON.stringify(this.getPolygonGeometry()),
            tdei_record_id: "test_record_id",
            confidence_level: 0,
            tdei_org_id: "test_user",
            file_upload_path: "test_path",
            uploaded_by: "test",
            collected_by: "test",
            collection_date: new Date(),
            collection_method: "manual",
            valid_from: new Date(),
            valid_to: new Date(),
            data_source: "InHouse",
            flex_schema_version: "v2.0",
            tdei_service_id: "test_service_id"
        };
    }

    static getInvalidPolygon(): FeatureCollection {
        const randomCoordinates: number[][] = [];
        const firstRandom = [
            this.getRandomNumber(70, 79),
            this.getRandomNumber(12, 15)
        ];
        randomCoordinates.push(firstRandom);

        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Polygon",
                        coordinates: [randomCoordinates]
                    }
                }
            ]
        };
    }

    static getPolygon(): FeatureCollection {
        return {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: this.getPolygonGeometry()
                }
            ]
        };
    }

    static getPolygonGeometry(): any {
        return {
            type: "Polygon",
            coordinates: [this.getCoordinates()]
        };
    }

    private static getCoordinates(): number[][] {
        const randomCoordinates: number[][] = [];
        const firstRandom = [
            this.getRandomNumber(70, 79),
            this.getRandomNumber(12, 15)
        ];
        randomCoordinates.push(firstRandom);
        for (let i = 3; i--;) {
            randomCoordinates.push([
                this.getRandomNumber(70, 79),
                this.getRandomNumber(12, 15)
            ]);
        }
        randomCoordinates.push(firstRandom);

        return randomCoordinates;
    }

    private static getRandomNumber(min: number, max: number): number {
        const diff = max - min;
        return parseFloat((min + Math.random() * diff).toFixed(6));
    }

    static getGtfsFlexQueueMessageSuccess() {
        return gtfsFlexValidationSuccessMessage;
    }
    static getGtfsFlexPayload2(){
        return {
            "tdei_org_id": "e1956869-02d9-4e14-8391-6024406ced41",
            "tdei_service_id": "a73d0a95-f9e2-4067-b4c9-a1f82419e82e",
            "collected_by": "testuser",
            "collection_date": "2023-03-02T04:22:42.493Z",
            "collection_method": "manual",
            "valid_from": "2023-03-02T04:22:42.493Z",
            "valid_to": "2023-03-02T04:22:42.493Z",
            "data_source": "TDEITools",
            "polygon": {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "coordinates": [
                  [
                    [
                      -122.32615394375401,
                      47.61267259760652
                    ],
                    [
                      -122.32615394375401,
                      47.60504395643625
                    ],
                    [
                      -122.3155850364906,
                      47.60504395643625
                    ],
                    [
                      -122.3155850364906,
                      47.61267259760652
                    ],
                    [
                      -122.32615394375401,
                      47.61267259760652
                    ]
                  ]
                ],
                "type": "Polygon"
              }
            }
          ]
        },
            "flex_schema_version": "v2.0"
          }
    }

    static getMockUploadFile() {
        return {
            originalname:'sample.zip',
            mimetype:'application/zip',
            path:'sample/path/to.zip',
            buffer:Buffer.from('sample-buffer'),
            fieldname:'file',
            filename:'sample.zip',
            size:100,
            stream:Readable.from(''),
            encoding:'',
            destination:''
        };
    }
}
