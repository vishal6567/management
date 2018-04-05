import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'; 
import { Injectable } from '@angular/core';

import { DisplayComponent } from '../display/display.component';
import { AddComponent } from '../add/add.component';
import {Employee} from '../user';

@Component({  
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor() { 
    
  }

  ngOnInit() {
  }

}
