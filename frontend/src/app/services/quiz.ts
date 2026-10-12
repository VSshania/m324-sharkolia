import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizData } from '../models/quiz';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);

  getQuiz(): Observable<QuizData> {
    return this.http.get<QuizData>('/api/questions');
  }
}
