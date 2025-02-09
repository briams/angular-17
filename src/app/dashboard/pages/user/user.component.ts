import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { UsersService } from "@services/users.service";
import { TitleComponent } from "@shared/title/title.component";
import { switchMap } from "rxjs";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule, TitleComponent, RouterModule],
  template: `
    <app-title [title]="titleLabel()" />

    @if( user() ) {

    <section>
      <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />

      <div>
        <h3>{{ user()?.first_name }} {{ user()?.last_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>

    <a
      [routerLink]="['/dashboard/user', user()!.id + 1 ]"
      class="mx-5 hover:underline"
    >
      next
    </a>

    } @else {
    <p>Cargando información</p>
    }

  `,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersSVC = inject(UsersService);

  // public user = signal<User| undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(switchMap(({ id }) => this.usersSVC.getUserById(id)))
  );

  public titleLabel = computed(() => {
    if (this.user()) {
      return `Información del usuario: ${this.user()?.first_name} ${
        this.user()?.last_name
      } `;
    }

    return "Información del usuario";
  });

  // constructor() {
  //   this.route.params.subscribe((params) => {
  //     console.log({ params });
  //   });
  // }
}
