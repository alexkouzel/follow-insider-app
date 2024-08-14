export function initDropdown(tag) {
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

    let items = content.querySelectorAll('p');
    items.forEach((item) => {
        item.onclick = (event) => {
            event.stopPropagation();
            button.innerText = item.innerText;
            content.style.display = 'none';
        };
    });
}