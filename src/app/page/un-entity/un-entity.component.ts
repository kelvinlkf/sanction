import { Component } from '@angular/core';
import {
  UnitedNationBulkEntity,
  UnitedNationBulkEntityList,
  UnitedNationBulkEntityPayload,
  UnitedNationBulkIndividual,
  UnitedNationBulkIndividualList,
  UnitedNationBulkIndividualPayload,
  UnitedNationEntity,
  UnitedNationEntityList,
  UnitedNationIndividual,
  UnitedNationIndividualList,
} from 'src/app/interfaces';
import { API_ENDPOINTS } from 'src/app/service/api.config';
import { BackendService } from 'src/app/service/backend/backend.service';

@Component({
  selector: 'app-un-entity',
  templateUrl: './un-entity.component.html',
  styleUrls: ['./un-entity.component.scss'],
})
export class UnEntityComponent {
  listType: number;
  keyword: string = '';
  page: number = 0;
  length: number = 10;
  totalPage: number = 0;
  unitedNationBulkEntities: UnitedNationBulkEntity[] = [];
  unitedNationEntities: UnitedNationEntity[] = [];
  JSONData: any;
  text: any;

  allowedExt = ['csv'];

  constructor(private readonly backend: BackendService) {
    this.listType = 1;
  }

  async filterByKeyword() {
    if (this.listType == 1) {
      this.page = 0;
      await this.retrieveEntityList(this.keyword, this.page, this.length);
    }
  }

  async previousPage() {
    if (this.page > 0) {
      this.page--;
    }
    await this.retrieveEntityList(this.keyword, this.page, this.length);
  }

  async nextPage() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    await this.retrieveEntityList(this.keyword, this.page, this.length);
  }

  async triggerPage(page: number) {
    this.page = page;
    await this.retrieveEntityList(this.keyword, this.page, this.length);
  }

  async jumpToPage() {
    if (this.page >= this.totalPage) {
      this.page = this.totalPage;
    }
    await this.retrieveEntityList(this.keyword, this.page, this.length);
  }

  async updateLength(event: any) {
    this.length = event.target.value;
    await this.retrieveEntityList(this.keyword, this.page, this.length);
  }

  async retrieveEntityList(
    keyword: string,
    page: number,
    length: number
  ): Promise<UnitedNationEntityList> {
    const response = (await this.backend.apiCall(
      API_ENDPOINTS.API_URL.API_INDEX,
      { keyword, page, length, sortBy: 'createdAt', orderBy: 'DESC' },
      undefined,
      undefined,
      {
        type: 'UNITED_NATION_ENTITY',
      }
    )) as UnitedNationEntityList;

    const { entities, totalPage } = response;

    this.unitedNationEntities = entities;
    this.totalPage = totalPage;
    return response;
  }

  async retrieveBulkEntityList(payload: UnitedNationBulkEntityPayload[]) {
    const response = (await this.backend.apiCall(
      API_ENDPOINTS.API_URL.API_BULK_INDIVIDUAL,
      { bulkPayload: payload },
      undefined,
      undefined,
      {
        type: 'UNITED_NATION_ENTITY',
      }
    )) as UnitedNationBulkEntityList;

    const { entities, totalPage } = response;

    this.unitedNationBulkEntities = entities;
    this.totalPage = totalPage;
    return response;
  }

  async fileInput(ev: any) {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.retrieveBulkEntityList(
        this.csvToJson(event.target.result) as UnitedNationBulkEntityPayload[]
      );
    };
    reader.readAsText(ev.target.files[0]);
  }

  csvToJson(data: string) {
    var lines = data.split('\n');
    var array = [];
    if (lines.length > 0) {
      var titles = lines[0].split(',');
      for (var i = 1; i < lines.length; ++i) {
        var obj = lines[i].split(',');
        var newItem = {};
        for (var j = 0; j < titles.length; ++j) {
          // @ts-ignore
          newItem[titles[j]] = obj[j];
        }
        array.push(newItem);
      }
    }

    return array;
  }

  async changeListType(listType: number) {
    this.listType = listType;
    this.unitedNationEntities = [];
    this.totalPage = 0;
    this.keyword = '';
    this.page = 0;
    this.length = 10;
    if (listType == 1) {
      await this.retrieveEntityList(this.keyword, this.page, this.length);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.retrieveEntityList('', this.page, this.length);
  }
}
