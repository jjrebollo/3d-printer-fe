import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Owner } from '../../../core/models/owner.model';

@Component({
  selector: 'app-owner-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-profile.component.html',
  styleUrl: './owner-profile.component.scss',
})
export class OwnerProfileComponent {
  @Input({ required: true }) owner!: Owner;
}
