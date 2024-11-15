export class Customer {
    constructor(id, firstName, secondName, lastName, email) {
        this.ID = id;
        this.FirstName = firstName;
        this.SecondName = secondName;
        this.LastName = lastName;
        this.FullName = `${firstName} ${secondName} ${lastName}`;
        this.Email = email;
    }
}
