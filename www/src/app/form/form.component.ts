import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, ActivatedRoute } from '@angular/router'
import { student } from '../student'
import { FormService } from './form.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.css' ]
})

export class FormComponent implements OnInit {

  _id: string | undefined = undefined
  form: FormGroup

  constructor (
    private formService: FormService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.form = this.formBuilder.group({
      name: [ null, [ Validators.required ] ],
      lastName: [ null, Validators.required ],
      bio: [ null, Validators.required ],
      age: [ null, Validators.required ]
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(param => {

      if (param.id) this.getStudent(param.id)
    })
  }

  getStudent(_id: string) {

    this.formService.getStudent(_id).subscribe(student => {
      this._id = student.data._id
      this.form.reset(student.data)
    })
  }

  saveStudent() {

    if (!this._id) return this.insertStudent()

    this.updateStudent(this._id, this.form.value)
  }

  insertStudent() {

    const student: student = this.form.value

    this.formService.insertStudent(student).subscribe(student => {

      if (student.success) this._snackBar.open("Student added successfully", "Dismiss");

      this.router.navigate([ '' ]);
    })
  }

  updateStudent(_id: string, student: student) {

    this.formService.updateStudent(_id, student).subscribe(student => {

      if (student.success) this._snackBar.open("Student updated successfully", "Dismiss");

      this.router.navigate([ '' ]);
    })
  }
}
