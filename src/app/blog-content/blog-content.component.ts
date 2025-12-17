import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ConnectService } from '../../../services/connect.services/connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-content',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-content.component.html',
  styleUrl: './blog-content.component.css',
})
export class BlogContentComponent implements OnInit {
  imageUrl = signal('');
  title = signal('');
  description = signal('');
  username = signal('');
  likes = signal('');
  date = signal('');

  constructor(
    private blogService: ConnectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const blog = await this.blogService.getBlogDetail(id);
      if (blog) {
        this.imageUrl.set(blog.img);
        this.title.set(blog.title);
        this.description.set(blog.content);
        this.username.set(blog.username);
        this.likes.set(blog.likes);
        this.date.set(blog.createdAt);
      }
    }
  }
}
