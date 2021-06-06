import { environment } from '../../environments/environment'
import { student } from "../student"
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { resultsResponse, okResponse } from '../response'


export interface studentsQuery {
  page: number,
  limit: number
}

@Injectable({ providedIn: 'root' })
export class TableService {

  readonly studentsUrl: string = `${environment.apiUrl}/api/v1/students`

  constructor (private http: HttpClient) {}

  getStudents(query: studentsQuery): Observable<resultsResponse<student[]>> {

    const url = `${this.studentsUrl}?page=${query.page}&limit=${query.limit}`

    return this.http.get<resultsResponse<student[]>>(url)
  }

  getStudentBio(_id: string): Observable<any> {

    const url = `${this.studentsUrl}/${_id}/downloadBio`

    return this.http.get(url, { responseType: 'blob' })
  }

  deleteStudent(_id: string): Observable<okResponse<student>> {

    const url = `${this.studentsUrl}/${_id}`

    return this.http.delete<okResponse<student>>(url)
  }

  insertStudents(students: student[]): Observable<okResponse<string>> {

    const url = `${this.studentsUrl}/insertStudents`

    return this.http.post<okResponse<string>>(url, students)
  }

  insertStudent(student: student): Observable<okResponse<student>> {

    return this.http.post<okResponse<student>>(this.studentsUrl, student)
  }
}
