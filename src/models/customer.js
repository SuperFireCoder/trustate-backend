export class Customer {
    constructor(id, firstName, secondName, lastName, email, date, location, description) {
        this.ID = id;
        this.FirstName = firstName;
        this.SecondName = secondName;
        this.LastName = lastName;
        this.FullName = `${firstName} ${secondName} ${lastName}`;
        this.Email = email;
        this.Date = date;
        this.Location = location;
        this.Description = description;
    }
}
