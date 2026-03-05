import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-random-word',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-word.component.html',
  styleUrl: './random-word.component.scss'
})
export class RandomWordComponent {
  word: string | null = null;
  loading = false;

  constructor(private http: HttpClient) {}

  fetchRandomWord(): void {
    this.loading = true;
    this.http.get<{ word: string }>(`${environment.apiBaseUrl}/api/random-word`).subscribe({
      next: (res) => {
        this.word = res.word;
        this.loading = false;
      },
      error: () => {
        this.word = 'Error fetching word';
        this.loading = false;
      },
    });
  }
}
