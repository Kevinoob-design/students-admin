import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

export interface PeriodicElement {
  name: string
  lastName: string
  age: number
  bio: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: "Hector", lastName: 'Hydrogen', age: 1.0079, bio: 'H' },
  { name: "Hector", lastName: 'Helium', age: 4.0026, bio: 'He' },
  { name: "Hector", lastName: 'Lithium', age: 6.941, bio: 'Li' },
  { name: "Hector", lastName: 'Beryllium', age: 9.0122, bio: 'Be' },
  { name: "Hector", lastName: 'Boron', age: 10.811, bio: 'B' },
  { name: "Hector", lastName: 'Carbon', age: 12.0107, bio: 'C' },
  { name: "Hector", lastName: 'Nitrogen', age: 14.0067, bio: 'N' },
  { name: "Hector", lastName: 'Oxygen', age: 15.9994, bio: 'O' },
  { name: "Hector", lastName: 'Fluorine', age: 18.9984, bio: 'F' },
  { name: "Hector", lastName: 'Neon', age: 20.1797, bio: 'Ne' },
]

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})

export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'Name', 'Last Name', 'Age', 'Bio' ]
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  @ViewChild(MatPaginator) paginator: any

  constructor () {}

  ngOnInit(): void {}

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator
  }
}
