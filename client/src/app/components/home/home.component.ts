import { Component, OnInit } from '@angular/core';

import { Blog } from './../../models/blog';
import './../../rxjs-operators';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [BlogService]
})
export class HomeComponent implements OnInit {
  isSubmitted = false;
  model = new Blog('', '');
  public blogMessages = [];

  constructor (private blogService: BlogService) {}

  submitBlog() {
    this.blogService.addBlog(this.model)
      .subscribe(
        blogMsg => {
          // console.log("Messages:", messages);
          this.model = blogMsg;
          // this.getBlogs();
        }
      );
  }

  getBlogs() {
    console.log('Subscribe to service');
    this.blogService.getBlogs()
      .subscribe(
        messages => {
          // console.log("Messages:",messages);
          this.blogMessages = messages;
        },
      );
  }

  ngOnInit() {
    this.getBlogs();
  }
}
