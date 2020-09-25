const submit = document.getElementById('button');
let last_name = document.getElementById('last_name');
let first_name = document.getElementById('first_name');
let username = document.getElementById('username');
let email = document.getElementById('email');
let matricule = document.getElementById('matricule');
let gender = document.getElementById('gender');
let birthdate = document.getElementById('birthdate');
let commune = document.getElementById('commune');
let password = document.getElementById('password');
let confirm_password = document.getElementById('confirm_password');

let test_name_com = /^[a-zçéèêëïîôö]+$/i;
let test_username = /^[a-zA-Z0-9çéèêëïîÉÈÊËÎÏ_@#-]+$/;
let test_email = /^[a-z0-9_-.]+@[a-z0-9_-.]+$/;
let test_matricule = /^[0-9]{2}-ESATIC[0-9]{4}[A-Z]{2}$/;
let test_password = /^\S*$/;

submit.addEventListener('click', (e)=>{
    return false;

    //////////////////////////////////////////////////////////
    let btn = document.getElementById('submit');
    let name = document.getElementById('last_name');
    let first_name = document.getElementById('first_name');
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let matricule = document.getElementById('matricule');
    let gender = document.getElementById('gender');
    let birthdate = document.getElementById('birthdate');
    let commune = document.getElementById('commune');
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');


    let test_name_com = /^[a-zçéèêëïîôö ]+$/i;
    let test_username = /^[a-zA-Z0-9çéèêëïîÉÈÊËÎÏ_@#-]+$/;
    let test_email = /^[a-z0-9_-]+@[a-z]+[.][a-z]+$/;
    let test_matricule = /^[0-9]{2}-ESATIC[0-9]{4}[A-Z]{2}$/;
    let test_password = /^\S*$/;


    btn.addEventListener('click', (e)=>{
        invalid_syntax(e);
    });

    let invalid_syntax = (e)=>{
        if (last_name.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes nom');
        } else if (test_name_com.test(last_name.value) == false) {
            e.preventDefault();
            alert('Format incorrect nom');
        } else if (first_name.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes prenom');
        } else if (test_name_com.test(first_name.value) == false) {
            e.preventDefault();
            alert('Format incorrect prenom');
        } else if (username.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes username');
        } else if (test_username.test(username.value) == false) {
            e.preventDefault();
            alert('Format incorrect username');
        } else if (email.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes email');
        } else if (test_email.test(email.value) == false) {
            e.preventDefault();
            alert('Format incorrect email');
        } else if (matricule.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes matricule');
        } else if (test_matricule.test(matricule.value) == false) {
            e.preventDefault();
            alert('Format incorrect matricule');
        } else if (gender.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes gender');
        } else if (birthdate.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes birthdate');
        } else if (password.validity.valueMissing) {
            e.preventDefault();
            alert('Données manquantes password');
        } else if (test_password.test(password.value) == false) {
            e.preventDefault();
            alert('Format incorrect password');
        } else if (test_password.test(confirm_password.value) == false) {
            e.preventDefault();
            alert('Format incorrect confirm_password');
        }
    }
});