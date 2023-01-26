import { makeAutoObservable } from "mobx";

class Contact {
    id: number;
    name: string;
    phone: string;

    constructor(name: string, phone: string) {
        this.id = Math.random();
        this.name = name;
        this.phone = phone;
        makeAutoObservable(this)
    };

    edit (name: string, phone: string) {
        this.name = name;
        this.phone = phone;
    };
};

class ContactStore {
    contacts: Contact[];

    constructor() {
        this.contacts = [
            new Contact('Dean', '+7 (800) 555 3535'),
            new Contact('Sam', '+7 (212) 456 7890')
        ]
        makeAutoObservable(this)
    };

    delete (id: number) {
        const newContacts = this.contacts.filter(el => {
            return el.id !== id;
        })
        this.contacts = newContacts;
    };

    add (name: string, phone: string) {
        const newContacts = this.contacts;
        newContacts.push(new Contact(name, phone));
        this.contacts = newContacts;
    };
}

export { Contact, ContactStore };

