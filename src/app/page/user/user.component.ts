import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  user: User[] = [];

  ngOnInit() {
    this.getUser();
  }

  returnHome() {
    alert('dang ve nha');
  }

  getUser() {
    this.userService.getUser().subscribe((res) => {
      this.user = res.content;
    });
  }

  editUser(Id: any) {
    this.router.navigate(['/user', Id]);
  }
}
