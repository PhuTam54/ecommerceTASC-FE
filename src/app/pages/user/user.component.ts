import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  paginationRes = new PaginationResponse<User[]>();
  searchParam = {
    pageNumber: 1,
    pageSize: 5,
    User: '',
  };

  user: User[] = [];

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((res) => {
      this.user = res.content;
    });
  }

  createUser() {
    this.router.navigate(['/user/create']);
  }

  editUser(Id: any) {
    this.router.navigate(['/user', Id]);
  }

  deleteUser(Id: any) {
    alert('Are you sure you want to delete? ' + Id);
  }
  onDelete(item: User) {
    // if (item)
    //   this.userService.deleteUser(item.id).subscribe((res) => {
    //     this.getUser();
    //   });
  }
}
