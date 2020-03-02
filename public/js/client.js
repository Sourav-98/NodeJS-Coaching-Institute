
var passwordToggler = function(){
    // console.log('clicked!');
    var toggleIcon = document.getElementById('passwordToggler');
    var passwdbox = document.getElementById('password');
    // console.log(passwdbox.getAttribute('type'));
    if(passwdbox.getAttribute('type') == 'password'){
        passwdbox.setAttribute('type', 'text');
        toggleIcon.setAttribute('class', 'fas fa-eye-slash form-control-icon');
    }
    else{
        passwdbox.setAttribute('type', 'password');
        toggleIcon.setAttribute('class', 'fas fa-eye form-control-icon');
    }
}
