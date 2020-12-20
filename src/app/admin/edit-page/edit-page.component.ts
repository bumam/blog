import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;

  updSub: Subscription;

  constructor(private route: ActivatedRoute,
              private postservice: PostService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.route.params.pipe
    (switchMap( (params: Params) => {
      return this.postservice.getById(params.id);;
    }))
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });
      });
  }

  ngOnDestroy() {
    if (this.updSub) {
      this.updSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.updSub = this.postservice.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe( () => {
      this.submitted = false;
      this.alert.success('Пост обновлен');
    });
  }
}
