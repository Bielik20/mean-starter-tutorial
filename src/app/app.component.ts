import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Foo } from '@my/foo';
import { Bar } from '@my/bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  foo = new Foo();
  bar = new Bar();
  server$: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.server$ = this.http.get('api/public/simple');
  }
}
