import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  UnitedNationBulkIndividual,
  UnitedNationBulkIndividualList,
  UnitedNationBulkIndividualPayload,
  UnitedNationIndividual,
  UnitedNationIndividualList,
} from 'src/app/interfaces';
import { API_ENDPOINTS } from 'src/app/service/api.config';
import { BackendService } from 'src/app/service/backend/backend.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  listType: number;
  keyword: string = '';
  page: number = 0;
  length: number = 10;
  totalPage: number = 0;
  unitedNationBulkIndividuals: UnitedNationBulkIndividual[] = [];
  tmpUnitedNationBulkIndividuals: UnitedNationBulkIndividual[] = [];
  unitedNationIndividuals: UnitedNationIndividual[] = [];
  JSONData: any;
  text: any;

  allowedExt = ['csv'];

  constructor(private readonly backend: BackendService) {
    this.listType = 1;
  }

  async filterByKeyword() {
    if (this.listType == 1) {
      this.page = 0;
      await this.retrieveIndividualList(this.keyword, this.page, this.length);
    }
  }

  async previousPage() {
    if (this.page > 0) {
      this.page--;
    }
    await this.retrieveIndividualList(this.keyword, this.page, this.length);
  }

  async nextPage() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    await this.retrieveIndividualList(this.keyword, this.page, this.length);
  }

  async triggerPage(page: number) {
    this.page = page;
    await this.retrieveIndividualList(this.keyword, this.page, this.length);
  }

  async jumpToPage() {
    if (this.page >= this.totalPage) {
      this.page = this.totalPage;
    }
    await this.retrieveIndividualList(this.keyword, this.page, this.length);
  }

  async updateLength(event: any) {
    this.length = event.target.value;
    await this.retrieveIndividualList(this.keyword, this.page, this.length);
  }

  async retrieveIndividualList(
    keyword: string,
    page: number,
    length: number
  ): Promise<UnitedNationIndividualList> {
    let headers: Record<string, string> = {};
    headers['x-api-key'] = 'qvi7bue1DZkkoqfkST9xTEkVyXpweZpO';

    const response = (await this.backend.apiCall(
      API_ENDPOINTS.API_URL.API_INDEX,
      { keyword, page, length, sortBy: 'createdAt', orderBy: 'DESC' },
      undefined,
      undefined,
      {
        type: 'UNITED_NATION_INDIVIDUAL',
      },
      headers
    )) as UnitedNationIndividualList;

    const { individuals, totalPage } = response;

    this.unitedNationIndividuals = individuals;
    this.totalPage = totalPage;
    return response;
  }

  async retrieveBulkIndividualList(
    payload: UnitedNationBulkIndividualPayload[]
  ) {
    const response = (await this.backend.apiCall(
      API_ENDPOINTS.API_URL.API_BULK_INDIVIDUAL,
      { bulkPayload: payload },
      undefined,
      undefined,
      {
        type: 'UNITED_NATION_INDIVIDUAL',
      }
    )) as UnitedNationBulkIndividualList;

    const { individuals, totalPage } = response;

    this.tmpUnitedNationBulkIndividuals = individuals;
    this.unitedNationBulkIndividuals = individuals;
    this.totalPage = totalPage;
    return response;
  }

  async fileInput(ev: any) {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.retrieveBulkIndividualList(
        this.csvToJson(
          event.target.result
        ) as UnitedNationBulkIndividualPayload[]
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
    this.unitedNationIndividuals = [];
    this.totalPage = 0;
    this.keyword = '';
    this.page = 0;
    this.length = 10;
    if (listType == 1) {
      await this.retrieveIndividualList(this.keyword, this.page, this.length);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.retrieveIndividualList('', this.page, this.length);
  }
}
