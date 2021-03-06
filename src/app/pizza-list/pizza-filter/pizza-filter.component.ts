import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PizzaTypeService } from 'src/app/pizza-list/service/pizza-type.service';
import { PizzaService } from 'src/app/pizza-list/service/pizza.service';
import { PizzaFilter } from 'src/app/pizza-list/util/enum';
import { DishType, PizzaBase, PizzaType } from 'src/app/pizza-list/util/pizza';
import { PizzaBaseService } from '../service/pizza-base.service';

@Component({
  selector: 'sb-pizza-filter',
  templateUrl: './pizza-filter.component.html',
  styleUrls: ['./pizza-filter.component.scss']
})
export class PizzaFilterComponent implements OnInit {

  pizzaBases$: Observable<PizzaBase[]>;
  pizzaTypes$: Observable<PizzaType[]>;

  pizzaFilterForm: FormGroup;
  dishTypes = Object.keys(DishType).map(key => DishType[key]);

  constructor(private formBuilder: FormBuilder, private pizzaBaseService: PizzaBaseService, private pizzaTypeService: PizzaTypeService, private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.getPizzaBases();
    this.getPizzaTypes();
    this.initPizzaFilterForm();
  }

  private initPizzaFilterForm(): void {
    this.pizzaFilterForm = this.formBuilder.group({
      dishType: [''],
      price: [100],
      base: [''],
      type: ['']
    });
    this.pizzaFilterForm.valueChanges.subscribe((filterValue: PizzaFilter) => {
      this.pizzaService.filterPizza(filterValue);
    });
  }

  private getPizzaBases(): void {
    this.pizzaBases$ = this.pizzaBaseService.getPizzaBases();
  }

  private getPizzaTypes(): void {
    this.pizzaTypes$ = this.pizzaTypeService.getPizzaTypes();
  }

  selectDishType(dishType: DishType) {
    this.pizzaFilterForm.patchValue({
      dishType: dishType
    });
  }

}
