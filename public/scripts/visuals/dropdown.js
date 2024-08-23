export function initDropdown(id, label, defaultValue, values, onclick) {
    let tag = document.getElementById(id);

    tag.innerHTML = `
        <p>${label}</p>
        <div style="height: 0.5rem"></div>
        <button class="dropbtn">${defaultValue}</button>
        <div class="dropdown-content"></div>
    `;

    if (values.length === 0) return;

    let button = tag.querySelector('.dropbtn');
    let content = tag.querySelector('.dropdown-content');
    
    button.onclick = (event) => {
        event.stopPropagation();
        let computedStyle = window.getComputedStyle(content);
        let isNone = computedStyle.display === 'none';
        content.style.display = isNone ? 'block' : 'none'; 
    }

    window.addEventListener('click', (event) => {
        if (!tag.contains(event.target)) {
            content.style.display = 'none';
        }
    })

    values.forEach((value) => {
        let item = document.createElement('p');
        item.innerText = value;
        item.onclick = (event) => {
            event.stopPropagation();
            button.innerText = item.innerText;
            content.style.display = 'none';
            onclick(item.innerText);
        };
        content.appendChild(item);
    });
}