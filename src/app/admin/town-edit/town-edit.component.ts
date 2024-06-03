import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from 'src/app/core/dish.service';
import { TownService } from 'src/app/core/town.service';
import { EventService } from 'src/app/core/event.service';
import { MonumentService } from 'src/app/core/monument.service';

@Component({
    selector: 'app-town-edit',
    templateUrl: './town-edit.component.html',
    styleUrls: ['./town-edit.component.css']
})
export class TownEditComponent implements OnInit {
    public editTownForm: FormGroup;
    public addDishForm: FormGroup;
    public addEventForm: FormGroup;
    public addMonumentForm: FormGroup;
    public townId: number = 0;
    public dishes: any[] = [];
    public events: any[] = [];
    public monuments: any[] = [];
    public successMessage: string = '';
    public errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private townService: TownService,
        private dishService: DishService,
        private eventService: EventService,
        private monumentService: MonumentService
    ) {
        this.editTownForm = this.fb.group({
            townName: ['', Validators.required],
            townDescription: ['', Validators.required],
            townImage: [''],
            townMap: [''],
            townVisibility: ['1', Validators.required] // Añadido townVisibility
        });
        this.addDishForm = this.fb.group({
            dishName: ['', Validators.required],
            dishDescription: ['', Validators.required],
            dishImage: ['']
        });
        this.addEventForm = this.fb.group({
            eventName: ['', Validators.required],
            eventDescription: ['', Validators.required],
            eventDate: ['']
        });
        this.addMonumentForm = this.fb.group({
            monumentName: ['', Validators.required],
            monumentDescription: ['', Validators.required],
            monumentImage: ['']
        });
    }

    ngOnInit(): void {
        this.townId = parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.townService.getTown(this.townId).then(town => {
            this.editTownForm.setValue({
                townName: town.townName,
                townDescription: town.townDescription,
                townImage: town.townImage,
                townMap: town.townMap,
                townVisibility: town.townVisibility
            });
        });

        this.loadDishes();
        this.loadEvents();
        this.loadMonuments();
    }

    onSubmit(): void {
        if (this.editTownForm.valid) {
            this.townService.updateTown(this.townId, this.editTownForm.value).then(() => {
                this.router.navigate(['/admin/towns']);
            }).catch(error => {
                console.error('Error updating town:', error);
            });
        }
    }

    loadDishes(): void {
        this.dishService.getDishes(this.townId).subscribe(dishes => {
            this.dishes = dishes;
        });
    }

    onAddDish(): void {
        if (this.addDishForm.valid) {
            this.dishService.addDish(this.townId, this.addDishForm.value).subscribe(() => {
                this.successMessage = 'Plato agregado exitosamente';
                this.addDishForm.reset();
                this.loadDishes();
                setTimeout(() => {
                    this.successMessage = '';
                }, 3000);
            }, error => {
                this.errorMessage = 'Error al agregar plato';
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            });
        }
    }

    onDeleteDish(dishId: number): void {
        this.dishService.deleteDish(this.townId, dishId).subscribe(() => {
            this.successMessage = 'Plato eliminado exitosamente';
            this.loadDishes();
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);
        }, error => {
            this.errorMessage = 'Error al eliminar plato';
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
        });
    }

    loadEvents(): void {
        this.eventService.getEvents(this.townId).subscribe(events => {
            this.events = events;
        });
    }

    onAddEvent(): void {
        if (this.addEventForm.valid) {
            this.eventService.addEvent(this.townId, this.addEventForm.value).subscribe(() => {
                this.successMessage = 'Evento agregado exitosamente';
                this.addEventForm.reset();
                this.loadEvents();
                setTimeout(() => {
                    this.successMessage = '';
                }, 3000);
            }, error => {
                this.errorMessage = 'Error al agregar evento';
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            });
        }
    }

    onDeleteEvent(eventId: number): void {
        this.eventService.deleteEvent(this.townId, eventId).subscribe(() => {
            this.successMessage = 'Evento eliminado exitosamente';
            this.loadEvents();
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);
        }, error => {
            this.errorMessage = 'Error al eliminar evento';
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
        });
    }

    loadMonuments(): void {
        this.monumentService.getMonuments(this.townId).subscribe(monuments => {
            this.monuments = monuments;
        });
    }

    onAddMonument(): void {
        if (this.addMonumentForm.valid) {
            this.monumentService.addMonument(this.townId, this.addMonumentForm.value).subscribe(() => {
                this.successMessage = 'Monumento agregado exitosamente';
                this.addMonumentForm.reset();
                this.loadMonuments();
                setTimeout(() => {
                    this.successMessage = '';
                }, 3000);
            }, error => {
                this.errorMessage = 'Error al agregar monumento';
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            });
        }
    }

    onDeleteMonument(monumentId: number): void {
        this.monumentService.deleteMonument(this.townId, monumentId).subscribe(() => {
            this.successMessage = 'Monumento eliminado exitosamente';
            this.loadMonuments();
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);
        }, error => {
            this.errorMessage = 'Error al eliminar monumento';
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
        });
    }
}
