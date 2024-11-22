import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Puedes agregar lógica aquí si es necesario
    // Por ejemplo, redirigir después de unos segundos
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 10000);
  }
}
