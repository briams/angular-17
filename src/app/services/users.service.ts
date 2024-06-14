import { HttpClient } from "@angular/common/http";
import { Injectable, computed, inject, signal } from "@angular/core";
import { IUser, IUserResponse, IUsersResponse } from "@interfaces/req-response";
import { Observable, delay, map } from "rxjs";

interface IState {
  users: IUser[];
  loading: boolean;
}

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private httpClient = inject(HttpClient);

  #state = signal<IState>({
    loading: true,
    users: [],
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.httpClient
      .get<IUsersResponse>("https://reqres.in/api/users")
      .pipe(delay(1500))
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          users: res.data,
        });
      });

    console.log("Cargando data");
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient
      .get<IUserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(1500),
        map((resp) => resp.data)
      );
  }
}
