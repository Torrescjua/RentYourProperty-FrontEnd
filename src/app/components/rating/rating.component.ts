import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating/rating.service';
import { ActivatedRoute } from '@angular/router';
import { Calification } from '../../models/calification.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  pendingRating!: Calification | null;
  userId!: number;
  requestId!: number;

  constructor(
    private ratingService: RatingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Capture userId and requestId from the route
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.requestId = Number(this.route.snapshot.paramMap.get('requestId'));

    // Load the specific pending rating for this requestId
    this.getPendingRating();
  }

  getPendingRating(): void {
    // Fetch all pending ratings and find the one that matches requestId
    this.ratingService.getPendingRatings(this.userId).subscribe(
      (ratings) => {
        this.pendingRating = ratings.find(
          (rating) => rating.id === this.requestId
        ) || null;
      },
      (error) => {
        console.error('Error fetching pending rating:', error);
      }
    );
  }

  submitRating(): void {
    if (this.pendingRating) {
      this.ratingService.submitRating(this.pendingRating, this.userId).subscribe(
        (response) => {
          console.log('Rating submitted successfully:', response);
          this.pendingRating = null; // Clear the rating form after submission
        },
        (error) => {
          console.error('Error submitting rating:', error);
        }
      );
    }
  }

  selectRating(score: number): void {
    if (this.pendingRating) {
      this.pendingRating.score = score;
    }
  }
}
