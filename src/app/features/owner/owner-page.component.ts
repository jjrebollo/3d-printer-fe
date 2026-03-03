import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerService } from '../../core/services/owner.service';
import { Owner } from '../../core/models/owner.model';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-owner-page',
  standalone: true,
  imports: [CommonModule, OwnerProfileComponent, LoadingSpinnerComponent],
  templateUrl: './owner-page.component.html',
  styleUrl: './owner-page.component.scss',
})
export class OwnerPageComponent implements OnInit {
  owner: Owner | null = null;
  loading = true;
  error: string | null = null;

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.ownerService.getOwner(1).subscribe({
      next: (owner) => {
        this.owner = owner;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load owner information. Is the backend running?';
        this.loading = false;
      },
    });
  }
}
