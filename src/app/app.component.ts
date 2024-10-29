import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivePropertiesComponent } from './components/property/active-properties/active-properties.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ActivePropertiesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'rentyourproperty-frontend';
}
