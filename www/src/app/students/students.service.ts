import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { student } from "../models/student"

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { resultsResponse, okResponse } from '../models/response'

export interface studentsQuery {
  page: number,
  limit: number,
  filter: string
}

@Injectable({
  providedIn: 'root'
})
export class StudentsServiceService {

  readonly studentsUrl: string = `${environment.apiUrl}/api/v1/students`

  constructor (private http: HttpClient) {}

  getStudents(query: studentsQuery): Observable<resultsResponse<student[]>> {

    const url = `${this.studentsUrl}?page=${query.page}&limit=${query.limit}&filter=${query.filter}`

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

  insertStudent(student: student | FormData): Observable<okResponse<student>> {

    return this.http.post<okResponse<student>>(this.studentsUrl, student)
  }

  getStudent(_id: string): Observable<okResponse<student>> {

    const url = `${this.studentsUrl}/${_id}`

    return this.http.get<okResponse<student>>(url)
  }

  updateStudent(_id: string, student: FormData): Observable<okResponse<student>> {

    const url = `${this.studentsUrl}/${_id}`

    return this.http.put<okResponse<student>>(url, student)
  }
}
