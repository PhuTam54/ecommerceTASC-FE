import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: User[] = [];

  ngOnInit() {
    this.getUser();
  }

  returnHome() {
    alert('dang ve nha');
  }
  getUser() {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }
}
