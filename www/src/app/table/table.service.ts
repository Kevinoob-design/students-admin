import { environment } from '../../environments/environment'
import { student } from "../student"
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
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

  deleteStudent(_id: string): Observable<okResponse<student>> {

    const url = `${this.studentsUrl}/${_id}`

    return this.http.delete<okResponse<student>>(url)
  }
}
