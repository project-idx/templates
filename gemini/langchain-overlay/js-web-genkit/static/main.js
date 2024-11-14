let form = document.querySelector('form');
let output = document.querySelector('main .output');

form.onsubmit = async (ev) => {
    ev.preventDefault()
    output.textContent = "Generating...";
    const data = new FormData(form);
    await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
            userPrompt: data.get('prompt'),
            image: data.get('chosenImage'),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.text();
    }).then(response => {
        let md = window.markdownit();
        output.innerHTML = md.render(response);
    });
    return false;
}
