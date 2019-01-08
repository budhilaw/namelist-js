class Name {
    constructor(idnumber, fullname, age){
        this.idnumber = idnumber;
        this.fullname = fullname;
        this.age = age;
    }
}

class UI {
    static displayNames(){
        const names = Store.getNames();

        names.forEach((name) => UI.addNameToList(name));
    }

    static addNameToList(name){
        const main = document.querySelector('.NameList');

        const div = document.createElement('li');

        div.className = 'item';

        if( name.fullname != undefined ){
            div.append(name.fullname);
            main.appendChild(div);
        } else {
            div.append(name.textContent);
            main.appendChild(div);

            // Remove from Favourites
            UI.deleteName(name);
        }
    }

    static addFavourites(name){
        const main = document.querySelector('.favourites ul');

        const div = document.createElement('li');

        div.className = 'selected';
        div.append(name.textContent);

        main.appendChild(div);

        // Remove from List
        UI.deleteName(name);
    }

    static deleteName(el){
        if( el.classList.contains('selected') || el.classList.contains('item') ){
            el.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const favourites = document.querySelector('.favourites');
        container.insertBefore(div, favourites);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

class Store {
    static getNames(){
        let names;
        if( localStorage.getItem('names') === null ){
            names = [];
        } else {
            names = JSON.parse(localStorage.getItem('names'));
        }

        return names;
    }

    static addName(name){
        const names = Store.getNames();
        names.push(name);
        localStorage.setItem('names', JSON.stringify(names));
    }
}

// Event: Display Names
document.addEventListener('DOMContentLoaded', UI.displayNames());

// Event: Add a Name
document.querySelector('#name-form').addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();

    const idnumber = document.querySelector('#idnumber').value;
    const fullname = document.querySelector('#fullname').value;
    const age = document.querySelector('#age').value;

    // Do Validate
    if( idnumber == '' || fullname == '' || age == '' ){
        alert('Please fill all fields');
    } else {
        const name = new Name(idnumber, fullname, age);
        // Add name to store
        Store.addName(name);

        // Show success message
        alert('Success')
    }
})

// Event: Add a Name to Favourites list
document.querySelector('.NameList').addEventListener('click', (e) => {
    if( e.target.classList.contains('item') ){
        UI.addFavourites(e.target);
    }
})

// Event: Remove a Name
document.querySelector('.favourites ul').addEventListener('click', (e) => {
    if( e.target.classList.contains('selected') ){
        //UI.deleteName(e.target);
        UI.addNameToList(e.target);
    }
});

// class UI {
//     static displayBooks(){
//         const storedNames = [
//             {
//                 title: 'Book One',
//                 author: 'John Doe',
//                 isbn: '342423'
//             },
//             {
//                 title: 'Book Two',
//                 author: 'Smith Doe',
//                 isbn: '342411'
//             },
//             {
//                 title: 'Book Three',
//                 author: 'Michael Joe',
//                 isbn: '342444'
//             }
//         ];

//         const Names = storedNames;

//         UI.addNameToList(Names);

//         // Names.forEach((name) => {
//         //     UI.addNameToList(name);
//         // });
//     }

//     static addNameToList(names){
//         names.forEach((name) => {
//             const main = document.querySelector('.NameList');

//             const div = document.createElement('li');

//             div.onclick = () => {
//                 UI.AddedToList(names, name, div);
//             };

//             div.append(name.title);

//             main.appendChild(div);
//         });
//     }

//     static AddedToList(names, name, div){
//         const favourite = document.querySelector('.favourites > ul');
//         const h4 = document.querySelector('.favourites > h4');

//         if( div.className == 'selected' ) {
//             UI.RemovedFromList(div);
//         }

//         div.className = 'selected';

//         favourite.appendChild(div);

//         names.forEach((newName, index) => {
//             if( newName.isbn == name.isbn ) {
//                 names.splice(index, 1);
//             }
//         })

//         h4.innerHTML = 'Your shortlist..';
//     }

//     static RemovedFromList(div){
//         const NameList = document.querySelector('.NameList');
//         div.className = 'Changed';

//         NameList.appendChild(div);

//         console.log(NameList);
//     }
// }

document.addEventListener('DOMContentLoaded', UI.displayBooks);