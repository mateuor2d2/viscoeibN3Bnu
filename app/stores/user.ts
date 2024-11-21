import { defineStore } from "pinia";

interface Contact {
  phone: string;
  alternativeEmail?: string;
}

interface Document {
  type: string;
  url: string;
  validUntil?: string;
}

export interface User {
  _id: string;
  collegeId: string;
  collegiateNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  specialties: string[];
  status: string;
  professionalAddress: string;
  contact: Contact;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
  accessToken: String;
}
export interface FeathersResponseAuthentication {
  accessToken: string;
  loggedIn: boolean;
  user: User;
}
interface userState {
  [key: string]: any; // Adjust the value type (`any`) as necessary
}
interface State extends userState {
  ongoingOperations: number;
  isLoading: boolean;
  sidebar: boolean;
  loggedIn: boolean;
  user: User;
}
export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null as User | null,
    users: [] as User[],
    ongoingOperations: 0,
    isLoading: false,
    sidebar: false,
    loggedIn: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) =>
      state.user ? `${state.user.firstName} ${state.user.lastName}` : "",
    accessToken: (state) => state.user?.accessToken || "",
  },
  actions: {
    incrementOperations() {
      this.ongoingOperations++;
      if (this.isLoading === false) {
        this.isLoading = true;
      }
    },

    decrementOperations() {
      this.ongoingOperations = Math.max(this.ongoingOperations - 1, 0);
      if (this.ongoingOperations === 0) {
        this.isLoading = false;
      }
    },

    setLogginIn(payload: boolean) {
      this.loggedIn = payload;
    },
    setAccesstoken(token: string) {
      this.user.accessToken = token;
    },
    setUser(userData: User) {
      this.user = userData;
    },

    clearUser() {
      this.user = null;
    },

    setUsers(users: User[]) {
      this.users = users;
    },
    logout() {
      this.user = null;
      this.loggedIn = false;
    },
    async login(email: string, password: string) {
      try {
        this.incrementOperations();
        const response = await $fetch<FeathersResponseAuthentication>(
          "/api/login",
          {
            method: "POST",
            body: {
              email,
              password,
            },
          }
        );

        if (response.accessToken) {
          this.setLogginIn(true);
          this.setUser(response.user);
          this.setAccesstoken(response.accessToken);
          return response;
        }
      } catch (error) {
        throw error;
      } finally {
        this.decrementOperations();
      }
    },
  },
});
