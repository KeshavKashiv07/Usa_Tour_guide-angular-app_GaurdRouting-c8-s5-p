export class AuthServiceStub {
    isLoggedIn: boolean = false;
    login(code: string) {
        if (code === "TG@2022")
            this.isLoggedIn = true;
    }

}