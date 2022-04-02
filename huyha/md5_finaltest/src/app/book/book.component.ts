import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book} from "../model/book";
import {BookService} from "../service/book.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  idEdit: number = -1;
  bookEdit!: Book;

  btnSubmit:string = 'Create'
  titleBook:string = 'Create new book'

  formBook!: FormGroup
  books!: Book[]
  book!: Book


  formBookEdit!: FormGroup;

  constructor(private bookService: BookService,
              private formGroup: FormBuilder) {}

  ngOnInit(): void {
    this.formBook = this.formGroup.group( {
      id:[''],
      title: [''],
      author: [''],
      description: ['']
      });
    this.formBookEdit = this.formGroup.group( {
      id:[''],
      title: [''],
      author: [''],
      description: ['']
    });
    this.getAllBook();
  }

  public getAllBook() {
    this.bookService.getAllBooks().subscribe(data => this.books = data);
    this.formBook.reset();
    
  }


  getBook(id:number) {
    this.bookService.getBookById(id).subscribe((data) => {
      this.books = [];
      this.books.push(data);
    });
  }


  createBook() {
  if (!this.idEdit) {
    const book = {
      id: this.formBook.value.id,
      title: this.formBook.value.title,
      author: this.formBook.value.author,
      description: this.formBook.value.description,
    };

    this.bookService.createBook(book).subscribe((data) => {
      alert('create successfully!!!');
      console.log(data)
      this.formBook.reset();
      this.getAllBook();
    });
  } else {
    console.log(this.btnSubmit)
    this.editBook1();
  }
  }

  public editBook1(){
    this.bookService.updateBook(this.idEdit, this.formBook.value).subscribe({
      next: ( res ) => {
        console.log(res)
        alert("edit successfully");
        this.getAllBook();
        this.formBook.reset();
      }, error: () => {
        alert("error update!")
      }
    })
  }

  deleteBook(id: number, title: string) {
    if (confirm('Are you sure delete product: ' + title + '?')) {
      this.bookService.deleteBook(id).subscribe(() => {
          this.getAllBook();
          alert('Delete Successfully!');
        }
      );
    }
  }


  showCreateForm() {
    // @ts-ignore
    document.getElementById('formCreateBook').hidden = false;
  }

  Edit(id: number){
    this.idEdit = id;
    this.bookService.getBookById(id).subscribe((data) => {
      this.bookEdit = data
      this.formBook.patchValue(data);
      this.btnSubmit = 'Update'
      this.titleBook = 'Update Book'
    });

  }
}

// this.formBook.patchValue(data)
