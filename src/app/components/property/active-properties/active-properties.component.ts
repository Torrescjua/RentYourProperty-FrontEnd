import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../../services/property/property.service';
import { Property } from '../../../models/property.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './active-properties.component.html',
  styleUrls: ['./active-properties.component.css']
})

export class ActivePropertiesComponent implements OnInit {
  searchQuery: string = '';
  searchCapacity: number = 1;
  searchType: string = 'name';
  searchResults: Property[] = [];
  selectedProperty: Property | null = null;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {}

  setSearchType(type: string): void {
    this.searchType = type;
  }

  searchProperties(): void {
    if (this.searchType === 'name') {
      this.propertyService.getPropertyByName(this.searchQuery).subscribe((data) => {
        this.searchResults = data;
      });
    } else if (this.searchType === 'municipality') {
      this.propertyService.getPropertiesByMunicipality(this.searchQuery).subscribe((data) => {
        this.searchResults = data;
      });
    } else if (this.searchType === 'capacity') {
      this.propertyService.getPropertiesByCapacity(this.searchCapacity).subscribe((data) => {
        this.searchResults = data;
      });
    }
  }

  selectProperty(property: Property): void {
    this.selectedProperty = property;
    this.searchResults = [];
  }
}
