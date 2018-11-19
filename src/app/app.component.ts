import { Component } from '@angular/core';
import { UserAccessService } from 'src/app/services/user-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peptrack';

  constructor(private userAccessServ: UserAccessService) {
  }
}
