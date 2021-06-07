import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'
import { student } from '../../models/student'
import { StudentsServiceService } from '../students.service'
import { xml2js } from "xml-js"
import { saveAs } from "file-saver"
import { StudentsDialogComponent } from '../students-dialog/students-dialog.component'

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: [ './students-table.component.css' ]
})
export class StudentsTableComponent implements OnInit, AfterViewInit {

  filter: string = ""
  hoveredRow: any
  students: student[] = []
  displayedColumns: string[] = [ 'Name', 'Last Name', 'Age', 'Bio', 'Actions' ]
  dataSource = new MatTableDataSource<student>(this.students)
  @ViewChild(MatPaginator) paginator: any

  constructor (
    private tableService: StudentsServiceService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStudents()
  }

  ngAfterViewInit() {

    this.paginator.page.subscribe(() => {

      const limit = this.paginator?.pageSize || 10
      const page = this.paginator?.pageIndex + 1 || 1

      this.getStudents(page, limit, this.filter)
    })


  }

  uploadStudentsViaXML($event: any) {

    const studentsFile = $event.target.files[ 0 ]

    const fileReader = new FileReader();

    fileReader.onload = (e) => {

      const fileResult: string | undefined = fileReader.result?.toString()

      try {

        const jsResultFromXML: any = xml2js(fileResult || "", {
          compact: true
        })

        if (jsResultFromXML) {

          let students = jsResultFromXML?.students?.student

          if (!students) throw new Error("No students on XML file")

          students = students.length ? students.map((student: any) => {
            return {
              name: student?.name?._text || "",
              lastName: student?.lastname?._text || "",
              age: student?.age?._text || "",
            }
          }) : {
            name: students?.name?._text || "",
            lastName: students?.lastname?._text || "",
            age: students?.age?._text || "",
          }

          if (students.length && students.length > 0) this.insertMultipleStudents(students)

          if (students && !students.length) this.insertStudent(students)
        }

      } catch (error) {

        this._snackBar.open((error && error.message) ? error.message : "Students payload must be in valid XML format", "Dismiss")
      }
    }

    fileReader.readAsText(studentsFile);
  }

  searchStudents(event: Event) {

    this.filter = (<HTMLInputElement>event.target).value
    const limit = this.paginator?.pageSize || 10
    this.paginator.firstPage()

    this.getStudents(1, limit, this.filter)
  }

  getStudents(page: number = 1, limit: number = 10, filter: string = "") {

    this.tableService.getStudents({ limit, page, filter }).subscribe(students => {
      this.dataSource.data = students.data
      this.paginator.length = students.count
    })
  }

  getStudent(_id: string) {

    this.router.navigate([ "form" ], { queryParams: { id: _id } })
  }

  insertStudent(student: student) {

    this.tableService.insertStudent(student).subscribe(result => {

      if (result.success) this._snackBar.open("Students payload added successfully", "Dismiss")

      this.getStudents()
    })
  }

  insertMultipleStudents(students: student[]) {

    this.tableService.insertStudents(students).subscribe(result => {

      if (result.success) this._snackBar.open("Students payload added successfully", "Dismiss")

      this.getStudents()
    })
  }

  downloadBio(_id: string) {
    this.tableService.getStudentBio(_id).subscribe(blob => {

      if (!blob) {

        this._snackBar.open("Unable to download student bio", "Dismiss")

        return
      }

      this._snackBar.open("Student bio downloaded successfully", "Dismiss")

      saveAs(blob, _id)
    })
  }

  deleteStudent(_id: string) {
    this.tableService.deleteStudent(_id).subscribe(student => {

      if (student.success) this._snackBar.open("Student deleted successfully", "Dismiss")

      this.dataSource.data = this.dataSource.data.filter(student => student._id !== _id)
    })
  }

  openDialog(student: student): void {
    const dialogRef = this.dialog.open(StudentsDialogComponent, {
      width: '250px',
      data: { title: "Deleting Student", message: `are you sure you want to delete ${student.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) this.deleteStudent(student._id!)
    });
  }

  mouseOverRow(row: any) {
    this.hoveredRow = row;
  }

  mouseLeaveRow(row: any) {
    this.hoveredRow = null;
  }
}
