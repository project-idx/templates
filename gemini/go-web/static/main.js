let form = document.querySelector('form');
let output = document.querySelector('.output');

form.onsubmit = async (ev) => {
    ev.preventDefault()
    output.textContent = "Generating...";

    var data = new FormData(form);
    var request = new XMLHttpRequest();
    request.open("POST", "/api/generate");
    request.onload = function () {
        // Read the response and interpret the output as markdown.
        let md = window.markdownit();
        output.innerHTML = md.render(request.responseText);
    };
    request.send(data);
    return false;
}