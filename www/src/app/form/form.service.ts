import { environment } from '../../environments/environment'
import { student } from "../student"
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { okResponse } from '../response'

@Injectable({ providedIn: 'root' })
export class FormService {

  readonly studentsUrl: string = `${environment.apiUrl}/api/v1/students`

  constructor (private http: HttpClient) {}

  insertStudent(student: FormData): Observable<okResponse<student>> {

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
