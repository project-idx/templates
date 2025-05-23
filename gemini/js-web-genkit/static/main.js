let form = document.querySelector('form');
let output = document.querySelector('.output');

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
    return response.json();
  }).then(response => {
    let md = window.markdownit();
    output.innerHTML = md.render(response.recipe);
    for (const element of response.tags) {
      const tag = document.createElement('div');
      tag.setAttribute("class", "tag")
      tag.innerHTML = element
      output.appendChild(tag)
    }
  });
  return false;
}