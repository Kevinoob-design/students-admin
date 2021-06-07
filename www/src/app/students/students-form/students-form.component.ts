import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router, ActivatedRoute } from '@angular/router'
import { student } from '../../models/student'
import { StudentsServiceService } from '../students.service'

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: [ './students-form.component.css' ]
})
export class StudentsFormComponent implements OnInit {

  _id: string | undefined = undefined
  studentsBioFile: any | undefined = undefined
  form: FormGroup

  constructor (
    private formService: StudentsServiceService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.form = this.formBuilder.group({
      name: [ null, [ Validators.required ] ],
      lastName: [ null, Validators.required ],
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

  uploadStudentsBio($event: any) {

    this.studentsBioFile = $event.target.files[ 0 ]
  }

  saveStudent() {

    const formData = new FormData();

    if (this.studentsBioFile) {
      formData.append("uploads", this.studentsBioFile, this.studentsBioFile.name);
    }

    formData.append("name", this.form.value.name);
    formData.append("lastName", this.form.value.lastName);
    formData.append("age", this.form.value.age);

    if (!this._id) return this.insertStudent(formData)

    this.updateStudent(this._id, formData)
  }

  insertStudent(formData: FormData) {

    const student: student = this.form.value

    this.formService.insertStudent(formData).subscribe(student => {

      if (student.success) this._snackBar.open("Student added successfully", "Dismiss");

      this.router.navigate([ '' ]);
    })
  }

  updateStudent(_id: string, student: FormData) {

    this.formService.updateStudent(_id, student).subscribe(student => {

      if (student.success) this._snackBar.open("Student updated successfully", "Dismiss");

      this.router.navigate([ '' ]);
    })
  }

}
