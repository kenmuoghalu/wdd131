const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

//Focus on the input area
input.focus();

//creating a click event listener for the ADD Chapter button
button.addEventListener('click', function () {
    if (input.value.trim() !== '') {
        //create an li element
        const li = document.createElement('li');

        //create a button
        const deleteButton = document.createElement('button');

        //populate li element with input value
        li.textContent = input.value;

        //populate button textContent with an X
        deleteButton.textContent = '❌';

        //append li element with button
        li.append(deleteButton);

        //append li element to the unordered list in the HTML 
        list.append(li);

        //creating a click event listener for the DELETE button
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        //clean up input for the user
        input.value = '';
    }
    else {
        input.focus();
    }
});