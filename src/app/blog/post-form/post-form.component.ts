import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

	createPostForm: FormGroup;
	updatePostForm: FormGroup;
	errorMessage: string;
	counter: number = -1;

	constructor(private postService: PostService, private router: Router, private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(){
		this.createPostForm = this.formbuilder.group({
			id: this.counter++,
			title: ['', Validators.required],
			description: ['', Validators.required],
			date: new Date(),
			liked: 0,
			unliked: 0
		});
	}

	onCreatePost(){
		const id = this.createPostForm.get('id').value;
		const title = this.createPostForm.get('title').value;
		const description = this.createPostForm.get('description').value;
		const date = this.createPostForm.get('date').value;
		const liked = this.createPostForm.get('liked').value;
		const unliked = this.createPostForm.get('unliked').value;

		const newPost = new Post(id, title, description, date, liked, unliked);

		this.postService.createPost(newPost);
		this.router.navigate(['/posts']);
	}

}