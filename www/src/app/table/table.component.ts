import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { student } from '../student'
import { TableService } from './table.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})

export class TableComponent implements OnInit, AfterViewInit {

  hoveredRow: any
  students: student[] = []
  displayedColumns: string[] = [ 'Name', 'Last Name', 'Age', 'Bio', 'Actions' ]
  dataSource = new MatTableDataSource<student>(this.students)
  @ViewChild(MatPaginator) paginator: any

  constructor (
    private tableService: TableService,
    private router: Router,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getStudents()
  }

  ngAfterViewInit() {

    this.paginator.page.subscribe(() => {

      const limit = this.paginator?.pageSize || 10
      const page = this.paginator?.pageIndex + 1 || 1

      this.getStudents(limit, page)
    })
  }

  getStudents(limit = 10, page = 1) {

    this.tableService.getStudents({ limit, page }).subscribe(students => {
      this.dataSource.data = students.data
      this.paginator.length = students.count
    })
  }

  getStudent(_id: string) {

    this.router.navigate([ "form" ], { queryParams: { id: _id } })
  }

  deleteStudent(_id: string) {
    this.tableService.deleteStudent(_id).subscribe(student => {

      if (student.success) this._snackBar.open("Student deleted successfully", "Dismiss")

      this.dataSource.data = this.dataSource.data.filter(student => student._id !== _id)
    })
  }

  mouseOverRow(row: any) {
    this.hoveredRow = row;
  }

  mouseLeaveRow(row: any) {
    this.hoveredRow = null;
  }
}
