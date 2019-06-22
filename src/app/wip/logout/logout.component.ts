import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WipService} from '../../api/services/wip.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private wipService: WipService) { }

  ngOnInit() {
    this.wipService.logout();
    this.router.navigate(['/wip/login']);
  }

}
