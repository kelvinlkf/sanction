import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  login: boolean = false;
  payload: any = {};

  constructor(
    private nijiBackend: BackendService,
    private routeService: Router,
    private changeService: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.login = this.nijiBackend.getKey(this.nijiBackend.JSON_WEB_TOKEN_KEY)
      ? true
      : false;

    this.payload.name = '';
  }

  logout() {
    this.nijiBackend.removeKey(this.nijiBackend.JSON_WEB_TOKEN_KEY);
    this.changeService.detectChanges();

    location.href = '/';
  }
}
