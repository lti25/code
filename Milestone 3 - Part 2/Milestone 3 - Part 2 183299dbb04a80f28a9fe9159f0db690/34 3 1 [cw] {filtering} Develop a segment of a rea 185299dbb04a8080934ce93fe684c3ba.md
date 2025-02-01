# 34.3.1 [cw] {filtering} Develop a segment of a real estate platform using Angular

Status: Not started

# app.component.ts

```bash
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Property } from "./property";
import { PropertyService } from "./services/property.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  filteredProperties$: Observable<Property[]>;
  properties$: Observable<Property[]>;
  property: Property;
  errorMessages: string[] = [];
  requiredFields = ["name", "location", "price", "rooms", "size"];
  roomTypes = ["Apartment", "Villa", "Penthouse"];

 constructor(private propertyService: PropertyService){}

 ngOnInit(): void {
   this.property = this.getDefaultProperty();
   this.getProperties();
 }

 getDefaultProperty(): Property{
  return{
    id: "",
    name: "",
    location: "",
    price: 0,
    rooms: 1,
    type: "Apartment",
    size: 0
  };
 }

 getProperties(){
  this.properties$ = this.propertyService.getProperties();
  this.filteredProperties$ = this.properties$;
 }

 addProperty(): void {
  this.errorMessages = [];
  this.requiredFields.forEach((field: string) => {

    if(!this.property[field]) {
      this.errorMessages.push(
        `${field.charAt(0).toUpperCase()}${field.slice(1)} is required`
      );
      } else if( field === 'size' || field === "rooms" ) {
        if(this.property[field] < 0) {
          this.errorMessages.push(
            `${field.charAt(0).toUpperCase()}${field.slice(1)} cannot contain negative values`
          );
        }
      }
    })    
    
    if(!this.errorMessages.length) {
      this.propertyService.addProperty(this.property).subscribe((res) => this.getProperties() );

      this.property = this.getDefaultProperty();
    }
  }

  searchProperties(event: any) {
    const searchTerm = event.target.value;
    if(!searchTerm) this.filteredProperties$ = this.properties$;

    this.filteredProperties$ = this.properties$.pipe(
      map( (properties) => {
        return properties.filter(
          (property) => property.id.includes(searchTerm) || property.name.includes(searchTerm)
        );
      })
    );

  }
}

```

# property.service.ts

```bash
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Property } from '../property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = environment.apiUrl; 

  // constructor(private http: HttpClient) {}

  constructor(private http: HttpClient) {}
  
    getDefaultProperty(): any {
      return {
        propertyID: '',
        type: '',
        location: '',
        price: '',
        rooms: '',
        size: '',
      };
    }
  
    getProperties(): Observable<any> {
      return this.http.get(`${this.apiUrl}/properties`);
    }
  
    getProperty(id: string): any {
      return this.http.get(`${this.apiUrl}/properties/${id}`);
    }
  
    addProperty(property: Property): Observable<any> {
      property.id = new Date().getTime().toString();
      return this.http.post(`${this.apiUrl}/properties`, property);
    }
    

  //Create a method getProperties which returns Observable<any>
    // GET request to /properties
  
  //Create a method getProperty which takes id as a string and returns any value
  // GET request to /properties/:id
   
  //Create a method addProperty which takes property entity and returns Observable<any>
  //Assign the id field for property entity as the timestamp for the current date as a string.
  // POST request to /properties
  // We assign an id to the property as there is no real backend
      
}

```

# property-list.component.ts

```bash
import {
  Component, 
  Input, 
  OnChanges,
  OnInit, 
  SimpleChanges,
} from "@angular/core";
import { Observable, of } from "rxjs";
import { Property } from "../property";

@Component({
  selector: "property-list",
  templateUrl: "./property-list.component.html",
  styleUrls: ["./property-list.component.scss"],
})
export class PropertyListComponent implements OnInit, OnChanges {

  @Input() propertyList: Observable<Property[]> = of([]);

  constructor() {}

  ngOnInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges): void {    
  }

}

```